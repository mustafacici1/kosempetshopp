import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";
import { ProductImage } from "../ui/ProductImage";
import { Icon } from "../ui/Icon";
import "./cart-drawer.css";

const FREE_SHIPPING_THRESHOLD = 500;

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    setQuantity,
    removeItem,
    totalCount,
  } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? "drawer-overlay--show" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}
        aria-label="Alışveriş sepeti"
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer__head">
          <h2>Sepetim {totalCount > 0 && <span>({totalCount})</span>}</h2>
          <button onClick={closeCart} aria-label="Sepeti kapat">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <span className="cart-drawer__empty-icon"><Icon name="cart" size={30} /></span>
            <p>Sepetin henüz boş.</p>
            <Link to="/magaza" onClick={closeCart} className="cart-drawer__shop">
              Alışverişe başla
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-drawer__ship">
              {remaining > 0 ? (
                <p>
                  Ücretsiz kargoya <strong>{formatPrice(remaining)}</strong> kaldı!
                </p>
              ) : (
                <p className="cart-drawer__ship--free">Tebrikler, kargo bedava!</p>
              )}
              <div className="cart-drawer__bar">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="cart-drawer__items">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-line">
                  <div className="cart-line__media">
                    <ProductImage
                      emoji={product.image}
                      photo={product.photo}
                      category={product.category}
                      alt={product.name}
                      size="sm"
                    />
                  </div>
                  <div className="cart-line__info">
                    <span className="cart-line__brand">{product.brand}</span>
                    <Link
                      to={`/urun/${product.id}`}
                      className="cart-line__name"
                      onClick={closeCart}
                    >
                      {product.name}
                    </Link>
                    <div className="cart-line__row">
                      <div className="qty">
                        <button
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          aria-label="Adet azalt"
                        >−</button>
                        <span>{quantity}</span>
                        <button
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          aria-label="Adet artır"
                        >+</button>
                      </div>
                      <span className="cart-line__price">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="cart-line__remove"
                    onClick={() => removeItem(product.id)}
                    aria-label={`${product.name} ürününü kaldır`}
                  ><Icon name="trash" size={16} /></button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__foot">
              <div className="cart-drawer__total">
                <span>Ara Toplam</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <Link
                to="/sepet"
                className="cart-drawer__checkout"
                onClick={closeCart}
              >
                Sepeti Görüntüle →
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
