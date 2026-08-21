"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

import { EASE } from "./motion/config";

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

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      className={`fixed top-0 left-0 z-50 w-full border-b bg-background/85 text-primary-text backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        scrolled || open
          ? "border-border shadow-sm"
          : "border-transparent shadow-none"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto] items-center px-4 py-2 md:grid-cols-[1fr_auto_1fr] md:px-8">
        <a
          href="#"
          className="text-lg font-display font-bold sm:text-xl"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--primary), var(--section-string), var(--section-keyword))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Pedro Campagnoli
        </a>

        <nav className="hidden gap-10 md:flex">
          {Links.map((link) => (
            <a
              className="relative text-sm transition-colors duration-160 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.23,1,0.32,1)] after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="pressable flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-[transform,border-color] hover:border-border-strong md:hidden"
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
            initial={
              reduce
                ? false
                : { opacity: 0, transform: "translateY(-6px) scale(0.98)" }
            }
            animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, transform: "translateY(-4px) scale(0.985)" }
            }
            transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
            style={{ transformOrigin: "top" }}
            className="absolute top-full left-0 w-full overflow-hidden border-y border-border bg-background/95 shadow-lg backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col px-4 py-1">
              {Links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-sm transition-colors duration-160 hover:bg-surface-hover hover:text-foreground"
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
