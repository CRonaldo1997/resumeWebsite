import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoreCompetencies from "@/components/CoreCompetencies";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationPatents from "@/components/EducationPatents";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-1)]">
      <Navbar />
      <HeroSection />

      {/* ── Main content wrapper ─────────────────────────────── */}
      <div className="max-w-[1040px] mx-auto px-8 pt-20 pb-40 flex flex-col gap-[120px]">
        <CoreCompetencies />
        <ExperienceTimeline />
        <EducationPatents />
      </div>

      <AIChatbot />
    </main>
  );
}
