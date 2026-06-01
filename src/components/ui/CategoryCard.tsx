import { useState } from "react";
import { Link } from "react-router-dom";
import type { Category } from "../../types";
import { Icon } from "./Icon";
import "./category-card.css";

export function CategoryCard({ category }: { category: Category }) {
  const [failed, setFailed] = useState(false);

  return (
    <Link
      to={`/magaza?kategori=${category.id}`}
      className="category-card"
      style={{ "--cat-color": category.color } as React.CSSProperties}
    >
      <div className="category-card__media">
        {failed ? (
          <span className="category-card__fallback" aria-hidden="true">
            {category.emoji}
          </span>
        ) : (
          <img
            src={category.photo}
            alt={category.name}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="category-card__body">
        <div>
          <h3 className="category-card__name">{category.name}</h3>
          <span className="category-card__desc">{category.description}</span>
        </div>
        <span className="category-card__arrow" aria-hidden="true">
          <Icon name="arrow" size={18} />
        </span>
      </div>
    </Link>
  );
}
