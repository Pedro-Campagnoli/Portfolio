
import AboutSection from "./_components/AboutSection";
import ExperienceSection from "./_components/ExperienceSection";
import HeroSection from "./_components/HeroSection";


export default function Home() {
  return (
    <main className="flex w-full max-w-7xl flex-col">
      <HeroSection />

      <hr className="border-t border-border my-12" />

      <AboutSection />

      <hr className="border-t border-border my-12" />

      <ExperienceSection />

      <hr className="border-t border-border my-12" />

    </main>
  );
}
