"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  LuBraces,
  LuDatabaseZap,
  LuGauge,
  LuGitBranch,
  LuPanelsTopLeft,
  LuUsersRound,
} from "react-icons/lu";

const highlights = [
  {
    icon: LuBraces,
    // tempo (ms) até o teste "passar" — ajuste livremente por card
    duration: 7602,
    title: "Back-end com Node.js",
    description:
      "Construo APIs e serviços com TypeScript e NestJS em arquitetura modular, pensando em organização e manutenção desde o primeiro commit.",
  },
  {
    icon: LuPanelsTopLeft,
    duration: 4340,
    title: "Interfaces consistentes",
    description:
      "Também atuo no front-end com React e Next.js, transformando especificações e regras de negócio em interfaces funcionais e coerentes.",
  },
  {
    icon: LuGauge,
    duration: 8240,
    title: "Entregas confiáveis",
    description:
      "Aplico testes funcionais, de API e automação E2E para acelerar o feedback sem comprometer a confiança no que vai para produção.",
  },
  {
    icon: LuGitBranch,
    duration: 5600,
    title: "Versionamento e fluxo",
    description:
      "Trabalho com Git no dia a dia e acompanho o ciclo de desenvolvimento no Jira e Azure DevOps, mantendo entregas rastreáveis.",
  },
  {
    icon: LuDatabaseZap,
    duration: 6150,
    title: "APIs e dados",
    description:
      "Modelo e consulto bancos relacionais com Prisma ORM e SQL, integrando sistemas e ERPs por meio de APIs REST.",
  },
  {
    icon: LuUsersRound,
    duration: 6890,
    title: "Regras de negócio",
    description:
      "Participo da análise de requisitos junto a produto, investigo problemas na causa-raiz e evoluo sistemas que já rodam em produção.",
  },
];

const totalTests = highlights.length;
// A suíte roda em paralelo: o wall-clock total é o teste mais lento.
const suiteDuration = Math.max(...highlights.map((h) => h.duration));

// Formata como um cronômetro de test runner: sempre em segundos, largura estável.
const formatDuration = (ms: number) => `${(ms / 1000).toFixed(2)}s`;

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-20"
      />
      <path
        d="M12 3a9 9 0 0 1 9 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TestStatus({
  duration,
  elapsed,
  done,
  reduce,
}: {
  duration: number;
  elapsed: number;
  done: boolean;
  reduce: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] leading-none tabular-nums">
      {done ? (
        <motion.div
          // Re-anima a cada nova aprovação (key muda quando o card reinicia).
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 520, damping: 22 }}
          className="text-primary flex items-center gap-1.5"
        >
          <FaCheck className="h-3 w-3" />
          <span>{formatDuration(duration)}</span>
        </motion.div>
      ) : (
        <div className="text-primary-text flex items-center gap-1.5">
          <Spinner className="text-primary h-3 w-3" />
          <span>{formatDuration(Math.min(elapsed, duration))}</span>
        </div>
      )}
    </div>
  );
}

function TestSummary({
  passed,
  elapsed,
  reduce,
}: {
  passed: number;
  elapsed: number;
  reduce: boolean;
}) {
  const done = passed === totalTests;
  const running = totalTests - passed;

  return (
    <div className="border-primary-text/15 flex items-center gap-2 border-t pt-3 font-mono text-[11px] leading-none tabular-nums">
      {done ? (
        <motion.span
          initial={reduce ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="bg-primary/15 text-primary flex h-4 w-4 items-center justify-center rounded-full"
        >
          <FaCheck className="h-2.5 w-2.5" />
        </motion.span>
      ) : (
        <Spinner className="text-primary h-3.5 w-3.5" />
      )}

      <span className="flex items-center gap-1.5">
        <motion.span
          key={passed}
          initial={reduce ? false : { scale: 1.35 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 18 }}
          className="text-primary inline-block"
        >
          {passed} passed
        </motion.span>
        <span className="text-primary-text">·</span>
        <span className="text-primary-text">0 failed</span>
        {running > 0 && (
          <>
            <span className="text-primary-text">·</span>
            <span className="text-primary-text">{running} running</span>
          </>
        )}
      </span>

      <span className="text-primary-text ml-auto">
        {formatDuration(Math.min(elapsed, suiteDuration))}
      </span>
    </div>
  );
}

export default function AboutCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  // Um instante de início por card — reiniciar um teste é só reescrever o seu.
  const [startedAt, setStartedAt] = useState<number[] | null>(null);
  const [now, setNow] = useState(0);

  // Dispara a suíte quando entra na tela.
  useEffect(() => {
    if (!inView) return;

    const t = performance.now();
    // Sem motion: começa já concluído.
    setStartedAt(highlights.map(() => (reduce ? t - suiteDuration : t)));
    setNow(t);
  }, [inView, reduce]);

  // Enquanto houver teste rodando, avança o relógio a cada frame.
  useEffect(() => {
    if (!startedAt || reduce) return;

    let raf = requestAnimationFrame(function loop() {
      const n = performance.now();
      setNow(n);
      const anyRunning = startedAt.some(
        (s, i) => n - s < highlights[i].duration,
      );
      if (anyRunning) raf = requestAnimationFrame(loop);
    });

    return () => cancelAnimationFrame(raf);
  }, [startedAt, reduce]);

  const restart = useCallback(
    (index: number) => {
      if (reduce) return;
      const t = performance.now();
      setStartedAt((prev) => {
        if (!prev) return prev;
        const next = [...prev];
        next[index] = t;
        return next;
      });
    },
    [reduce],
  );

  const elapsedList = highlights.map((h, i) =>
    startedAt ? Math.min(now - startedAt[i], h.duration) : 0,
  );
  const passed = elapsedList.filter(
    (e, i) => e >= highlights[i].duration,
  ).length;
  const suiteElapsed = elapsedList.length ? Math.max(...elapsedList) : 0;

  return (
    <div
      ref={ref}
      className="flex w-full max-w-2xl flex-col gap-5 px-8 md:px-0"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {highlights.map((item, i) => {
          const cardElapsed = elapsedList[i];
          const done = cardElapsed >= item.duration;

          return (
            <div
              key={item.title}
              role="button"
              tabIndex={0}
              aria-label={`Reexecutar teste: ${item.title}`}
              onClick={() => restart(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  restart(i);
                }
              }}
              className={[
                "group relative flex cursor-pointer flex-col gap-3 rounded-lg border p-6 text-left",
                "transition-all duration-300 ease-out hover:scale-[1.03] hover:z-10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                done
                  ? "border-primary/40 bg-primary/10 hover:border-primary/60"
                  : "border-primary-text/20 bg-primary/5 hover:border-primary/50",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300",
                    done
                      ? "bg-primary/15 text-primary"
                      : "bg-primary/10 text-primary",
                  ].join(" ")}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <TestStatus
                  key={startedAt ? startedAt[i] : "idle"}
                  duration={item.duration}
                  elapsed={cardElapsed}
                  done={done}
                  reduce={!!reduce}
                />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-primary-text">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <TestSummary passed={passed} elapsed={suiteElapsed} reduce={!!reduce} />
    </div>
  );
}
