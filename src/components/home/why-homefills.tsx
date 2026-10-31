import Image from "next/image";

import desktopImg from "@/assets/Images/Why Homefills/Why Homefills desktop.png";
import mobileImg from "@/assets/Images/Why Homefills/Why Homefills Mobile.png";

/**
 * Why Homefills Section — Full Uncropped Visual
 *
 * Positioned directly below the Featured Products section.
 * Displays the complete, original full image edge-to-edge without any cropping:
 * - 100% of all text, packaging, and callout pillars are visible and unclipped.
 * - Mobile: Full uncropped 9:16 portrait infographic (Why Homefills Mobile.png).
 * - Desktop: Full uncropped 16:9 landscape infographic (Why Homefills desktop.png).
 *
 * Performance:
 * - priority={true} ensures high-priority preload and fast initial loading
 * - Next.js automatic WebP/AVIF generation optimizes 9.5MB source files for instant rendering
 */
export function WhyHomefills() {
  return (
    <section
      id="why-homefills"
      aria-label="Why Homefills"
      className="relative w-full overflow-hidden bg-[#FAF2D8]"
    >
      {/* Screen-reader accessible label for SEO and accessibility */}
      <h2 className="sr-only">
        Why Homefills: Rooted in Spice Expertise, Carefully Sourced Ingredients, Transparency You Can Explore, and Thoughtful Processing
      </h2>

      {/* Mobile View: Complete original full image (9:16 portrait, zero cropping) */}
      <div className="block sm:hidden w-full">
        <Image
          src={mobileImg}
          alt="Why Homefills: Rooted in Spice Expertise, Carefully Sourced Ingredients, Transparency You Can Explore, and Thoughtful Processing"
          priority
          quality={95}
          sizes="100vw"
          className="h-auto w-full select-none"
        />
      </div>

      {/* Desktop & Tablet View: Complete original full image (16:9 landscape, zero cropping) */}
      <div className="hidden sm:block w-full">
        <Image
          src={desktopImg}
          alt="Why Homefills: Rooted in Spice Expertise, Carefully Sourced Ingredients, Transparency You Can Explore, and Thoughtful Processing"
          priority
          quality={95}
          sizes="100vw"
          className="h-auto w-full select-none"
        />
      </div>
    </section>
  );
}
