import * as React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  /** Clé unique de la colonne. */
  key: string;
  /** En-tête affiché. */
  header: string;
  /** Rendu d'une cellule pour une ligne donnée. */
  cell: (row: T) => React.ReactNode;
  /** Alignement du contenu. */
  align?: "left" | "right" | "center";
  /** Masquer sur mobile pour rester responsive. */
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** Identifiant unique de ligne (clé React). */
  rowKey: (row: T) => string;
  /** Message affiché quand la liste est vide. */
  emptyMessage?: string;
}

/**
 * Tableau de données générique et réutilisable.
 * - En-tête collant, lignes avec hover, responsive (colonnes masquables).
 * - Typé en générique pour fonctionner avec n'importe quel modèle.
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "Aucune donnée à afficher.",
}: DataTableProps<T>) {
  const alignClass = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  } as const;

  return (
    <div className="scrollbar-thin w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                  alignClass[col.align ?? "left"],
                  col.hideOnMobile && "hidden md:table-cell"
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/60"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3.5 align-middle",
                      alignClass[col.align ?? "left"],
                      col.hideOnMobile && "hidden md:table-cell"
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
