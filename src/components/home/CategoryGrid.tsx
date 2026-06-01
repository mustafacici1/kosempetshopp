import { categories } from "../../data/categories";
import { CategoryCard } from "../ui/CategoryCard";
import { useReveal } from "../../hooks/useReveal";
import "./home.css";

export function CategoryGrid() {
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section container" ref={ref}>
      <div className="section-head section-head--center reveal">
        <span className="eyebrow">Kategoriler</span>
        <h2 className="section-title">Kime alışveriş yapıyorsun?</h2>
        <p className="section-lead">
          Dostunun türüne göre ihtiyacın olan her şeyi tek tıkla bul.
        </p>
      </div>
      <div className="category-grid">
        {categories.map((c, i) => (
          <div className={`reveal reveal--delay-${(i % 3) + 1}`} key={c.id}>
            <CategoryCard category={c} />
          </div>
        ))}
      </div>
    </section>
  );
}
