"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMounted } from "@/hooks/useMounted";

/** Point d'entrée : Affiche le logo Weego puis redirige vers la page de connexion. */
export default function Home() {
  const router = useRouter();
  const mounted = useMounted();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2500); // 2.5 seconds loader
    return () => clearTimeout(timer);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-500 overflow-hidden relative">
      {/* Graphic background assets */}
      <div className="absolute top-10 left-10 opacity-60 animate-float">
        <Image src="/Yellow circle graphic.png" alt="" width={150} height={150} style={{ height: 'auto' }} priority />
      </div>
      <div className="absolute bottom-10 right-10 opacity-60 animate-float-slow">
        <Image src="/Orange graphic.png" alt="" width={120} height={120} style={{ height: 'auto' }} priority />
      </div>
      <div className="absolute top-1/4 right-1/4 opacity-40 animate-spin-slow">
        <Image src="/Yellow circles graphic.png" alt="" width={80} height={80} style={{ height: 'auto' }} priority />
      </div>
      
      {/* Central Logo */}
      <div className="relative z-10 flex flex-col items-center animate-fade-up">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-glow-lg flex flex-col items-center">
          <Image 
            src="/Logo purple, yellow point.png" 
            alt="Weego Logo" 
            width={120} 
            height={120} 
            style={{ height: 'auto' }}
            className="animate-pulse"
            priority
          />
          <Image 
            src="/Wordmark purple, yellow point.png" 
            alt="Weego Wordmark" 
            width={160} 
            height={60} 
            style={{ height: 'auto' }}
            className="mt-4"
            priority
          />
        </div>
        <h1 className="mt-10 text-2xl sm:text-3xl font-display font-semibold text-white tracking-wide">
          Find faster, Go further!
        </h1>
        <div className="mt-8 flex gap-3">
          <span className="h-3 w-3 rounded-full bg-accent animate-bounce-dot"></span>
          <span className="h-3 w-3 rounded-full bg-accent animate-bounce-dot" style={{ animationDelay: '0.2s' }}></span>
          <span className="h-3 w-3 rounded-full bg-accent animate-bounce-dot" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
