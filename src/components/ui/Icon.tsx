interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export type IconName =
  | "paw"
  | "truck"
  | "shield"
  | "return"
  | "scissors"
  | "home"
  | "stethoscope"
  | "graduation"
  | "gift"
  | "heart"
  | "leaf"
  | "phone"
  | "location"
  | "mail"
  | "clock"
  | "instagram"
  | "card"
  | "cash"
  | "search"
  | "cart"
  | "arrow"
  | "star"
  | "edit"
  | "trash";

// İnce çizgi (stroke) tabanlı ikonlar. 24x24 viewBox.
const paths: Record<IconName, React.ReactNode> = {
  paw: (
    <>
      <circle cx="6.5" cy="11" r="1.8" />
      <circle cx="10" cy="7.5" r="1.8" />
      <circle cx="14" cy="7.5" r="1.8" />
      <circle cx="17.5" cy="11" r="1.8" />
      <path d="M8.5 15.5c0-2 1.6-3.2 3.5-3.2s3.5 1.2 3.5 3.2c0 1.8-1.4 2.8-3.5 2.8s-3.5-1-3.5-2.8Z" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  shield: <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />,
  return: (
    <>
      <path d="M4 9h11a4 4 0 0 1 0 8H9" />
      <path d="m7 6-3 3 3 3" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <path d="M8 7.5 20 18M8 16.5 20 6" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7M6 10v9h12v-9" />,
  stethoscope: (
    <>
      <path d="M5 3v5a4 4 0 0 0 8 0V3" />
      <path d="M9 16a5 5 0 0 0 10 0v-2" />
      <circle cx="19" cy="11" r="2" />
    </>
  ),
  graduation: (
    <>
      <path d="m2 8 10-4 10 4-10 4z" />
      <path d="M6 10v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </>
  ),
  gift: (
    <>
      <path d="M4 11h16v9H4zM4 7h16v4H4zM12 7v13" />
      <path d="M12 7S10.5 3 8.5 4 9 7 12 7Zm0 0s1.5-4 3.5-3-.5 3-3.5 3Z" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.3-9.2-8.4C1.3 8.8 2.8 5.5 6 5.5c2 0 3.2 1.4 4 2.6.8-1.2 2-2.6 4-2.6 3.2 0 4.7 3.3 3.2 6.1C19 15.7 12 20 12 20Z" />
  ),
  leaf: (
    <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1Zm2-1c3-5 6-8 10-9" />
  ),
  phone: (
    <path d="M6 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V18a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2Z" />
  ),
  location: (
    <>
      <path d="M12 21c4-4.5 7-7.8 7-11a7 7 0 0 0-14 0c0 3.2 3 6.5 7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  cash: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M6 9.5v.01M18 14.5v.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  cart: (
    <>
      <path d="M4 5h2l2 11h9l2-8H7" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  star: (
    <path d="m12 4 2.4 5 5.6.7-4 3.8 1 5.5L12 16.5 7 19l1-5.5-4-3.8 5.6-.7z" />
  ),
  edit: (
    <>
      <path d="M4 20h4L18 10l-4-4L4 16z" />
      <path d="m14 6 4 4" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
};

export function Icon({ name, size = 22, className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
