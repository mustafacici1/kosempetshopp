import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import { categories } from "../../data/categories";
import type { CategoryId, Product } from "../../types";
import { ProductImage } from "../ui/ProductImage";
import "../../pages/admin.css";

interface Props {
  product: Product | null;
  onDone: () => void;
}

const emojiOptions = [
  "🦴", "🐕", "🍖", "🧸", "🐟", "🥫", "🪨", "🎾",
  "🌾", "🏠", "🥜", "🛖", "🐠", "💧", "🦮", "🥣", "🧳", "🦜",
];

const badges = ["Yok", "Yeni", "İndirim", "Çok Satan"] as const;

function emptyDraft(): Product {
  return {
    id: `urun-${Date.now()}`,
    name: "",
    brand: "Köşem Petshop",
    category: "kopek",
    price: 0,
    rating: 4.5,
    reviewCount: 0,
    image: "🦴",
    shortDescription: "",
    description: "",
    stock: 0,
    tags: [],
  };
}

export function ProductForm({ product, onDone }: Props) {
  const { addProduct, updateProduct } = useProducts();
  const isEdit = Boolean(product);
  const [draft, setDraft] = useState<Product>(product ?? emptyDraft());
  const [tagsText, setTagsText] = useState(draft.tags.join(", "));
  const [error, setError] = useState("");

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) {
      setError("Ürün adı zorunludur.");
      return;
    }
    if (draft.price <= 0) {
      setError("Fiyat 0'dan büyük olmalıdır.");
      return;
    }
    const finalDraft: Product = {
      ...draft,
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      oldPrice: draft.oldPrice && draft.oldPrice > 0 ? draft.oldPrice : undefined,
    };
    if (isEdit) updateProduct(finalDraft.id, finalDraft);
    else addProduct(finalDraft);
    onDone();
  };

  return (
    <div className="admin">
      <div className="container admin-form__container">
        <button className="admin-form__back" onClick={onDone}>
          ← Listeye dön
        </button>
        <header className="admin__head">
          <div>
            <span className="eyebrow">{isEdit ? "Düzenle" : "Yeni Ürün"}</span>
            <h1>{isEdit ? draft.name || "Ürün düzenle" : "Ürün ekle"}</h1>
          </div>
        </header>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__main">
            <label className="field">
              <span>Ürün Adı *</span>
              <input
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Örn. Yetişkin Kedi Maması 2 kg"
              />
            </label>

            <div className="field-row">
              <label className="field">
                <span>Marka</span>
                <input
                  value={draft.brand}
                  onChange={(e) => set("brand", e.target.value)}
                />
              </label>
              <label className="field">
                <span>Kategori</span>
                <select
                  value={draft.category}
                  onChange={(e) =>
                    set("category", e.target.value as CategoryId)
                  }
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span>Fiyat (₺) *</span>
                <input
                  type="number"
                  min={0}
                  value={draft.price || ""}
                  onChange={(e) => set("price", Number(e.target.value))}
                />
              </label>
              <label className="field">
                <span>Eski Fiyat (₺)</span>
                <input
                  type="number"
                  min={0}
                  value={draft.oldPrice ?? ""}
                  onChange={(e) =>
                    set("oldPrice", e.target.value ? Number(e.target.value) : undefined)
                  }
                  placeholder="opsiyonel"
                />
              </label>
              <label className="field">
                <span>Stok</span>
                <input
                  type="number"
                  min={0}
                  value={draft.stock}
                  onChange={(e) => set("stock", Number(e.target.value))}
                />
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span>Puan (0-5)</span>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={draft.rating}
                  onChange={(e) => set("rating", Number(e.target.value))}
                />
              </label>
              <label className="field">
                <span>Yorum Sayısı</span>
                <input
                  type="number"
                  min={0}
                  value={draft.reviewCount}
                  onChange={(e) => set("reviewCount", Number(e.target.value))}
                />
              </label>
              <label className="field">
                <span>Rozet</span>
                <select
                  value={draft.badge ?? "Yok"}
                  onChange={(e) =>
                    set(
                      "badge",
                      e.target.value === "Yok"
                        ? undefined
                        : (e.target.value as Product["badge"]),
                    )
                  }
                >
                  {badges.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span>Kısa Açıklama</span>
              <input
                value={draft.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)}
                placeholder="Tek cümlelik özet"
              />
            </label>

            <label className="field">
              <span>Detaylı Açıklama</span>
              <textarea
                rows={4}
                value={draft.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </label>

            <label className="field">
              <span>Etiketler (virgülle ayır)</span>
              <input
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="kuru mama, kedi, somon"
              />
            </label>

            <label className="field">
              <span>Görsel URL (opsiyonel)</span>
              <input
                value={draft.photo ?? ""}
                onChange={(e) =>
                  set("photo", e.target.value ? e.target.value : undefined)
                }
                placeholder="https://… (boş bırakılırsa emoji kullanılır)"
              />
            </label>
          </div>

          <aside className="admin-form__side">
            <div className="admin-form__preview">
              <span className="field-label">Önizleme</span>
              <ProductImage
                emoji={draft.image}
                photo={draft.photo}
                category={draft.category}
                alt={draft.name}
              />
            </div>
            <span className="field-label">Yedek simge (görsel yüklenmezse)</span>
            <div className="emoji-picker">
              {emojiOptions.map((em) => (
                <button
                  type="button"
                  key={em}
                  className={draft.image === em ? "is-active" : ""}
                  onClick={() => set("image", em)}
                >
                  {em}
                </button>
              ))}
            </div>

            {error && <p className="admin-form__error">{error}</p>}

            <div className="admin-form__actions">
              <button type="submit" className="admin-form__save">
                {isEdit ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}
              </button>
              <button
                type="button"
                className="admin-form__cancel"
                onClick={onDone}
              >
                Vazgeç
              </button>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
