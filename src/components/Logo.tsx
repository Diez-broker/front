import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "isotipo";
  className?: string;
  inverted?: boolean;
}

export function Logo({
  variant = "full",
  className,
  inverted = false,
}: LogoProps) {
  const src =
    variant === "isotipo"
      ? "/logo-isotipo.svg"
      : inverted
        ? "/logo-diez-brokers-blanco.svg"
        : "/logo-diez-brokers.svg";

  return (
    <Image
      src={src}
      alt="Diez Brokers"
      width={620}
      height={220}
      unoptimized
      priority
      className={cn("h-9 sm:h-10 md:h-12 w-auto shrink-0 max-w-[160px] sm:max-w-none", className)}
    />
  );
}
