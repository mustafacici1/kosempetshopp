import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { getCategory } from "../data/categories";
import { formatPrice, discountPercent } from "../lib/format";
import { ProductImage } from "../components/ui/ProductImage";
import { RatingStars } from "../components/ui/RatingStars";
import { ProductCard } from "../components/ui/ProductCard";
import { Icon } from "../components/ui/Icon";
import "./product-detail.css";

export function ProductDetailPage() {
  const { id } = useParams();
  const { products, getById } = useProducts();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const product = id ? getById(id) : undefined;

  if (!product) {
    return (
      <div className="container detail-missing">
        <h1>Ürün bulunamadı</h1>
        <p>Aradığın ürün kaldırılmış olabilir.</p>
        <Link to="/magaza" className="detail-missing__link">
          Mağazaya dön →
        </Link>
      </div>
    );
  }

  const category = getCategory(product.category);
  const discount = discountPercent(product.price, product.oldPrice);
  const soldOut = product.stock <= 0;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="detail">
      <div className="container">
        <nav className="breadcrumb" aria-label="Sayfa yolu">
          <Link to="/">Ana Sayfa</Link>
          <span>/</span>
          <Link to={`/magaza?kategori=${product.category}`}>
            {category?.name}
          </Link>
          <span>/</span>
          <span className="breadcrumb__current">{product.name}</span>
        </nav>

        <div className="detail__grid">
          <div className="detail__media">
            <ProductImage
              emoji={product.image}
              photo={product.photo}
              category={product.category}
              alt={product.name}
              size="lg"
              eager
            />
          </div>

          <div className="detail__info">
            <span className="detail__brand">{product.brand}</span>
            <h1 className="detail__title">{product.name}</h1>
            <RatingStars value={product.rating} count={product.reviewCount} />
            <p className="detail__short">{product.shortDescription}</p>

            <div className="detail__price">
              <span className="detail__current">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="detail__old">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="detail__save">%{discount} indirim</span>
                </>
              )}
            </div>

            <p className={`detail__stock ${soldOut ? "is-out" : ""}`}>
              {soldOut
                ? "● Stokta yok"
                : product.stock < 15
                  ? `● Son ${product.stock} ürün!`
                  : "● Stokta var"}
            </p>

            <div className="detail__buy">
              <div className="qty qty--lg">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Adet azalt"
                >−</button>
                <span>{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Adet artır"
                >+</button>
              </div>
              <button
                className="detail__add"
                disabled={soldOut}
                onClick={() => addItem(product, qty)}
              >
                {soldOut ? "Tükendi" : "Sepete Ekle"}
              </button>
            </div>

            <div className="detail__desc">
              <h3>Ürün Açıklaması</h3>
              <p>{product.description}</p>
              <div className="detail__tags">
                {product.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
            </div>

            <ul className="detail__perks">
              <li><Icon name="truck" size={18} /> 500₺ üzeri ücretsiz kargo</li>
              <li><Icon name="return" size={18} /> 14 gün içinde kolay iade</li>
              <li><Icon name="cash" size={18} /> Kapıda nakit ve kredi kartı</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="detail__related">
            <h2 className="section-title">Benzer ürünler</h2>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
