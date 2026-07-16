"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const filters = ["All", "Website", "AI", "Automation", "SaaS", "Marketing", "E-Commerce"];

const projects = [
  { title: "NeuralChat AI", category: "AI", desc: "Enterprise AI chatbot with RAG, custom knowledge base, and multi-channel deployment. Processes 10K+ conversations daily.", tech: ["Python", "LangChain", "OpenAI", "FastAPI", "React"], color: "#10a37f", emoji: "🤖", metric: "10K+ daily chats" },
  { title: "FlowSaaS Platform", category: "SaaS", desc: "Full-stack SaaS platform with Stripe billing, multi-tenancy, role-based access, and real-time analytics dashboard.", tech: ["Next.js", "Supabase", "Stripe", "TypeScript"], color: "#8b5cf6", emoji: "⚡", metric: "$50K MRR" },
  { title: "AutoLeads CRM", category: "Automation", desc: "AI-powered lead generation and CRM system with automated follow-ups, scoring, and WhatsApp integration.", tech: ["n8n", "OpenAI", "Node.js", "MongoDB"], color: "#f59e0b", emoji: "🎯", metric: "3x lead increase" },
  { title: "MarketPulse Dashboard", category: "Marketing", desc: "Real-time marketing analytics dashboard tracking 50+ metrics across Meta, Google, TikTok campaigns.", tech: ["Next.js", "D3.js", "FastAPI", "PostgreSQL"], color: "#ec4899", emoji: "📊", metric: "5x ROAS achieved" },
  { title: "ShopNova E-Commerce", category: "E-Commerce", desc: "Premium e-commerce platform with AI-powered product recommendations, AR try-on, and one-click checkout.", tech: ["Next.js", "Shopify API", "AI", "Stripe"], color: "#06b6d4", emoji: "🛍️", metric: "$200K revenue" },
  { title: "DevConnect Platform", category: "Website", desc: "Developer community platform with GitHub integration, job board, and project collaboration tools.", tech: ["React", "Node.js", "PostgreSQL", "Redis"], color: "#0ea5e9", emoji: "💻", metric: "50K+ users" },
  { title: "DocuAI Assistant", category: "AI", desc: "AI document analysis tool that extracts insights, generates summaries, and answers questions from PDFs.", tech: ["Python", "LangChain", "Pinecone", "React"], color: "#a855f7", emoji: "📄", metric: "99% accuracy" },
  { title: "GrowthFunnel Pro", category: "Marketing", desc: "Complete marketing funnel builder with A/B testing, lead scoring, email sequences, and conversion tracking.", tech: ["Next.js", "HubSpot API", "Zapier", "Analytics"], color: "#ef4444", emoji: "🚀", metric: "40% conversion boost" },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = projects.filter(p => activeFilter === "All" || p.category === activeFilter);

  return (
    <section id="projects" ref={sectionRef} className="section" style={{ padding: "120px 2rem", background: "#050505", position: "relative", overflow: "hidden" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.2 }} />
      <div style={{ position: "absolute", bottom: "20%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(14,165,233,0.8)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// featured work</span>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ color: "white" }}>Project </span>
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gallery</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 60 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.03em", background: activeFilter === f ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)" : "rgba(255,255,255,0.04)", border: activeFilter === f ? "none" : "1px solid rgba(255,255,255,0.1)", color: activeFilter === f ? "white" : "rgba(255,255,255,0.6)", boxShadow: activeFilter === f ? "0 4px 20px rgba(14,165,233,0.3)" : "none" }}>
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}>
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div key={project.title}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "default" }}>
                <div style={{
                  position: "relative", borderRadius: 20, overflow: "hidden",
                  background: `linear-gradient(135deg, rgba(${hexToRgb(project.color)}, 0.08) 0%, rgba(5,5,5,0.9) 60%)`,
                  border: `1px solid ${hovered === i ? project.color + "50" : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                  transform: hovered === i ? "translateY(-12px)" : "none",
                  boxShadow: hovered === i ? `0 40px 100px rgba(${hexToRgb(project.color)}, 0.2)` : "none",
                  backdropFilter: "blur(10px)",
                }}>
                  {/* Project preview */}
                  <div style={{ height: 200, background: `linear-gradient(135deg, rgba(${hexToRgb(project.color)}, 0.15), rgba(${hexToRgb(project.color)}, 0.05))`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <div style={{ fontSize: 72, filter: `drop-shadow(0 0 30px ${project.color})`, animation: hovered === i ? "float 3s ease-in-out infinite" : "none" }}>{project.emoji}</div>
                    {/* Overlay on hover */}
                    <div style={{ position: "absolute", inset: 0, background: `rgba(${hexToRgb(project.color)}, 0.05)`, opacity: hovered === i ? 1 : 0, transition: "opacity 0.4s ease" }} />
                    {/* Category badge */}
                    <div style={{ position: "absolute", top: 16, left: 16, padding: "4px 12px", borderRadius: 50, background: `rgba(${hexToRgb(project.color)}, 0.2)`, border: `1px solid ${project.color}40`, fontSize: 11, color: project.color, fontFamily: "'JetBrains Mono', monospace" }}>{project.category}</div>
                    {/* Metric badge */}
                    <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: 50, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>{project.metric}</div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 18 }}>{project.desc}</p>

                    {/* Tech stack */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                      {project.tech.map(t => (
                        <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div style={{ display: "flex", gap: 12 }}>
                      <button 
                        onClick={() => window.open("https://wa.me/919905028510", "_blank")}
                        style={{ flex: 1, padding: "10px", borderRadius: 10, background: `rgba(${hexToRgb(project.color)}, 0.15)`, border: `1px solid ${project.color}30`, color: project.color, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease" }}>
                        Get Started →
                      </button>
                      <button 
                        onClick={() => window.open("https://github.com/abhishekkumardevloper", "_blank")}
                        style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: 13, cursor: "pointer", transition: "all 0.2s ease" }}>
                        GitHub
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : "14,165,233";
}
