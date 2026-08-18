import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="text-primary-text max-w-md">
        Aberto a oportunidades como desenvolvedor back-end e full stack.
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
