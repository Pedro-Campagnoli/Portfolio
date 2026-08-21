"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { DURATION, EASE } from "./config";

type CodeStreamProps = {
  lines: ReactNode[];
  className?: string;
  startDelay?: number; // seconds before the first line
  stagger?: number; // seconds between lines
};

export default function CodeStream({
  lines,
  className,
  startDelay = 0.6,
  stagger = 0.09,
}: CodeStreamProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: startDelay },
        },
      }}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, transform: "translateX(-8px)" },
            show: {
              opacity: 1,
              transform: "translateX(0)",
              transition: { duration: DURATION.fast, ease: EASE },
            },
          }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}
