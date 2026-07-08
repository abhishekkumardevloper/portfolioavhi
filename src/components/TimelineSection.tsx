"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const milestones = [
  { year: "2019", title: "Started Coding Journey", desc: "Began learning web development with HTML, CSS, and JavaScript. Built first portfolio site and fell in love with creating digital experiences.", icon: "🚀", tags: ["HTML", "CSS", "JS"] },
  { year: "2020", title: "BCA Enrollment", desc: "Enrolled in Bachelor of Computer Applications. Deepened fundamentals in programming, databases, and software engineering principles.", icon: "🎓", tags: ["Java", "C++", "MySQL"] },
  { year: "2021", title: "First Freelance Client", desc: "Landed first paid web development project. Delivered a business website and discovered the satisfaction of solving real client problems.", icon: "💼", tags: ["React", "Node.js"] },
  { year: "2022", title: "Mastered Full Stack", desc: "Built and shipped 10+ full-stack applications using React, Next.js, Node.js, and MongoDB. Established core stack expertise.", icon: "⚡", tags: ["Next.js", "MongoDB"] },
  { year: "2023", title: "Entered AI World", desc: "Began integrating OpenAI and LangChain into production apps. Built first AI chatbot that served 1K+ daily users.", icon: "🤖", tags: ["OpenAI", "LangChain"] },
  { year: "2024", title: "SaaS & Scale", desc: "Launched two SaaS products. Helped clients automate workflows with n8n, Zapier, and custom AI agents, saving 100+ hours weekly.", icon: "📈", tags: ["SaaS", "n8n", "FastAPI"] },
  { year: "2025", title: "Marketing Expert", desc: "Added digital marketing to the arsenal — SEO, Meta Ads, Google Ads, and email marketing. Generated $500K+ in client revenue.", icon: "🎯", tags: ["Meta Ads", "SEO", "Email"] },
  { year: "2026", title: "Building the Future", desc: "Currently building enterprise-grade AI systems, automation pipelines, and premium digital products for global clients. Continuously learning and shipping.", icon: "🌟", tags: ["AI Agents", "Enterprise"] },
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
    <section id="timeline" ref={sectionRef} className="section"
      style={{ padding: "100px 1.5rem", background: "#050505", position: "relative", overflow: "hidden" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
      <div style={{ position: "absolute", left: "50%", top: "10%", bottom: "10%", width: 1, background: "linear-gradient(to bottom, transparent, rgba(14,165,233,0.3), rgba(139,92,246,0.3), transparent)", transform: "translateX(-50%)" }} className="timeline-center-line" />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(14,165,233,0.8)", fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// career journey</span>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "var(--font-space), sans-serif" }}>
            <span style={{ color: "white" }}>The </span>
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Timeline</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", marginTop: 14 }}>Click any milestone to read the full story</p>
        </motion.div>

        <div style={{ position: "relative" }}>
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            const isActive = activeIdx === i;
            return (
              <motion.div
                key={m.year}
                className="timeline-item"
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{ display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start", marginBottom: 32, position: "relative" }}
              >
                {/* Center dot */}
                <div
                  className="timeline-center-dot"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 24,
                    transform: "translateX(-50%)",
                    width: 14, height: 14,
                    borderRadius: "50%",
                    background: isActive ? "#0ea5e9" : "rgba(14,165,233,0.4)",
                    border: "2px solid rgba(14,165,233,0.6)",
                    boxShadow: isActive ? "0 0 16px rgba(14,165,233,0.8)" : "none",
                    zIndex: 2,
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Card */}
                <div
                  onClick={() => setActiveIdx(isActive ? null : i)}
                  style={{
                    width: "44%",
                    padding: "22px 20px",
                    background: isActive ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? "rgba(14,165,233,0.35)" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 18,
                    cursor: "pointer",
                    backdropFilter: "blur(20px)",
                    transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    boxShadow: isActive ? "0 20px 60px rgba(14,165,233,0.12)" : "none",
                    marginRight: isLeft ? "calc(6% + 20px)" : "0",
                    marginLeft: isLeft ? "0" : "calc(6% + 20px)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: 10, color: "#0ea5e9", fontFamily: "var(--font-mono, monospace)", marginBottom: 2 }}>{m.year}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif" }}>{m.title}</div>
                    </div>
                  </div>
                  {isActive && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 12 }}>{m.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {m.tags.map(t => (
                          <span key={t} style={{ padding: "3px 10px", borderRadius: 50, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)", fontSize: 10, color: "#0ea5e9", fontFamily: "var(--font-mono, monospace)" }}>{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile: single column layout */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-item {
            justify-content: flex-start !important;
          }
          .timeline-item > div:last-child {
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
