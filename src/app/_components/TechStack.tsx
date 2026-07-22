"use client";

import { motion, useReducedMotion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import Cypress from "@/public/icons/cypress.svg";
import Docker from "@/public/icons/docker.svg";
import Git from "@/public/icons/git.svg";
import Javascript from "@/public/icons/javascript.svg";
import Jest from "@/public/icons/jest.svg";
import Node from "@/public/icons/node.svg";
import Postman from "@/public/icons/postman.svg";
import ReactIcon from "@/public/icons/react.svg";
import Sql from "@/public/icons/sql.svg";
import Typescript from "@/public/icons/typescript.svg";

import { EASE } from "./motion/config";
import Reveal, { RevealItem } from "./motion/Reveal";

type Tech = { icon: StaticImageData; title: string };

const technologies: Tech[] = [
  { icon: Typescript, title: "TypeScript" },
  { icon: Javascript, title: "JavaScript" },
  { icon: Node, title: "Node.js" },
  { icon: ReactIcon, title: "React" },
  { icon: Postman, title: "Postman" },
  { icon: Sql, title: "SQL" },
  { icon: Git, title: "Git" },
  { icon: Docker, title: "Docker" },
  { icon: Jest, title: "Jest" },
  { icon: Cypress, title: "Cypress" },
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
        className="h-10 w-10 object-contain transition-transform duration-200 group-hover:-translate-y-1"
      />
      <span className="text-primary-text text-center text-xs">
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
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-danger" />
            <span className="h-3 w-3 rounded-full bg-warning" />
            <span className="h-3 w-3 rounded-full bg-success" />
            <span className="ml-2 select-none text-xs text-primary-text ">
              stacks.ts
            </span>
          </div>
          {hasMore && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls="tech-grid"
              className="text-primary flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80"
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
