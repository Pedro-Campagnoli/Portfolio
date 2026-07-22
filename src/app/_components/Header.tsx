"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

import { EASE } from "./motion/config";
import ThemeToggle from "./ThemeToggle";

type LinkProps = {
  href: string;
  label: string;
};

const Links: LinkProps[] = [
  { href: "#", label: "Início" },
  { href: "#about", label: "Sobre" },
  { href: "#experience", label: "Experiência" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on Escape, on an outside click, or when the
  // viewport grows back to the desktop breakpoint.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full bg-background backdrop-blur-md text-primary-text z-50 border-b transition-[border-color,box-shadow] duration-300 ease-in-out ${
        scrolled || open
          ? "border-border shadow-md"
          : "border-transparent shadow-none"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 md:px-8">
        <h1 className="text-lg font-display font-bold sm:text-xl">
          Pedro Campagnoli
        </h1>

        <nav className="hidden gap-10 md:flex">
          {Links.map((link) => (
            <a
              className="relative text-sm transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] after:content-[''] hover:after:w-full"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-border-strong md:hidden"
          >
            {open ? (
              <LuX aria-hidden className="h-5 w-5" />
            ) : (
              <LuMenu aria-hidden className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="flex flex-col px-4 py-1">
              {Links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-sm transition-colors hover:bg-surface-hover hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
