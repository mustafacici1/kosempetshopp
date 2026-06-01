import "./rating.css";

interface Props {
  value: number;
  count?: number;
  showValue?: boolean;
}

export function RatingStars({ value, count, showValue = true }: Props) {
  const full = Math.round(value);
  return (
    <span className="rating" aria-label={`${value} / 5 puan`}>
      <span className="rating__stars" aria-hidden="true">
        {"★★★★★".slice(0, full)}
        <span className="rating__empty">{"★★★★★".slice(full)}</span>
      </span>
      {showValue && <span className="rating__value">{value.toFixed(1)}</span>}
      {count !== undefined && (
        <span className="rating__count">({count})</span>
      )}
    </span>
  );
}
