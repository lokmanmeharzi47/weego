"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BookingTrendPoint } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

/**
 * Courbe des réservations sur les 7 derniers jours (Recharts).
 * Dégradé violet de marque + tooltip personnalisé.
 */
export function BookingsChart({ data }: { data: BookingTrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C2BFF" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#7C2BFF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="hsl(var(--border))"
        />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={40}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
        />
        <Tooltip
          cursor={{ stroke: "#7C2BFF", strokeWidth: 1, strokeDasharray: "4 4" }}
          content={<ChartTooltip />}
        />
        <Area
          type="monotone"
          dataKey="bookings"
          stroke="#7C2BFF"
          strokeWidth={2.5}
          fill="url(#bookingsFill)"
          dot={{ r: 0 }}
          activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Tooltip stylé pour la courbe. */
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ payload: BookingTrendPoint }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-soft">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold text-brand-600 dark:text-brand-300">
        {point.bookings} réservations
      </p>
      <p className="text-xs text-muted-foreground">
        {formatNumber(point.revenue)} DZD
      </p>
    </div>
  );
}
