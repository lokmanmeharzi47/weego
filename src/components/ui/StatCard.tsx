import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down";
  icon: LucideIcon;
}

/**
 * Carte KPI premium : libellé, valeur, variation vs période précédente et
 * icône colorée. Micro-animation au survol (élévation + glow).
 */
export function StatCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
}: StatCardProps) {
  const isUp = trend === "up";

  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow sm:p-6">
      {/* Halo décoratif violet en arrière-plan */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight sm:text-3xl">
            {value}
          </p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            isUp
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
          )}
        >
          {isUp ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {Math.abs(delta)}%
        </span>
        <span className="text-xs text-muted-foreground">vs mois dernier</span>
      </div>
    </Card>
  );
}
