import { cn } from "@/lib/utils";

export function SuraLogo({ className, variant = "default" }: { className?: string; variant?: "default" | "light" }) {
  const leaf = variant === "light" ? "#86efac" : "#22C55E";
  const pot = variant === "light" ? "#fbbf24" : "#92400E";
  const text = variant === "light" ? "#f8fafc" : "#166534";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" fill="none">
        {/* leaves */}
        <path d="M18 22 C 16 14, 22 10, 22 18 Z" fill={leaf} />
        <path d="M24 21 C 23 12, 30 10, 28 19 Z" fill={leaf} />
        <path d="M30 23 C 31 15, 36 14, 34 22 Z" fill={leaf} />
        {/* pot */}
        <path d="M14 28 L34 28 L31 42 L17 42 Z" fill={pot} />
        {/* wave */}
        <path d="M6 34 Q 20 28, 32 33 T 46 32" stroke={leaf} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight" style={{ color: text }}>
          SURA<span className="ml-1 opacity-70">ERP</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: text, opacity: 0.6 }}>
          vasos & jardim
        </span>
      </div>
    </div>
  );
}
