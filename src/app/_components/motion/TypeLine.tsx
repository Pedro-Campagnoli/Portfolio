"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type TypeLineProps = {
  text: string;
  className?: string;
  speed?: number; // ms per character
  startDelay?: number; // ms before typing starts
};

export default function TypeLine({
  text,
  className,
  speed = 32,
  startDelay = 250,
}: TypeLineProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    // Restart from the beginning whenever a new typing run begins
    // (text/speed/startDelay change, or reduced-motion turns back off).
    if (count !== 0) setCount(0);

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
    // `count` is intentionally read but omitted from deps: including it would
    // restart the interval on every keystroke. It is only used to reset a
    // stale value when the effect re-runs for another reason.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reduce]);

  // Reduced motion shows the full text with no typing; the value is derived
  // rather than stored so it can never flash empty before the effect runs.
  const displayCount = reduce ? text.length : count;
  const done = displayCount >= text.length;

  return (
    <span className={className}>
      <span aria-hidden="true">{text.slice(0, displayCount)}</span>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block ${
          reduce ? "opacity-0" : done ? "animate-blink" : ""
        }`}
      >
        ▍
      </span>
    </span>
  );
}
