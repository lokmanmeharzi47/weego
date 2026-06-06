import Image from "next/image";

/**
 * Écran de chargement animé (logo loader) de l'admin Weego.
 * S'appuie sur les tokens de thème pour rester lisible en mode clair/sombre.
 * Utilisé par les fichiers `loading.tsx` (transitions de routes App Router).
 */
export function LogoLoader({ label = "Chargement…" }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-8">
      <div className="relative flex items-center justify-center">
        {/* Halo violet pulsé */}
        <span className="absolute h-28 w-28 animate-ping rounded-full bg-brand/10" />
        <span className="absolute h-40 w-40 rounded-full bg-brand/5 blur-2xl" />

        {/* Logo Weego avec léger rebond */}
        <Image
          src="/weego_logo.png"
          alt="Weego"
          width={88}
          height={88}
          priority
          className="relative h-20 w-20 animate-bounce-dot"
        />
      </div>

      {/* Barre de progression indéterminée */}
      <div className="relative h-1.5 w-44 overflow-hidden rounded-full bg-brand/15">
        <span className="absolute inset-y-0 left-0 w-1/3 animate-[marquee_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-brand to-accent" />
      </div>

      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
