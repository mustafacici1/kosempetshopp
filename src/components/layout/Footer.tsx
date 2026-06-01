import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { Icon } from "../ui/Icon";
import { PawMark } from "../ui/PawMark";
import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="logo footer__logo">
            <span className="logo__mark">
              <PawMark size={22} />
            </span>
            <span className="logo__text">
              Pati<span>Tek</span>
            </span>
          </Link>
          <p>
            Patili dostlarınız için mama, oyuncak, bakım ürünleri ve daha
            fazlası. Sevgiyle seçilmiş ürünler, uzman ve güler yüzlü hizmet.
          </p>
          <a
            className="footer__social"
            href="https://www.instagram.com/pati_tekpetshop/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Icon name="instagram" size={18} /> Instagram
          </a>
        </div>

        <div className="footer__col">
          <h4>Kategoriler</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/magaza?kategori=${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Kurumsal</h4>
          <ul>
            <li><Link to="/hakkimizda">Hakkımızda</Link></li>
            <li><Link to="/hizmetler">Hizmetler</Link></li>
            <li><Link to="/iletisim">İletişim</Link></li>
            <li><Link to="/magaza">Tüm Ürünler</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>İletişim</h4>
          <ul className="footer__contact">
            <li>
              <Icon name="location" size={18} />
              <span>Çamlıca Mah. Doğanşehir Sok. No:17/A, Eskişehir 26180</span>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href="tel:+905465826987">0546 582 69 87</a>
            </li>
            <li>
              <Icon name="clock" size={18} />
              <span>Her gün 09:00 – 21:00</span>
            </li>
            <li>
              <Icon name="card" size={18} />
              <span>Kapıda nakit ve kredi kartı</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} Pati Tek Petshop · Demo sürüm</span>
        <span className="footer__pay">
          <Icon name="cash" size={16} /> Kapıda Ödeme · Nakit & Kredi Kartı
        </span>
      </div>
    </footer>
  );
}
