import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Logo Weego officiel utilisant les assets de la charte graphique.
 */
export function Logo({
  showWordmark = true,
  variant = "default",
  className,
}: {
  showWordmark?: boolean;
  variant?: "default" | "white";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image 
        src={variant === "white" ? "/Logo blanc.png" : "/Logo purple, yellow point.png"} 
        alt="Weego Logo" 
        width={36} 
        height={36} 
        className={cn("drop-shadow-sm", variant === "white" && "opacity-90")}
      />
      {showWordmark && (
        <div className="leading-tight flex flex-col justify-center mt-1">
          <Image 
            src={variant === "white" ? "/Wordmark white.png" : "/Wordmark purple.png"} 
            alt="Weego" 
            width={70} 
            height={26}
          />
          <p className={cn("text-[10px] font-medium tracking-wide mt-0.5", variant === "white" ? "text-white/80" : "text-muted-foreground")}>
            Admin Console
          </p>
        </div>
      )}
    </div>
  );
}
