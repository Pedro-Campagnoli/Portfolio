/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark",
      );
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.classList.add("disable-transitions");

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark",
    );

    requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("disable-transitions");
    });
  });
};

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-16 items-center rounded-full border border-border bg-card-header-background p-1 transition-colors duration-300 "
      aria-label="Alternar tema"
    >
      <div
        className={`absolute flex h-7 w-7 items-center justify-center rounded-full bg-surface shadow-md transition-transform duration-300 ${
          theme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <FiMoon className="h-4 w-4 text-primary" />
        ) : (
          <FiSun className="h-4 w-4 text-warning" />
        )}
      </div>
    </button>
  );
}