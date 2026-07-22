"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
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

// How many icons stay visible while collapsed, per breakpoint. The grid is a
// single continuous flow (grid-cols-4 / md:grid-cols-5), so a collapsed row is
// exactly one grid row: 4 on mobile, 5 from md. Expanding reveals the rest and
// they flow into clean rows with no orphaned items.
const MOBILE_VISIBLE = 4;
const DESKTOP_VISIBLE = 5;

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

function collapsedVisibilityClass(index: number): string {
  // Beyond the desktop row: hidden on every breakpoint.
  if (index >= DESKTOP_VISIBLE) return "hidden";
  // The item that only fits the desktop row: hidden on mobile, shown from md.
  if (index >= MOBILE_VISIBLE) return "hidden md:block";
  // First mobile row: always visible.
  return "";
}

export default function TechStack() {
  const [expanded, setExpanded] = useState(false);

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

      <Reveal
        as="ul"
        className="grid grid-cols-4 gap-x-2 gap-y-8 p-6 md:grid-cols-5"
        stagger={0.06}
      >
        {technologies.map((tech, index) => (
          <RevealItem
            as="li"
            key={tech.title}
            className={expanded ? "" : collapsedVisibilityClass(index)}
          >
            <TechItem tech={tech} />
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}
