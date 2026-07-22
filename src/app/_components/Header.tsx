"use client";
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
    <header
      className={`fixed top-0 left-0 w-full bg-background backdrop-blur-md text-primary-text flex items-center justify-around px-4 py-2 z-50 border-b transition-[border-color,box-shadow] duration-300 ease-in-out ${scrolled ? "border-border shadow-md" : "border-transparent shadow-none"}`}
    >
      <h1 className="text-xl font-display font-bold">Pedro Campagnoli</h1>

      <div className="hidden md:flex gap-10">
        {Links.map((link) => (
          <a
            className="hover:brightness-15 text-sm 0 dark:hover:brightness-80 transition-all duration-300"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
      <ThemeToggle />
    </header>
  );
}
