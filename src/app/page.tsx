
import AboutSection from "./_components/AboutSection";
import ExperienceSection from "./_components/ExperienceSection";
import HeroSection from "./_components/HeroSection";


export default function Home() {
  return (
    <main className="flex flex-col max-w-7xl">
      <HeroSection />

      <hr className="border-t border-border my-12" />

      <AboutSection />

      <hr className="border-t border-border my-12" />

      <ExperienceSection />

      <hr className="border-t border-border my-12" />

    </main>
  );
}
