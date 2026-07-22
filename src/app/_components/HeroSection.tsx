import Image from "next/image";
import type { ReactNode } from "react";
import { FaArrowRight, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

import DevCard from "./DevCard";
import SectionLabel from "./SectionLabel";
import TechStack from "./TechStack";

export default function HeroSection() {
  const profile = {
    name: "Pedro Campagnoli",
    role: "QA Engineer",
    focus: "Test Automation & Quality",
    background: "Full Stack Developer",
    location: "Brasil",
    isAvailableForHire: true,
  };
  return (
    <section className="flex min-h-screen w-full flex-col justify-center gap-16 px-4 py-6">
      <div className="flex w-full flex-col items-center justify-between gap-10 text-center md:flex-row">
        <div className="flex flex-col items-start justify-center gap-6">
          <SectionLabel file="index.tsx" describe="Home" />
          <div
            className="rounded-xl flex items-center p-2 gap-2 
        border border-border bg-surface hover:border-color-border-strong "
          >
            <div className="bg-signal h-2 w-2 rounded-full" />
            <span className="text-sm">
              $ qa-engineer --passion=quality --focus=people
            </span>
          </div>

          <h1 className="text-foreground font-display font-bold text-5xl md:text-6xl">
            Pedro Campagnoli
          </h1>

          <span className="text-primary text-xl font-medium">
            QA Engineer • Software Quality Assurance
          </span>

          <p className="text-primary-text text-justify max-w-2xl">
            Profissional de Quality Assurance com background em desenvolvimento
            Full Stack. Especializado em testes funcionais, validação de APIs e
            análise de qualidade durante todo o ciclo de desenvolvimento,
            garantindo aplicações estáveis, confiáveis e centradas no usuário.
          </p>

          <div className="flex gap-4">
            <span
              className="text-signal font-mono text-sm p-2 rounded-md
          border border-border bg-surface hover:border-color-border-strong"
            >
              ✓ 6 passed
            </span>
            <span
              className="text-signal font-mono text-sm p-2 rounded-md
          border border-border bg-surface hover:border-color-border-strong"
            >
              · 0 failed
            </span>
            <span
              className="text-signal font-mono text-sm p-2 rounded-md
          border border-border bg-surface hover:border-color-border-strong"
            >
              · build: ready
            </span>
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            <a
              href="#qa-projects"
              className="text-white font-bold text-sm bg-primary flex items-center gap-2 rounded-2xl px-6 py-4
                          hover:scale-110 transition-all duration-300"
            >
              Ver Portfólio QA 
              <FaArrowRight />
            </a>

            <a
              href="mailto:dev.pedro.campagnoli@gmail.com"
              className="
                flex items-center gap-2
                rounded-2xl
                border border-border
                bg-surface
                px-6 py-4
                text-sm text-foreground

                hover:scale-110
                hover:border-color-border-strong

                transition-transform
                duration-200
                ease-out
              "
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
                  className="hover:text-primary hover:scale-125 transition-transform"
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
                  className="hover:text-primary hover:scale-125 transition-transform"
                  size={38}
                />
              </a>

              <a href="mailto:dev.pedro.campagnoli@gmail.com" aria-label="Email">
                <LuMail
                  className="hover:text-primary hover:scale-125 transition-transform"
                  size={38}
                />
              </a>
            </div>
          </div>

        </div>

        <DevCard label="developer.ts">
          <div className="flex flex-col">
            <div className="flex justify-center px-6 py-6">
              <Image
                width={200}
                height={200}
                src="https://github.com/Pedro-Campagnoli.png"
                alt="Pedro Campagnoli"
                className="h-32 w-32 rounded-full border-2 border-border"
              />
            </div>

            <div className="overflow-x-auto px-4 pb-6 text-left leading-6">
              <CodeLine number={1}>
                <span className="text-primary">const</span>{" "}
                <span className="text-info">developer</span>
                <span className="text-primary-text "> = {"{"}</span>
              </CodeLine>
              <CodeLine number={2}>
                {"  "}
                <span className="text-danger">name</span>
                <span className="text-primary-text">: </span>
                <span className="text-signal">{`'${profile.name}'`}</span>
                <span className="text-primary-text">,</span>
              </CodeLine>
              <CodeLine number={3}>
                {"  "}
                <span className="text-danger">role</span>
                <span className="text-primary-text">: </span>
                <span className="text-signal">{`'${profile.role}'`}</span>
                <span className="text-primary-text">,</span>
              </CodeLine>
              <CodeLine number={4}>
                {"  "}
                <span className="text-danger">focus</span>
                <span className="text-primary-text">: </span>
                <span className="text-signal">{`'${profile.focus}'`}</span>
                <span className="text-primary-text">,</span>
              </CodeLine>
              <CodeLine number={5}>
                {"  "}
                <span className="text-danger">background</span>
                <span className="text-primary-text">: </span>
                <span className="text-signal">{`'${profile.background}'`}</span>
                <span className="text-primary-text">,</span>
              </CodeLine>
              <CodeLine number={6}>
                {"  "}
                <span className="text-danger">location</span>
                <span className="text-primary-text">: </span>
                <span className="text-signal">{`'${profile.location}'`}</span>
                <span className="text-primary-text">,</span>
              </CodeLine>
              <CodeLine number={7}>
                {"  "}
                <span className="text-danger">available</span>
                <span className="text-primary-text">: </span>
                <span className="text-warning">
                  {profile.isAvailableForHire ? "true" : "false"}
                </span>
                <span className="text-primary-text">,</span>
              </CodeLine>
              <CodeLine number={8}>
                <span className="text-primary-text">{"};"}</span>
              </CodeLine>
            </div>
          </div>
        </DevCard>
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
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}
