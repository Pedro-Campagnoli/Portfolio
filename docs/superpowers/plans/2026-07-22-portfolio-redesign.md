# Portfolio Redesign ("Relatório de Teste") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio around a "Relatório de Teste" (test report) visual concept — purple-led palette, Space Grotesk/Inter/JetBrains Mono type system, spec-file section labels, and a QA-flavored skills checklist — while fixing broken header navigation and adding the missing Experience and Contact sections.

**Architecture:** Single Next.js App Router page (`src/app/page.tsx`) composed of colocated `_components`. No new routes, no new dependencies, no test framework introduced (none exists today). Visual tokens live in `globals.css` as CSS custom properties consumed via Tailwind v4's `@theme` block; fonts load via `next/font/google` in `layout.tsx`.

**Tech Stack:** Next.js (App Router), React 19, Tailwind CSS v4, TypeScript (strict), pnpm, react-icons.

## Global Constraints

- Package manager is pnpm — use `pnpm lint` and `pnpm build`, never npm/yarn.
- All visible page copy stays in Brazilian Portuguese (pt-BR).
- `pnpm lint` and `pnpm build` must pass with no new errors after every task.
- No automated test framework exists and none is introduced in this plan — verification is lint + build + manual visual check via `pnpm dev`.
- Real content for the Experience and QA Portfolio sections stays out of scope — both remain explicit, honestly-labeled placeholders.
- `@/*` resolves to `./src/*` (see `tsconfig.json`) — use this alias for imports from `src`.
- TypeScript is `strict: true` — no implicit `any`, all new props/functions must be typed.

---

### Task 1: Design tokens and font system

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: CSS custom properties `--background`, `--foreground`, `--primary-text`, `--primary`, `--signal` (light/dark values) and Tailwind utilities `font-sans` (body/Inter), `font-display` (Space Grotesk), `font-mono` (JetBrains Mono), `text-signal` / `bg-signal` (new `--color-signal` theme color). Every later task relies on these class names.

- [ ] **Step 1: Replace color tokens and font theme mapping in `globals.css`**

Replace the full contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --background: #F6F7F5;
  --foreground: #12161C;
  --primary-text: #4B5563;
  --primary: #8B2FC9;
  --signal: #39D98A;
}

.dark {
  --background: #0B0F14;
  --foreground: #E6EDF3;
  --primary-text: #97A3B0;
  --primary: #8B2FC9;
  --signal: #39D98A;
}

@theme {
  --font-sans: var(--font-inter);
  --font-display: var(--font-space-grotesk);
  --font-mono: var(--font-jetbrains-mono);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary-text: var(--primary-text);
  --color-primary: var(--primary);
  --color-signal: var(--signal);
}
```

Note: `--primary-text` uses a darker slate (`#4B5563`) in light mode than the raw `slate` token from the spec (`#6B7785`) to keep body-text contrast at AA on the `paper` background (`#F6F7F5`); dark mode uses a lighter tint (`#97A3B0`) for the same reason against `ink` (`#0B0F14`). `primary` and `signal` match the spec exactly in both modes.

- [ ] **Step 2: Swap Poppins for the three-font system in `layout.tsx`**

Replace the full contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Header from "./_components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Pedro Campagnoli — QA Engineer",
  description:
    "Portfolio de Pedro Campagnoli, profissional de Quality Assurance com background em desenvolvimento Full Stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.className}`}
    >
      <body className="bg-background text-foreground">
        <Header />
        {children}
      </body>
    </html>
  );
}
```

This also fixes `lang="en"` to `lang="pt-BR"` (page content is Portuguese) and replaces the generic "Create Next App" boilerplate metadata, both pre-existing issues in a file this task already touches.

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: no new errors.

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 5: Manual visual check**

Run: `pnpm dev`, open `http://localhost:3000`.
Expected: body text now renders in Inter (not Poppins); background is warm off-white in light mode and near-black in dark mode (toggle via the theme button); no layout breakage.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: introduce test-report color tokens and Space Grotesk/Inter/JetBrains Mono font system"
```

---

### Task 2: Restructure `page.tsx` — hero status bar, section labels, skills section wrapper

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `font-display`, `font-mono`, `text-signal` Tailwind utilities from Task 1.
- Produces: local `SectionLabel({ file, describe }: { file: string; describe: string })` component inside `page.tsx`, reused by Tasks 3 and 4. Produces section `id="skills"` wrapping the existing `IconsList`, matching the nav id Task 7 will link to.

- [ ] **Step 1: Replace the full contents of `src/app/page.tsx`**

```tsx
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

import AboutCards from "./_components/AboutCards";
import IconsList from "./_components/IconsList";

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

      {/* HERO */}
      <header className="flex flex-col items-center justify-center min-h-screen gap-10 text-center px-4">

        <h1 className="text-foreground font-display font-bold text-5xl md:text-6xl">
          Pedro Campagnoli
        </h1>

        <span className="text-primary text-xl font-medium">
          QA Engineer • Software Quality Assurance
        </span>

        <p className="text-primary-text max-w-2xl">
          Profissional de Quality Assurance com background em desenvolvimento Full Stack.
          Especializado em testes funcionais, validação de APIs e análise de qualidade
          durante todo o ciclo de desenvolvimento, garantindo aplicações estáveis,
          confiáveis e centradas no usuário.
        </p>

        <p className="text-signal font-mono text-sm">
          ✓ 6 passed · 0 failed · build: ready
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
          <span className="text-signal font-mono text-xs">// em construção</span>
        </div>

        <p className="text-primary-text max-w-2xl text-center">
          Projetos focados em Quality Assurance incluindo testes funcionais,
          validação de APIs, documentação de bugs e práticas de qualidade
          aplicadas em aplicações reais.
        </p>
      </section>

    </main>
  );
}
```

This drops the unconditional `brightness-200` filter that was previously compensating for the low-contrast `#730099` — the new `#8B2FC9` primary has enough contrast on both `paper` and `ink` without it.

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no new errors.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 4: Manual visual check**

Run: `pnpm dev`, open `http://localhost:3000`.
Expected: hero shows the `✓ 6 passed · 0 failed · build: ready` line in mono/green below the pitch paragraph; "Sobre", "Skills" and "QA Portfolio" headings each show a two-line mono label above them (file name + `describe(...)`); "QA Portfolio" heading shows a green `// em construção` tag next to it; scrolling to `#skills` in the browser URL bar jumps to the skills section.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add test-report section labels, hero status line, and skills section wrapper"
```

---

### Task 3: Experience section

**Files:**
- Create: `src/app/_components/ExperienceSection.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SectionLabel` component defined in `page.tsx` (Task 2).
- Produces: default-exported `ExperienceSection()` component rendering a placeholder timeline; consumed only by `page.tsx`.

- [ ] **Step 1: Create `src/app/_components/ExperienceSection.tsx`**

```tsx
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
    <ul className="flex w-full max-w-2xl flex-col">
      {experience.map((item, index) => (
        <li
          key={item.period}
          className={`flex flex-col gap-2 border-primary-text/20 py-6 ${
            index !== experience.length - 1 ? "border-b" : ""
          }`}
        >
          <span className="text-signal font-mono text-xs">{item.period}</span>
          <h3 className="text-foreground text-lg font-semibold">
            {item.role}{" "}
            <span className="text-primary-text font-normal">· {item.company}</span>
          </h3>
          <p className="text-primary-text text-sm">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Insert the Experience section into `page.tsx`**

In `src/app/page.tsx`, add the import alongside the existing ones:

```tsx
import AboutCards from "./_components/AboutCards";
import ExperienceSection from "./_components/ExperienceSection";
import IconsList from "./_components/IconsList";
```

Insert the following section between the closing `</section>` of `{/* ABOUT */}` and the opening `{/* SKILLS */}` comment:

```tsx
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

```

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: no new errors.

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 5: Manual visual check**

Run: `pnpm dev`, open `http://localhost:3000#experience`.
Expected: a new "Experiência" section renders between Sobre and Skills, showing two placeholder timeline entries with period, role, and description; both entries clearly say "Em atualização" / "serão adicionados em breve" rather than fabricated company names.

- [ ] **Step 6: Commit**

```bash
git add src/app/_components/ExperienceSection.tsx src/app/page.tsx
git commit -m "feat: add placeholder Experience section"
```

---

### Task 4: Contact section

**Files:**
- Create: `src/app/_components/ContactSection.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SectionLabel` component defined in `page.tsx` (Task 2).
- Produces: default-exported `ContactSection()` component; consumed only by `page.tsx`.

- [ ] **Step 1: Create `src/app/_components/ContactSection.tsx`**

```tsx
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="text-primary-text max-w-md">
        Aberto a oportunidades em Quality Assurance e desenvolvimento.
        Entre em contato pelo e-mail ou pelas redes abaixo.
      </p>

      <a
        href="mailto:dev.pedro.campagnoli@gmail.com"
        className="bg-primary rounded-2xl px-6 py-4 text-sm text-white
        transition-all duration-300 hover:scale-105"
      >
        dev.pedro.campagnoli@gmail.com
      </a>

      <div className="text-primary-text flex gap-6">
        <a
          href="https://github.com/Pedro-Campagnoli"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="hover:text-primary transition-all hover:scale-125" size={32} />
        </a>

        <a
          href="https://www.linkedin.com/in/pedro-campagnoli-52737325b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn className="hover:text-primary transition-all hover:scale-125" size={32} />
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Insert the Contact section into `page.tsx`**

In `src/app/page.tsx`, add the import:

```tsx
import ContactSection from "./_components/ContactSection";
```

Insert the following section right before the closing `</main>` tag, after the `{/* QA PROJECTS */}` section:

```tsx
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

```

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: no new errors.

- [ ] **Step 4: Build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 5: Manual visual check**

Run: `pnpm dev`, open `http://localhost:3000#contact`.
Expected: a new "Contato" section renders at the end of the page with the mono spec label, an email CTA button, and GitHub/LinkedIn icon links that open in a new tab.

- [ ] **Step 6: Commit**

```bash
git add src/app/_components/ContactSection.tsx src/app/page.tsx
git commit -m "feat: add Contact section"
```

---

### Task 5: Restyle `AboutCards`

**Files:**
- Modify: `src/app/_components/AboutCards.tsx`

**Interfaces:**
- Consumes: `font-display` (not used here — card titles intentionally stay in the body face per the type plan's "use the display face with restraint" rule), `text-signal`/`text-primary`/`text-primary-text` tokens from Task 1.
- Produces: no change to the component's public shape (still a default-exported, no-props component) — later tasks are unaffected.

- [ ] **Step 1: Replace the full contents of `src/app/_components/AboutCards.tsx`**

```tsx
import { FaCode } from "react-icons/fa";
import { GoZap } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { MdOutlinePalette } from "react-icons/md";

const highlights = [
  {
    icon: FaCode,
    title: "Código Limpo",
    description: "Escrevo código legível, testável e de fácil manutenção seguindo as melhores práticas.",
  },
  {
    icon: MdOutlinePalette,
    title: "Design",
    description: "Crio interfaces modernas e intuitivas, com atenção a cada detalhe visual.",
  },
  {
    icon: GoZap,
    title: "Performance",
    description: "Otimizo aplicações para carregamento rápido e experiência fluida.",
  },
  {
    icon: HiUsers,
    title: "Colaboração",
    description: "Trabalho bem em equipe, com comunicação clara e entregas consistentes.",
  },
];

export default function AboutCards() {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      {highlights.map((item) => (
        <div
          key={item.title}
          className="group bg-primary/5 flex flex-col gap-3 rounded-lg border border-primary-text/20 p-5 transition-colors hover:border-primary/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <item.icon className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
          <p className="text-xs leading-relaxed text-primary-text">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
```

This also corrects the pre-existing accent-stripped copy ("Codigo Limpo", "otimizo aplicacoes" etc.) to proper pt-BR accents, and drops the dead `bg-card` class (not a real Tailwind utility, had no effect).

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no new errors.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 4: Manual visual check**

Run: `pnpm dev`, open `http://localhost:3000#about`.
Expected: the four highlight cards render with a subtle purple-tinted border that brightens on hover, matching the new palette in both light and dark mode.

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/AboutCards.tsx
git commit -m "style: restyle AboutCards for the new palette and fix accented copy"
```

---

### Task 6: Restyle `IconsList` as a checklist

**Files:**
- Modify: `src/app/_components/IconsList.tsx`

**Interfaces:**
- Consumes: `text-signal`/`font-mono` tokens from Task 1.
- Produces: no change to the component's public shape (still default-exported, no props) — `page.tsx`'s `<IconsList />` usage from Task 2 is unaffected.

- [ ] **Step 1: Replace the full contents of `src/app/_components/IconsList.tsx`**

```tsx
import Image, { StaticImageData } from "next/image";

import Cypress from "@/public/icons/cypress.svg";
import Jest from "@/public/icons/jest.svg";
import Jira from "@/public/icons/jira.svg";
import Playwright from "@/public/icons/playwright.svg";
import Postman from "@/public/icons/postman.svg";
import Selenium from "@/public/icons/selenium.svg";
import Sql from "@/public/icons/sql.svg";

import Css from "@/public/icons/css.svg";
import Html from "@/public/icons/html.svg";
import Javascript from "@/public/icons/javascript.svg";
import Nest from "@/public/icons/nest.svg";
import Next from "@/public/icons/next.svg";
import Node from "@/public/icons/node.svg";
import ReactIcon from "@/public/icons/react.svg";
import Tailwind from "@/public/icons/tailwind.svg";
import Typescript from "@/public/icons/typescript.svg";

type IconItem = { icon: StaticImageData; title: string };

const qaIcons: IconItem[] = [
  { icon: Postman, title: "Postman" },
  { icon: Playwright, title: "Playwright" },
  { icon: Cypress, title: "Cypress" },
  { icon: Selenium, title: "Selenium" },
  { icon: Jest, title: "Jest" },
  { icon: Jira, title: "Jira" },
  { icon: Sql, title: "SQL" },
];

const devIcons: IconItem[] = [
  { icon: ReactIcon, title: "React" },
  { icon: Next, title: "Next.js" },
  { icon: Node, title: "Node" },
  { icon: Nest, title: "NestJS" },
  { icon: Typescript, title: "TypeScript" },
  { icon: Javascript, title: "JavaScript" },
  { icon: Html, title: "HTML" },
  { icon: Css, title: "CSS" },
  { icon: Tailwind, title: "Tailwind" },
];

function IconGroup({ title, icons }: { title: string; icons: IconItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-primary font-mono text-sm font-semibold">
        {title}
      </span>

      <ul className="border-primary-text/20 bg-primary/5 flex flex-col gap-2 rounded-lg border p-4">
        {icons.map((item) => (
          <li
            key={item.title}
            className="text-foreground flex items-center gap-3 text-sm"
          >
            <span className="text-signal font-mono">✓</span>
            <Image src={item.icon} alt="" width={20} height={20} className="opacity-90" />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IconList() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <IconGroup title="🧪 Quality Assurance" icons={qaIcons} />
      <IconGroup title="💻 Development" icons={devIcons} />
    </div>
  );
}
```

This removes the hardcoded `bg-white`/`border-foreground` box (which ignored dark mode entirely), replaces the icon-only grid with a checklist (icon + label + mono `✓`), and stacks the two groups vertically on mobile instead of overflowing horizontally.

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no new errors.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 4: Manual visual check**

Run: `pnpm dev`, open `http://localhost:3000#skills`, toggle dark/light mode.
Expected: skills render as two checklists (QA / Development) with a green mono `✓` before each item; the panel background adapts to light/dark instead of staying hardcoded white; on a narrow viewport (e.g. 375px) the two groups stack vertically instead of overflowing.

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/IconsList.tsx
git commit -m "style: turn IconsList into a dark-mode-aware checklist"
```

---

### Task 7: Fix Header navigation and brand typography

**Files:**
- Modify: `src/app/_components/Header.tsx`

**Interfaces:**
- Consumes: `id="about"`, `id="experience"`, `id="skills"`, `id="qa-projects"`, `id="contact"` sections produced by Tasks 2–4 in `page.tsx`.
- Produces: no change to the component's public shape (still default-exported, no props).

- [ ] **Step 1: Replace the full contents of `src/app/_components/Header.tsx`**

```tsx
"use client"
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type LinkProps = {
  href: string;
  label: string;
};

export default function Header() {
  const Links: LinkProps[] = [
    { href: "#", label: "Início" },
    { href: "#about", label: "Sobre" },
    { href: "#experience", label: "Experiência" },
    { href: "#skills", label: "Skills" },
    { href: "#qa-projects", label: "QA Portfolio" },
    { href: "#contact", label: "Contato" },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md text-primary-text flex items-center justify-around p-8 z-50 transition-all duration-300 ease-in-out ${scrolled ? "shadow-md border-b border-primary-text" : ""}`}>
      <h1 className="text-2xl font-display font-bold">Pedro Campagnoli</h1>

      <div className="flex gap-10">
        {Links.map((link) => (
            <a
            className="hover:brightness-150 dark:hover:brightness-80 transition-all duration-300"
            href={link.href} key={link.href}>{link.label}
            </a>
          ))
        }
      </div>
      <ThemeToggle />
    </header>
  );
}
```

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no new errors.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 4: Manual visual check**

Run: `pnpm dev`, open `http://localhost:3000`.
Expected: clicking each header nav item ("Início", "Sobre", "Experiência", "Skills", "QA Portfolio", "Contato") scrolls to a real section — none are dead links; the brand name "Pedro Campagnoli" renders in Space Grotesk.

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/Header.tsx
git commit -m "fix: point header nav links at real sections and use display font for brand"
```

---

## Self-Review Notes

- **Spec coverage:** every "Mudanças por arquivo" entry in the spec maps to a task (tokens/fonts → Task 1; page restructure/status bar/labels/"em construção" → Task 2; Experience → Task 3; Contact → Task 4; AboutCards → Task 5; IconsList → Task 6; Header → Task 7).
- **Placeholder scan:** no TBD/TODO markers; the Experience section's placeholder copy is intentional per spec and explicitly says so to the visitor rather than inventing fake employers.
- **Type consistency:** `SectionLabel({ file, describe })` defined once in Task 2, reused verbatim in Tasks 3–4. `IconItem` type defined and used consistently within Task 6. Section `id`s (`about`, `experience`, `skills`, `qa-projects`, `contact`) match exactly between `page.tsx` (Tasks 2–4) and `Header.tsx` (Task 7).
