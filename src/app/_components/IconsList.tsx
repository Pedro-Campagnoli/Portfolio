import Image from "next/image";

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

const qaIcons = [
  { icon: Postman, title: "Postman" },
  { icon: Playwright, title: "Playwright" },
  { icon: Cypress, title: "Cypress" },
  { icon: Selenium, title: "Selenium" },
  { icon: Jest, title: "Jest" },
  { icon: Jira, title: "Jira" },
  { icon: Sql, title: "SQL" },
];

const devIcons = [
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

function IconGroup({ title, icons }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm text-primary font-semibold">
        {title}
      </span>

      <div className="
        flex
        gap-3
        bg-white
        border
        border-foreground
        rounded-xl
        p-4
        w-fit
      ">
        {icons.map((item) => (
          <Image
            key={item.title}
            src={item.icon}
            alt={item.title}
            width={28}
            height={28}
            title={item.title}
            className="hover:scale-110 transition-all"
          />
        ))}
      </div>
    </div>
  );
}

export default function IconList() {
  return (
    <div className="flex  gap-6">
      <IconGroup title="🧪 Quality Assurance" icons={qaIcons} />
      <IconGroup title="💻 Development" icons={devIcons} />
    </div>
  );
}