"use client";

import * as React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { ActivityForm } from "./ActivityForm";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ActivityDb, ActivityInsert } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

/** Gestion des activités : tableau interactif + création via modale connectée à Supabase. */
export function ActivitiesClient() {
  const [list, setList] = React.useState<ActivityDb[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const supabase = createClient();

  React.useEffect(() => {
    async function fetchActivities() {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("date", { ascending: false });

      if (data && !error) {
        setList(data);
      }
      setLoading(false);
    }
    fetchActivities();
  }, [supabase]);

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cette activité ?")) return;
    
    setActionLoading(true);
    const { error } = await supabase.from("activities").delete().eq("id", id);
    if (!error) {
      setList((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert("Erreur lors de la suppression.");
    }
    setActionLoading(false);
  }

  async function handleCreate(activity: ActivityInsert) {
    setActionLoading(true);
    const { data, error } = await supabase
      .from("activities")
      .insert([activity])
      .select()
      .single();

    if (data && !error) {
      setList((prev) => [data, ...prev]);
      setOpen(false);
    } else {
      console.error(error);
      alert("Erreur lors de la création.");
    }
    setActionLoading(false);
  }

  const columns: Column<ActivityDb>[] = [
    {
      key: "title",
      header: "Titre",
      cell: (a) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.image_url}
            alt=""
            className="h-10 w-10 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="truncate font-medium">{a.title}</p>
            <p className="text-xs text-muted-foreground">{a.location}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Catégorie",
      hideOnMobile: true,
      cell: (a) => <Badge variant="brand">{a.category}</Badge>,
    },
    {
      key: "date",
      header: "Date",
      hideOnMobile: true,
      cell: (a) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(a.date)}
        </span>
      ),
    },
    {
      key: "price",
      header: "Prix",
      align: "right",
      cell: (a) => (
        <span className="font-semibold tabular-nums">
          {formatCurrency(a.price)}
        </span>
      ),
    },
    {
      key: "seats",
      header: "Places",
      align: "center",
      hideOnMobile: true,
      cell: (a) => <SeatsBar booked={a.participants_count} max={a.max_spots} />,
    },
    {
      key: "organizer",
      header: "Organisateur",
      hideOnMobile: true,
      cell: (a) => <span className="text-sm">{a.organizer}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      cell: (a) => (
        <div className="flex items-center justify-end gap-1">
          <button
            aria-label="Éditer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-brand-500/10 hover:text-brand-600 disabled:opacity-50"
            disabled={actionLoading}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(a.id)}
            aria-label="Supprimer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-rose-500/10 hover:text-rose-600 disabled:opacity-50"
            disabled={actionLoading}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des activités"
        subtitle={`${list.length} activités sur la plateforme.`}
        action={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-600"
          >
            <Plus className="h-4 w-4" />
            Créer une activité
          </button>
        }
      />

      <Card className="overflow-hidden">
        <DataTable
          columns={columns}
          data={list}
          rowKey={(a) => a.id}
          emptyMessage={loading ? "Chargement..." : "Aucune activité. Créez-en une pour commencer."}
        />
      </Card>

      <Modal
        open={open}
        onClose={() => !actionLoading && setOpen(false)}
        title="Créer une activité"
        description="Renseignez les détails de la nouvelle activité Weego."
      >
        <ActivityForm
          onCancel={() => setOpen(false)}
          onSubmit={handleCreate}
          loading={actionLoading}
        />
      </Modal>
    </div>
  );
}

/** Jauge de remplissage des places. */
function SeatsBar({ booked, max }: { booked: number; max: number }) {
  const pct = Math.round((booked / max) * 100);
  const full = booked >= max;
  return (
    <div className="mx-auto w-24">
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-medium tabular-nums">
          {booked}/{max}
        </span>
        {full && <span className="font-semibold text-rose-600">Complet</span>}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={
            full
              ? "h-full rounded-full bg-rose-500"
              : "h-full rounded-full bg-brand-500"
          }
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
