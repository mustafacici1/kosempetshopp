import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { formatPrice } from "../lib/format";
import { ProductImage } from "../components/ui/ProductImage";
import { Icon } from "../components/ui/Icon";
import "./cart-page.css";

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 49;

export function CartPage() {
  const { items, subtotal, setQuantity, removeItem, clearCart, totalCount } =
    useCart();
  const { addOrder } = useOrders();
  const [ordered, setOrdered] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customer, setCustomer] = useState({ fullName: "", phone: "", address: "" });

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder({
      customer,
      items: [...items],
      total,
    });
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <div className="container cart-success">
        <span className="cart-success__icon">
          <Icon name="shield" size={34} />
        </span>
        <h1>Siparişin alındı!</h1>
        <p>
          Bu bir demo siparişidir; gerçek bir ödeme alınmamıştır. Ödemen,
          teslimat sırasında <strong>kapıda nakit veya kredi kartı</strong> ile
          alınacaktır.
        </p>
        <Link to="/magaza" className="cart-success__link">
          Alışverişe devam et
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <span className="cart-empty__icon">
          <Icon name="cart" size={34} />
        </span>
        <h1>Sepetin boş</h1>
        <p>Patili dostun için harika ürünler seni bekliyor.</p>
        <Link to="/magaza" className="cart-empty__link">
          Alışverişe başla
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <header className="cart-page__head">
        <h1>Sepetim</h1>
        <span>{totalCount} ürün</span>
      </header>

      <div className="cart-page__layout">
        <div className="cart-page__items">
          {items.map(({ product, quantity }) => (
            <article className="cart-row" key={product.id}>
              <Link to={`/urun/${product.id}`} className="cart-row__media">
                <ProductImage
                  emoji={product.image}
                  photo={product.photo}
                  category={product.category}
                  alt={product.name}
                  size="sm"
                />
              </Link>
              <div className="cart-row__info">
                <span className="cart-row__brand">{product.brand}</span>
                <Link to={`/urun/${product.id}`} className="cart-row__name">
                  {product.name}
                </Link>
                <span className="cart-row__unit">
                  {formatPrice(product.price)} / adet
                </span>
              </div>
              <div className="qty">
                <button
                  onClick={() => setQuantity(product.id, quantity - 1)}
                  aria-label="Azalt"
                >−</button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(product.id, quantity + 1)}
                  aria-label="Artır"
                >+</button>
              </div>
              <strong className="cart-row__total">
                {formatPrice(product.price * quantity)}
              </strong>
              <button
                className="cart-row__remove"
                onClick={() => removeItem(product.id)}
                aria-label="Kaldır"
              ><Icon name="trash" size={18} /></button>
            </article>
          ))}

          <button className="cart-page__clear" onClick={clearCart}>
            Sepeti temizle
          </button>
        </div>

        <aside className="cart-summary">
          <h2>Sipariş Özeti</h2>
          <div className="cart-summary__row">
            <span>Ara Toplam</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="cart-summary__row">
            <span>Kargo</span>
            <span>{shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p className="cart-summary__hint">
              {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} daha ekle, kargo
              bedava olsun!
            </p>
          )}
          <div className="cart-summary__row cart-summary__row--total">
            <span>Toplam</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <div className="cart-summary__pay">
            <Icon name="cash" size={18} />
            <span>Kapıda nakit veya kredi kartı ile ödeme</span>
          </div>
          {isCheckingOut ? (
            <form className="cart-checkout-form" onSubmit={handleCheckout}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Teslimat Bilgileri</h3>
              <label>İsim Soyisim</label>
              <input
                required
                type="text"
                value={customer.fullName}
                onChange={(e) => setCustomer((c) => ({ ...c, fullName: e.target.value }))}
              />
              <label>Telefon Numarası</label>
              <input
                required
                type="tel"
                value={customer.phone}
                onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
              />
              <label>Açık Adres</label>
              <textarea
                required
                rows={3}
                value={customer.address}
                onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
              ></textarea>
              <button type="submit" className="cart-summary__checkout" style={{ marginTop: "1rem" }}>
                Siparişi Onayla
              </button>
              <button
                type="button"
                className="cart-page__clear"
                onClick={() => setIsCheckingOut(false)}
                style={{ marginTop: "0.5rem" }}
              >
                İptal
              </button>
            </form>
          ) : (
            <>
              <button
                className="cart-summary__checkout"
                onClick={() => setIsCheckingOut(true)}
              >
                Siparişi Tamamla
              </button>
              <p className="cart-summary__note">
                * Bu bir demo'dur, online ödeme alınmaz.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
