"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/context";
import { ChevronDown, Award, Briefcase } from "lucide-react";

export default function ExperienceTimeline() {
  const { t, lang } = useApp();
  const companies = t.experience.companies;
  const [expandedCompany, setExpandedCompany] = useState<number>(0);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="experience">
      {/* Heading */}
      <div style={{ marginBottom: "40px" }}>
        <div className="sec-rule" />
        <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 300, color: "var(--text-1)", lineHeight: 1.2 }}>
          {t.experience.sectionTitle}{" "}
          <span className="grad" style={{ fontWeight: 700 }}>{t.experience.sectionTitleBold}</span>
        </h2>
      </div>

      {/* Timeline wrapper */}
      <div style={{ position: "relative", paddingLeft: "52px" }}>
        {/* Vertical spine */}
        <div
          style={{
            position: "absolute", left: "19px", top: "4px", bottom: 0, width: "1px",
            background: "linear-gradient(to bottom, var(--accent) 0%, var(--accent2) 60%, transparent 100%)",
          }}
        />

        {/* Companies */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {companies.map((company, idx) => {
            const isExpanded = expandedCompany === idx;

            return (
              <motion.div
                key={company.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ position: "relative" }}
              >
                {/* Timeline node */}
                <motion.div
                  animate={
                    isExpanded
                      ? { boxShadow: "0 0 18px var(--accent-glow)", borderColor: "var(--accent)" }
                      : { boxShadow: "none", borderColor: "var(--border)" }
                  }
                  style={{
                    position: "absolute",
                    left: "-52px", top: "20px",
                    width: "38px", height: "38px",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "var(--bg-base)",
                    border: `2px solid ${isExpanded ? "var(--accent)" : "var(--border)"}`,
                    zIndex: 2,
                  }}
                >
                  <Briefcase
                    size={15}
                    style={{ color: isExpanded ? "var(--accent)" : "var(--text-3)" }}
                  />
                </motion.div>

                {/* Company card — clickable header */}
                <button
                  onClick={() => setExpandedCompany(isExpanded ? -1 : idx)}
                  className="glass"
                  style={{
                    width: "100%", textAlign: "left", cursor: "pointer",
                    borderRadius: "18px", padding: "20px 24px",
                    display: "block", background: "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-1)" }}>
                          {company.company}
                        </span>
                        <span className="tag" style={{ fontSize: "11px" }}>{company.dept}</span>
                      </div>
                      <p className="grad" style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "4px" }}>
                        {company.role}
                      </p>
                      <p style={{ fontSize: "0.78rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)" }}>
                        {company.period}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.28 }}
                      style={{ color: "var(--text-3)", flexShrink: 0, marginTop: "4px" }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  <p style={{ fontSize: "0.87rem", lineHeight: 1.72, color: "var(--text-2)", marginTop: "14px" }}>
                    {company.contributions}
                  </p>
                </button>

                {/* Projects accordion */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ marginTop: "8px", paddingLeft: "4px" }}>
                        <p style={{
                          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
                          textTransform: "uppercase", color: "var(--text-3)", marginBottom: "10px",
                          paddingLeft: "4px",
                        }}>
                          {t.experience.keyProjects}
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {company.projects.map((project, pIdx) => {
                            const pKey = `${idx}-${pIdx}`;
                            const isProjExpanded = expandedProject === pKey;

                            return (
                              <div
                                key={project.name}
                                className="glass"
                                style={{ borderRadius: "14px", overflow: "hidden" }}
                              >
                                <button
                                  onClick={() => setExpandedProject(isProjExpanded ? null : pKey)}
                                  style={{
                                    width: "100%", textAlign: "left", cursor: "pointer",
                                    padding: "14px 18px",
                                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px",
                                    background: "none",
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0, flexWrap: "wrap" }}>
                                    <span
                                      style={{
                                        width: "6px", height: "6px", borderRadius: "50%",
                                        background: "var(--accent)", flexShrink: 0,
                                      }}
                                    />
                                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-1)" }}>
                                      {project.name}
                                    </span>
                                    {"award" in project && project.award && (
                                      <span
                                        style={{
                                          display: "inline-flex", alignItems: "center", gap: "4px",
                                          fontSize: "11px", padding: "2px 8px", borderRadius: "999px",
                                          background: "var(--award-bg)", color: "var(--award-text)",
                                        }}
                                      >
                                        <Award size={11} />
                                        {lang === "zh" ? "获奖" : "Award"}
                                      </span>
                                    )}
                                    {"period" in project && project.period && (
                                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)" }}>
                                        {project.period}
                                      </span>
                                    )}
                                  </div>
                                  <motion.div
                                    animate={{ rotate: isProjExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.22 }}
                                    style={{ color: "var(--text-3)", flexShrink: 0 }}
                                  >
                                    <ChevronDown size={16} />
                                  </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                  {isProjExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.28 }}
                                      style={{ overflow: "hidden" }}
                                    >
                                      <div style={{ padding: "4px 18px 18px" }}>
                                        {/* Award full text */}
                                        {"award" in project && project.award && (
                                          <div style={{
                                            fontSize: "0.8rem", padding: "8px 12px", borderRadius: "10px",
                                            background: "var(--award-bg)", color: "var(--award-text)",
                                            display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "12px",
                                          }}>
                                            <Award size={13} style={{ flexShrink: 0, marginTop: "1px" }} />
                                            {project.award}
                                          </div>
                                        )}

                                        {/* Content label and detail */}
                                        <div style={{ marginBottom: "12px" }}>
                                          <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)", marginBottom: "4px" }}>
                                            {t.experience.projectContent}
                                          </div>
                                          <p style={{ fontSize: "0.85rem", lineHeight: 1.72, color: "var(--text-2)" }}>
                                            {project.detail}
                                          </p>
                                        </div>

                                        {/* Results label and value */}
                                        <div style={{
                                          fontSize: "0.85rem", lineHeight: 1.65,
                                          padding: "10px 14px", borderRadius: "10px",
                                          background: "var(--accent-lo)",
                                          borderLeft: "2.5px solid var(--accent)",
                                          color: "var(--text-2)",
                                          marginBottom: "12px",
                                        }}>
                                          <div style={{ fontWeight: 600, color: "var(--accent)", marginBottom: "4px" }}>
                                            {t.experience.projectResults}
                                          </div>
                                          {project.value}
                                        </div>

                                        {/* Tags */}
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                          {project.tags.map((tag) => (
                                            <span key={tag} className="tag">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Early career */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "absolute", left: "-52px", top: "20px",
                width: "38px", height: "38px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--bg-base)", border: "2px solid var(--border)",
              }}
            >
              <Briefcase size={15} style={{ color: "var(--text-3)" }} />
            </div>

            <div className="glass" style={{ borderRadius: "18px", padding: "20px 24px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-2)", marginBottom: "16px" }}>
                {t.experience.earlyCareer.title}
              </h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {t.experience.earlyCareer.items.map((item) => (
                  <div
                    key={item.company}
                    style={{
                      flex: "1 1 180px",
                      padding: "12px 16px", borderRadius: "12px",
                      background: "var(--bg-surface)", border: "1px solid var(--border)",
                    }}
                  >
                    <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-1)", marginBottom: "3px" }}>
                      {item.company}
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-2)", marginBottom: "3px" }}>{item.role}</p>
                    <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", color: "var(--text-3)" }}>
                      {item.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
