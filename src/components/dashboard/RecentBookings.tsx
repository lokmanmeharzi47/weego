import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, getInitials } from "@/lib/utils";
import type { BookingDb } from "@/lib/types";

/** Liste des dernières réservations (réutilise le DataTable générique). */
export function RecentBookings({ data }: { data: BookingDb[] }) {
  const columns: Column<BookingDb>[] = [
    {
      key: "activity",
      header: "Activité",
      cell: (b) => (
        <div className="max-w-[220px]">
          <p className="truncate font-medium">{b.activity_title}</p>
          <p className="text-xs text-muted-foreground">#{b.id}</p>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Montant",
      align: "right",
      cell: (b) => (
        <span className="font-semibold tabular-nums">
          {formatCurrency(b.total_price)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      align: "right",
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

  return <DataTable columns={columns} data={data} rowKey={(b) => b.id.toString()} />;
}

