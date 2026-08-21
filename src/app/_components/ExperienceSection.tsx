import { FaGithub } from "react-icons/fa";

import DevCard from "./DevCard";
import Reveal, { RevealItem } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  description: string[];
};

const experience: ExperienceEntry[] = [
  {
    period: "2025 — atual",
    role: "Desenvolvedor de Software | Analista de Suporte",
    company: "Grupo DBM",
    description: [
      "Desenvolvimento & Manutenção: Implementação de novas funcionalidades, regras de negócio e evolução de aplicações web em PHP, JavaScript, HTML5 e CSS.",
      "E-commerce: Desenvolvimento de páginas, funcionalidades administrativas e integrações necessárias para a operação das plataformas.",
      "Força de Vendas & ERPs: Funcionalidades voltadas à automatização e simplificação do processo de pedidos, integradas a sistemas ERP.",
      "APIs REST: Desenvolvimento e integração de APIs, comunicação entre sistemas, tratamento de dados e consumo de serviços externos.",
      "Banco de Dados: Atuação com bancos relacionais, análise de dados e manutenção de funcionalidades dependentes de regras e estruturas existentes.",
      "Requisitos & Qualidade: Análise de requisitos junto às áreas envolvidas e aplicação de testes funcionais, de API e automação E2E (Postman, Cypress, Playwright), com o fluxo acompanhado no Jira e Azure DevOps.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full flex justify-around mx-auto h-auto flex-col items-center lg:flex-row lg:items-stretch p-6 gap-12 lg:gap-0"
    >
      <div className="flex flex-col gap-4">
        <SectionLabel file="experience.spec.ts" describe="Experiência" />

        <DevCard label="professional-path.ts">
          <Reveal
            as="ul"
            className="flex w-full max-w-2xl flex-col"
            stagger={0.1}
          >
            {experience.map((item, index) => (
              <RevealItem
                as="li"
                key={item.period}
                className={`flex flex-col gap-3 border-primary-text/20 py-6 ${
                  index !== experience.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="text-signal font-mono text-[10px] md:text-xs">
                  {item.period}
                </span>
                <h3 className="text-foreground text-sm md:text-xl font-semibold">
                  {item.role}{" "}
                  <span className="text-primary-text font-normal">
                    · {item.company}
                  </span>
                </h3>

                {/* CORREÇÃO AQUI: 'item.description' ao invés de 'experience.description' */}
                <ul className="flex flex-col gap-2 mt-1">
                  {item.description.map((desc, descIndex) => (
                    <li
                      key={descIndex}
                      className="text-xs md:text-sm text-primary-text leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-signal select-none">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </Reveal>
        </DevCard>
      </div>

      <div className="flex flex-col h-full justify-center items-center lg:items-end">
        <Reveal as="div" className="flex flex-col gap-4" delay={0.1}>
          <SectionLabel file="portfolio.spec.ts" describe="Projetos" />
          <DevCard label="projects.ts">
            <div className="flex w-full flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-signal text-[10px] md:text-xs">
                    {`// em desenvolvimento`}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-foreground md:text-lg">
                    E-commerce API
                  </h3>
                </div>

                <a
                  href="https://github.com/Pedro-Campagnoli/ecommerce"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver repositório da E-commerce API no GitHub"
                  className="flex shrink-0 items-center gap-2 rounded-xl border border-border px-3 py-2 text-[10px] text-primary-text transition-[color,border-color,transform] duration-300 hover:scale-105 hover:border-border-strong hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:text-xs"
                >
                  <FaGithub aria-hidden />
                  GitHub
                </a>
              </div>

              <p className="text-pretty text-start text-xs leading-relaxed text-primary-text md:text-sm">
                API REST para e-commerce com autenticação de administradores e
                clientes, além do gerenciamento de produtos, categorias, cores e
                SKUs.
              </p>

              <div className="flex flex-wrap gap-2" aria-label="Tecnologias">
                {["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Docker"].map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-border bg-background px-2.5 py-1 text-[10px] text-primary-text md:text-xs"
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>
            </div>
          </DevCard>
        </Reveal>
      </div>
    </section>
  );
}
