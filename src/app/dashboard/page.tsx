import {
  CalendarRange,
  Download,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { BookingsChart } from "@/components/dashboard/BookingsChart";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Vue d'ensemble — Weego Admin",
};

/** Associe chaque KPI dynamique à une icône. */
const kpiIcons: Record<string, LucideIcon> = {
  revenue: Wallet,
  activities: CalendarRange,
  bookings: Ticket,
  users: Users,
};

/** Page Vue d'ensemble : KPI, courbe des réservations 7 jours, dernières résa. */
export default async function OverviewPage() {
  const supabase = await createClient();

  // Fetch real data from Supabase
  const { count: activitiesCount } = await supabase
    .from("activities")
    .select("*", { count: "exact", head: true });

  const { count: bookingsCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true });

  const { count: usersCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { data: bookingsData } = await supabase
    .from("bookings")
    .select("total_price");
  
  const revenue = bookingsData?.reduce((acc, curr) => acc + (curr.total_price || 0), 0) || 0;

  const kpis = [
    {
      id: "revenue",
      label: "Chiffre d'affaires",
      value: `${revenue.toLocaleString("fr-DZ")} DZD`,
      delta: 0,
      trend: "up" as const,
    },
    {
      id: "activities",
      label: "Activités actives",
      value: `${activitiesCount || 0}`,
      delta: 0,
      trend: "up" as const,
    },
    {
      id: "bookings",
      label: "Total des réservations",
      value: `${bookingsCount || 0}`,
      delta: 0,
      trend: "up" as const,
    },
    {
      id: "users",
      label: "Utilisateurs",
      value: `${usersCount || 0}`,
      delta: 0,
      trend: "up" as const,
    },
  ];

  // Placeholder 0 trend since we don't have historical data calculation implemented yet
  const bookingTrend = [
    { day: "Lun", bookings: 0, revenue: 0 },
    { day: "Mar", bookings: 0, revenue: 0 },
    { day: "Mer", bookings: 0, revenue: 0 },
    { day: "Jeu", bookings: 0, revenue: 0 },
    { day: "Ven", bookings: 0, revenue: 0 },
    { day: "Sam", bookings: 0, revenue: 0 },
    { day: "Dim", bookings: 0, revenue: 0 },
  ];

  // Fetch latest 5 bookings
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(5);

  const recent = recentBookings || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vue d'ensemble"
        subtitle="Bonjour 👋 — voici l'activité de Weego aujourd'hui."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <Download className="h-4 w-4" />
            Exporter
          </button>
        }
      />

      {/* Cartes KPI */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            trend={kpi.trend}
            icon={kpiIcons[kpi.id] ?? TrendingUp}
          />
        ))}
      </section>

      {/* Graphique + raccourci */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Réservations — 7 derniers jours</CardTitle>
              <CardDescription>
                Évolution quotidienne du volume de réservations.
              </CardDescription>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <TrendingUp className="h-3.5 w-3.5" />
              0%
            </span>
          </CardHeader>
          <CardContent>
            <BookingsChart data={bookingTrend} />
          </CardContent>
        </Card>

        {/* Mini résumé latéral */}
        <Card>
          <CardHeader>
            <CardTitle>Cette semaine</CardTitle>
            <CardDescription>Indicateurs clés agrégés.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <WeeklyStat
              label="Réservations totales"
              value={`${bookingsCount || 0}`}
              hint="Global"
            />
            <WeeklyStat
              label="Revenu généré"
              value={`${revenue.toLocaleString("fr-DZ")} DZD`}
              hint="Global"
            />
            <WeeklyStat
              label="Taux de remplissage"
              value="0%"
              hint="moyenne des activités"
            />
            <WeeklyStat
              label="Nouveaux membres"
              value={`${usersCount || 0}`}
              hint="Global"
            />
          </CardContent>
        </Card>
      </section>

      {/* Dernières réservations */}
      <section>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Dernières réservations</CardTitle>
              <CardDescription>
                Les 5 réservations les plus récentes.
              </CardDescription>
            </div>
            <a
              href="/dashboard/bookings"
              className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300"
            >
              Tout voir →
            </a>
          </CardHeader>
          <CardContent className="px-0 sm:px-0">
            {recent.length > 0 ? (
              <RecentBookings data={recent as any} />
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Aucune réservation pour le moment.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

/** Ligne d'indicateur du résumé hebdomadaire. */
function WeeklyStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <p className="text-lg font-bold tabular-nums">{value}</p>
    </div>
  );
}
