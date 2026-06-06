"use client";

import * as React from "react";
import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import type { ActivityInsert } from "@/lib/types";
import { MapPicker } from "@/components/ui/MapPicker";

const categories = [
  "Randonnée",
  "Atelier créatif",
  "Padel",
  "Sport",
  "Bien-être",
  "Gastronomie",
  "Culture",
];

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20";

interface ActivityFormProps {
  onSubmit: (activity: ActivityInsert) => void;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * Formulaire de création d'activité.
 */
export function ActivityForm({ onSubmit, onCancel, loading }: ActivityFormProps) {
  const [position, setPosition] = useState({ lat: 36.7538, lng: 3.0588 });
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("[Upload] Failed:", data.error);
        return;
      }

      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("[Upload] Network error:", error);
    } finally {
      setIsUploading(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    const maxSpots = Number(f.get("max_spots"));

    const activity: ActivityInsert = {
      id: crypto.randomUUID(),
      title: String(f.get("title")),
      description: String(f.get("description")),
      category: String(f.get("category")),
      image_url:
        String(f.get("image_url")) ||
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
      price: Number(f.get("price")),
      location: String(f.get("location")),
      date: new Date(String(f.get("date") || Date.now())).toISOString(),
      max_spots: maxSpots,
      available_spots: maxSpots,
      participants_count: 0,
      organizer: String(f.get("organizer")),
      latitude: position.lat,
      longitude: position.lng,
      rating: 0,
      rating_count: 0,
      is_nearby: false,
      is_today: false,
      is_trending: false,
      duration: "2h",
      organizer_role: "Partenaire",
    };

    onSubmit(activity);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Titre de l'activité" htmlFor="title">
        <input id="title" name="title" required className={inputClass} placeholder="Ex: Randonnée au Parc de Chréa" disabled={loading} />
      </Field>

      <Field label="Description" htmlFor="description">
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          className={inputClass.replace("h-11", "min-h-[88px] py-2.5")}
          placeholder="Décrivez l'expérience proposée…"
          disabled={loading}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Catégorie" htmlFor="category">
          <select id="category" name="category" className={inputClass} required disabled={loading}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Prix (DZD)" htmlFor="price">
          <input id="price" name="price" type="number" min={0} required className={inputClass} placeholder="3500" disabled={loading} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Localisation (ville)" htmlFor="location">
          <input id="location" name="location" required className={inputClass} placeholder="Alger" disabled={loading} />
        </Field>
        <Field label="Capacité max" htmlFor="max_spots">
          <input id="max_spots" name="max_spots" type="number" min={1} required className={inputClass} placeholder="25" disabled={loading} />
        </Field>
      </div>

      <Field label="Image de l'activité" htmlFor="image_url">
        {imageUrl ? (
          <div className="relative h-32 w-full max-w-xs overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <input type="hidden" name="image_url" value={imageUrl} />
          </div>
        ) : (
          <label className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface transition-colors hover:bg-muted ${isUploading || loading ? "opacity-50 pointer-events-none" : ""}`}>
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
            ) : (
              <>
                <ImagePlus className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Cliquez pour ajouter une image</span>
              </>
            )}
            <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} disabled={isUploading || loading} />
            <input type="hidden" name="image_url" value="" />
          </label>
        )}
      </Field>

      <Field label="Organisateur" htmlFor="organizer">
        <input id="organizer" name="organizer" required className={inputClass} placeholder="Atlas Adventures" disabled={loading} />
      </Field>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Localisation sur la carte (GPS)</label>
        <MapPicker value={position} onChange={setPosition} />
        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
          <span>Lat: {position.lat.toFixed(6)}</span>
          <span>Lng: {position.lng.toFixed(6)}</span>
        </div>
      </div>

      <Field label="Date & heure" htmlFor="date">
        <input id="date" name="date" type="datetime-local" className={inputClass} disabled={loading} />
      </Field>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-600 disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer l'activité"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
