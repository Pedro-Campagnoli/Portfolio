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
            <div className="flex flex-col items-center gap-4">
              <span className="text-signal text-justify w-full font-mono text-[10px] md:text-xs">{`// em construção`}</span>
              <p className="text-primary-text max-w-2xl text-start text-xs leading-relaxed text-pretty md:text-sm">
                Projetos pessoais e de estudo focados em back-end: APIs REST
                com Node.js, TypeScript e NestJS, modelagem de dados com Prisma
                ORM e ambientes com Docker, aplicados em cenários reais.
              </p>
            </div>
          </DevCard>
        </Reveal>
      </div>
    </section>
  );
}