import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { formatPrice, discountPercent } from "../../lib/format";
import { ProductImage } from "./ProductImage";
import { RatingStars } from "./RatingStars";
import "./product-card.css";

const badgeClass: Record<string, string> = {
  Yeni: "badge--new",
  İndirim: "badge--sale",
  "Çok Satan": "badge--hot",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = discountPercent(product.price, product.oldPrice);
  const soldOut = product.stock <= 0;

  return (
    <article className="product-card">
      <Link to={`/urun/${product.id}`} className="product-card__media">
        {product.badge && (
          <span className={`badge ${badgeClass[product.badge] ?? ""}`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && <span className="badge badge--discount">%{discount}</span>}
        <ProductImage
          emoji={product.image}
          photo={product.photo}
          category={product.category}
          alt={product.name}
        />
      </Link>

      <div className="product-card__body">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">
          <Link to={`/urun/${product.id}`}>{product.name}</Link>
        </h3>
        <RatingStars value={product.rating} count={product.reviewCount} />

        <div className="product-card__footer">
          <div className="product-card__price">
            {product.oldPrice && (
              <span className="product-card__old">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="product-card__current">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            className="product-card__add"
            onClick={() => addItem(product)}
            disabled={soldOut}
            aria-label={`${product.name} sepete ekle`}
          >
            {soldOut ? "Tükendi" : "Sepete +"}
          </button>
        </div>
      </div>
    </article>
  );
}
