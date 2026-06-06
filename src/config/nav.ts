import {
  LayoutDashboard,
  CalendarRange,
  Ticket,
  Users,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Badge optionnel (ex: nombre d'éléments en attente). */
  badge?: number;
}

/** Navigation principale de la Sidebar. */
export const navItems: NavItem[] = [
  { label: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
  { label: "Activités", href: "/dashboard/activities", icon: CalendarRange },
  { label: "Réservations", href: "/dashboard/bookings", icon: Ticket },
  { label: "Utilisateurs & Fidélité", href: "/dashboard/users", icon: Users },
  { label: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
];
