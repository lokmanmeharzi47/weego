import type {
  Activity,
  Booking,
  BookingTrendPoint,
  Kpi,
  User,
} from "./types";

/**
 * Données mockées réalistes (contexte algérien) pour valider l'UI avant la
 * connexion à l'API REST / Supabase. Une seule source de vérité, importée par
 * les pages. Remplacer ces exports par des appels `fetch` le moment venu.
 */

// ── KPI (Vue d'ensemble) ───────────────────────────────────────────
export const kpis: Kpi[] = [
  {
    id: "revenue",
    label: "Chiffre d'affaires du mois",
    value: "2 480 000 DZD",
    delta: 12.4,
    trend: "up",
  },
  {
    id: "activities",
    label: "Activités actives",
    value: "86",
    delta: 4.1,
    trend: "up",
  },
  {
    id: "bookings",
    label: "Total des réservations",
    value: "1 942",
    delta: 8.7,
    trend: "up",
  },
  {
    id: "users",
    label: "Utilisateurs actifs",
    value: "5 318",
    delta: -2.3,
    trend: "down",
  },
];

// ── Courbe des réservations (7 derniers jours) ─────────────────────
export const bookingTrend: BookingTrendPoint[] = [
  { day: "Lun", bookings: 42, revenue: 168000 },
  { day: "Mar", bookings: 58, revenue: 231000 },
  { day: "Mer", bookings: 49, revenue: 196000 },
  { day: "Jeu", bookings: 73, revenue: 312000 },
  { day: "Ven", bookings: 96, revenue: 451000 },
  { day: "Sam", bookings: 124, revenue: 588000 },
  { day: "Dim", bookings: 108, revenue: 502000 },
];

// ── Activités ──────────────────────────────────────────────────────
export const activities: Activity[] = [
  {
    id: "act_01",
    title: "Randonnée au Parc National de Chréa",
    category: "Randonnée",
    description:
      "Une randonnée guidée à travers les forêts de cèdres de Chréa avec vue panoramique sur la Mitidja.",
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    price: 3500,
    city: "Blida",
    date: "2026-06-14T08:00:00Z",
    maxCapacity: 25,
    bookedSeats: 18,
    organizer: "Atlas Adventures",
    lat: 36.4203,
    lng: 2.8765,
    status: "active",
  },
  {
    id: "act_02",
    title: "Atelier poterie traditionnelle",
    category: "Atelier créatif",
    description:
      "Apprenez les techniques ancestrales de la poterie kabyle dans un atelier convivial.",
    imageUrl:
      "https://images.unsplash.com/photo-1565122256334-1e7d9a39c8c5?w=400&q=80",
    price: 2800,
    city: "Tizi Ouzou",
    date: "2026-06-16T14:00:00Z",
    maxCapacity: 12,
    bookedSeats: 12,
    organizer: "Maison des Arts",
    lat: 36.7169,
    lng: 4.0497,
    status: "active",
  },
  {
    id: "act_03",
    title: "Tournoi de Padel — Alger Centre",
    category: "Padel",
    description:
      "Tournoi amical de padel ouvert à tous les niveaux, sur courts couverts.",
    imageUrl:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&q=80",
    price: 1500,
    city: "Alger",
    date: "2026-06-12T18:00:00Z",
    maxCapacity: 16,
    bookedSeats: 9,
    organizer: "Padel Club DZ",
    lat: 36.7538,
    lng: 3.0588,
    status: "active",
  },
  {
    id: "act_04",
    title: "Cours de yoga au lever du soleil",
    category: "Bien-être",
    description:
      "Séance de yoga en plein air face à la baie de Bejaïa pour bien commencer la journée.",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
    price: 1200,
    city: "Bejaïa",
    date: "2026-06-18T06:30:00Z",
    maxCapacity: 20,
    bookedSeats: 7,
    organizer: "Zen Studio",
    lat: 36.7509,
    lng: 5.0567,
    status: "active",
  },
  {
    id: "act_05",
    title: "Atelier cuisine — Couscous & saveurs",
    category: "Gastronomie",
    description:
      "Préparez un couscous traditionnel de A à Z avec une cheffe locale, dégustation incluse.",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    price: 4200,
    city: "Constantine",
    date: "2026-06-20T11:00:00Z",
    maxCapacity: 10,
    bookedSeats: 5,
    organizer: "Saveurs du Bled",
    lat: 36.365,
    lng: 6.6147,
    status: "draft",
  },
  {
    id: "act_06",
    title: "Visite guidée de la Casbah",
    category: "Culture",
    description:
      "Découverte historique de la Casbah d'Alger, patrimoine mondial de l'UNESCO.",
    imageUrl:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&q=80",
    price: 2000,
    city: "Alger",
    date: "2026-06-22T09:30:00Z",
    maxCapacity: 30,
    bookedSeats: 24,
    organizer: "Alger Heritage Tours",
    lat: 36.7847,
    lng: 3.0601,
    status: "active",
  },
];

// ── Réservations ───────────────────────────────────────────────────
export const bookings: Booking[] = [
  {
    id: "bk_01",
    reference: "WG-20617",
    activityTitle: "Randonnée au Parc National de Chréa",
    customerName: "Amine Belkacem",
    seats: 2,
    totalPaid: 7000,
    pointsUsed: 0,
    status: "confirmed",
    createdAt: "2026-06-05T09:24:00Z",
  },
  {
    id: "bk_02",
    reference: "WG-20616",
    activityTitle: "Tournoi de Padel — Alger Centre",
    customerName: "Lina Hamadi",
    seats: 1,
    totalPaid: 1200,
    pointsUsed: 300,
    status: "pending",
    createdAt: "2026-06-05T08:10:00Z",
  },
  {
    id: "bk_03",
    reference: "WG-20615",
    activityTitle: "Atelier poterie traditionnelle",
    customerName: "Yacine Mansouri",
    seats: 3,
    totalPaid: 8400,
    pointsUsed: 0,
    status: "completed",
    createdAt: "2026-06-04T16:45:00Z",
  },
  {
    id: "bk_04",
    reference: "WG-20614",
    activityTitle: "Visite guidée de la Casbah",
    customerName: "Sara Bensalem",
    seats: 4,
    totalPaid: 8000,
    pointsUsed: 500,
    status: "confirmed",
    createdAt: "2026-06-04T12:30:00Z",
  },
  {
    id: "bk_05",
    reference: "WG-20613",
    activityTitle: "Cours de yoga au lever du soleil",
    customerName: "Karim Ould",
    seats: 1,
    totalPaid: 1200,
    pointsUsed: 0,
    status: "cancelled",
    createdAt: "2026-06-03T19:05:00Z",
  },
  {
    id: "bk_06",
    reference: "WG-20612",
    activityTitle: "Atelier cuisine — Couscous & saveurs",
    customerName: "Nadia Cherif",
    seats: 2,
    totalPaid: 8400,
    pointsUsed: 200,
    status: "confirmed",
    createdAt: "2026-06-03T10:15:00Z",
  },
];

// ── Utilisateurs & fidélité ────────────────────────────────────────
export const users: User[] = [
  {
    id: "usr_01",
    name: "Amine Belkacem",
    email: "amine.belkacem@gmail.com",
    city: "Alger",
    tier: "Gold Nomad",
    points: 4820,
    totalBookings: 23,
    joinedAt: "2025-02-11T00:00:00Z",
  },
  {
    id: "usr_02",
    name: "Lina Hamadi",
    email: "lina.hamadi@outlook.com",
    city: "Oran",
    tier: "Silver Enthusiast",
    points: 1840,
    totalBookings: 9,
    joinedAt: "2025-06-23T00:00:00Z",
  },
  {
    id: "usr_03",
    name: "Yacine Mansouri",
    email: "y.mansouri@gmail.com",
    city: "Tizi Ouzou",
    tier: "Platinum Legend",
    points: 9650,
    totalBookings: 41,
    joinedAt: "2024-11-02T00:00:00Z",
  },
  {
    id: "usr_04",
    name: "Sara Bensalem",
    email: "sara.bensalem@gmail.com",
    city: "Constantine",
    tier: "Bronze Explorer",
    points: 420,
    totalBookings: 2,
    joinedAt: "2026-04-30T00:00:00Z",
  },
  {
    id: "usr_05",
    name: "Karim Ould",
    email: "karim.ould@yahoo.fr",
    city: "Bejaïa",
    tier: "Silver Enthusiast",
    points: 2110,
    totalBookings: 12,
    joinedAt: "2025-09-14T00:00:00Z",
  },
  {
    id: "usr_06",
    name: "Nadia Cherif",
    email: "nadia.cherif@gmail.com",
    city: "Annaba",
    tier: "Gold Nomad",
    points: 5340,
    totalBookings: 27,
    joinedAt: "2025-01-19T00:00:00Z",
  },
];
