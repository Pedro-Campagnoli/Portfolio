import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-10 text-center px-4">
      <div className="flex flex-col items-start justify-center gap-6">
        <div
          className="rounded-xl flex items-center p-2 gap-2 
        border border-border bg-surface hover:border-color-border-strong transition-all"
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
          border border-border bg-surface hover:border-color-border-strong transition-all"
          >
            ✓ 6 passed
          </span>
          <span
            className="text-signal font-mono text-sm p-2 rounded-md
          border border-border bg-surface hover:border-color-border-strong transition-all"
          >
            · 0 failed
          </span>
          <span
            className="text-signal font-mono text-sm p-2 rounded-md
          border border-border bg-surface hover:border-color-border-strong transition-all"
          >
            · build: ready
          </span>
        </div>

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

        <div className="flex text-primary-text gap-6">
          <a
            href="https://github.com/Pedro-Campagnoli"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub
              className="hover:text-primary hover:scale-125 transition-all"
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
              className="hover:text-primary hover:scale-125 transition-all"
              size={38}
            />
          </a>

          <a href="mailto:dev.pedro.campagnoli@gmail.com" aria-label="Email">
            <LuMail
              className="hover:text-primary hover:scale-125 transition-all"
              size={38}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
