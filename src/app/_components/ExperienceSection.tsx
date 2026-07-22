import DevCard from "./DevCard";
import Reveal, { RevealItem } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  description: string;
};

const experience: ExperienceEntry[] = [
  {
    period: "2024 — atual",
    role: "QA Engineer",
    company: "Em atualização",
    description: "Detalhes desta experiência serão adicionados em breve.",
  },
  {
    period: "2022 — 2024",
    role: "Desenvolvedor Full Stack",
    company: "Em atualização",
    description: "Detalhes desta experiência serão adicionados em breve.",
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full flex justify-around mx-auto h-auto flex-col md:flex-row p-6 gap-12 md:gap-0"
    >
      <div className="flex flex-col gap-4">
        <SectionLabel file="experiencia.spec.ts" describe="Experiência" />

        <DevCard label="trajetoria-profissional.ts">
          <Reveal
            as="ul"
            className="flex w-full max-w-2xl flex-col"
            stagger={0.1}
          >
            {experience.map((item, index) => (
              <RevealItem
                as="li"
                key={item.period}
                className={`flex flex-col gap-2 border-primary-text/20 py-6 ${
                  index !== experience.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="text-signal font-mono text-xs">
                  {item.period}
                </span>
                <h3 className="text-foreground text-lg font-semibold">
                  {item.role}{" "}
                  <span className="text-primary-text font-normal">
                    · {item.company}
                  </span>
                </h3>
                <p className="text-primary-text text-sm">{item.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </DevCard>
      </div>

      <div className="flex flex-col h-full justify-center items-end">
        <Reveal as="div" className="flex flex-col gap-4" delay={0.1}>
          <SectionLabel file="qa-portfolio.spec.ts" describe="QA Portfolio" />
          <DevCard label="qa-portfolio.ts">
            <div className="flex flex-col items-center gap-4">
              <span className="text-signal text-justify w-full font-mono text-xs">{`// em construção`}</span>
              <p className="text-primary-text max-w-2xl text-justify">
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
