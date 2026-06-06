import { LogoLoader } from "@/components/ui/LogoLoader";

/** Loader affiché pendant le chargement des pages du dashboard. */
export default function DashboardLoading() {
  return <LogoLoader label="Préparation de votre espace…" />;
}
