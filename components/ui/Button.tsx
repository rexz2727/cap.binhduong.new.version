import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "red" | "secondary" | "navy" | "ghost" | "outline";
  size?: "sm";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  size,
  children,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  // "outline" is kept as an alias for "secondary" for backward compatibility
  const variantClass = variant === "outline" ? "btn-secondary" : `btn-${variant}`;
  const cls = ["btn", variantClass, size === "sm" ? "btn-sm" : "", className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
