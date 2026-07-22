"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import { EASE } from "./motion/config";
import Reveal, { RevealItem } from "./motion/Reveal";

type Tech = { icon: string; title: string };

// Icons live in /public/icons and are referenced by URL — drop a new .svg in
// that folder and add an entry here, no import needed.
const technologies: Tech[] = [
  { icon: "/icons/playwright.svg", title: "Playwright" },
  { icon: "/icons/cypress.svg", title: "Cypress" },
  { icon: "/icons/jest.svg", title: "Jest" },
  { icon: "/icons/selenium.svg", title: "Selenium" },
  { icon: "/icons/postman.svg", title: "Postman" },
  { icon: "/icons/nest.svg", title: "Nest.js" },
  { icon: "/icons/react.svg", title: "React" },
  { icon: "/icons/node.svg", title: "Node.js" },
  { icon: "/icons/typescript.svg", title: "TypeScript" },
  { icon: "/icons/javascript.svg", title: "JavaScript" },
  { icon: "/icons/html.svg", title: "HTML" },
  { icon: "/icons/sql.svg", title: "SQL" },
  { icon: "/icons/git.svg", title: "Git" },
  { icon: "/icons/docker.svg", title: "Docker" },
];

// Icons kept while collapsed = one grid row. The grid reflows (4 cols on
// mobile, 5 from md), so clipping to one row's height shows 4 or 5
// automatically. Used only to decide whether the "Ver mais" toggle is needed.
const MOBILE_VISIBLE = 4;
// Height (px) used for the collapsed row before it is measured, so the first
// paint is already collapsed instead of flashing the whole grid.
const COLLAPSED_ROW_FALLBACK = 116;

function TechItem({ tech }: { tech: Tech }) {
  return (
    <div className="group flex flex-col items-center gap-3">
      <Image
        src={tech.icon}
        alt={tech.title}
        width={40}
        height={40}
        unoptimized
        className="h-10 w-10 object-contain transition-transform duration-200 group-hover:-translate-y-1"
      />
      <span className="text-primary-text text-center text-[10px] md:text-xs">
        {tech.title}
      </span>
    </div>
  );
}

export default function TechStack() {
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [collapsedHeight, setCollapsedHeight] = useState(COLLAPSED_ROW_FALLBACK);

  // Measure the height of the first grid row so the collapsed state clips to
  // exactly one row on any breakpoint (row 1 is whichever icons share the top
  // offset, so this stays correct whether the grid is 4 or 5 columns).
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const measure = () => {
      const grid = wrapper.firstElementChild as HTMLElement | null;
      if (!grid || grid.children.length === 0) return;

      const items = Array.from(grid.children) as HTMLElement[];
      const firstTop = items[0].offsetTop;
      const firstRow = items.filter((el) => el.offsetTop === firstTop);
      const rowHeight = Math.max(...firstRow.map((el) => el.offsetHeight));

      const styles = getComputedStyle(grid);
      const padTop = parseFloat(styles.paddingTop) || 0;
      const padBottom = parseFloat(styles.paddingBottom) || 0;

      setCollapsedHeight(padTop + rowHeight + padBottom);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const hasMore = technologies.length > MOBILE_VISIBLE;

  return (
    <div className="border-border bg-surface overflow-hidden w-full rounded-2xl border">
      <div className="mb-2 flex items-center">
        <div className="flex items-center justify-between gap-2 border-b border-border w-full bg-card-header-background px-4 py-3">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="h-1.5 w-1.5 md:h-3 md:w-3 rounded-full bg-danger" />
            <span className="h-1.5 w-1.5 md:h-3 md:w-3 rounded-full bg-warning" />
            <span className="h-1.5 w-1.5 md:h-3 md:w-3 rounded-full bg-success" />
            <span className="ml-0.5 select-none text-[10px] md:text-sm text-primary-text ">
              stacks.ts
            </span>
          </div>
          {hasMore && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls="tech-grid"
              className="text-primary flex items-center gap-1 text-[10px] md:text-md font-medium transition-opacity hover:opacity-80"
            >
              {expanded ? "Ver menos" : "Ver mais"}
              <LuChevronDown
                aria-hidden
                className={`transition-transform duration-500 ease-in-out ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      <motion.div
        id="tech-grid"
        ref={wrapperRef}
        initial={false}
        animate={{ height: expanded ? "auto" : collapsedHeight }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
        className="overflow-hidden"
      >
        <Reveal
          as="ul"
          className="grid grid-cols-4 gap-x-2 gap-y-8 p-6 md:grid-cols-5"
          stagger={0.06}
        >
          {technologies.map((tech) => (
            <RevealItem as="li" key={tech.title}>
              <TechItem tech={tech} />
            </RevealItem>
          ))}
        </Reveal>
      </motion.div>
    </div>
  );
}
