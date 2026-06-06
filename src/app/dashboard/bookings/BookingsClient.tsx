"use client";

import * as React from "react";
import { Download, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { BookingDb } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

/** Gestion des réservations (historique, filtres) connectée à Supabase. */
export function BookingsClient() {
  const [list, setList] = React.useState<BookingDb[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  const supabase = createClient();

  React.useEffect(() => {
    async function fetchBookings() {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("timestamp", { ascending: false });

      if (data && !error) {
        setList(data);
      }
      setLoading(false);
    }
    fetchBookings();
  }, [supabase]);

  // Filtrage local simple
  const filtered = list.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return b.activity_title.toLowerCase().includes(q) || b.id.toString().includes(q);
  });

  const columns: Column<BookingDb>[] = [
    {
      key: "id",
      header: "ID Réf.",
      cell: (b) => <span className="font-mono text-xs text-muted-foreground">#{b.id}</span>,
    },
    {
      key: "activity",
      header: "Activité",
      cell: (b) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b.activity_image_url}
            alt=""
            className="h-8 w-8 shrink-0 rounded object-cover"
          />
          <div className="min-w-0">
            <p className="truncate font-medium">{b.activity_title}</p>
            <p className="text-xs text-muted-foreground">{b.activity_location}</p>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date de réservation",
      hideOnMobile: true,
      cell: (b) => <span className="text-sm">{formatDate(b.date)}</span>,
    },
    {
      key: "seats",
      header: "Places",
      align: "center",
      cell: (b) => <span className="font-medium">{b.spots_reserved}</span>,
    },
    {
      key: "total",
      header: "Total",
      align: "right",
      cell: (b) => (
        <span className="font-semibold tabular-nums">{formatCurrency(b.total_price)}</span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      align: "right",
      hideOnMobile: true,
      cell: (b) => {
        switch (b.status) {
          case "confirmed":
            return <Badge variant="success">Confirmée</Badge>;
          case "pending":
            return <Badge variant="warning">En attente</Badge>;
          case "cancelled":
            return <Badge variant="danger">Annulée</Badge>;
          default:
            return <Badge variant="neutral">{b.status}</Badge>;
        }
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Réservations"
        subtitle="Historique de toutes les réservations passées sur Weego."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <Download className="h-4 w-4" />
            Exporter CSV
          </button>
        }
      />

      <Card className="overflow-hidden">
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une réservation, activité..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-4 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <DataTable 
          columns={columns} 
          data={filtered} 
          rowKey={(b) => b.id.toString()}
          emptyMessage={loading ? "Chargement..." : "Aucune réservation trouvée."}
        />
      </Card>
    </div>
  );
}
