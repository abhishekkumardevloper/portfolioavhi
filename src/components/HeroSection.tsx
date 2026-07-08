"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const roles = [
  "AI Developer",
  "Full Stack Developer",
  "SaaS Builder",
  "Automation Expert",
  "Marketing Strategist",
  "UI/UX Designer",
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0 });

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; color: string; opacity: number };
    const cols = ["#0ea5e9", "#8b5cf6", "#06b6d4", "#ffffff"];
    const pts: P[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      color: cols[Math.floor(Math.random() * cols.length)],
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      // Ambient light blobs
      const g1 = ctx.createRadialGradient(w * 0.25, h * 0.4, 0, w * 0.25, h * 0.4, 500);
      g1.addColorStop(0, "rgba(14,165,233,0.07)"); g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h);
      const g2 = ctx.createRadialGradient(w * 0.75, h * 0.5, 0, w * 0.75, h * 0.5, 400);
      g2.addColorStop(0, "rgba(139,92,246,0.07)"); g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);
      const g3 = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
      g3.addColorStop(0, "rgba(6,182,212,0.04)"); g3.addColorStop(1, "transparent");
      ctx.fillStyle = g3; ctx.fillRect(0, 0, w, h);

      pts.forEach((p) => {
        const dx = mx - p.x, dy = my - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { p.vx -= (dx / dist) * 0.015; p.vy -= (dy / dist) * 0.015; }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity; ctx.fill();
        pts.forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 80) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color; ctx.globalAlpha = (1 - d / 80) * 0.1;
            ctx.lineWidth = 0.4; ctx.stroke();
          }
        });
        ctx.globalAlpha = 1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("mousemove", onMouse); window.removeEventListener("resize", onResize); };
  }, []);

  /* ── Typing effect ── */
  useEffect(() => {
    const role = roles[roleIdx];
    let i = 0;
    if (typing) {
      const t = setInterval(() => {
        setDisplayed(role.slice(0, ++i));
        if (i >= role.length) { clearInterval(t); setTimeout(() => setTyping(false), 2200); }
      }, 60);
      return () => clearInterval(t);
    } else {
      let j = role.length;
      const t = setInterval(() => {
        setDisplayed(role.slice(0, --j));
        if (j <= 0) { clearInterval(t); setRoleIdx((r) => (r + 1) % roles.length); setTyping(true); }
      }, 28);
      return () => clearInterval(t);
    }
  }, [roleIdx, typing]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      {/* Two-column layout */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          padding: "100px 2.5rem 60px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* ──────────── LEFT: Text content ──────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(14,165,233,0.08)",
                border: "1px solid rgba(14,165,233,0.25)",
                borderRadius: 50,
                padding: "7px 18px",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span style={{ fontSize: 12, color: "rgba(6,182,212,0.9)", letterSpacing: "0.1em", fontFamily: "var(--font-mono, monospace)" }}>
                Available for hire · India
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", marginBottom: 6, letterSpacing: "0.05em" }}>
              Hi, I&apos;m
            </p>
            <h1
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "clamp(52px, 7vw, 88px)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ display: "block", color: "white" }}>Abhishek</span>
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 60%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Kumar
              </span>
            </h1>
          </motion.div>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{ display: "flex", alignItems: "center", gap: 0, minHeight: 44 }}
          >
            <span
              style={{
                fontSize: "clamp(20px, 2.5vw, 30px)",
                fontWeight: 600,
                color: "rgba(255,255,255,0.88)",
                fontFamily: "var(--font-space), sans-serif",
              }}
            >
              {displayed}
            </span>
            <span
              style={{
                width: 2.5,
                height: "1.1em",
                background: "#06b6d4",
                display: "inline-block",
                marginLeft: 2,
                animation: "blink 1s step-end infinite",
                boxShadow: "0 0 10px #06b6d4",
                borderRadius: 1,
                flexShrink: 0,
              }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              fontSize: "clamp(14px, 1.4vw, 17px)",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.85,
              maxWidth: 480,
            }}
          >
            I craft AI-powered systems, premium digital experiences, and high-converting marketing ecosystems that drive real business results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 4 }}
          >
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "14px 30px",
                background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                border: "none",
                borderRadius: 50,
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 24px rgba(14,165,233,0.4)",
                fontFamily: "var(--font-space), sans-serif",
              }}
              onMouseEnter={(e) => { const t = e.currentTarget; t.style.transform = "translateY(-3px)"; t.style.boxShadow = "0 14px 40px rgba(14,165,233,0.55)"; }}
              onMouseLeave={(e) => { const t = e.currentTarget; t.style.transform = "none"; t.style.boxShadow = "0 4px 24px rgba(14,165,233,0.4)"; }}
            >
              🚀 Explore My Work
            </button>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "14px 30px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 50,
                color: "rgba(255,255,255,0.88)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-space), sans-serif",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = "rgba(14,165,233,0.5)"; t.style.background = "rgba(14,165,233,0.08)"; t.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = "rgba(255,255,255,0.14)"; t.style.background = "rgba(255,255,255,0.04)"; t.style.transform = "none"; }}
            >
              📅 Book a Meeting
            </a>

            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "14px 30px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 50,
                color: "rgba(255,255,255,0.88)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.3s ease",
                fontFamily: "var(--font-space), sans-serif",
              }}
              onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = "rgba(139,92,246,0.5)"; t.style.background = "rgba(139,92,246,0.08)"; t.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = "rgba(255,255,255,0.14)"; t.style.background = "rgba(255,255,255,0.04)"; t.style.transform = "none"; }}
            >
              ✉️ Contact Me
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              marginTop: 16,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {[["50+", "Projects"], ["5+", "Years Exp"], ["30+", "Clients"], ["10+", "AI Apps"]].map(([num, label]) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "clamp(26px, 3vw, 38px)",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "var(--font-space), sans-serif",
                    lineHeight: 1.1,
                  }}
                >
                  {num}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 3, letterSpacing: "0.05em" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ──────────── RIGHT: 3D Portrait ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
        >
          {/* Outer decorative rings */}
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              border: "1px solid rgba(14,165,233,0.1)",
              animation: "rotate-slow 25s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 420,
              height: 420,
              borderRadius: "50%",
              border: "1px solid rgba(139,92,246,0.08)",
              animation: "rotate-reverse 20s linear infinite",
            }}
          />

          {/* Glow blobs behind image */}
          <div
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)",
              filter: "blur(40px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
              bottom: "10%",
              right: "10%",
            }}
          />

          {/* Photo frame */}
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative", zIndex: 10 }}
          >
            {/* Gradient border ring */}
            <div
              style={{
                position: "relative",
                width: 380,
                height: 460,
                borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
                padding: 3,
                background: "linear-gradient(135deg, #0ea5e9, #8b5cf6, #06b6d4, #0ea5e9)",
                backgroundSize: "300% 300%",
                animation: "shimmer 4s linear infinite",
                boxShadow: "0 0 60px rgba(14,165,233,0.35), 0 0 120px rgba(139,92,246,0.2), 0 30px 80px rgba(0,0,0,0.5)",
              }}
            >
              {/* Inner image container */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
                  overflow: "hidden",
                  background: "#080810",
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/abhishek.png"
                  alt="Abhishek Kumar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
                {/* Subtle blue overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 60%, rgba(5,5,20,0.6) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Floating skill badges */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{
                position: "absolute",
                top: "5%",
                left: "-30%",
                background: "rgba(14,165,233,0.12)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(14,165,233,0.35)",
                borderRadius: 16,
                padding: "12px 18px",
                boxShadow: "0 8px 32px rgba(14,165,233,0.2)",
                minWidth: 140,
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(14,165,233,0.7)", letterSpacing: "0.1em", fontFamily: "var(--font-mono, monospace)", marginBottom: 4 }}>AI DEVELOPER</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif" }}>🤖 GPT-4 Expert</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{
                position: "absolute",
                bottom: "12%",
                right: "-28%",
                background: "rgba(139,92,246,0.12)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(139,92,246,0.35)",
                borderRadius: 16,
                padding: "12px 18px",
                boxShadow: "0 8px 32px rgba(139,92,246,0.2)",
                minWidth: 150,
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(139,92,246,0.8)", letterSpacing: "0.1em", fontFamily: "var(--font-mono, monospace)", marginBottom: 4 }}>FULL STACK</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif" }}>⚡ Next.js 15</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              style={{
                position: "absolute",
                bottom: "35%",
                left: "-32%",
                background: "rgba(6,182,212,0.1)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(6,182,212,0.3)",
                borderRadius: 16,
                padding: "12px 18px",
                boxShadow: "0 8px 32px rgba(6,182,212,0.15)",
                minWidth: 140,
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(6,182,212,0.8)", letterSpacing: "0.1em", fontFamily: "var(--font-mono, monospace)", marginBottom: 4 }}>MARKETING</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif" }}>📈 5x ROAS</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 10,
        }}
      >
        <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, rgba(14,165,233,0.8), transparent)", animation: "float-slow 2s ease-in-out infinite" }} />
        <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase" }}>Scroll</span>
      </motion.div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child > div:last-child {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
