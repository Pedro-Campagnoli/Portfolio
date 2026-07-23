import AboutCards from "./AboutCards";
import Reveal, { RevealItem } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

export default function AboutSection() {
  const focus = [
    "Automação E2E & Componentes: Projetos avançados com Playwright/TypeScript aplicando padrões como Page Object Model (POM), Component Objects e Data-Driven Testing (DDT).",
    "Design Patterns em Testes: Criação de Test Runners/Factories dinâmicos, abstração de API Helpers para preparação rápida de estado/massa de dados e setups avançados de autenticação global.",
    "Testes de API & Banco de Dados: Validações de endpoints (Postman/Requests) e dados via SQL.",
    "Qualidade Shift-Left: Atuação em todo o ciclo de vida do desenvolvimento (SDLC), garantindo que a qualidade seja construída desde a concepção do requisito até o deploy.",
  ];

  return (
    <section
      id="about"
      className="w-full flex flex-col lg:flex-row justify-center items-center gap-20 py-12 px-6"
    >
      <Reveal as="div" className="flex flex-col gap-6 max-w-xl">
        <SectionLabel file="about.spec.ts" describe="Sobre mim" />

        <h2 className="text-foreground font-display font-semibold text-2xl md:text-3xl">
          Um pouco sobre mim
        </h2>

        <div className="text-primary-text space-y-4 md:text-justify text-xs md:text-sm">
          <p>
            Sou um QA Engineer / SDET com background em desenvolvimento Full Stack,
            focado em construir arquiteturas de automação de testes escaláveis, limpas 
            e de alta manutenibilidade.
          </p>

          <p>
            Minha vivência como desenvolvedor me permite entender a fundo 
            a arquitetura de software, facilitando o rastreio de causa-raiz de bugs 
            e encurtando a ponte entre os times de desenvolvimento e produto.
          </p>

          <p>Minhas principais especialidades e boas práticas:</p>

          <Reveal as="ul" className="space-y-1" stagger={0.07}>
            {focus.map((item) => (
              <RevealItem as="li" key={item}>
                • {item}
              </RevealItem>
            ))}
          </Reveal>

          <p>
            Acredito que automação de testes de verdade vai além de simplesmente &quot;clicar em botões via 
            código&quot;: trata-se de aplicar engenharia de software para garantir entregas rápidas, confiáveis 
            e centradas no usuário.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <AboutCards />
      </Reveal>
    </section>
  );
}
