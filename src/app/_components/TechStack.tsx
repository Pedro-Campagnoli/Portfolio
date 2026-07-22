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

const INITIAL_COUNT = 5;
// On mobile the collapsed grid shows a single clean row of 4; the 5th base
// item only appears from the md breakpoint (where the grid becomes 5 columns)
// or once the list is expanded.
const MOBILE_VISIBLE = 4;

const baseTechnologies = technologies.slice(0, INITIAL_COUNT);
const extraTechnologies = technologies.slice(INITIAL_COUNT);

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

  const hasMore = extraTechnologies.length > 0;

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
        {baseTechnologies.map((tech, index) => (
          <RevealItem
            as="li"
            key={tech.title}
            className={index >= MOBILE_VISIBLE && !expanded ? "hidden md:block" : ""}
          >
            <TechItem tech={tech} />
          </RevealItem>
        ))}
      </Reveal>

      {hasMore && (
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div
            className={`min-h-0 overflow-hidden transition-opacity duration-500 ease-in-out ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            <ul className="grid grid-cols-4 gap-x-2 gap-y-8 px-6 pt-2 pb-6 md:grid-cols-5">
              {extraTechnologies.map((tech) => (
                <li key={tech.title}>
                  <TechItem tech={tech} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
