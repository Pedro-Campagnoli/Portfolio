import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

import AboutCards from "./_components/AboutCards";
import ContactSection from "./_components/ContactSection";
import ExperienceSection from "./_components/ExperienceSection";
import IconsList from "./_components/IconsList";
import HeroSection from "./_components/HeroSection";

function SectionLabel({ file, describe }: { file: string; describe: string }) {
  return (
    <div className="text-primary-text font-mono text-xs leading-relaxed">
      <p>{file}</p>
      <p>{`describe('${describe}', () => {`}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />

      {/* ABOUT */}
      <section
        id="about"
        className="w-full flex flex-col lg:flex-row justify-center items-center gap-20 py-24 px-6"
      >
        <div className="flex flex-col gap-6 max-w-xl">
          <SectionLabel file="sobre.spec.ts" describe="Sobre mim" />

          <h2 className="text-foreground font-display font-semibold text-3xl">
            Um pouco sobre mim
          </h2>

          <div className="text-primary-text space-y-4 text-justify">
            <p>
              Sou um profissional de tecnologia com background em
              desenvolvimento Full Stack e crescente especialização em Quality
              Assurance.
            </p>

            <p>
              Minha experiência com desenvolvimento permite compreender o
              funcionamento interno das aplicações, facilitando investigação de
              bugs, análise de comportamentos inesperados e comunicação
              eficiente com desenvolvedores e times de produto.
            </p>

            <p>Tenho foco em:</p>

            <ul className="space-y-1">
              <li>• Testes Funcionais e Regressivos</li>
              <li>• Testes de API com Postman</li>
              <li>• Validação de dados com SQL</li>
              <li>• Qualidade durante todo o ciclo de desenvolvimento</li>
            </ul>

            <p>
              Acredito que software de qualidade nasce da combinação entre
              engenharia, testes bem estruturados e visão centrada no usuário.
            </p>
          </div>
        </div>

        <AboutCards />
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="w-full flex flex-col items-center gap-10 py-24 px-6"
      >
        <SectionLabel file="experiencia.spec.ts" describe="Experiência" />

        <h2 className="text-foreground font-display font-semibold text-3xl">
          Trajetória profissional
        </h2>

        <ExperienceSection />
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="w-full py-24 flex flex-col items-center gap-10 px-6"
      >
        <SectionLabel file="skills.spec.ts" describe="Skills" />

        <h2 className="text-foreground font-display font-semibold text-3xl">
          Stack e ferramentas
        </h2>

        <IconsList />
      </section>

      {/* QA PROJECTS */}
      <section
        id="qa-projects"
        className="w-full py-24 flex flex-col items-center px-6"
      >
        <SectionLabel file="qa-portfolio.spec.ts" describe="QA Portfolio" />

        <div className="flex items-center gap-3 mt-2 mb-10">
          <h2 className="text-foreground font-display font-semibold text-3xl">
            QA Portfolio
          </h2>
          <span className="text-signal font-mono text-xs">{`// em construção`}</span>
        </div>

        <p className="text-primary-text max-w-2xl text-center">
          Projetos focados em Quality Assurance incluindo testes funcionais,
          validação de APIs, documentação de bugs e práticas de qualidade
          aplicadas em aplicações reais.
        </p>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="w-full flex flex-col items-center gap-10 py-24 px-6"
      >
        <SectionLabel file="contato.spec.ts" describe="Contato" />

        <h2 className="text-foreground font-display font-semibold text-3xl">
          Vamos conversar?
        </h2>

        <ContactSection />
      </section>
    </main>
  );
}
