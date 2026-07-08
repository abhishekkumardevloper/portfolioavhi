"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const milestones = [
  { year: "2019", title: "BCA Begins", desc: "Started Bachelor of Computer Applications, discovered passion for programming and web technologies.", icon: "🎓", color: "#0ea5e9" },
  { year: "2020", title: "First Freelance", desc: "Landed first freelance project — a local business website. ₹5,000 earned, confidence built.", icon: "💼", color: "#8b5cf6" },
  { year: "2021", title: "Full Stack Journey", desc: "Deep-dived into React, Node.js, and MongoDB. Built 10+ projects. Clients from 3 countries.", icon: "⚡", color: "#06b6d4" },
  { year: "2022", title: "AI Discovery", desc: "Discovered GPT-3 API, built first AI tool. Game-changer moment — pivoted to AI-first development.", icon: "🤖", color: "#10a37f" },
  { year: "2023", title: "First SaaS Launch", desc: "Launched first SaaS product. 500 signups in Week 1. Learned product, marketing, and growth.", icon: "🚀", color: "#f59e0b" },
  { year: "2024", title: "Marketing Mastery", desc: "Managed ₹50L+ in ad spend. Generated 10,000+ leads. 5x average ROAS across campaigns.", icon: "📈", color: "#ec4899" },
  { year: "2025", title: "Agency & Scale", desc: "Founded digital agency. Team of specialists. 30+ active clients. Expanding globally.", icon: "🌐", color: "#a855f7" },
  { year: "2026", title: "Enterprise AI", desc: "Building enterprise AI solutions, RAG systems, and automation infrastructure for global clients.", icon: "✨", color: "#0ea5e9" },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} style={{ padding: "120px 2rem", background: "linear-gradient(180deg, #050505 0%, #08050f 100%)", position: "relative", overflow: "hidden" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.2 }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(139,92,246,0.8)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// the journey</span>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ color: "white" }}>Career </span>
            <span style={{ background: "linear-gradient(135deg, #8b5cf6, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Timeline</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(14,165,233,0.4), rgba(139,92,246,0.4), rgba(6,182,212,0.4), transparent)", transform: "translateX(-50%)" }} className="hidden md:block" />

          {milestones.map((m, i) => (
            <motion.div key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }} animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end", marginBottom: 40, position: "relative", cursor: "pointer" }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}>

              {/* Center dot */}
              <div style={{ position: "absolute", left: "50%", top: 24, width: 16, height: 16, borderRadius: "50%", background: m.color, boxShadow: `0 0 20px ${m.color}80`, transform: "translateX(-50%)", transition: "all 0.3s ease", zIndex: 2 }} className="hidden md:block" />

              <div style={{ width: "calc(50% - 40px)", maxWidth: 380 }} className="w-full md:w-auto">
                <div style={{
                  padding: 24, borderRadius: 16,
                  background: activeIdx === i ? `rgba(${hexToRgb(m.color)}, 0.08)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeIdx === i ? m.color + "50" : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                  transform: activeIdx === i ? "scale(1.02)" : "none",
                  backdropFilter: "blur(10px)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, color: m.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>{m.year}</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>{m.title}</div>
                    </div>
                  </div>
                  {activeIdx === i && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{m.desc}</motion.p>
                  )}
                  {activeIdx !== i && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{m.desc.slice(0, 60)}...</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : "14,165,233";
}
