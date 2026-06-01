import "./home.css";

const brands = [
  "Royal Canin",
  "Pro Plan",
  "Whiskas",
  "Pedigree",
  "Tetra",
  "Sera",
  "Vitakraft",
  "Versele-Laga",
  "Cat's Best",
];

export function BrandStrip() {
  return (
    <section className="brand-strip" aria-label="Güvendiğimiz markalar">
      <div className="container brand-strip__inner">
        <span className="brand-strip__label">Güvendiğimiz markalar</span>
        <div className="brand-strip__track-wrap">
          <div className="brand-strip__track">
            {[...brands, ...brands].map((b, i) => (
              <span className="brand-strip__item" key={i}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
