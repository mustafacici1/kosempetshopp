import { Link } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import "./cart-page.css";

export function NotFoundPage() {
  return (
    <div className="container cart-empty" style={{ marginInline: "auto" }}>
      <span className="cart-empty__icon">
        <Icon name="paw" size={34} />
      </span>
      <h1>Sayfa bulunamadı</h1>
      <p>Aradığın sayfa taşınmış veya hiç var olmamış olabilir.</p>
      <Link to="/" className="cart-empty__link">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
