import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/Images/Logo/Homefills_Logo.png";
import { cn } from "@/lib/utils";

// Lossless PNG copy of the supplied 120×64 AVIF (Turbopack cannot process AVIF), so it is never rendered wider than that.
export function Logo({ className, preload }: { className?: string; preload?: boolean }) {
  return (
    <Link href="/" aria-label="Homefills home" className={cn("inline-flex shrink-0", className)}>
      <Image
        src={logo}
        alt="Homefills — trust of purity as mother & child"
        className="h-full w-auto"
        preload={preload}
        unoptimized
      />
    </Link>
  );
}
