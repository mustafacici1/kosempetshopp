import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Icon } from "../ui/Icon";
import { PawMark } from "../ui/PawMark";
import "./header.css";

const navItems = [
  { to: "/", label: "Ana Sayfa", end: true },
  { to: "/magaza", label: "Mağaza" },
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/iletisim", label: "İletişim" },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="logo" onClick={onClick}>
      <span className="logo__mark">
        <PawMark size={22} />
      </span>
      <span className="logo__text">
        Köşem<span>Petshop</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { totalCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/magaza?q=${encodeURIComponent(query.trim())}`);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__bar container">
        <Logo onClick={() => setMenuOpen(false)} />

        <form className="search" onSubmit={submitSearch} role="search">
          <span className="search__icon" aria-hidden="true">
            <Icon name="search" size={18} />
          </span>
          <input
            type="search"
            placeholder="Mama, oyuncak, aksesuar ara…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Ürün ara"
          />
        </form>

        <nav
          className={`nav ${menuOpen ? "nav--open" : ""}`}
          aria-label="Ana menü"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/admin"
            className="nav__link nav__link--admin"
            onClick={() => setMenuOpen(false)}
          >
            Yönetim
          </NavLink>
        </nav>

        <div className="header__actions">
          <button
            className="cart-btn"
            onClick={openCart}
            aria-label={`Sepet, ${totalCount} ürün`}
          >
            <Icon name="cart" size={20} />
            {totalCount > 0 && <span className="cart-btn__count">{totalCount}</span>}
          </button>
          <button
            className={`burger ${menuOpen ? "burger--open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
