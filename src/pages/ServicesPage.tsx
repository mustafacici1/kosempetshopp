import { services } from "../data/services";
import { ButtonLink } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useReveal } from "../hooks/useReveal";
import kediImg from "../assets/kedi_hakkımızda.jpg";
import kopekImg from "../assets/kopek_hakkımızda.jpg";
import "./content-page.css";

const steps = [
  { n: "01", title: "Randevu al", text: "Telefon veya Instagram üzerinden uygun saati seç." },
  { n: "02", title: "Getir & bırak", text: "Patili dostunu mağazamıza getir, gerisini bize bırak." },
  { n: "03", title: "Mutlu ayrılış", text: "Bakımı tamamlanmış, mutlu dostunu teslim al." },
];

export function ServicesPage() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="content-page" ref={ref}>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Hizmetler</span>
          <h1>Patili dostuna özel hizmetler</h1>
          <p>
            Bakımından eğitimine, pansiyonundan teslimatına kadar her ihtiyaç
            için yanındayız.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="services-grid">
          {services.map((s, i) => (
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
        
        <div className="services-showcase reveal">
          <div className="services-showcase__content">
            <h2>Kedilere Özel Rahatlık Alanı</h2>
            <p>
              Kedilerin ne kadar hassas ve stres olmaya yatkın olduklarını biliyoruz. Bu yüzden mağazamızda onlar için tamamen ayrı, 
              sessiz ve güvenli bir bölüm hazırladık. Kedi kumu, tırmalama tahtaları ve özel yaş mamalarımızla 
              minik dostunuz kendini evinde gibi hissedecek. 
            </p>
            <p>
              Siz alışveriş yaparken onlar da özel oyun alanlarında keyifli vakit geçirebilir.
            </p>
          </div>
          <div className="services-showcase__visual">
            <img src={kediImg} alt="Kedi özel alanı" />
          </div>
        </div>

        <div className="services-showcase services-showcase--reverse reveal">
          <div className="services-showcase__content">
            <h2>Köpeklerin Sosyal Dünyası</h2>
            <p>
              Köpekler sosyalleşmeyi ve hareket etmeyi çok severler! Eğitmenlerimiz eşliğinde gün boyu enerjilerini atabilecekleri 
              özel oyun parkurumuzda, dostunuz hem yeni arkadaşlıklar kuracak hem de çeşitli oyunlarla zihinsel gelişimini destekleyecek.
            </p>
            <p>
              Günün sonunda onlara özel hazırlanan ödül mamalarıyla en mutlu şekilde evinize döneceklerinden emin olabilirsiniz.
            </p>
          </div>
          <div className="services-showcase__visual">
            <img src={kopekImg} alt="Köpek sosyalleşme ve bakım" />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Nasıl işliyor?</span>
            <h2 className="section-title">3 basit adımda</h2>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <article
                className={`step-card reveal reveal--delay-${(i % 3) + 1}`}
                key={s.n}
              >
                <span className="step-card__num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
          <div className="services-cta reveal">
            <ButtonLink to="/iletisim" size="lg">
              Randevu için iletişime geç
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
