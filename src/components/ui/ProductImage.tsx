import { useState } from "react";
import { getCategory } from "../../data/categories";
import type { CategoryId } from "../../types";
import "./product-image.css";

interface Props {
  emoji: string;
  category: CategoryId;
  photo?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  eager?: boolean;
}

/**
 * Gerçek ürün fotoğrafını gösterir. Görsel yoksa veya yüklenemezse,
 * kategori rengine göre stilize bir fallback'e zarifçe düşer.
 */
export function ProductImage({
  emoji,
  category,
  photo,
  alt = "",
  size = "md",
  eager = false,
}: Props) {
  const color = getCategory(category)?.color ?? "#e2652c";
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    photo ? "loading" : "error",
  );

  return (
    <div
      className={`product-image product-image--${size} ${
        status === "ready" ? "is-ready" : ""
      }`}
      style={{ "--tile-color": color } as React.CSSProperties}
    >
      {photo && status !== "error" && (
        <img
          className="product-image__img"
          src={photo}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
        />
      )}
      {status !== "ready" && (
        <span className="product-image__fallback" aria-hidden="true">
          {emoji}
        </span>
      )}
    </div>
  );
}
