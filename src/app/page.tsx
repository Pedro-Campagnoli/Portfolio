import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

import AboutCards from "./_components/AboutCards";
import IconsList from "./_components/IconsList";

export default function Home() {
  return (
    <main className="flex flex-col items-center">

      {/* HERO */}
      <header className="flex flex-col items-center justify-center min-h-screen gap-10 text-center px-4">

        <h1 className="text-foreground font-bold text-5xl md:text-6xl">
          Pedro Campagnoli
        </h1>

        <span className="text-primary text-xl font-medium brightness-200">
          QA Engineer • Software Quality Assurance
        </span>

        <p className="text-primary-text max-w-2xl">
          Profissional de Quality Assurance com background em desenvolvimento Full Stack.
          Especializado em testes funcionais, validação de APIs e análise de qualidade
          durante todo o ciclo de desenvolvimento, garantindo aplicações estáveis,
          confiáveis e centradas no usuário.
        </p>

        {/* CTA */}
        <div className="flex gap-6 flex-wrap justify-center">
          <a
            href="#qa-projects"
            className="text-white text-sm bg-primary rounded-2xl px-6 py-4
            hover:scale-110 transition-all duration-300"
          >
            Ver Portfólio QA
          </a>

          <a
            href="mailto:dev.pedro.campagnoli@gmail.com"
            className="text-foreground text-sm rounded-2xl px-6 py-4
            hover:scale-110 transition-all duration-300"
          >
            Contato
          </a>
        </div>

        {/* SOCIAL */}
        <div className="flex text-primary-text gap-6">
          <a
            href="https://github.com/Pedro-Campagnoli"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="hover:text-primary hover:scale-125 transition-all" size={38} />
          </a>

          <a
            href="https://www.linkedin.com/in/pedro-campagnoli-52737325b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="hover:text-primary hover:scale-125 transition-all" size={38} />
          </a>

          <a
            href="mailto:dev.pedro.campagnoli@gmail.com"
            aria-label="Email"
          >
            <LuMail className="hover:text-primary hover:scale-125 transition-all" size={38} />
          </a>
        </div>
      </header>

      {/* ABOUT */}
      <section
        id="about"
        className="w-full flex flex-col lg:flex-row justify-center items-center gap-20 py-24 px-6"
      >
        <div className="flex flex-col gap-6 max-w-xl">

          <span className="text-primary">/ / Sobre mim</span>

          <h2 className="text-foreground font-semibold text-3xl">
            Um pouco sobre mim
          </h2>

          <div className="text-primary-text space-y-4 text-justify">

            <p>
              Sou um profissional de tecnologia com background em desenvolvimento
              Full Stack e crescente especialização em Quality Assurance.
            </p>

            <p>
              Minha experiência com desenvolvimento permite compreender o
              funcionamento interno das aplicações, facilitando investigação
              de bugs, análise de comportamentos inesperados e comunicação
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
      <IconsList />

      {/* QA PROJECTS */}
      <section
        id="qa-projects"
        className="w-full py-24 flex flex-col items-center"
      >
        <h2 className="text-foreground text-3xl font-semibold mb-10">
          QA Portfolio
        </h2>

        <p className="text-primary-text max-w-2xl text-center">
          Projetos focados em Quality Assurance incluindo testes funcionais,
          validação de APIs, documentação de bugs e práticas de qualidade
          aplicadas em aplicações reais.
        </p>
      </section>

    </main>
  );
}