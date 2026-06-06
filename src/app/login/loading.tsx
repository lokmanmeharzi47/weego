import { LogoLoader } from "@/components/ui/LogoLoader";

/** Loader affiché au chargement de la page de connexion. */
export default function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LogoLoader label="Weego Admin" />
    </div>
  );
}
