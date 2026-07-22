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
