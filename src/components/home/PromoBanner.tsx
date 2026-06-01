import { ButtonLink } from "../ui/Button";
import { useReveal } from "../../hooks/useReveal";
import { photo } from "../../lib/photos";
import "./home.css";

export function PromoBanner() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="container" ref={ref}>
      <div className="promo reveal">
        <div className="promo__content">
          <span className="eyebrow promo__eyebrow">Bu haftaya özel</span>
          <h2>İlk siparişine özel %15 indirim</h2>
          <p>
            Yeni üyelerimize özel hoş geldin fırsatı. Mama ve aksesuarlarda
            geçerli; sevdiklerin için en iyisini uygun fiyata yakala.
          </p>
          <ButtonLink to="/magaza" variant="ghost" size="lg">
            Fırsatları Keşfet
          </ButtonLink>
        </div>
        <div className="promo__visual">
          <img
            src={new URL("../../assets/kedi.jpeg", import.meta.url).href}
            alt="Kampanya"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
