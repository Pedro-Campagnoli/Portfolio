"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  duration?: number; // ms
  delay?: number; // ms
  className?: string;
};

export default function CountUp({
  to,
  duration = 900,
  delay = 0,
  className,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce || !inView) return;

    let raf = 0;
    let startTime = 0;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const delayTimer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(raf);
    };
  }, [inView, to, duration, delay, reduce]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
