import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./button.css";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

type LinkProps = BaseProps & { to: string; href?: string };

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  to,
  children,
}: LinkProps) {
  const isExternal = to.startsWith("http");
  const cls = `btn btn--${variant} btn--${size} ${className}`;
  if (isExternal) {
    return (
      <a className={cls} href={to} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} to={to}>
      {children}
    </Link>
  );
}
