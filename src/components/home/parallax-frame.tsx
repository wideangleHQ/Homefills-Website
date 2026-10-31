"use client";

import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Square image frame whose artwork drifts slightly against the page scroll.
 *
 * The artwork layer is 12% larger than the frame so it never reveals an edge.
 * One scroll-linked value drives a CSS variable (--p, -1 → 1) and the amplitude
 * (--amp) is plain CSS: ±2% on phones, ±4% from tablet up. Motion uses native
 * scroll timelines where available, so there is no per-frame React work.
 * Under prefers-reduced-motion the amplitude is 0, so the layout is identical and static.
 */
export function ParallaxFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  const layer =
    "absolute -inset-[6%] block translate-y-[calc(var(--p,0)*var(--amp))] [--amp:2%] md:[--amp:4%] motion-reduce:[--amp:0%]";

  return (
    <span ref={ref} className="relative block aspect-square overflow-hidden rounded-lg">
      <motion.span className={layer} style={{ "--p": p } as MotionStyle}>
        {children}
      </motion.span>
    </span>
  );
}
