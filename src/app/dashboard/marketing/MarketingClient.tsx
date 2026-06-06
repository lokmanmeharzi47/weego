"use client";

import * as React from "react";
import { Bell, CheckCircle2, Send, Zap } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type CampaignType = "push" | "promo";

/** Marketing : envoi d'une notification push ou d'une promo flash globale. */
export function MarketingClient() {
  const [type, setType] = React.useState<CampaignType>("push");
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    // Mock : à brancher sur un service de push (FCM) / API REST.
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setTitle("");
    setMessage("");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing & Notifications"
        subtitle="Envoyez une notification push ou une promo flash à tous les membres."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Formulaire */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Nouvelle campagne</CardTitle>
            <CardDescription>
              Diffusion globale à l&apos;ensemble des {`5 318`} utilisateurs actifs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSend} className="space-y-5">
              {/* Type de campagne */}
              <div className="grid grid-cols-2 gap-3">
                <TypeCard
                  active={type === "push"}
                  onClick={() => setType("push")}
                  icon={Bell}
                  label="Notification Push"
                  hint="Message informatif"
                />
                <TypeCard
                  active={type === "promo"}
                  onClick={() => setType("promo")}
                  icon={Zap}
                  label="Promo Flash"
                  hint="Offre limitée"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="title" className="text-sm font-medium">
                  Titre
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                  required
                  placeholder={
                    type === "promo"
                      ? "🔥 -20% ce week-end sur le Padel !"
                      : "Nouvelles activités près de chez vous"
                  }
                  className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                />
                <p className="text-right text-xs text-muted-foreground">
                  {title.length}/50
                </p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={160}
                  rows={3}
                  required
                  placeholder="Rédigez le contenu de votre notification…"
                  className="min-h-[88px] w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
                />
                <p className="text-right text-xs text-muted-foreground">
                  {message.length}/160
                </p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-600"
              >
                <Send className="h-4 w-4" />
                Envoyer à tous les membres
              </button>

              {sent && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Campagne envoyée avec succès à tous les utilisateurs !
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Aperçu live */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
            <CardDescription>
              Rendu de la notification sur mobile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5">
              {/* Maquette d'une notif iOS/Android */}
              <div className="rounded-xl border border-white/15 bg-white/95 p-3.5 shadow-soft backdrop-blur dark:bg-card">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white",
                      type === "promo" ? "bg-accent" : "bg-brand-500"
                    )}
                  >
                    {type === "promo" ? (
                      <Zap className="h-4.5 w-4.5" />
                    ) : (
                      <Bell className="h-4.5 w-4.5" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground">
                        Weego
                      </p>
                      <p className="text-xs text-muted-foreground">maintenant</p>
                    </div>
                    <p className="mt-0.5 truncate text-sm font-semibold">
                      {title || "Titre de la notification"}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {message ||
                        "Le contenu de votre message apparaîtra ici en temps réel."}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-white/70">
                « Find faster, Go further! »
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TypeCard({
  active,
  onClick,
  icon: Icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Bell;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all",
        active
          ? "border-brand-500 bg-brand-500/10 shadow-glow"
          : "border-border hover:bg-muted"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5",
          active ? "text-brand-600 dark:text-brand-300" : "text-muted-foreground"
        )}
      />
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </button>
  );
}
