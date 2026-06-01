import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { ProductCard } from "../ui/ProductCard";
import { Icon } from "../ui/Icon";
import { useReveal } from "../../hooks/useReveal";
import "./home.css";

export function FeaturedProducts() {
  const { products } = useProducts();
  const ref = useReveal<HTMLDivElement>();
  const featured = products
    .filter((p) => p.badge === "Çok Satan" || p.badge === "İndirim")
    .slice(0, 8);
  const list = featured.length >= 4 ? featured : products.slice(0, 8);

  return (
    <section className="section section--alt">
      <div className="container" ref={ref}>
        <div className="section-head featured__head reveal">
          <div>
            <span className="eyebrow">Vitrin</span>
            <h2 className="section-title">Öne çıkan ürünler</h2>
          </div>
          <Link to="/magaza" className="featured__all">
            Tümünü gör <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {list.map((p, i) => (
            <div className={`reveal reveal--delay-${(i % 3) + 1}`} key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
