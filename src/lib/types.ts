import type { Database } from "@/types/database.types";

/**
 * Types métier partagés du dashboard Weego.
 * Ils reflètent le modèle de données de l'app mobile (MVVM) et serviront de
 * contrat lorsque l'API REST / Supabase remplacera les données mockées.
 */

export type ActivityDb = Database["public"]["Tables"]["activities"]["Row"];
export type ActivityInsert = Database["public"]["Tables"]["activities"]["Insert"];
export type BookingDb = Database["public"]["Tables"]["bookings"]["Row"];
export type UserDb = Database["public"]["Tables"]["user_progress"]["Row"];

export type BookingStatus =
  | "pending" // En attente
  | "confirmed" // Confirmée
  | "cancelled" // Annulée
  | "completed"; // Terminée

export type ActivityCategory =
  | "Randonnée"
  | "Atelier créatif"
  | "Padel"
  | "Sport"
  | "Bien-être"
  | "Gastronomie"
  | "Culture";

/** Rangs du programme de fidélité Weego. */
export type LoyaltyTier =
  | "Bronze Explorer"
  | "Silver Enthusiast"
  | "Gold Nomad"
  | "Platinum Legend";

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  description: string;
  imageUrl: string;
  price: number; // en DZD
  city: string;
  date: string; // ISO
  maxCapacity: number;
  bookedSeats: number;
  organizer: string;
  lat: number;
  lng: number;
  status: "active" | "draft" | "archived";
}

export interface Booking {
  id: string;
  reference: string;
  activityTitle: string;
  customerName: string;
  customerAvatar?: string;
  seats: number;
  totalPaid: number; // en DZD
  pointsUsed: number;
  status: BookingStatus;
  createdAt: string; // ISO
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  city: string;
  tier: LoyaltyTier;
  points: number;
  totalBookings: number;
  joinedAt: string; // ISO
}

export interface Kpi {
  id: string;
  label: string;
  value: string;
  /** Variation en % par rapport à la période précédente. */
  delta: number;
  trend: "up" | "down";
}

/** Point de la courbe des réservations sur 7 jours. */
export interface BookingTrendPoint {
  day: string; // ex: "Lun"
  bookings: number;
  revenue: number; // en DZD
}
