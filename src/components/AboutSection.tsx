"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWindowWidth } from "@/hooks/useResponsive";

const cards = [
  { icon: "🎯", title: "Experience", value: "5+ Years", desc: "Building digital products across AI, web, and marketing domains with global clients." },
  { icon: "🚀", title: "Journey", value: "BCA → AI", desc: "From BCA graduate to AI specialist — self-taught, battle-tested, and driven by impact." },
  { icon: "💡", title: "Mission", value: "Build Value", desc: "To create systems that solve real problems, automate complexity, and generate real revenue." },
  { icon: "🌐", title: "Vision", value: "Global Scale", desc: "Empowering businesses worldwide with intelligent automation and premium digital presence." },
  { icon: "⚡", title: "Skills", value: "20+ Tools", desc: "React, Next.js, Python, AI, FastAPI, Docker, OpenAI, LangChain, Marketing & more." },
  { icon: "💰", title: "Revenue", value: "$500K+", desc: "Helped clients generate over half a million in revenue through digital strategies." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const width = useWindowWidth();
  const isMobile = width <= 900;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section"
      style={{ padding: "100px 2rem", background: "linear-gradient(180deg, #050505 0%, #080510 50%, #050505 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(14,165,233,0.8)", fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// about me</span>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "var(--font-space), sans-serif", lineHeight: 1.1 }}>
            <span style={{ color: "white" }}>The Person </span>
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Behind the Code</span>
          </h2>
        </motion.div>

        {/* About grid */}
        <div
          className="about-grid"
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? 40 : 60, alignItems: "center", textAlign: isMobile ? "center" : "left" }}
        >
          {/* Avatar */}
          <motion.div initial={{ opacity: 0, x: -60 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="about-avatar"
              style={{ position: "relative", width: 300, height: 400 }}
            >
              <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(14,165,233,0.2)", borderRadius: 24, background: "linear-gradient(135deg, rgba(14,165,233,0.05), rgba(139,92,246,0.05))", backdropFilter: "blur(10px)", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.8), transparent)", animation: "scanline 3s ease-in-out infinite" }} />
                <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 20px 20px" }}>
                  <div style={{ position: "relative", marginBottom: 4 }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, rgba(14,165,233,0.4), rgba(139,92,246,0.4))", boxShadow: "0 0 30px rgba(14,165,233,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>👨‍💻</div>
                    <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid rgba(6,182,212,0.4)", animation: "rotate-slow 8s linear infinite" }} />
                  </div>
                  <div style={{ width: 150, height: 210, background: "linear-gradient(to bottom, rgba(14,165,233,0.15), rgba(139,92,246,0.1))", borderRadius: "80px 80px 0 0", border: "1px solid rgba(14,165,233,0.15)" }} />
                </div>
                {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((pos, i) => (
                  <div key={i} style={{ position: "absolute", ...pos, width: 18, height: 18, border: "2px solid rgba(6,182,212,0.5)", borderRadius: 2 }} />
                ))}
              </div>
              <div style={{ position: "absolute", top: -18, right: -28, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: 12, padding: "8px 14px", backdropFilter: "blur(10px)", animation: "float 5s ease-in-out infinite", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 12, color: "#0ea5e9", fontWeight: 600 }}>🤖 AI Expert</span>
              </div>
              <div style={{ position: "absolute", bottom: 40, left: -38, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 12, padding: "8px 14px", backdropFilter: "blur(10px)", animation: "float 7s ease-in-out infinite reverse", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 600 }}>⚡ Full Stack</span>
              </div>
            </div>
          </motion.div>

          {/* Cards */}
          <div
            className="about-cards-grid"
            style={{ display: "grid", gridTemplateColumns: width <= 480 ? "1fr" : "1fr 1fr", gap: 12 }}
          >
            {cards.map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === i ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hoveredCard === i ? "rgba(14,165,233,0.3)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 16, padding: "18px 16px", cursor: "default",
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                  transform: hoveredCard === i ? "translateY(-8px) rotate(-0.5deg)" : "none",
                  boxShadow: hoveredCard === i ? "0 20px 60px rgba(14,165,233,0.12)" : "none",
                  backdropFilter: "blur(10px)",
                }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(14,165,233,0.7)", textTransform: "uppercase", fontFamily: "var(--font-mono, monospace)", marginBottom: 4 }}>{card.title}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 5, fontFamily: "var(--font-space), sans-serif" }}>{card.value}</div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
