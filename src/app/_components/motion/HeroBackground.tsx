"use client";

import { motion, useReducedMotion } from "motion/react";

export default function HeroBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* dot grid, faded out toward the edges */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 50% 40%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 40%, black 35%, transparent 100%)",
        }}
      />

      {/* slowly drifting purple glow */}
      <motion.div
        className="absolute left-1/2 top-1/3 -ml-[19rem] h-[38rem] w-[38rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 28%, transparent), transparent 70%)",
        }}
        animate={reduce ? undefined : { x: [-40, 40, -40], y: [-20, 24, -20] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
