import { ButtonLink } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import type { IconName } from "../components/ui/Icon";
import { useReveal } from "../hooks/useReveal";
import "./content-page.css";

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "Sevgi", text: "Her patili dostu kendi ailemizden biri gibi görürüz." },
  { icon: "shield", title: "Güven", text: "Yalnızca veteriner onaylı, kaliteli ürünleri raflarımıza alırız." },
  { icon: "leaf", title: "Sorumluluk", text: "Sokak hayvanları için düzenli mama ve bakım desteği sağlarız." },
];

const stats = [
  { value: "1.200+", label: "Mutlu müşteri" },
  { value: "500+", label: "Ürün çeşidi" },
  { value: "6", label: "Farklı hizmet" },
];

export function AboutPage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="content-page" ref={ref}>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Hakkımızda</span>
          <h1>Patili dostlara duyulan sevgiyle başladı</h1>
          <p>
            Köşem Petshop, hayvan sevgisini bir işe dönüştürmek isteyen bir
            ailenin hayaliyle Bursa/İnegöl'de kuruldu.
          </p>
        </div>
      </section>

      <section className="section container about-story">
        <div className="about-story__text reveal">
          <h2 className="section-title">Hikayemiz</h2>
          <p>
            Bursa/İnegöl'de küçük bir dükkanda yola çıktık. Amacımız
            netti: evcil dostlarına en iyisini sunmak isteyen sahiplere
            güvenilir, samimi ve uzman bir adres olmak.
          </p>
          <p>
            Bugün geniş ürün yelpazemiz, kuaför ve pansiyon hizmetlerimizle
            yüzlerce patili dosta ve sahibine hizmet veriyoruz. Her gün aynı
            heyecanla, aynı sevgiyle kapımızı açıyoruz.
          </p>
          <div className="about-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <ButtonLink to="/iletisim" variant="outline">
            Bize Ulaş
          </ButtonLink>
        </div>
        <div className="about-story__visual reveal reveal--delay-1">
          <img
            src={new URL("../assets/kosem.webp", import.meta.url).href}
            alt="Köşem Petshop"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Değerlerimiz</span>
            <h2 className="section-title">Bizi biz yapan ilkeler</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <article
                className={`value-card reveal reveal--delay-${(i % 3) + 1}`}
                key={v.title}
              >
                <span className="value-card__icon">
                  <Icon name={v.icon} size={24} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
