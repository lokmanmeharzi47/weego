import { DashboardShell } from "@/components/layout/DashboardShell";

/**
 * Layout du dashboard : applique la coquille Sidebar + Header à
 * toutes les pages internes (overview, activités, réservations, etc.).
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
