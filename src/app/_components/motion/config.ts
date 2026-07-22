import type { Variants } from "motion/react";

// Snappy personality: quick, ease-out-expo, no bounce.
export const DURATION = {
  fast: 0.3,
  base: 0.45,
  slow: 0.5,
} as const;

export const EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
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
