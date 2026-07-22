"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type TypeLineProps = {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
};

export default function TypeLine({
  text,
  className,
  speed = 32,
  startDelay = 250,
}: TypeLineProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);

  const runKey = `${text}|${speed}|${startDelay}|${reduce}`;
  const prevRunKey = useRef(runKey);
  // eslint-disable-next-line react-hooks/refs
  if (prevRunKey.current !== runKey) {
    // eslint-disable-next-line react-hooks/refs
    prevRunKey.current = runKey;
    if (count !== 0) setCount(0);
  }

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      return;
    }
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
  }, [text, speed, startDelay, reduce]);

  const done = count >= text.length;

  return (
    <span className={className}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
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
