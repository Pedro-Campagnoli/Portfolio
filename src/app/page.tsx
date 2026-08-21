import AboutSection from "./_components/AboutSection";
import ExperienceSection from "./_components/ExperienceSection";
import HeroSection from "./_components/HeroSection";
import TypeLine from "./_components/motion/TypeLine";

export default function Home() {
  return (
    <main className="flex w-full max-w-7xl flex-col">
      <HeroSection />

      <hr className="border-t border-border my-12" />

      <AboutSection />

      <hr className="border-t border-border my-12" />

      <ExperienceSection />

      <hr className="mt-12 border-t border-border" />

      <footer className="flex justify-center px-6 py-8">
        <p className="flex items-center font-mono text-[11px] text-primary-text sm:text-xs">
          <span aria-hidden className="text-section-string">
            {"//"}
          </span>
          <TypeLine
            text=" Sempre aprendendo. Sempre construindo."
            speed={38}
            startDelay={180}
            playWhenVisible
          />
        </p>
      </footer>
    </main>
  );
}
