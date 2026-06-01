import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ui/ProductCard";
import { Icon } from "../components/ui/Icon";
import type { CategoryId } from "../types";
import "./shop.css";

type SortKey = "populer" | "artan" | "azalan" | "puan";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "populer", label: "Önerilen" },
  { value: "artan", label: "Fiyat: Artan" },
  { value: "azalan", label: "Fiyat: Azalan" },
  { value: "puan", label: "En Yüksek Puan" },
];

export function ShopPage() {
  const { products } = useProducts();
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("kategori") as CategoryId | null;
  const query = params.get("q") ?? "";
  const [sort, setSort] = useState<SortKey>("populer");

  const setCategory = (id: CategoryId | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set("kategori", id);
    else next.delete("kategori");
    setParams(next, { replace: true });
  };

  const setQuery = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    switch (sort) {
      case "artan":
        list.sort((a, b) => a.price - b.price);
        break;
      case "azalan":
        list.sort((a, b) => b.price - a.price);
        break;
      case "puan":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [products, activeCategory, query, sort]);

  const activeName = categories.find((c) => c.id === activeCategory)?.name;

  return (
    <div className="shop">
      <header className="shop__hero">
        <div className="container">
          <span className="eyebrow">Mağaza</span>
          <h1>{activeName ? `${activeName} Ürünleri` : "Tüm Ürünler"}</h1>
          <p>{filtered.length} ürün listeleniyor</p>
        </div>
      </header>

      <div className="container shop__layout">
        <aside className="shop__filters" aria-label="Filtreler">
          <div className="filter-block">
            <h3>Ara</h3>
            <input
              type="search"
              className="filter-search"
              placeholder="Ürün veya marka…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-block">
            <h3>Kategoriler</h3>
            <ul className="filter-cats">
              <li>
                <button
                  className={!activeCategory ? "is-active" : ""}
                  onClick={() => setCategory(null)}
                >
                  Tümü
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    className={activeCategory === c.id ? "is-active" : ""}
                    onClick={() => setCategory(c.id)}
                  >
                    <span>{c.emoji}</span> {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="shop__results">
          <div className="shop__toolbar">
            <div className="shop__chips">
              {activeCategory && (
                <button className="chip" onClick={() => setCategory(null)}>
                  {activeName} ✕
                </button>
              )}
              {query && (
                <button className="chip" onClick={() => setQuery("")}>
                  “{query}” ✕
                </button>
              )}
            </div>
            <label className="shop__sort">
              Sırala:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="shop__empty">
              <span className="shop__empty-icon"><Icon name="search" size={30} /></span>
              <p>Aradığın kriterlere uygun ürün bulunamadı.</p>
              <button
                onClick={() => {
                  setCategory(null);
                  setQuery("");
                }}
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
