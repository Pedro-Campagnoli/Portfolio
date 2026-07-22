# Redesign do Portfolio — "Relatório de Teste"

## Contexto

Portfolio pessoal de Pedro Campagnoli (QA Engineer / background Full Stack), Next.js App Router, conteúdo em pt-BR. O visual atual usa um roxo genérico (#730099) com Poppins e uma estrutura de cards/ícones sem identidade específica de QA. Problemas identificados no código atual:

- `Header.tsx` linka para `#expercience`, `#projects` e `#contact`, mas essas seções não existem em `page.tsx` (só `#about` e `#qa-projects`) — links quebrados.
- A seção "QA Portfolio" tem apenas um parágrafo descritivo, sem projetos reais listados.
- `IconsList.tsx` força um container `bg-white` fixo, que quebra no modo escuro.

## Objetivo

Redesenhar a identidade visual do portfolio em torno de um conceito próprio — "Relatório de Teste" — e resolver as lacunas estruturais de conteúdo (menu quebrado, seções faltantes), mantendo o conteúdo real de projetos QA como placeholder por enquanto (a ser preenchido depois, fora deste escopo).

## Conceito visual: "Relatório de Teste"

A página é lida como um relatório de execução de testes real. Cada seção é rotulada como um arquivo de spec / bloco `describe`, no vocabulário genuíno de QA — não decorativo, mas estrutural. Skills viram um checklist com `✓` em vez de um grid solto de ícones. O hero ganha uma linha de status estilo CI logo abaixo do nome.

Este conceito foi escolhido sobre duas alternativas consideradas ("Janela de Terminal" com prompt digitado, e "Dashboard de Status" com pills) por ser o mais fiel à identidade de QA sem recorrer a clichês visuais de "tema de terminal", e por manter a leitura minimalista pedida.

### Paleta

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#0B0F14` | Fundo modo escuro (quase-preto azulado) |
| `paper` | `#F6F7F5` | Fundo modo claro (branco quente) |
| `primary` | `#8B2FC9` | Roxo — cor de marca, acento dominante (botões, links, hover, destaques). Ajuste do `#730099` atual para manter contraste sobre `ink` |
| `signal` | `#39D98A` | Verde — uso mínimo e semântico: checkmarks do checklist de skills, status "passed" no hero |
| `slate` | `#6B7785` | Texto secundário / labels estilo comentário de código |

O roxo continua sendo a cor principal da marca. O verde aparece só nos pontos que reforçam a metáfora de "teste que passou".

### Tipografia

- **Display** (títulos, nome, headlines): Space Grotesk — caráter técnico sem ser clichê.
- **Corpo** (parágrafos): Inter — alta legibilidade.
- **Utilitária** (labels de seção, status, checklist): JetBrains Mono.

Substitui o Poppins atual, que não carrega personalidade específica para o conceito.

### Assinatura

- Cada seção é precedida por um label mono estilo arquivo de spec real, ex.: `sobre.spec.ts`, `describe('Pedro Campagnoli', () => {`.
- Skills (`IconsList`) viram um checklist com `✓` em mono verde por item/grupo, mantendo os ícones SVG existentes — não substituindo o grid inteiro por texto puro.
- No hero, uma linha de status estilo CI logo abaixo do nome, ex.: `✓ 6 passed · 0 failed · build: ready`.

### Layout

- Hero: nome grande em display + status bar mono abaixo, bastante espaço vazio.
- Seções: label mono no topo (tipo caminho de arquivo) → título display → conteúdo.
- Sem sombras/gradientes pesados; hairlines finas separando seções; cantos pouco arredondados.

## Estrutura de conteúdo

Ordem final das seções (substitui a estrutura atual):

1. **Hero** — nome, título, pitch, CTAs, social links, status bar CI (novo).
2. **Sobre** — texto atual + `AboutCards` restilizados para a nova paleta/tipografia.
3. **Experiência** (nova) — timeline simples de trajetória profissional. Conteúdo placeholder por enquanto (fora de escopo preencher com dados reais).
4. **Skills** — `IconsList` redesenhado como checklist QA vs Dev, mantendo os ícones.
5. **QA Portfolio** — mantém o texto atual, mas marcado explicitamente como "em construção" (placeholder). Conteúdo real de projetos fica para uma iteração futura.
6. **Contato** (nova) — CTA de e-mail + social links, seção dedicada no final (hoje só existe como ícones soltos no hero).

## Mudanças por arquivo

- **`globals.css`** — novos tokens de cor (`ink`/`paper`/`primary`/`signal`/`slate`) para `:root` e `.dark`, expostos via `@theme`; três variáveis de fonte (`--font-display`, `--font-body`, `--font-mono`).
- **`layout.tsx`** — troca o carregamento de fonte de Poppins (`next/font/google`) para Space Grotesk + Inter + JetBrains Mono, setando as três CSS vars.
- **`page.tsx`** — reestrutura conforme a ordem de seções acima; adiciona status bar no hero; adiciona labels tipo "spec file" no topo de cada seção; adiciona as seções de Experiência e Contato; marca QA Portfolio como "em construção".
- **`Header.tsx`** — corrige os links do menu para apontar só para as seções que vão existir de fato (`#about`, `#experience`, `#skills`, `#qa-projects`, `#contact`).
- **`AboutCards.tsx`** — reestiliza os cards existentes para a nova paleta/tipografia; mantém a mesma estrutura de dados e layout em grid.
- **`IconsList.tsx`** — remove o container `bg-white` fixo (quebra no dark mode); integra na paleta light/dark; adiciona marcador `✓` mono por grupo, mantendo os ícones SVG existentes.
- **Novo componente** — seção/componente de Experiência: timeline simples, conteúdo placeholder (2–3 entradas genéricas a definir na implementação).
- **Novo componente** — seção/componente de Contato: CTA de e-mail + social links, seguindo o mesmo padrão visual (label mono + título) das outras seções.

## Fora de escopo

- Conteúdo real da seção QA Portfolio (projetos, links, relatórios) — permanece placeholder.
- Conteúdo real da seção Experiência (empresas, datas, cargos) — permanece placeholder.
- Qualquer teste automatizado (o projeto não tem test runner configurado; fora de escopo introduzir um).

## Verificação

- `pnpm lint` e `pnpm build` devem passar sem erros novos.
- Checagem visual manual em `pnpm dev`: navegação do header aponta para seções existentes; modo claro e escuro revisados; responsividade mobile/desktop para hero, skills (checklist) e novas seções.
