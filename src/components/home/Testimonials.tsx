import { Icon } from "../ui/Icon";
import { useReveal } from "../../hooks/useReveal";
import { photo } from "../../lib/photos";
import "./home.css";

const reviews = [
  {
    name: "Elif Y.",
    pet: "Kedi sahibi",
    avatar: photo("cat", 301, 120, 120),
    text: "Mama siparişlerim hep zamanında geliyor, kedim yeni mamasına bayıldı. Ekip gerçekten çok ilgili ve bilgili.",
  },
  {
    name: "Mert K.",
    pet: "Köpek sahibi",
    avatar: photo("dog", 302, 120, 120),
    text: "Kuaför hizmeti harika. Köpeğim tertemiz ve mutlu çıktı. Fiyatlar da gayet uygun, kesinlikle tavsiye ederim.",
  },
  {
    name: "Zeynep A.",
    pet: "Kuş sahibi",
    avatar: photo("bird", 303, 120, 120),
    text: "Kuş ürünleri konusunda gerçekten uzmanlar. Doğru vitamini önerdiler, çok memnun kaldım.",
  },
];

export function Testimonials() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section section--alt">
      <div className="container" ref={ref}>
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Yorumlar</span>
          <h2 className="section-title">Müşterilerimiz ne diyor?</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <article
              className={`review-card reveal reveal--delay-${(i % 3) + 1}`}
              key={r.name}
            >
              <div className="review-card__stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Icon key={s} name="star" size={16} />
                ))}
              </div>
              <p className="review-card__text">{r.text}</p>
              <div className="review-card__author">
                <img
                  className="review-card__avatar"
                  src={r.avatar}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.pet}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
