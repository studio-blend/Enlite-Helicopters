import { cn } from "@/lib/utils";

type BadgeVariant = "red" | "orange" | "navy" | "gray" | "green";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  red: "bg-brand-red/10 text-brand-red border-brand-red/20",
  orange: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
  navy: "bg-brand-navy/10 text-brand-navy border-brand-navy/20 dark:text-blue-300",
  gray: "bg-bg-tertiary text-text-secondary border-border-default",
  green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

export function Badge({ variant = "red", size = "sm", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border rounded-full",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface TagProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Tag({ active = false, onClick, children, className }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
        active
          ? "bg-brand-red text-white shadow-md"
          : "bg-bg-tertiary text-text-secondary hover:bg-bg-card-hover hover:text-text-primary border border-border-default",
        className
      )}
    >
      {children}
    </button>
  );
}
