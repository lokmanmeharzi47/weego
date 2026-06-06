import type { Config } from "tailwindcss";

/**
 * Configuration Tailwind pour Weego Admin.
 * Les couleurs sont pilotées par des variables CSS (voir globals.css) afin de
 * basculer proprement entre le mode clair et le mode sombre.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette officielle de la charte graphique Weego
        weego: {
          purple: "#7700ff",
          yellow: "#FFEA00",
          orange: "#ff7300",
          black: "#000000",
          white: "#ffffff",
        },
        // Identité de marque Weego
        brand: {
          DEFAULT: "hsl(var(--brand))", // Violet principal
          50: "#f3e8ff",
          100: "#e9d5ff",
          200: "#d8b4fe",
          300: "#c084fc",
          400: "#a855f7",
          500: "hsl(var(--brand))",
          600: "#6b21a8",
          700: "#581c87",
          800: "#4c1d95",
          900: "#3b0764",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Jaune
          soft: "#fff280",
        },
        orange: {
          DEFAULT: "hsl(var(--orange))",
        },
        // Tokens sémantiques (résolus via variables CSS)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-spartan)", "var(--font-raleway)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.06)",
        glow: "0 8px 30px rgba(124,43,255,0.25)",
        "glow-lg": "0 20px 60px rgba(119,0,255,0.35)",
        "glow-yellow": "0 16px 50px rgba(255,234,0,0.45)",
        "glow-orange": "0 16px 50px rgba(255,115,0,0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(6deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(-5deg)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "42% 58% 63% 37% / 42% 44% 56% 58%" },
          "50%": { borderRadius: "63% 37% 38% 62% / 58% 63% 37% 42%" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-dot": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-16px)", opacity: "0.6" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "draw-loader": {
          "0%": { strokeDashoffset: "1000", opacity: "0.2" },
          "60%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "bounce-dot": "bounce-dot 1.1s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        wiggle: "wiggle 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
