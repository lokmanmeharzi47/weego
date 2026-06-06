# Weego Admin — Console d'administration

Tableau de bord d'administration **premium** pour la plateforme algérienne
**Weego** (découverte & réservation d'activités locales : randonnées, ateliers
créatifs, padel, etc.).

> _« Find faster, Go further! »_

## 🛠 Stack technique

| Domaine     | Choix                                                       |
| ----------- | ----------------------------------------------------------- |
| Framework   | **Next.js 14** (App Router)                                 |
| Langage     | **TypeScript**                                              |
| Style / UI  | **Tailwind CSS** + composants maison (style shadcn/ui)      |
| Thème       | **next-themes** (clair / sombre), glassmorphism subtil      |
| Graphiques  | **Recharts**                                                |
| Icônes      | **Lucide React**                                            |
| Données     | **Mock** (réalistes) → prêt pour une API REST / **Supabase** |

## 🎨 Identité visuelle

- **Violet de marque** : `#7C2BFF`
- **Accent orange/jaune** (alertes & favoris) : `#FFB020`
- Mode clair (surfaces blanches / gris très clair) & mode sombre profond.
- Micro-animations au survol (boutons, lignes de tableau, cartes KPI).

## 📁 Structure du projet

```
weego-admin/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout racine + ThemeProvider
│   │   ├── page.tsx                # Redirection -> /dashboard
│   │   ├── globals.css             # Design tokens (variables CSS) + Tailwind
│   │   ├── login/                  # 1. Authentification
│   │   │   ├── page.tsx
│   │   │   └── LoginForm.tsx
│   │   └── (dashboard)/            # Groupe protégé (Sidebar + Header)
│   │       ├── layout.tsx          # Applique <DashboardShell>
│   │       ├── dashboard/page.tsx  # 2. Vue d'ensemble (KPI, graphe, résa)
│   │       ├── activities/         # 3. Gestion des activités (+ modale)
│   │       ├── bookings/           # 4. Réservations (filtres par statut)
│   │       ├── users/              # 5. Utilisateurs & fidélité (points)
│   │       └── marketing/          # 6. Notifications / promo flash
│   ├── components/
│   │   ├── layout/                 # Sidebar, Header, DashboardShell, Theme…
│   │   ├── ui/                     # Card, Badge, StatCard, DataTable, Modal…
│   │   └── dashboard/              # BookingsChart, RecentBookings
│   ├── config/
│   │   └── nav.ts                  # Items de navigation de la Sidebar
│   └── lib/
│       ├── types.ts                # Types métier (Activity, Booking, User…)
│       ├── mock-data.ts            # Fausses données réalistes (contexte DZ)
│       └── utils.ts                # cn(), formatCurrency(), formatDate()…
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## 🚀 Démarrage

```bash
cd weego-admin
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — vous serez redirigé vers
la **Vue d'ensemble**. La page de connexion est disponible sur
[/login](http://localhost:3000/login) (identifiants pré-remplis, auth mockée).

## 🔌 Brancher l'API / Supabase

1. Copier `.env.local.example` en `.env.local` et renseigner
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Remplacer les imports depuis `src/lib/mock-data.ts` par des appels `fetch`
   (ou le client `@supabase/supabase-js`). Les **types** de `src/lib/types.ts`
   servent déjà de contrat de données.
3. Brancher `LoginForm` sur `supabase.auth.signInWithPassword`.

## ✅ Fonctionnalités livrées

- [x] Authentification (page de connexion épurée, split-screen de marque)
- [x] Vue d'ensemble : 4 cartes KPI, courbe 7 jours (Recharts), 5 dernières résa
- [x] Activités : tableau interactif + modale de création (GPS, capacité…)
- [x] Réservations : filtres par statut, points de fidélité, total payé
- [x] Utilisateurs & Fidélité : rangs + ajustement manuel des points
- [x] Marketing : notification push / promo flash + aperçu live
- [x] Layout responsive (Sidebar fixe desktop / drawer mobile, Header sticky)
- [x] Mode clair / sombre
```
"# weego" 
