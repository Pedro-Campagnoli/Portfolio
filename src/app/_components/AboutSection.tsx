import AboutCards from "./AboutCards";
import Reveal, { RevealItem } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

export default function AboutSection() {
  const focus = [
    {
      title: "Back-end e APIs",
      description:
        "Node.js, TypeScript e NestJS em arquitetura modular, com APIs REST, integração com serviços externos e tratamento de dados.",
    },
    {
      title: "Dados e persistência",
      description:
        "PostgreSQL, MySQL e SQLite com Prisma ORM: modelagem, consultas SQL e manutenção de regras já existentes no banco.",
    },
    {
      title: "Ambientes e ferramentas",
      description:
        "Docker nos ambientes de desenvolvimento, Git no controle de versão e Jira / Azure DevOps no acompanhamento do fluxo de trabalho.",
    },
    {
      title: "Qualidade no desenvolvimento",
      description:
        "Testes funcionais, testes de API com Postman e automação E2E com Playwright e Cypress, aplicados para entregar código mais confiável.",
    },
    {
      title: "Processo e IA",
      description:
        "Spec-Driven Development e uso de agentes como Claude Code e Codex para organizar e acelerar o ciclo de desenvolvimento.",
    },
  ];

  return (
    <section
      id="about"
      className="w-full flex flex-col lg:flex-row justify-center items-center gap-20 py-12 px-6 lg:items-stretch"
    >
      <Reveal as="div" className="flex max-w-lg flex-col gap-6">
        <SectionLabel file="about.spec.ts" describe="Sobre mim" />

        <h2 className="text-foreground font-display font-semibold text-2xl md:text-3xl">
          Um pouco sobre mim
        </h2>

        <div className="text-primary-text space-y-5 text-left text-xs md:text-sm">
          <p>
            Sou desenvolvedor de software, formado em Análise e Desenvolvimento
            de Sistemas, com foco em back-end e no ecossistema Node.js. Construo
            APIs e aplicações com TypeScript e NestJS em arquitetura modular,
            pensando em organização, escalabilidade e manutenção.
          </p>

          <p>
            Na minha atuação profissional trabalho com PHP no desenvolvimento de
            soluções para e-commerce e sistemas corporativos, incluindo projetos
            de força de vendas integrados a ERPs. Isso me coloca em contato
            diário com regras de negócio reais, integrações entre sistemas e a
            evolução de aplicações que rodam em produção.
          </p>

          <p className="font-medium text-foreground">
            Minhas principais áreas de atuação:
          </p>

          <Reveal as="ul" className="space-y-4" stagger={0.07}>
            {focus.map((item) => (
              <RevealItem
                as="li"
                key={item.title}
                className="border-l-2 border-primary/40 pl-4"
              >
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="mt-1 leading-relaxed">{item.description}</p>
              </RevealItem>
            ))}
          </Reveal>

          <p>
            Acredito que desenvolver software vai além de fazer a funcionalidade
            rodar: é entender o problema, modelar bem os dados e deixar o código
            organizado o suficiente para que a próxima pessoa consiga evoluir o
            sistema com segurança.
          </p>
        </div>
      </Reveal>

      <Reveal
        delay={0.1}
        className="flex w-full max-w-2xl items-center lg:self-stretch"
      >
        <AboutCards />
      </Reveal>
    </section>
  );
}
