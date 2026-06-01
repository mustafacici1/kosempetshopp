import { services } from "../../data/services";
import { Icon } from "../ui/Icon";
import { useReveal } from "../../hooks/useReveal";
import "./home.css";

export function ServicesSection({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section container" ref={ref}>
      <div className="section-head section-head--center reveal">
        <span className="eyebrow">Hizmetler</span>
        <h2 className="section-title">Sadece bir mağaza değil, bir aile</h2>
        <p className="section-lead">
          Patili dostlarının mutluluğu için ürünlerin ötesinde hizmetler sunuyoruz.
        </p>
      </div>
      <div className="services-grid">
        {list.map((s, i) => (
          <article
            className={`service-card reveal reveal--delay-${(i % 3) + 1}`}
            key={s.title}
          >
            <span className="service-card__icon">
              <Icon name={s.icon} size={24} />
            </span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
