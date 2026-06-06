"use client";

import * as React from "react";
import { Sparkles, Trophy, Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { getInitials } from "@/lib/utils";
import type { UserDb } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

/** Gestion des utilisateurs et de leur fidélité via Supabase. */
export function UsersClient() {
  const [list, setList] = React.useState<UserDb[]>([]);
  const [loading, setLoading] = React.useState(true);

  const supabase = createClient();

  React.useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .order("reward_points", { ascending: false });

      if (data && !error) {
        setList(data);
      }
      setLoading(false);
    }
    fetchUsers();
  }, [supabase]);

  const columns: Column<UserDb>[] = [
    {
      key: "user",
      header: "Utilisateur",
      cell: (u) => (
        <div className="flex items-center gap-3">
          {u.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={u.photo_url}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/10 font-semibold text-brand-600 dark:text-brand-300">
              {getInitials(`${u.first_name || ""} ${u.last_name || ""}`.trim() || u.email || "?")}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-medium">
              {u.first_name} {u.last_name}
            </p>
            <p className="truncate text-xs text-muted-foreground">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "wilaya",
      header: "Wilaya",
      hideOnMobile: true,
      cell: (u) => <span className="text-sm">{u.wilaya || "—"}</span>,
    },
    {
      key: "tier",
      header: "Palier",
      cell: (u) => {
        const tierMap: Record<string, { label: string; color: "neutral" | "brand" | "warning" | "success" }> = {
          bronze: { label: "Bronze", color: "neutral" },
          silver: { label: "Silver", color: "brand" },
          gold: { label: "Gold", color: "warning" },
        };
        const mapped = u.rank_tier ? tierMap[u.rank_tier.toLowerCase()] : null;
        
        return mapped ? (
          <Badge variant={mapped.color} className="gap-1">
            <Trophy className="h-3 w-3" />
            {mapped.label}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        );
      },
    },
    {
      key: "bookings",
      header: "Réservations",
      align: "center",
      hideOnMobile: true,
      cell: (u) => <span className="font-medium">{u.total_bookings || 0}</span>,
    },
    {
      key: "points",
      header: "Points Weego",
      align: "right",
      cell: (u) => (
        <span className="inline-flex items-center gap-1 font-semibold text-accent">
          <Sparkles className="h-4 w-4" />
          {u.reward_points || 0}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Utilisateurs & Fidélité"
        subtitle="Gérez la communauté Weego et ajustez les points de fidélité."
      />

      <Card className="overflow-hidden">
        <DataTable 
          columns={columns} 
          data={list} 
          rowKey={(u) => u.uid}
          emptyMessage={loading ? "Chargement..." : "Aucun utilisateur trouvé."}
        />
      </Card>
    </div>
  );
}

/** Formulaire d'ajout / retrait de points (dédommagement, geste commercial…). */
function PointsForm({
  user,
  onApply,
  onCancel,
}: {
  user: UserDb;
  onApply: (delta: number) => void;
  onCancel: () => void;
}) {
  const [mode, setMode] = React.useState<"add" | "remove">("add");
  const [amount, setAmount] = React.useState(100);

  const delta = mode === "add" ? amount : -amount;
  const nextBalance = Math.max(0, (user.reward_points || 0) + delta);

  return (
    <div className="space-y-4">
      {/* Sélecteur ajouter / retirer */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setMode("add")}
          className={
            mode === "add"
              ? "flex items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-emerald-500/10 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300"
              : "flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
          }
        >
          <Plus className="h-4 w-4" /> Ajouter
        </button>
        <button
          onClick={() => setMode("remove")}
          className={
            mode === "remove"
              ? "flex items-center justify-center gap-2 rounded-xl border border-rose-500 bg-rose-500/10 py-2.5 text-sm font-semibold text-rose-700 dark:text-rose-300"
              : "flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
          }
        >
          <Minus className="h-4 w-4" /> Retirer
        </button>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="amount" className="text-sm font-medium">
          Nombre de points
        </label>
        <input
          id="amount"
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
          className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
        />
        <div className="flex gap-2 pt-1">
          {[50, 100, 250, 500].map((q) => (
            <button
              key={q}
              onClick={() => setAmount(q)}
              className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium hover:bg-brand-500/10 hover:text-brand-600"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Aperçu du nouveau solde */}
      <div className="rounded-xl bg-muted/60 p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Nouveau solde</span>
          <span className="text-lg font-bold tabular-nums">
            {nextBalance} pts
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Annuler
        </button>
        <button
          onClick={() => onApply(delta)}
          className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-600"
        >
          Appliquer
        </button>
      </div>
    </div>
  );
}
