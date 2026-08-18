"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { FaArrowRight, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

import DevCard from "./DevCard";
import CodeStream from "./motion/CodeStream";
import { containerVariants, fadeUp } from "./motion/config";
import CountUp from "./motion/CountUp";
import HeroBackground from "./motion/HeroBackground";
import TypeLine from "./motion/TypeLine";
import SectionLabel from "./SectionLabel";
import TechStack from "./TechStack";

const profile = {
  name: "Pedro Campagnoli",
  role: "Backend Developer",
  focus: "Node.js, TypeScript & NestJS",
  background: "Full Stack Developer",
  location: "Cianorte, PR - Brasil",
  isAvailableForHire: true,
};

const codeLines: ReactNode[] = [
  <CodeLine number={1} key={1}>
    <span style={{ color: "var(--code-keyword)" }}>const</span>{" "}
    <span style={{ color: "var(--code-variable)" }}>developer</span>
    <span style={{ color: "var(--code-punctuation)" }}>{" = {"}</span>
  </CodeLine>,
  <CodeLine number={2} key={2}>
    {"  "}
    <span style={{ color: "var(--code-property)" }}>name</span>
    <span style={{ color: "var(--code-punctuation)" }}>: </span>
    <span style={{ color: "var(--code-string)" }}>{`'${profile.name}'`}</span>
    <span style={{ color: "var(--code-punctuation)" }}>,</span>
  </CodeLine>,
  <CodeLine number={3} key={3}>
    {"  "}
    <span style={{ color: "var(--code-property)" }}>role</span>
    <span style={{ color: "var(--code-punctuation)" }}>: </span>
    <span style={{ color: "var(--code-string)" }}>{`'${profile.role}'`}</span>
    <span style={{ color: "var(--code-punctuation)" }}>,</span>
  </CodeLine>,
  <CodeLine number={4} key={4}>
    {"  "}
    <span style={{ color: "var(--code-property)" }}>focus</span>
    <span style={{ color: "var(--code-punctuation)" }}>: </span>
    <span style={{ color: "var(--code-string)" }}>{`'${profile.focus}'`}</span>
    <span style={{ color: "var(--code-punctuation)" }}>,</span>
  </CodeLine>,
  <CodeLine number={5} key={5}>
    {"  "}
    <span style={{ color: "var(--code-property)" }}>background</span>
    <span style={{ color: "var(--code-punctuation)" }}>: </span>
    <span style={{ color: "var(--code-string)" }}>
      {`'${profile.background}'`}
    </span>
    <span style={{ color: "var(--code-punctuation)" }}>,</span>
  </CodeLine>,
  <CodeLine number={6} key={6}>
    {"  "}
    <span style={{ color: "var(--code-property)" }}>location</span>
    <span style={{ color: "var(--code-punctuation)" }}>: </span>
    <span style={{ color: "var(--code-string)" }}>
      {`'${profile.location}'`}
    </span>
    <span style={{ color: "var(--code-punctuation)" }}>,</span>
  </CodeLine>,
  <CodeLine number={7} key={7}>
    {"  "}
    <span style={{ color: "var(--code-property)" }}>available</span>
    <span style={{ color: "var(--code-punctuation)" }}>: </span>
    <span style={{ color: "var(--code-boolean)" }}>
      {profile.isAvailableForHire ? "true" : "false"}
    </span>
    <span style={{ color: "var(--code-punctuation)" }}>,</span>
  </CodeLine>,
  <CodeLine number={8} key={8}>
    <span style={{ color: "var(--code-punctuation)" }}>{"};"}</span>
  </CodeLine>,
];

export default function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-screen max-w-screen w-full flex-col justify-center gap-16 px-6 py-6">
      <HeroBackground />

      <div className="flex w-full flex-col items-start justify-between gap-10 text-center lg:flex-row">
        <motion.div
          className="order-2 mx-auto flex min-w-0 flex-col items-start justify-center gap-6 lg:order-1 lg:mx-0"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={containerVariants(0.09, 0.1)}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel file="index.ts" describe="Home" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-xl flex md:mx-0 items-center p-2 gap-2 border border-border bg-surface hover:border-border-strong"
          >
            <div className="bg-signal h-1.5 w-1.5 md:h-2 md:w-2 rounded-full" />
            <TypeLine
              className="text-xs md:text-sm"
              text="$ backend-dev --stack=node --focus=apis"
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-foreground font-display text-start w-full md:text-start font-bold text-4xl md:text-6xl"
          >
            Pedro Campagnoli
          </motion.h1>

          <motion.span
            variants={fadeUp}
            className="text-primary text-base md:text-xl font-medium text-start w-full md:text-start"
          >
            Backend Developer • Node.js • TypeScript • NestJS
          </motion.span>

          <motion.p
            variants={fadeUp}
            className="text-primary-text max-w-2xl text-start text-sm leading-relaxed text-pretty md:text-base"
          >
            Desenvolvedor de software com foco em back-end e no ecossistema
            Node.js. Construo APIs e aplicações com TypeScript e NestJS em
            arquitetura modular, trabalhando com bancos relacionais, Docker e
            integrações entre sistemas, sempre com atenção a código organizado,
            testável e fácil de manter.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4 mx-auto md:mx-0">
            <span className="text-signal font-mono text-[10px] md:text-sm p-2 rounded-xl border border-border bg-surface hover:border-border-strong">
              ✓ <CountUp to={6} delay={400} /> passed
            </span>
            <span className="text-signal font-mono text-[10px] md:text-sm p-2 rounded-xl border border-border bg-surface hover:border-border-strong">
              · 0 failed
            </span>
            <span className="text-signal font-mono text-[10px] md:text-sm p-2 rounded-xl border border-border bg-surface hover:border-border-strong">
              · build: ready
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex gap-6 flex-wrap justify-center"
          >
            <a
              href="#experience"
              className="text-white font-bold text-[10px] md:text-sm bg-primary flex items-center gap-2 rounded-2xl px-6 py-4 shadow-lg shadow-transparent transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-primary/30"
            >
              Ver Experiência
              <FaArrowRight />
            </a>

            <a
              href="mailto:dev.pedro.campagnoli@gmail.com"
              className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-6 py-4 text-[10px] md:text-sm text-foreground transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:border-border-strong"
            >
              Contato
              <LuMail />
            </a>

            <div className="flex text-primary-text gap-6 items-center ml-4">
              <a
                href="https://github.com/Pedro-Campagnoli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub
                  className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary hover:scale-125"
                  size={38}
                />
              </a>

              <a
                href="https://www.linkedin.com/in/pedro-campagnoli-52737325b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn
                  className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary hover:scale-125"
                  size={38}
                />
              </a>

              <a
                href="mailto:dev.pedro.campagnoli@gmail.com"
                aria-label="Email"
              >
                <LuMail
                  className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary hover:scale-125"
                  size={38}
                />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 mx-auto w-full min-w-0 max-w-md lg:order-2 lg:mx-0"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <DevCard label="developer.ts">
            <div className="flex w-full min-w-0 flex-col">
              <div className="flex justify-center py-6">
                <Image
                  width={200}
                  height={200}
                  src="https://github.com/Pedro-Campagnoli.png"
                  alt="Pedro Campagnoli"
                  className="h-32 w-32 rounded-full border-2 border-border"
                />
              </div>

              <CodeStream
                className="w-full min-w-0 text-xs md:text-sm px-4 pb-6 text-left leading-6"
                lines={codeLines}
                startDelay={0.7}
              />
            </div>
          </DevCard>
        </motion.div>
      </div>

      <TechStack />
    </section>
  );
}

function CodeLine({
  number,
  children,
}: {
  number: number;
  children: ReactNode;
}) {
  return (
    <div className="flex">
      <span className="w-8 shrink-0 select-none pr-4 text-right text-gray-600">
        {number}
      </span>
      <span className="min-w-0 whitespace-pre-wrap">{children}</span>
    </div>
  );
}
