import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { Logo } from "@/components/ui/Logo";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Connexion — Weego Admin",
};

/**
 * Page de connexion administrateur — Professional Split Layout
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Column - Branding (Hidden on small screens) */}
      <div className="relative hidden lg:flex w-1/2 flex-col justify-between bg-brand-900 p-12 overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:40px_40px]"></div>
        
        {/* Ambient glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-brand-500/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-400/10 blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div>
            <Logo variant="white" className="scale-110 origin-left" />
          </div>
          
          <div className="mt-auto mb-16">
            <h1 className="text-4xl xl:text-5xl font-display font-medium leading-tight text-white mb-6">
              Gérez votre flotte <br />
              avec <span className="font-bold text-accent-soft">précision</span>.
            </h1>
            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              WeegoAdmin™ vous offre un contrôle total sur vos opérations, vos utilisateurs et vos performances en temps réel.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span>© {new Date().getFullYear()} Weego. Tous droits réservés.</span>
          </div>
        </div>
      </div>

      {/* Right Column - Form Area */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 lg:p-24 bg-surface">
        <div className="w-full max-w-[420px] animate-fade-in">
          {/* Logo for mobile view */}
          <div className="flex lg:hidden justify-center mb-8">
            <Logo className="scale-110" />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-display font-bold text-foreground tracking-tight mb-3">
              Bienvenue
            </h2>
            <p className="text-muted-foreground">
              Veuillez saisir vos identifiants pour accéder à votre espace administrateur.
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
