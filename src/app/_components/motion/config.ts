import type { Variants } from "motion/react";

// Snappy personality: quick, ease-out-expo, no bounce.
export const DURATION = {
  fast: 0.2,
  base: 0.4,
} as const;

export const EASE = [0.23, 1, 0.32, 1] as const;

export const VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, transform: "translateY(12px)" },
  show: {
    opacity: 1,
    transform: "translateY(0)",
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export function containerVariants(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
