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
