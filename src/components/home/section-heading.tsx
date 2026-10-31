import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  tone = "lemon",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  action: { label: string; href: string };
  /** Turmeric surfaces use charcoal for small text (Design.md 2.7). */
  tone?: "lemon" | "turmeric";
}) {
  const onTurmeric = tone === "turmeric";
  return (
    <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-12">
      <div className="flex max-w-2xl flex-col gap-3">
        <p className={cn("eyebrow", onTurmeric ? "text-ink" : "text-purple")}>{eyebrow}</p>
        <h2 id={id} className="text-h2 font-semibold">
          {title}
        </h2>
        <p className="font-serif text-lead text-ink">{description}</p>
      </div>
      <Link
        href={action.href}
        className={cn(
          "group inline-flex min-h-11 shrink-0 items-center gap-2 self-start font-heading font-semibold underline decoration-2 underline-offset-[6px] md:self-auto",
          onTurmeric ? "text-ink decoration-ink" : "text-purple decoration-purple hover:text-purple-hover",
        )}
      >
        {action.label}
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
