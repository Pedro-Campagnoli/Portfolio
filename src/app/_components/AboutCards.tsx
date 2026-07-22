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