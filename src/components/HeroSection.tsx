"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWindowWidth } from "@/hooks/useResponsive";

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
  const width = useWindowWidth();
  const isMobile = width <= 900;
  const [typing, setTyping] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d")!;
    
    let w = (canvas.width = canvas.parentElement.offsetWidth);
    let h = (canvas.height = canvas.parentElement.offsetHeight);
    
    const onResize = () => {
      if (!canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    setTimeout(onResize, 500);

    type P = { x: number; y: number; vx: number; vy: number; r: number; color: string; opacity: number };
    const cols = ["#0ea5e9", "#8b5cf6", "#06b6d4", "#ffffff"];
    const pts: P[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.3,
      color: cols[Math.floor(Math.random() * cols.length)],
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      
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
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
    <section id="hero" style={{ minHeight: "100vh", width: "100%", position: "relative", overflowX: "hidden", display: "flex", alignItems: "center", backgroundColor: "#050510" }}>
      
      {/* 1. Canvas Animation Layer (Bottom-most) */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, zIndex: 0 }} />

      {/* 2. Cinematic Background Image Layer (Mobile Only) */}
      {isMobile && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/abhishek.png"
            alt="Abhishek Kumar Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%", // Focuses on the face/upper body
              opacity: 0.25, // Low opacity so text pops out
              filter: "grayscale(30%) contrast(120%)", 
              mixBlendMode: "luminosity",
            }}
          />
          {/* Strong gradients to fade edges into the background color */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #050510 5%, transparent 40%, #050510 95%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 0%, rgba(5,5,16,0.85) 100%)" }} />
        </div>
      )}

      {/* 3. Main Content Layer */}
      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          padding: isMobile ? "0 1.25rem" : "110px 2.5rem 70px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // Only 1 column on mobile
          gap: isMobile ? "0px" : "60px",
          alignItems: "center",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {/* LEFT: Text Content - TAKES FULL SCREEN ON MOBILE */}
        <div
          className="hero-left"
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 20, 
            alignItems: isMobile ? "center" : "flex-start",
            justifyContent: "center",
            minHeight: isMobile ? "100svh" : "auto",
            paddingTop: isMobile ? "80px" : 0, 
            paddingBottom: isMobile ? "80px" : 0,
          }}
        >
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.25)", borderRadius: 50, padding: "7px 18px", backdropFilter: "blur(10px)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse-glow 2s ease-in-out infinite", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "rgba(6,182,212,0.9)", letterSpacing: "0.1em", fontFamily: "var(--font-mono, monospace)", whiteSpace: "nowrap" }}>
                Available for hire · India
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}>
            <p style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "rgba(255,255,255,0.6)", marginBottom: 6, letterSpacing: "0.05em", fontWeight: 500 }}>Hi, I&apos;m</p>
            <h1 style={{ fontFamily: "var(--font-space), sans-serif", fontSize: "clamp(48px, 12vw, 88px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
             <span style={{ display: "block", color: "white", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>Abhishek</span>
              <span style={{ display: "block", background: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 60%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kumar</span>
            </h1>
          </motion.div>

          {/* Typing Role */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} style={{ display: "flex", alignItems: "center", minHeight: 40 }}>
            <span style={{ fontSize: "clamp(18px, 4vw, 28px)", fontWeight: 600, color: "rgba(255,255,255,0.95)", fontFamily: "var(--font-space), sans-serif" }}>{displayed}</span>
            <span style={{ width: 2.5, height: "1em", background: "#06b6d4", display: "inline-block", marginLeft: 3, animation: "blink 1s step-end infinite", boxShadow: "0 0 8px #06b6d4", borderRadius: 1, flexShrink: 0 }} />
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 480, fontWeight: 400 }}>
            I craft AI-powered systems, premium digital experiences, and high-converting marketing ecosystems that drive real business results.
          </motion.p>

          {/* CTAs (Stacked on Mobile) */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }}
            style={{ display: "flex", flexWrap: isMobile ? "nowrap" : "wrap", flexDirection: isMobile ? "column" : "row", gap: 14, marginTop: 12, width: isMobile ? "100%" : "auto" }}
          >
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{ width: isMobile ? "100%" : "auto", padding: "16px 28px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 50, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.02em", transition: "all 0.3s ease", boxShadow: "0 4px 24px rgba(99,102,241,0.3)", fontFamily: "var(--font-space), sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(99,102,241,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.3)"; }}>
              🚀 Explore My Work
            </button>
            <a href="https://api.whatsapp.com/send/?phone=919905028510&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
              style={{ width: isMobile ? "100%" : "auto", padding: "15px 28px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, color: "rgba(255,255,255,0.9)", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease", fontFamily: "var(--font-space), sans-serif", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, backdropFilter: "blur(10px)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
              📅 Book a Meeting
            </a>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ width: isMobile ? "100%" : "auto", padding: "15px 28px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, color: "rgba(255,255,255,0.9)", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease", fontFamily: "var(--font-space), sans-serif", backdropFilter: "blur(10px)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
              ✉️ Contact Me
            </button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05 }}
            style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 24 : 36, marginTop: 16, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)", justifyContent: "center", width: "100%" }}
          >
            {[["50+", "Projects"], ["5+", "Years Exp"], ["30+", "Clients"], ["10+", "AI Apps"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(24px, 6vw, 38px)", fontWeight: 800, background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-space), sans-serif", lineHeight: 1.1 }}>{num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, letterSpacing: "0.05em", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Mobile Only: Bottom Scroll Indicator Hint */}
          {isMobile && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase" }}>Scroll</span>
              <div style={{ width: 1, height: 24, background: "linear-gradient(to bottom, rgba(14,165,233,0.8), transparent)", animation: "float-slow 2s ease-in-out infinite" }} />
             </motion.div>
          )}
        </div>

        {/* RIGHT: Professional Portrait - HIDDEN ON MOBILE (Shown on Desktop) */}
        {!isMobile && (
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 80, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
          >
            <div style={{ position: "absolute", width: 340, height: 420, borderRadius: 32, background: "radial-gradient(ellipse, rgba(14,165,233,0.18) 0%, rgba(139,92,246,0.12) 50%, transparent 80%)", filter: "blur(50px)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative", zIndex: 10 }}>
              <div className="hero-portrait-frame" style={{ position: "relative", width: 380, height: 460 }}>
                <div style={{ position: "absolute", inset: -2, borderRadius: 28, background: "linear-gradient(160deg, #0ea5e9 0%, #8b5cf6 50%, #06b6d4 100%)", backgroundSize: "200% 200%", animation: "shimmer 5s linear infinite", opacity: 0.8, zIndex: 0 }} />

                <div style={{ position: "absolute", inset: 2, borderRadius: 26, overflow: "hidden", background: "#050510", zIndex: 1 }}>
                  <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.5, zIndex: 0 }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/abhishek.png" alt="Abhishek Kumar" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", zIndex: 1 }} />
                  <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to bottom, transparent 40%, rgba(5,5,20,0.75) 100%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, transparent 10%, #0ea5e9 40%, #06b6d4 60%, transparent 90%)", zIndex: 3, opacity: 0.9 }} />
                  <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, transparent 10%, #8b5cf6 40%, #a855f7 60%, transparent 90%)", zIndex: 3, opacity: 0.7 }} />

                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4, padding: "14px 18px", background: "rgba(5,5,15,0.7)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif", marginBottom: 2 }}>Abhishek Kumar</div>
                        <div style={{ fontSize: 10, color: "rgba(14,165,233,0.85)", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.1em" }}>AI Developer · Full Stack</div>
                      </div>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse-glow 2s ease-in-out infinite" }} />
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono, monospace)" }}>Open to work</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Floating Stat Cards */}
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }} style={{ position: "absolute", top: "6%", left: "-42%", background: "rgba(5,5,20,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 16, padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(14,165,233,0.1)", minWidth: 148 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(6,182,212,0.2))", border: "1px solid rgba(14,165,233,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
                  <div><div style={{ fontSize: 11, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif" }}>GPT-4 Expert</div><div style={{ fontSize: 9, color: "rgba(14,165,233,0.8)", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.08em" }}>AI Developer</div></div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} style={{ position: "absolute", top: "28%", right: "-44%", background: "rgba(5,5,20,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 16, padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)", minWidth: 148 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(168,85,247,0.2))", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>⚡</div>
                  <div><div style={{ fontSize: 11, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif" }}>50+ Projects</div><div style={{ fontSize: 9, color: "rgba(139,92,246,0.8)", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.08em" }}>Delivered</div></div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Desktop Scroll Indicator */}
      {!isMobile && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 10 }}>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, rgba(14,165,233,0.8), transparent)", animation: "float-slow 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase" }}>Scroll</span>
        </motion.div>
      )}
    </section>
  );
}
