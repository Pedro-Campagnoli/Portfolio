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
    role: "QA Engineer / SDET",
    company: "Grupo DBM",
    description: [
      "Desenvolvimento & Manutenção: Implementação de regras de negócio, correções e melhorias utilizando PHP (Zend Framework), JS, HTML5 e CSS.",
      "Arquitetura de Automação: Criação da suíte de testes E2E do zero com Playwright e TypeScript (POM, Component Objects e DDT).",
      "Controle de Estado & APIs: Helpers de API para chaveamento de permissões no backend e execução de testes isolada/paralela.",
      "Investigação Causa-Raiz: Análise de bugs no código fonte e banco de dados, atuando como ponte técnica entre Dev e Produto."
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full flex justify-around mx-auto h-auto flex-col md:flex-row p-6 gap-12 md:gap-0"
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

      <div className="flex flex-col h-full justify-center items-end">
        <Reveal as="div" className="flex flex-col gap-4" delay={0.1}>
          <SectionLabel file="portfolio.spec.ts" describe="QA Portfolio" />
          <DevCard label="qa-portfolio.ts">
            <div className="flex flex-col items-center gap-4">
              <span className="text-signal text-justify w-full font-mono text-[10px] md:text-xs">{`// em construção`}</span>
              <p className="text-primary-text max-w-2xl text-xs md:text-sm md:text-justify">
                Projetos focados em Quality Assurance incluindo testes
                funcionais, validação de APIs, documentação de bugs e práticas de
                qualidade aplicadas em aplicações reais.
              </p>
            </div>
          </DevCard>
        </Reveal>
      </div>
    </section>
  );
}