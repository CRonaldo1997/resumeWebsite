"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/context";
import { Brain, Workflow, Eye, Code, Target, TrendingUp } from "lucide-react";

const ICONS = [Brain, Workflow, Eye, Code, Target, TrendingUp];
const COLORS = [
  { bg: "oklch(0.65 0.22 255 / 0.1)", border: "oklch(0.65 0.22 255 / 0.3)", text: "var(--accent)" },
  { bg: "oklch(0.7 0.2 280 / 0.1)",   border: "oklch(0.7 0.2 280 / 0.3)",   text: "oklch(0.72 0.2 280)" },
  { bg: "oklch(0.7 0.18 195 / 0.1)",  border: "oklch(0.7 0.18 195 / 0.3)",  text: "var(--accent2)" },
  { bg: "oklch(0.72 0.18 310 / 0.1)", border: "oklch(0.72 0.18 310 / 0.3)", text: "var(--accent3)" },
  { bg: "oklch(0.7 0.2 145 / 0.1)",   border: "oklch(0.7 0.2 145 / 0.3)",   text: "oklch(0.65 0.2 145)" },
  { bg: "oklch(0.7 0.2 35 / 0.1)",    border: "oklch(0.7 0.2 35 / 0.3)",    text: "oklch(0.68 0.2 40)" },
];

export default function CoreCompetencies() {
  const { t } = useApp();
  const items = t.competencies.items;

  // Split items: first 2 are technical, rest are management
  const techItems = items.slice(0, 2);
  const mgmtItems = items.slice(2);

  const renderCard = (comp: any, idx: number, isMgmt: boolean) => {
    // Technical uses cool colors (0-2), Management uses warmer/distinct colors (4-5)
    const colorIdx = isMgmt ? (idx + 4) % COLORS.length : idx % 3;
    const Icon = ICONS[colorIdx % ICONS.length];
    const c = COLORS[colorIdx];

    return (
      <motion.div
        key={comp.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="glass"
        style={{
          borderRadius: "18px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          cursor: "default",
          transition: "border-color 0.2s ease, transform 0.2s ease",
          border: isMgmt ? "1px solid oklch(from var(--text-1) l c h / 0.1)" : undefined,
        }}
        whileHover={{ 
          y: -3, 
          borderColor: c.text,
          boxShadow: `0 10px 30px -10px ${c.bg.replace('/ 0.1', '/ 0.2')}`
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "44px", height: "44px", borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: c.bg, border: `1px solid ${c.border}`, color: c.text,
            flexShrink: 0,
          }}
        >
          <Icon size={20} />
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-1)", margin: 0 }}>
          {comp.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: "0.85rem", lineHeight: 1.72, color: "var(--text-2)", margin: 0, flex: 1 }}>
          {comp.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
          {comp.tags.map((tag: string) => (
            <span key={tag} className="tag" style={{ 
              borderColor: `oklch(from ${c.text} l c h / 0.15)`,
              color: `oklch(from ${c.text} l c h / 0.8)`
            }}>{tag}</span>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="competencies">
      {/* Main Heading */}
      <div style={{ marginBottom: "50px" }}>
        <div className="sec-rule" />
        <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 300, color: "var(--text-1)", lineHeight: 1.2 }}>
          {t.competencies.sectionTitle}{" "}
          <span className="grad" style={{ fontWeight: 700 }}>{t.competencies.sectionTitleBold}</span>
        </h2>
      </div>

      {/* Technical Skills Sub-section */}
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, var(--accent), transparent)" }} />
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {t.competencies.techTitle}
          </h3>
          <div style={{ height: "1px", flex: 3, background: "linear-gradient(to left, var(--border), transparent)" }} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {techItems.map((comp, idx) => renderCard(comp, idx, false))}
        </div>
      </div>

      {/* Management Skills Sub-section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, oklch(0.65 0.2 145), transparent)" }} />
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "oklch(0.65 0.2 145)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {t.competencies.managementTitle}
          </h3>
          <div style={{ height: "1px", flex: 3, background: "linear-gradient(to left, var(--border), transparent)" }} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {mgmtItems.map((comp, idx) => renderCard(comp, idx, true))}
        </div>
      </div>
    </section>
  );
}
