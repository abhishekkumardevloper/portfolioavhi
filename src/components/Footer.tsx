"use client";
import { useEffect, useRef } from "react";
import { useWindowWidth } from "@/hooks/useResponsive";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = useWindowWidth();
  const isMobile = width <= 768;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = 200);
    type Star = { x: number; y: number; r: number; twinkle: number };
    const stars: Star[] = Array.from({ length: 150 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2, twinkle: Math.random() * Math.PI * 2 }));
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(14,165,233,0.04)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      stars.forEach(s => {
        s.twinkle += 0.02;
        const alpha = (Math.sin(s.twinkle) + 1) / 2 * 0.7 + 0.1;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <footer style={{ position: "relative", background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "60px 1.5rem 40px" }}>
        {/* Footer grid */}
        <div
          className="footer-grid"
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr", alignItems: "start", gap: isMobile ? 28 : 32, marginBottom: 40 }}
        >
          {/* Left: Logo */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, justifyContent: isMobile ? "center" : "flex-start" }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(139,92,246,0.3))", border: "1px solid rgba(14,165,233,0.4)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(14,165,233,0.2)", flexShrink: 0 }}>
                <span style={{ fontWeight: 700, fontSize: 14, background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AK</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 18, color: "white", fontFamily: "var(--font-space), sans-serif" }}>Abhishek Kumar</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", maxWidth: 280, lineHeight: 1.7, textAlign: isMobile ? "center" : "left" }}>Building premium AI systems, websites, and digital experiences that drive real business results.</p>
          </div>

          {/* Center: Socials */}
          <div
            className="footer-socials"
            style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}
          >
            {[
              { icon: "🐙", href: "https://github.com", label: "GitHub" },
              { icon: "💼", href: "https://linkedin.com", label: "LinkedIn" },
              { icon: "🐦", href: "https://twitter.com", label: "Twitter" },
              { icon: "💬", href: "https://wa.me/919876543210", label: "WhatsApp" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, textDecoration: "none", transition: "all 0.3s ease", flexShrink: 0 }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.background = "rgba(14,165,233,0.1)"; t.style.borderColor = "rgba(14,165,233,0.4)"; t.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.background = "rgba(255,255,255,0.04)"; t.style.borderColor = "rgba(255,255,255,0.08)"; t.style.transform = "none"; }}>
                {s.icon}
              </a>
            ))}
          </div>

          {/* Right: Quick links */}
          <div style={{ textAlign: isMobile ? "center" : "right" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: isMobile ? "center" : "flex-end" }}>
              {["About", "Skills", "Services", "Projects", "AI Lab", "Contact"].map(link => (
                <button key={link}
                  onClick={() => document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" })}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer", transition: "color 0.2s ease", fontFamily: "var(--font-space), sans-serif" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = "rgba(14,165,233,0.9)"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}
        >
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono, monospace)" }}>
            © 2026 Abhishek Kumar. Crafted with ❤️ &amp; ☕
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse-glow 2s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono, monospace)" }}>Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
