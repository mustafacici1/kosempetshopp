import { useMemo, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { useOrders } from "../context/OrdersContext";
import { categories } from "../data/categories";
import { formatPrice } from "../lib/format";
import type { Product, CategoryId } from "../types";
import { ProductForm } from "../components/admin/ProductForm";
import { Icon } from "../components/ui/Icon";
import "./admin.css";

type View = "list" | "form";

export function AdminPage() {
  const { products, deleteProduct, resetProducts } = useProducts();
  const { orders, clearOrders } = useOrders();
  const [view, setView] = useState<View>("list");
  const [adminTab, setAdminTab] = useState<"products" | "orders">("products");
  const [editing, setEditing] = useState<Product | null>(null);
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = filter === "all" || p.category === filter;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, filter, search]);

  const stats = useMemo(() => {
    const totalStock = products.reduce((s, p) => s + p.stock, 0);
    const lowStock = products.filter((p) => p.stock > 0 && p.stock < 15).length;
    const outOfStock = products.filter((p) => p.stock <= 0).length;
    const inventoryValue = products.reduce(
      (s, p) => s + p.price * p.stock,
      0,
    );
    return { count: products.length, totalStock, lowStock, outOfStock, inventoryValue };
  }, [products]);

  const startCreate = () => {
    setEditing(null);
    setView("form");
  };
  const startEdit = (product: Product) => {
    setEditing(product);
    setView("form");
  };
  const handleDelete = (product: Product) => {
    if (window.confirm(`"${product.name}" silinsin mi?`)) {
      deleteProduct(product.id);
    }
  };
  const handleReset = () => {
    if (
      window.confirm(
        "Tüm ürünler başlangıç verisine sıfırlansın mı? Eklediğin/değiştirdiğin ürünler kaybolur.",
      )
    ) {
      resetProducts();
    }
  };

  if (view === "form") {
    return (
      <ProductForm
        product={editing}
        onDone={() => {
          setView("list");
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div className="admin">
      <div className="container">
        <header className="admin__head">
          <div>
            <span className="eyebrow">Yönetim Paneli</span>
            <h1>
              {adminTab === "products" ? "Ürün Yönetimi" : "Siparişler"}
            </h1>
            <p className="admin__note">
              Demo paneli — değişiklikler tarayıcına (localStorage) kaydedilir.
            </p>
          </div>
          <div className="admin__head-actions">
            <div className="admin__tabs">
              <button
                className={`admin__add ${adminTab === "products" ? "" : "admin__reset"}`}
                onClick={() => setAdminTab("products")}
              >
                Ürünler
              </button>
              <button
                className={`admin__add ${adminTab === "orders" ? "" : "admin__reset"}`}
                onClick={() => setAdminTab("orders")}
              >
                Siparişler ({orders.length})
              </button>
            </div>
            {adminTab === "products" ? (
              <>
                <button className="admin__reset" onClick={handleReset}>
                  ↺ Sıfırla
                </button>
                <button className="admin__add" onClick={startCreate}>
                  + Yeni Ürün
                </button>
              </>
            ) : (
              <button className="admin__reset" onClick={() => {
                if (window.confirm("Tüm siparişleri silmek istediğine emin misin?")) {
                  clearOrders();
                }
              }}>
                Sil
              </button>
            )}
          </div>
        </header>

        {adminTab === "products" ? (
          <>
            <div className="admin__stats">
          <div className="stat-card">
            <span className="stat-card__label">Toplam Ürün</span>
            <strong>{stats.count}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Toplam Stok</span>
            <strong>{stats.totalStock}</strong>
          </div>
          <div className="stat-card stat-card--warn">
            <span className="stat-card__label">Az Stok</span>
            <strong>{stats.lowStock}</strong>
          </div>
          <div className="stat-card stat-card--danger">
            <span className="stat-card__label">Tükenen</span>
            <strong>{stats.outOfStock}</strong>
          </div>
          <div className="stat-card stat-card--accent">
            <span className="stat-card__label">Stok Değeri</span>
            <strong>{formatPrice(stats.inventoryValue)}</strong>
          </div>
        </div>

        <div className="admin__toolbar">
          <input
            type="search"
            placeholder="Ürün veya marka ara…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as CategoryId | "all")}
          >
            <option value="all">Tüm kategoriler</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Kategori</th>
                <th>Fiyat</th>
                <th>Stok</th>
                <th>Durum</th>
                <th className="admin__table-actions">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const cat = categories.find((c) => c.id === p.category);
                const status =
                  p.stock <= 0
                    ? { label: "Tükendi", cls: "danger" }
                    : p.stock < 15
                      ? { label: "Az stok", cls: "warn" }
                      : { label: "Stokta", cls: "ok" };
                return (
                  <tr key={p.id}>
                    <td data-label="Ürün">
                      <div className="admin__product">
                        <span className="admin__product-thumb">
                          {p.photo ? (
                            <img src={p.photo} alt="" loading="lazy" />
                          ) : (
                            <span aria-hidden="true">{p.image}</span>
                          )}
                        </span>
                        <div>
                          <strong>{p.name}</strong>
                          <span>{p.brand}</span>
                        </div>
                      </div>
                    </td>
                    <td data-label="Kategori">
                      <span className="admin__cat">
                        {cat?.emoji} {cat?.name}
                      </span>
                    </td>
                    <td data-label="Fiyat">
                      <div className="admin__price">
                        {formatPrice(p.price)}
                        {p.oldPrice && (
                          <span>{formatPrice(p.oldPrice)}</span>
                        )}
                      </div>
                    </td>
                    <td data-label="Stok">{p.stock}</td>
                    <td data-label="Durum">
                      <span className={`admin__status admin__status--${status.cls}`}>
                        {status.label}
                      </span>
                    </td>
                    <td data-label="İşlem">
                      <div className="admin__row-actions">
                        <button onClick={() => startEdit(p)} aria-label="Düzenle">
                          <Icon name="edit" size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          aria-label="Sil"
                          className="admin__del"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="admin__empty">Eşleşen ürün bulunamadı.</div>
          )}
        </div>
          </>
        ) : (
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Müşteri</th>
                  <th>Adres</th>
                  <th>Ürünler</th>
                  <th>Toplam</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td data-label="Tarih" style={{ whiteSpace: "nowrap" }}>
                      {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td data-label="Müşteri">
                      <div>
                        <strong>{order.customer.fullName}</strong>
                        <div style={{ color: "var(--color-text-soft)", fontSize: "0.85em" }}>
                          {order.customer.phone}
                        </div>
                      </div>
                    </td>
                    <td data-label="Adres">
                      <div style={{ maxWidth: "250px", fontSize: "0.9em", color: "var(--color-text-soft)" }}>
                        {order.customer.address}
                      </div>
                    </td>
                    <td data-label="Ürünler">
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        {order.items.map((item) => (
                          <div key={item.product.id} style={{ fontSize: "0.9em" }}>
                            <span style={{ fontWeight: 600 }}>{item.quantity}x</span> {item.product.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td data-label="Toplam">
                      <strong>{formatPrice(order.total)}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="admin__empty">Henüz sipariş bulunmuyor.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
