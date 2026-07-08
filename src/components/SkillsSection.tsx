"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "React", icon: "⚛️", color: "#61dafb", pct: 95, projects: 30 },
  { name: "Next.js", icon: "▲", color: "#ffffff", pct: 92, projects: 25 },
  { name: "Node.js", icon: "🟢", color: "#68a063", pct: 88, projects: 20 },
  { name: "Python", icon: "🐍", color: "#3572A5", pct: 90, projects: 35 },
  { name: "FastAPI", icon: "⚡", color: "#009688", pct: 85, projects: 18 },
  { name: "MongoDB", icon: "🍃", color: "#4DB33D", pct: 82, projects: 22 },
  { name: "PostgreSQL", icon: "🐘", color: "#336791", pct: 80, projects: 15 },
  { name: "Docker", icon: "🐳", color: "#2496ED", pct: 75, projects: 12 },
  { name: "AI/OpenAI", icon: "🤖", color: "#10a37f", pct: 93, projects: 20 },
  { name: "LangChain", icon: "🦜", color: "#1C3C3C", pct: 88, projects: 15 },
  { name: "Automation", icon: "⚙️", color: "#f59e0b", pct: 91, projects: 28 },
  { name: "Marketing", icon: "📈", color: "#ec4899", pct: 87, projects: 40 },
  { name: "SEO", icon: "🔍", color: "#4285f4", pct: 85, projects: 35 },
  { name: "Lead Gen", icon: "🎯", color: "#ff6b35", pct: 89, projects: 30 },
  { name: "Prompt Eng.", icon: "✨", color: "#8b5cf6", pct: 94, projects: 25 },
  { name: "TypeScript", icon: "📘", color: "#3178c6", pct: 88, projects: 20 },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section" style={{ padding: "120px 2rem", background: "#050505", position: "relative", overflow: "hidden" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(139,92,246,0.8)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// skills & expertise</span>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ color: "white" }}>Skill </span>
            <span style={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Universe</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 16 }}>Click any skill to explore</p>
        </motion.div>

        {/* Skill planets grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 24 }}>
          {skills.map((skill, i) => (
            <motion.div key={skill.name}
              initial={{ opacity: 0, scale: 0.5 }} animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{ cursor: "pointer" }}>
              <div style={{
                position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                padding: 24, borderRadius: 20,
                background: selected === i ? `rgba(${hexToRgb(skill.color)}, 0.12)` : "rgba(255,255,255,0.03)",
                border: `1px solid ${selected === i ? skill.color + "50" : "rgba(255,255,255,0.07)"}`,
                transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                transform: selected === i ? "scale(1.08) translateY(-8px)" : "none",
                boxShadow: selected === i ? `0 20px 60px rgba(${hexToRgb(skill.color)}, 0.2)` : "none",
              }}
                onMouseEnter={e => { if (selected !== i) { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.borderColor = skill.color + "40"; } }}
                onMouseLeave={e => { if (selected !== i) { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; } }}
              >
                {/* Planet sphere */}
                <div style={{ position: "relative", width: 60, height: 60 }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, ${skill.color}40, ${skill.color}10)`, border: `1px solid ${skill.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: `0 0 20px ${skill.color}30`, animation: "float 6s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}>
                    {skill.icon}
                  </div>
                  {/* Orbit ring */}
                  <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `1px solid ${skill.color}20`, animation: "rotate-slow 8s linear infinite" }} />
                </div>

                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>{skill.name}</div>
                  <div style={{ fontSize: 11, color: skill.color, marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{skill.pct}%</div>
                </div>

                {/* Expanded info */}
                {selected === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ width: "100%", borderTop: `1px solid ${skill.color}20`, paddingTop: 12, marginTop: 4 }}>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 2, height: 3, overflow: "hidden" }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${skill.pct}%` }} transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                          style={{ height: "100%", background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`, borderRadius: 2 }} />
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{skill.projects} projects</div>
                  </motion.div>
                )}
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
