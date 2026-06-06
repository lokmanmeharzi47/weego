import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind de façon sûre (résout les conflits).
 * Convention shadcn/ui.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formate un montant en Dinar algérien (DZD). */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Formate un nombre avec séparateurs de milliers (style FR). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR").format(value);
}

/** Formate une date ISO en format lisible court (ex: 5 juin 2026). */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/** Génère les initiales d'un nom complet (ex: "Amine Belkacem" -> "AB"). */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
