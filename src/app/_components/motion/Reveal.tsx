"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { containerVariants, fadeUp, VIEWPORT } from "./config";

// Only the semantic tags we actually use, kept type-safe.
const TAGS = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  li: motion.li,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
} as const;

type Tag = keyof typeof TAGS;

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
};

export default function Reveal({
  children,
  as = "div",
  className,
  id,
  delay = 0,
  stagger,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = TAGS[as];

  if (stagger != null) {
    return (
      <MotionTag
        id={id}
        className={className}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={VIEWPORT}
        variants={containerVariants(stagger, delay)}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  const MotionTag = TAGS[as];
  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
