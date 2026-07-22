import AboutCards from "./AboutCards";
import Reveal, { RevealItem } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

export default function AboutSection() {
  const focus = [
    "Testes Funcionais e Regressivos",
    "Testes de API com Postman",
    "Validação de dados com SQL",
    "Qualidade durante todo o ciclo de desenvolvimento",
  ];

  return (
    <section
      id="about"
      className="w-full flex flex-col lg:flex-row justify-center items-center gap-20 py-12 px-6"
    >
      <Reveal as="div" className="flex flex-col gap-6 max-w-xl">
        <SectionLabel file="sobre.spec.ts" describe="Sobre mim" />

        <h2 className="text-foreground font-display font-semibold text-3xl">
          Um pouco sobre mim
        </h2>

        <div className="text-primary-text space-y-4 text-justify">
          <p>
            Sou um profissional de tecnologia com background em desenvolvimento
            Full Stack e crescente especialização em Quality Assurance.
          </p>

          <p>
            Minha experiência com desenvolvimento permite compreender o
            funcionamento interno das aplicações, facilitando investigação de
            bugs, análise de comportamentos inesperados e comunicação eficiente
            com desenvolvedores e times de produto.
          </p>

          <p>Tenho foco em:</p>

          <Reveal as="ul" className="space-y-1" stagger={0.07}>
            {focus.map((item) => (
              <RevealItem as="li" key={item}>
                • {item}
              </RevealItem>
            ))}
          </Reveal>

          <p>
            Acredito que software de qualidade nasce da combinação entre
            engenharia, testes bem estruturados e visão centrada no usuário.
          </p>
        </div>
      </Reveal>

      <AboutCards />
    </section>
  );
}
