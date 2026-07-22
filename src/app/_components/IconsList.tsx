import Image from "next/image";

type IconItem = { icon: string; title: string };

// Icons are referenced by URL from /public/icons — no per-icon import.
const qaIcons: IconItem[] = [
  { icon: "/icons/postman.svg", title: "Postman" },
  { icon: "/icons/playwright.svg", title: "Playwright" },
  { icon: "/icons/cypress.svg", title: "Cypress" },
  { icon: "/icons/selenium.svg", title: "Selenium" },
  { icon: "/icons/jest.svg", title: "Jest" },
  { icon: "/icons/jira.svg", title: "Jira" },
  { icon: "/icons/sql.svg", title: "SQL" },
];

const devIcons: IconItem[] = [
  { icon: "/icons/react.svg", title: "React" },
  { icon: "/icons/next.svg", title: "Next.js" },
  { icon: "/icons/node.svg", title: "Node" },
  { icon: "/icons/nest.svg", title: "NestJS" },
  { icon: "/icons/typescript.svg", title: "TypeScript" },
  { icon: "/icons/javascript.svg", title: "JavaScript" },
  { icon: "/icons/html.svg", title: "HTML" },
  { icon: "/icons/css.svg", title: "CSS" },
  { icon: "/icons/tailwind.svg", title: "Tailwind" },
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
            <Image
              src={item.icon}
              alt=""
              width={20}
              height={20}
              unoptimized
              className="opacity-90"
            />
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
