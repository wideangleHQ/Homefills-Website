import Link from "next/link";

import { footerNav } from "@/config/navigation";

import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-soft">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 lg:py-16">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo className="h-12" />
          <p className="font-serif text-[0.9375rem] leading-relaxed text-ink">
            Spices, blends, superfoods and kitchen staples — selected in small batches and packed to
            preserve aroma and freshness.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:contents">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={`Footer ${group.title}`}>
              <h2 className="eyebrow mb-3 text-purple">{group.title}</h2>
              <ul className="flex flex-col">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-10 items-center text-[0.9375rem] text-ink transition-colors hover:text-purple"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-1 py-5 text-meta text-subtle sm:flex-row sm:justify-between">
          <p>© 2026 Homefills. All rights reserved.</p>
          <p>Demo storefront — not processing orders.</p>
        </div>
      </div>
    </footer>
  );
}
