"use client";

import { FileText, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/context";
import { useState, useRef, useEffect } from "react";

export default function DownloadPdfButton() {
  const { t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = (file: string, filename: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <motion.button
        className="glass"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "999px",
          fontSize: "0.78rem",
          fontWeight: 600,
          background: "var(--accent)",
          color: "oklch(1 0 0)",
          textDecoration: "none",
          boxShadow: "0 0 18px var(--accent-glow)",
          cursor: "pointer",
          border: "none",
        }}
        whileHover={{ scale: 1.05, opacity: 0.9 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FileText size={13} />
        {t.nav.download}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ChevronDown size={12} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: "140px",
              background: "var(--bg-card)",
              backdropFilter: "blur(20px) saturate(1.2)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "6px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
              zIndex: 110,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <button
              onClick={() => handleDownload("/蒋栋简历.pdf", "蒋栋简历.pdf")}
              style={{
                background: "none",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                color: "var(--text-2)",
                fontSize: "0.78rem",
                fontWeight: 500,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
                e.currentTarget.style.color = "var(--text-1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "var(--text-2)";
              }}
            >
              {t.nav.downloadZh}
            </button>
            <button
              onClick={() => handleDownload("/DongJiang-Resume.pdf", "DongJiang-Resume.pdf")}
              style={{
                background: "none",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                color: "var(--text-2)",
                fontSize: "0.78rem",
                fontWeight: 500,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
                e.currentTarget.style.color = "var(--text-1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "var(--text-2)";
              }}
            >
              {t.nav.downloadEn}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
