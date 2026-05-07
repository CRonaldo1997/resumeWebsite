import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoreCompetencies from "@/components/CoreCompetencies";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationPatents from "@/components/EducationPatents";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-base)", color: "var(--text-1)" }}>
      <Navbar />
      <HeroSection />

      {/* ── Main content wrapper ─────────────────────────────── */}
      <div
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
          padding: "80px 32px 160px",
          display: "flex",
          flexDirection: "column",
          gap: "120px",
        }}
      >
        <CoreCompetencies />
        <ExperienceTimeline />
        <EducationPatents />
      </div>

      <AIChatbot />
    </main>
  );
}
