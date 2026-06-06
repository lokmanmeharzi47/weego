import * as React from "react";
import { cn } from "@/lib/utils";
import type { BookingStatus, LoyaltyTier } from "@/lib/types";

type BadgeVariant =
  | "brand"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200",
  neutral: "bg-muted text-muted-foreground",
  success:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  warning:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  danger: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  info: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

// ── Helpers métier ─────────────────────────────────────────────────

const statusConfig: Record<
  BookingStatus,
  { label: string; variant: BadgeVariant }
> = {
  pending: { label: "En attente", variant: "warning" },
  confirmed: { label: "Confirmée", variant: "info" },
  cancelled: { label: "Annulée", variant: "danger" },
  completed: { label: "Terminée", variant: "success" },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const { label, variant } = statusConfig[status];
  return <Badge variant={variant}>{label}</Badge>;
}

const tierConfig: Record<LoyaltyTier, string> = {
  "Bronze Explorer": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Silver Enthusiast": "bg-slate-200 text-slate-700 dark:bg-slate-700/40 dark:text-slate-200",
  "Gold Nomad": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Platinum Legend": "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200",
};

export function TierBadge({ tier }: { tier: LoyaltyTier }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tierConfig[tier]
      )}
    >
      ★ {tier}
    </span>
  );
}
