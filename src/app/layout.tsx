import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { BottomNav } from "@/components/layout/bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CartSheet } from "@/components/store/cart-sheet";
import { QuickViewDialog } from "@/components/store/quick-view-dialog";
import { SearchDialog } from "@/components/store/search-dialog";
import { StoreProvider } from "@/components/store/store-provider";

import "./globals.css";

const archivo = localFont({
  variable: "--font-archivo",
  display: "swap",
  src: [
    { path: "../assets/fonts/Archivo/Archivo-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Archivo/Archivo-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Archivo/Archivo-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/Archivo/Archivo-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const proza = localFont({
  variable: "--font-proza",
  display: "swap",
  src: [
    { path: "../assets/fonts/ProzaLibre/ProzaLibre-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/ProzaLibre/ProzaLibre-Medium.ttf", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Homefills — Spices, Blends & Superfoods",
    template: "%s · Homefills",
  },
  description:
    "Homefills spices, masala blends, superfoods and kitchen staples — selected in small batches and packed to preserve aroma and freshness.",
  applicationName: "Homefills",
  openGraph: {
    type: "website",
    siteName: "Homefills",
    title: "Homefills — Spices, Blends & Superfoods",
    description: "Trust of purity as mother & child. Explore the Homefills range of spices, blends and superfoods.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fefcb9",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${proza.variable}`}>
      <body className="flex min-h-svh flex-col pb-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom))] lg:pb-0">
        <StoreProvider>
          <SmoothScroll>
            <a
              href="#main"
              className="sr-only z-50 rounded-md bg-purple px-4 py-3 text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <BottomNav />
            <CartSheet />
            <QuickViewDialog />
            <SearchDialog />
          </SmoothScroll>
        </StoreProvider>
      </body>
    </html>
  );
}
