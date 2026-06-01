interface Props {
  size?: number;
  className?: string;
}

/**
 * Pati Tek marka simgesi — favicon ile birebir aynı patili logo.
 * `currentColor` ile boyanır, böylece her zeminde kullanılabilir.
 */
export function PawMark({ size = 24, className = "" }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="41" rx="12" ry="9" />
      <ellipse cx="17" cy="29" rx="5" ry="6.5" />
      <ellipse cx="47" cy="29" rx="5" ry="6.5" />
      <ellipse cx="25" cy="19" rx="4.5" ry="6" />
      <ellipse cx="39" cy="19" rx="4.5" ry="6" />
    </svg>
  );
}
