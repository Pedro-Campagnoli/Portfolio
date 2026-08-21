"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  LuBraces,
  LuBriefcaseBusiness,
  LuChevronDown,
  LuCode,
} from "react-icons/lu";

import Reveal, { RevealItem } from "./motion/Reveal";

type ExperienceDetail = {
  title: string;
  description: string;
};

type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  current?: boolean;
  details: ExperienceDetail[];
};

type Project = {
  name: string;
  description: string;
  status: string;
  repository: string;
  technologies: string[];
};

const experiences: ExperienceEntry[] = [
  {
    period: "2025 — atual",
    role: "Desenvolvedor de Software | Analista de Suporte",
    company: "Grupo DBM · Full-time",
    current: true,
    details: [
      {
        title: "Desenvolvimento & manutenção",
        description:
          "novas funcionalidades, regras de negócio e evolução de aplicações web em PHP, JavaScript, HTML5 e CSS.",
      },
      {
        title: "E-commerce",
        description:
          "páginas, ferramentas administrativas e integrações para a operação das plataformas.",
      },
      {
        title: "Força de vendas & ERPs",
        description:
          "automação do processo de pedidos e integração com sistemas ERP.",
      },
      {
        title: "APIs REST",
        description:
          "desenvolvimento e integração de APIs com NestJS, conteinerização com Docker, comunicação entre sistemas e consumo de serviços externos.",
      },
      {
        title: "Dados",
        description:
          "modelagem, consultas e manutenção de bancos relacionais PostgreSQL e MySQL.",
      },
      {
        title: "Requisitos & qualidade",
        description:
          "testes funcionais, de API e E2E com Postman, Cypress e Playwright, acompanhados no Jira e Azure DevOps.",
      },
    ],
  },
];

const projects: Project[] = [
  {
    name: "E-commerce API",
    description:
      "API REST em NestJS com autenticação de administradores e clientes, gerenciamento de produtos, categorias, cores e SKUs.",
    status: "Em desenvolvimento",
    repository: "https://github.com/Pedro-Campagnoli/ecommerce",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
  },
];

const technologyStyles: Record<string, string> = {
  NestJS: "border-red-400/15 bg-red-400/10 text-red-300",
  TypeScript: "border-blue-400/15 bg-blue-400/10 text-blue-300",
  PostgreSQL: "border-sky-400/15 bg-sky-400/10 text-sky-300",
  Prisma: "border-violet-400/15 bg-violet-400/10 text-violet-300",
  Docker: "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
};

const fallbackTechnologyStyle = "border-border bg-background text-primary-text";

export default function ExperienceSection() {
  const [openExperience, setOpenExperience] = useState<number | null>(0);

  return (
    <section id="experience" className="w-full scroll-mt-20 px-6 py-12">
      <div className="grid w-full items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal as="div" className="flex min-w-0 flex-col gap-5">
          <div className="flex items-center gap-3">
            <LuBriefcaseBusiness
              aria-hidden
              className="h-5 w-5 text-section-string"
            />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Experiência
            </h2>
          </div>

          <Reveal
            as="div"
            className="relative flex flex-col gap-2"
            stagger={0.05}
          >
            <span
              aria-hidden
              className="absolute top-[30px] bottom-[30px] left-7 z-10 w-px bg-border-strong"
            />

            {experiences.map((experience, index) => (
              <RevealItem
                key={`${experience.period}-${experience.role}`}
                className="relative"
              >
                <article
                  data-open={openExperience === index}
                  className="experience-item relative overflow-hidden rounded-xl border border-border bg-surface data-[open=true]:border-border-strong"
                >
                  <span
                    aria-hidden
                    className={`absolute top-6 left-[22px] z-20 h-3 w-3 rounded-full border-2 bg-surface ${
                      experience.current
                        ? "border-section-string shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_14%,transparent)]"
                        : "border-border-strong"
                    }`}
                  />

                  <button
                    type="button"
                    aria-expanded={openExperience === index}
                    aria-controls={`experience-panel-${index}`}
                    onClick={() =>
                      setOpenExperience((current) =>
                        current === index ? null : index,
                      )
                    }
                    className="relative w-full cursor-pointer py-4 pr-12 pl-16 text-left select-none sm:py-5 sm:pr-14"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-section-string sm:text-sm">
                        {experience.period}
                      </span>
                      {experience.current && (
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] text-section-string">
                          Atual
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 text-sm font-semibold leading-snug text-foreground sm:text-base">
                      {experience.role}
                    </h3>
                    <p className="mt-1.5 text-xs text-primary-text sm:text-sm">
                      {experience.company}
                    </p>

                    <LuChevronDown
                      aria-hidden
                      className="experience-chevron absolute top-5 right-4 h-4 w-4 text-primary-text sm:right-5"
                    />
                  </button>

                  <div
                    id={`experience-panel-${index}`}
                    aria-hidden={openExperience !== index}
                    className={`experience-panel ${
                      openExperience === index ? "is-open" : ""
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pr-4 pb-5 pl-16 sm:pr-5">
                        <ul className="flex flex-col gap-2.5 border-t border-border pt-4">
                          {experience.details.map((detail) => (
                            <li
                              key={detail.title}
                              className="grid grid-cols-[auto_1fr] gap-3 text-xs leading-relaxed text-primary-text sm:text-sm"
                            >
                              <span
                                aria-hidden
                                className="mt-[0.55em] h-1 w-1 rounded-full bg-section-string"
                              />
                              <span>
                                <strong className="font-medium text-foreground">
                                  {detail.title}:
                                </strong>{" "}
                                {detail.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </Reveal>

        <Reveal as="div" className="flex min-w-0 flex-col gap-5" delay={0.08}>
          <div className="flex items-center gap-3">
            <LuCode aria-hidden className="h-5 w-5 text-section-string" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Projetos
            </h2>
          </div>

          <Reveal as="div" className="projects-grid grid gap-4" stagger={0.05}>
            {projects.map((project) => (
              <RevealItem
                key={project.name}
                className="project-grid-item min-w-0"
              >
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver código de ${project.name} no GitHub`}
                  className="project-card group relative block min-h-64 overflow-hidden rounded-xl border border-border bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <div className="project-card-content flex min-h-64 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <LuBraces
                        aria-hidden
                        className="h-6 w-6 text-section-string"
                      />
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-signal">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                        {project.status}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-primary-text sm:text-sm">
                      {project.description}
                    </p>

                    <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                      <ul
                        className="flex flex-wrap gap-2"
                        aria-label="Tecnologias"
                      >
                        {project.technologies.map((technology) => (
                          <li
                            key={technology}
                            className={`rounded-md border px-2 py-1 font-mono text-[10px] ${
                              technologyStyles[technology] ??
                              fallbackTechnologyStyle
                            }`}
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                      <FaGithub
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-primary-text"
                      />
                    </div>
                  </div>

                  <span
                    aria-hidden
                    className="project-card-overlay pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/20">
                      <LuCode className="h-4 w-4" />
                      Ver código
                    </span>
                  </span>
                </a>
              </RevealItem>
            ))}
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
