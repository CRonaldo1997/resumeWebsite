"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/context";
import { Award, GraduationCap, FileText } from "lucide-react";
import Image from "next/image";

const SCHOOL_LOGOS: Record<string, { src: string }> = {
  sdsu:   { src: "/sdsu.jpg" },
  xidian: { src: "/xidian.png" },
};
const LOGO_KEYS = ["sdsu", "xidian", "xidian"];

export default function EducationPatents() {
  const { t } = useApp();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>

      {/* ── Education ──────────────────────────────────────── */}
      <section id="education">
        <div style={{ marginBottom: "40px" }}>
          <div className="sec-rule" />
          <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 300, color: "var(--text-1)", lineHeight: 1.2 }}>
            {t.education.sectionTitle}{" "}
            <span className="grad" style={{ fontWeight: 700 }}>{t.education.sectionTitleBold}</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {t.education.degrees.map((edu, idx) => {
            const logo = SCHOOL_LOGOS[LOGO_KEYS[idx]];
            return (
              <motion.div
                key={`${edu.school}-${idx}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass"
                style={{
                  borderRadius: "16px", padding: "18px 22px",
                  display: "flex", alignItems: "center", gap: "18px",
                }}
              >
                {/* Logo container — fixed 56×56, same size for both */}
                <div
                  style={{
                    width: "56px", height: "56px", flexShrink: 0,
                    borderRadius: "12px", overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "var(--bg-surface)", border: "1px solid var(--border)",
                    padding: "6px",
                  }}
                >
                  {logo ? (
                    <Image
                      src={logo.src}
                      alt={edu.school}
                      width={44}
                      height={44}
                      style={{ width: "44px", height: "44px", objectFit: "contain", display: "block" }}
                      unoptimized
                    />
                  ) : (
                    <GraduationCap size={26} style={{ color: "var(--text-3)" }} />
                  )}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                    <span style={{ fontSize: "1.1rem" }}>{edu.flag}</span>
                    <span style={{ fontSize: "0.98rem", fontWeight: 600, color: "var(--text-1)" }}>
                      {edu.school}
                    </span>
                  </div>
                  <p className="grad" style={{ fontSize: "0.85rem", fontWeight: 500, marginBottom: "3px" }}>
                    {edu.degree}
                  </p>
                  <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)" }}>
                    {edu.year}
                  </p>
                </div>

                {/* Right accent bar */}
                <div
                  style={{
                    width: "3px", height: "40px", borderRadius: "2px", flexShrink: 0,
                    background: idx === 0
                      ? "linear-gradient(to bottom, var(--accent), var(--accent2))"
                      : "var(--border)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Patents ────────────────────────────────────────── */}
      <section id="patents">
        <div style={{ marginBottom: "40px" }}>
          <div className="sec-rule" />
          <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 300, color: "var(--text-1)", lineHeight: 1.2 }}>
            {t.patents.sectionTitle}{" "}
            <span className="grad" style={{ fontWeight: 700 }}>{t.patents.sectionTitleBold}</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "12px",
          }}
        >
          {t.patents.items.map((patent, idx) => (
            <motion.div
              key={patent.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="glass"
              style={{
                borderRadius: "16px", padding: "18px 20px",
                display: "flex", alignItems: "flex-start", gap: "14px",
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.82rem", fontWeight: 700,
                  background: "var(--tag-bg)", color: "var(--tag-text)",
                  border: "1px solid oklch(from var(--tag-text) l c h / 0.25)",
                }}
              >
                {idx + 1}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "0.73rem", fontFamily: "var(--font-geist-mono)",
                    color: "var(--accent)", marginBottom: "6px",
                    display: "flex", alignItems: "center", gap: "5px",
                  }}
                >
                  <FileText size={12} />
                  {patent.id}
                </p>
                <p style={{ fontSize: "0.87rem", lineHeight: 1.65, color: "var(--text-2)" }}>
                  {patent.title}
                </p>
              </div>

              <Award
                size={16}
                style={{ color: "var(--accent2)", flexShrink: 0, opacity: 0.45, marginTop: "2px" }}
              />
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
