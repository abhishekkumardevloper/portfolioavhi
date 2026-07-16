"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { icon: "🤖", title: "AI Applications", desc: "Custom AI agents, chatbots, and intelligent automation systems powered by GPT-4, Claude & Gemini.", price: "From $999", color: "#10a37f", tags: ["GPT-4", "Agents", "RAG"] },
  { icon: "🌐", title: "Website Development", desc: "Premium, high-performance websites with stunning UI/UX. Next.js, React, TypeScript.", price: "From $499", color: "#0ea5e9", tags: ["Next.js", "React", "TypeScript"] },
  { icon: "🏢", title: "Business Websites", desc: "Professional business sites that convert visitors into clients with SEO-optimized content.", price: "From $299", color: "#06b6d4", tags: ["SEO", "CMS", "Analytics"] },
  { icon: "⚡", title: "SaaS Development", desc: "Full-stack SaaS platforms with authentication, billing, dashboards, and multi-tenancy.", price: "From $2999", color: "#8b5cf6", tags: ["Auth", "Stripe", "Multi-tenant"] },
  { icon: "🚀", title: "Landing Pages", desc: "High-converting landing pages designed to maximize your ad spend ROI.", price: "From $199", color: "#ec4899", tags: ["CRO", "A/B Test", "Fast"] },
  { icon: "📊", title: "CRM Systems", desc: "Custom CRM solutions tailored to your sales pipeline and business workflow.", price: "From $1499", color: "#f59e0b", tags: ["Pipeline", "Automation", "Reports"] },
  { icon: "⚙️", title: "Automation", desc: "n8n, Zapier, Make.com workflows. Automate your business processes end-to-end.", price: "From $299", color: "#22c55e", tags: ["n8n", "Make", "Zapier"] },
  { icon: "💬", title: "AI Chatbots", desc: "Intelligent chatbots for customer support, lead qualification, and sales automation.", price: "From $599", color: "#3b82f6", tags: ["GPT", "WhatsApp", "24/7"] },
  { icon: "📈", title: "Marketing Strategy", desc: "Data-driven marketing strategies that generate leads and scale your business.", price: "From $499", color: "#ef4444", tags: ["Meta Ads", "Google", "Funnel"] },
  { icon: "🎨", title: "Brand Identity", desc: "Complete brand identity design including logo, guidelines, and visual system.", price: "From $399", color: "#f97316", tags: ["Logo", "Guidelines", "Assets"] },
  { icon: "🎯", title: "Lead Generation", desc: "Proven lead generation systems using paid ads, funnels, and CRM integration.", price: "From $699", color: "#a855f7", tags: ["Ads", "Funnels", "CRM"] },
  { icon: "🔍", title: "SEO", desc: "Technical SEO, content strategy, and link building to dominate search rankings.", price: "From $399", color: "#14b8a6", tags: ["Technical", "Content", "Links"] },
];

const portfolioData = {
  "Real Estate": [
    { name: "ANK Realty", url: "https://www.ankrealty.com/" },
    { name: "Yogesh Architect", url: "https://yogesharchitect.com/" }
  ],
  "Business": [
    { name: "Narayan GrowthWave", url: "https://www.narayangrowthwave.in/" },
    { name: "Canecsu", url: "https://www.canecsu.com/" },
    { name: "Bhuveda Harvest", url: "https://bhuveda-harvest-hub.vercel.app/" },
    { name: "Book & Lab", url: "https://www.bookandlab.com/" },
    { name: "Sumirayan Design", url: "https://sumirayandesign.com/" },
    { name: "Samucha Bihar", url: "https://samuchabihar.com/" },
    { name: "Iron Fitness", url: "https://iron-fitness-clean-v2.vercel.app/" }
  ],
  "Medical": [
    { name: "SS Hospital", url: "https://www.sshospitalpatna.org/" },
    { name: "WellReport", url: "https://wellreport-health-hub.abhishekkumar-devloper.workers.dev/" }
  ]
};

type Category = keyof typeof portfolioData;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("Real Estate");
  const [activeSite, setActiveSite] = useState(portfolioData["Real Estate"][0].url);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setActiveSite(portfolioData[category][0].url);
  };

  return (
    <>
      <section id="services" ref={sectionRef} className="section" style={{ padding: "120px 2rem", background: "linear-gradient(180deg, #050505 0%, #05050f 50%, #050505 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(6,182,212,0.8)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// what i build</span>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ color: "white" }}>Premium </span>
              <span style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Services</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>Enterprise-grade solutions for ambitious businesses. Hover to reveal details.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {services.map((svc, i) => (
              <motion.div key={svc.title}
                initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", padding: 28, borderRadius: 20,
                  background: hovered === i ? `rgba(${hexToRgb(svc.color)}, 0.06)` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hovered === i ? svc.color + "40" : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                  transform: hovered === i ? "translateY(-10px) rotateX(2deg)" : "none",
                  boxShadow: hovered === i ? `0 30px 80px rgba(${hexToRgb(svc.color)}, 0.15)` : "none",
                  cursor: "default",
                  backdropFilter: "blur(10px)",
                  transformStyle: "preserve-3d",
                }}>
                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: `linear-gradient(90deg, transparent, ${svc.color}60, transparent)`, opacity: hovered === i ? 1 : 0, transition: "opacity 0.4s ease" }} />

                <div style={{ fontSize: 36, marginBottom: 16 }}>{svc.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif" }}>{svc.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>{svc.desc}</p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {svc.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 50, background: `rgba(${hexToRgb(svc.color)}, 0.1)`, border: `1px solid ${svc.color}30`, color: svc.color, fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: svc.color }}>{svc.price}</span>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    style={{ fontSize: 12, padding: "8px 18px", borderRadius: 50, background: `rgba(${hexToRgb(svc.color)}, 0.15)`, border: `1px solid ${svc.color}40`, color: svc.color, cursor: "pointer", transition: "all 0.2s ease", fontWeight: 600 }}>
                    View Project →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "100%", maxWidth: "1200px", height: "90vh", backgroundColor: "#09090b", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            >
              {/* Modal Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#111113" }}>
                <h3 style={{ color: "white", fontSize: 18, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>Project Portfolio</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 24, cursor: "pointer", padding: "0 8px" }}
                >
                  ×
                </button>
              </div>

              {/* Main Categories (Real Estate, Business, Medical) */}
              <div style={{ display: "flex", gap: "8px", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#0f0f11" }}>
                {(Object.keys(portfolioData) as Category[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      backgroundColor: activeCategory === category ? "rgba(6,182,212,0.15)" : "transparent",
                      color: activeCategory === category ? "#06b6d4" : "rgba(255,255,255,0.6)",
                      border: `1px solid ${activeCategory === category ? "rgba(6,182,212,0.3)" : "transparent"}`,
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sub-categories (Specific Websites) */}
              <div style={{ display: "flex", gap: "8px", padding: "12px 24px", overflowX: "auto", borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#050505" }}>
                {portfolioData[activeCategory].map((site) => (
                  <button
                    key={site.name}
                    onClick={() => setActiveSite(site.url)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "50px",
                      fontSize: 13,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      backgroundColor: activeSite === site.url ? "white" : "rgba(255,255,255,0.05)",
                      color: activeSite === site.url ? "black" : "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {site.name}
                  </button>
                ))}
              </div>

              {/* Iframe View */}
              <div style={{ flex: 1, backgroundColor: "#ffffff", position: "relative" }}>
                <iframe 
                  src={activeSite} 
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="Project Preview"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : "14,165,233";
}
