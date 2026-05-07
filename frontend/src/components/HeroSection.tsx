"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context";
import { Mail, Phone, Cpu, Briefcase } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────── */
type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number;
  /** base alpha for breathe effect */
  baseAlpha: number;
  phase: number;
};

/* ── Constants ──────────────────────────────────────────────── */
const PARTICLE_COUNT = 72;
const CONNECTION_DIST = 130;
const MOUSE_ATTRACT_DIST = 180;
const MOUSE_ATTRACT_STRENGTH = 0.018;
const MOUSE_REPEL_DIST = 60;
const MOUSE_REPEL_STRENGTH = 0.55;
const SPEED = 0.32;

/* ── Component ──────────────────────────────────────────────── */
export default function HeroSection() {
  const { t, isDark } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ptsRef = useRef<Particle[]>([]);

  /* ── Mouse tracking ─────────────────────────────────────── */
  const onMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  /* ── Canvas animation ───────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let t = 0;

    /* Colors based on theme */
    const accentRgb  = isDark ? "59,130,246"  : "60,100,220";
    const accent2Rgb = isDark ? "56,178,209"  : "42,140,180";

    /* Resize */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* Init particles */
    ptsRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const spd   = SPEED * (0.6 + Math.random() * 0.8);
      const base  = Math.random() * 0.45 + 0.08;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        r: Math.random() * 1.6 + 0.5,
        alpha: base,
        baseAlpha: base,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;
      const pts = ptsRef.current;

      /* Update particles */
      for (const p of pts) {
        /* Mouse attraction / repulsion */
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          /* Repel up-close */
          const f = (1 - dist / MOUSE_REPEL_DIST) * MOUSE_REPEL_STRENGTH;
          p.vx -= (dx / dist) * f;
          p.vy -= (dy / dist) * f;
        } else if (dist < MOUSE_ATTRACT_DIST && dist > 0) {
          /* Gently attract in the outer ring */
          const f = (1 - dist / MOUSE_ATTRACT_DIST) * MOUSE_ATTRACT_STRENGTH;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        /* Speed cap */
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpd = SPEED * 2.2;
        if (spd > maxSpd) { p.vx = (p.vx / spd) * maxSpd; p.vy = (p.vy / spd) * maxSpd; }

        /* Gentle friction to prevent runaway */
        p.vx *= 0.992;
        p.vy *= 0.992;

        p.x += p.vx;
        p.y += p.vy;

        /* Wrap */
        if (p.x < -8)  p.x = canvas.width  + 8;
        if (p.x > canvas.width  + 8) p.x = -8;
        if (p.y < -8)  p.y = canvas.height + 8;
        if (p.y > canvas.height + 8) p.y = -8;

        /* Breathe alpha */
        p.alpha = p.baseAlpha + Math.sin(t * 1.4 + p.phase) * 0.12;
      }

      /* Draw connections */
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d >= CONNECTION_DIST) continue;

          /* Brighter lines near mouse */
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const mdist = Math.hypot(midX - mx, midY - my);
          const mouseBoost = mdist < MOUSE_ATTRACT_DIST
            ? (1 - mdist / MOUSE_ATTRACT_DIST) * 0.5
            : 0;

          const lineAlpha = (1 - d / CONNECTION_DIST) * 0.12 + mouseBoost * 0.15;

          /* Gradient line: accent → accent2 */
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${accentRgb},${lineAlpha})`);
          grad.addColorStop(1, `rgba(${accent2Rgb},${lineAlpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      /* Draw particles */
      for (const p of pts) {
        const distToMouse = Math.hypot(p.x - mx, p.y - my);
        const isNearMouse  = distToMouse < MOUSE_ATTRACT_DIST;
        const glow = isNearMouse ? (1 - distToMouse / MOUSE_ATTRACT_DIST) * 0.7 : 0;

        /* Glow halo */
        if (glow > 0.05) {
          const radial = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          radial.addColorStop(0, `rgba(${accentRgb},${glow * 0.45})`);
          radial.addColorStop(1, `rgba(${accentRgb},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = radial;
          ctx.fill();
        }

        /* Core dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb},${Math.min(1, p.alpha + glow * 0.6)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isDark, onMouseMove, onMouseLeave]);

  /* ── Stats (fully i18n) ─────────────────────────────────── */
  const stats = [
    { value: "15+", label: t.hero.yearsLabel },
    { value: "5",   label: t.hero.patentsLabel },
    { value: "3",   label: t.hero.institutionsLabel },
  ];

  /* ── Entrance variants ──────────────────────────────────── */
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "80px 24px 60px",
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: isDark ? 0.62 : 0.38,
          pointerEvents: "none",
        }}
      />

      {/* Ambient deep-field glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: isDark
            ? "radial-gradient(ellipse 65% 52% at 50% 38%, oklch(0.28 0.15 255 / 0.18) 0%, transparent 68%)"
            : "radial-gradient(ellipse 65% 52% at 50% 38%, oklch(0.78 0.1 255 / 0.12) 0%, transparent 68%)",
        }}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <div
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", maxWidth: "700px", width: "100%",
        }}
      >
        {/* Avatar with conic ring (Restored) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "32px", position: "relative", width: "148px", height: "148px" }}
        >
          {/* Spinning conic ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "-3px",
              borderRadius: "50%",
              background: "conic-gradient(var(--accent), var(--accent2), var(--accent3), transparent 65%, var(--accent))",
              zIndex: 0,
            }}
          />
          {/* Static backing ring */}
          <div
            style={{
              position: "absolute", inset: "-3px", borderRadius: "50%",
              background: "var(--bg-base)", zIndex: -1,
            }}
          />
          <div
            style={{
              position: "relative", zIndex: 1, width: "100%", height: "100%",
              borderRadius: "50%", overflow: "hidden",
              background: "var(--bg-base)", padding: "3px",
            }}
          >
            <img
              src="/profile.png"
              alt="Jiang Dong"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", display: "block" }}
            />
          </div>

          {/* Soft glow halo */}
          <div
            style={{
              position: "absolute", inset: "-16px", borderRadius: "50%",
              background: "var(--accent-glow)", filter: "blur(24px)", zIndex: -1, opacity: 0.45,
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.12)}
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
            marginBottom: "14px",
            color: "var(--text-1)",
          }}
        >
          {t.hero.name}
        </motion.h1>

        {/* Contact row (Moved here) */}
        <motion.div
          {...fadeUp(0.20)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="tel:18025395485"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "0.82rem", color: "var(--text-3)",
              textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
          >
            <Phone size={13} style={{ color: "var(--accent)", flexShrink: 0 }} />
            18025395485
          </a>
          <span style={{ width: "1px", height: "14px", background: "var(--border)" }} />
          <a
            href="mailto:jdong0610@163.com"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "0.82rem", color: "var(--text-3)",
              textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
          >
            <Mail size={13} style={{ color: "var(--accent)", flexShrink: 0 }} />
            jdong0610@163.com
          </a>
        </motion.div>

        {/* Title badge */}
        <motion.div {...fadeUp(0.28)} style={{ marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 18px",
              borderRadius: "999px",
              fontSize: "clamp(0.78rem, 1.8vw, 0.92rem)",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "var(--accent)",
              background: "var(--accent-lo)",
              border: "1px solid var(--border-hi)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Pulsing dot */}
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 8px var(--accent-glow)",
                animation: "pulse-dot 2.2s ease-in-out infinite",
              }}
            />
            {t.hero.title}
          </span>
        </motion.div>

        {/* Profile text */}
        <motion.div
          {...fadeUp(0.36)}
          style={{
            textAlign: "center",
            marginBottom: "32px",
            width: "100%",
          }}
        >
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-2)", marginBottom: "6px" }}>
            {t.hero.profile}
          </p>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--text-3)" }}>
            {t.hero.subProfile}
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          {...fadeUp(0.44)}
          className="glass"
          style={{
            borderRadius: "14px",
            overflow: "hidden",
            display: "flex",
            width: "100%",
            maxWidth: "360px",
            marginBottom: "40px",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "18px 8px",
                textAlign: "center",
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--accent-lo)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              <div
                style={{
                  fontSize: "1.85rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-3)", marginTop: "5px", letterSpacing: "0.035em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        </div>

        {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "28px", left: "50%",
          transform: "translateX(-50%)",
          color: "var(--text-3)", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        }}
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
      >
        <span style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5 }}>
          scroll
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
