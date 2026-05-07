"use client";

import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context";

export default function DownloadPdfButton() {
  const { t } = useApp();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/蒋栋简历.pdf";
    link.download = "蒋栋简历.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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
      onClick={handleDownload}
    >
      <FileText size={13} />
      {t.nav.download}
    </motion.button>
  );
}
