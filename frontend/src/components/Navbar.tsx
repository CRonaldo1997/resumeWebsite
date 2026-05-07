"use client";

import { useApp } from "@/lib/context";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Languages, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = (t: ReturnType<typeof useApp>["t"]) => [
  { href: "#competencies", label: t.nav.competencies },
  { href: "#experience",   label: t.nav.experience },
  { href: "#education",    label: t.nav.education },
  { href: "#patents",      label: t.nav.patents },
];

export default function Navbar() {
  const { lang, setLang, t, isDark, setIsDark } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = NAV_LINKS(t);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "64px",
        background: scrolled ? "var(--bg-card)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "1040px", margin: "0 auto",
          height: "100%", padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          className="grad"
          style={{
            fontSize: "1.05rem", fontWeight: 700, textDecoration: "none",
            letterSpacing: "0.01em", flexShrink: 0,
          }}
        >
          {lang === "zh" ? "蒋 栋" : "Jiang Dong"}
        </a>

        {/* Nav links — hidden on small screens */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "0.85rem", textDecoration: "none",
                color: "var(--text-3)",
                transition: "color 0.18s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* Language */}
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="glass"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "5px 12px", borderRadius: "999px", cursor: "pointer",
              fontSize: "0.78rem", fontWeight: 500, color: "var(--text-2)",
            }}
          >
            <Languages size={13} />
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.18 }}
              >
                {lang === "zh" ? "EN" : "中文"}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Theme */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="glass"
            style={{
              width: "34px", height: "34px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-2)",
            }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={15} />
                </motion.div>
              ) : (
                <motion.div key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={15} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Download */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert(lang === "zh" ? "简历下载功能即将上线…" : "PDF download coming soon…"); }}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "6px 14px", borderRadius: "999px",
              fontSize: "0.78rem", fontWeight: 600,
              background: "var(--accent)",
              color: "oklch(1 0 0)",
              textDecoration: "none",
              boxShadow: "0 0 18px var(--accent-glow)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <FileText size={13} />
            {t.nav.download}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
