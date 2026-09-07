import { cn } from "@/lib/utils";
import logoImg from "@/assets/garden-prime-logo.png";

export function GardenPrimeLogo({
  className,
  size = "default",
}: {
  className?: string;
  size?: "small" | "default" | "large";
}) {
  const height = size === "small" ? "h-8" : size === "large" ? "h-20" : "h-10";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img src={logoImg} alt="GARDEN PRIME" className={cn("w-auto object-contain", height)} />
    </div>
  );
}

export const VivaverdeLogo = GardenPrimeLogo;
