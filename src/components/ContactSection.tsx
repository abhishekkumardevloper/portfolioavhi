"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWindowWidth } from "@/hooks/useResponsive";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = useWindowWidth();
  const isMobile = width <= 900;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 200; canvas.height = 200;
    let angle = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, 200, 200);
      const cx = 100, cy = 100, r = 80;
      const grad = ctx.createRadialGradient(70, 70, 0, cx, cy, r);
      grad.addColorStop(0, "rgba(14,165,233,0.4)");
      grad.addColorStop(0.6, "rgba(14,165,233,0.15)");
      grad.addColorStop(1, "rgba(14,165,233,0.05)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.strokeStyle = "rgba(14,165,233,0.3)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.strokeStyle = "rgba(14,165,233,0.15)"; ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = cy + (lat / 90) * r;
        const w = Math.sqrt(Math.max(0, r * r - (y - cy) * (y - cy)));
        if (w > 0) { ctx.beginPath(); ctx.ellipse(cx, y, w, w * 0.3, 0, 0, Math.PI * 2); ctx.stroke(); }
      }
      for (let i = 0; i < 6; i++) {
        const a = angle + (i * Math.PI) / 3;
        ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(Math.cos(a)) * r, r, a > Math.PI / 2 && a < (3 * Math.PI) / 2 ? 0 : 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(14,165,233,0.1)"; ctx.stroke();
      }
      const px = cx + 20, py = cy - 10;
      [1, 2, 3].forEach(ring => {
        const pr = (Date.now() % 2000) / 2000 * 30 * ring;
        if (pr < 30) {
          ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6,182,212,${1 - pr / 30})`; ctx.lineWidth = 1.5; ctx.stroke();
        }
      });
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#06b6d4"; ctx.shadowBlur = 15; ctx.shadowColor = "#06b6d4"; ctx.fill(); ctx.shadowBlur = 0;
      angle += 0.005;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 2000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12, color: "white",
    fontSize: 14, fontFamily: "var(--font-space), sans-serif",
    outline: "none", transition: "all 0.3s ease",
  };

  const contactLinks = [
    { icon: "📧", label: "Email", value: "abhishekkumar.devloper@gmail.com", href: "mailto:abhishekkumar.devloper@gmail.com", color: "#0ea5e9" },
    { icon: "💬", label: "WhatsApp", value: "+91 99050 28510", href: "https://wa.me/919905028510", color: "#22c55e" },
    { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/abhishek", href: "www.linkedin.com/in/abhishek-kumar-b5a180343", color: "#0ea5e9" },
    { icon: "🐙", label: "GitHub", value: "github.com/abhishekkumar.devloper", href: "https://github.com/abhishekkumardevloper", color: "#8b5cf6" },
  ];

  return (
    <section id="contact" ref={sectionRef}
      style={{ padding: "100px 1.5rem", background: "linear-gradient(180deg, #050505 0%, #050a15 100%)", position: "relative", overflow: "hidden" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)", filter: "blur(100px)", transform: "translateX(-50%)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(14,165,233,0.8)", fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// control room</span>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "var(--font-space), sans-serif" }}>
            <span style={{ color: "white" }}>Let&apos;s </span>
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginTop: 14 }}>Ready to build something extraordinary? Let&apos;s talk.</p>
        </motion.div>

        {/* Responsive grid */}
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? 32 : 48, alignItems: "start" }}>
          {/* Info column */}
          <motion.div className="contact-links-col" initial={{ opacity: 0, x: -40 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            {/* Globe */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
              <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {contactLinks.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", transition: "all 0.3s ease" }}
                  onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = link.color + "50"; t.style.background = `rgba(${hexToRgb(link.color)}, 0.06)`; t.style.transform = "translateX(6px)"; }}
                  onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = "rgba(255,255,255,0.07)"; t.style.background = "rgba(255,255,255,0.03)"; t.style.transform = "none"; }}>
                  <span style={{ fontSize: 18 }}>{link.icon}</span>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 10, color: link.color, fontFamily: "var(--font-mono, monospace)", marginBottom: 1 }}>{link.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: "15px 24px", borderRadius: 14, background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(139,92,246,0.15))", border: "1px solid rgba(14,165,233,0.3)", color: "white", textDecoration: "none", textAlign: "center", fontWeight: 700, fontSize: 14, transition: "all 0.3s ease", fontFamily: "var(--font-space), sans-serif" }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.background = "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(139,92,246,0.25))"; t.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.background = "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(139,92,246,0.15))"; t.style.transform = "none"; }}>
              📅 Book a Free Strategy Call
            </a>
          </motion.div>

          {/* Form column */}
          <motion.div className="contact-form-col" initial={{ opacity: 0, x: 40 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <div style={{ padding: "32px 28px", borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>🚀</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif", marginBottom: 10 }}>Message Sent!</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: 14 }}>I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", fontFamily: "var(--font-space), sans-serif", marginBottom: 4 }}>Send a Message</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-name-email">
                    <div>
                      <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 7, fontFamily: "var(--font-mono, monospace)" }}>Name</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(14,165,233,0.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 7, fontFamily: "var(--font-mono, monospace)" }}>Email</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(14,165,233,0.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 7, fontFamily: "var(--font-mono, monospace)" }}>Service</label>
                    <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="" style={{ background: "#0a0a0a" }}>Select a service...</option>
                      {["AI Development", "Website Development", "SaaS Platform", "Marketing Strategy", "Automation", "Lead Generation", "Brand Identity"].map(s => (
                        <option key={s} value={s} style={{ background: "#0a0a0a" }}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 7, fontFamily: "var(--font-mono, monospace)" }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about your project..." required rows={4}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(14,165,233,0.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
                  </div>
                  <button type="submit" disabled={sending}
                    style={{ padding: "15px", background: sending ? "rgba(14,165,233,0.3)" : "linear-gradient(135deg, #0ea5e9, #8b5cf6)", border: "none", borderRadius: 12, color: "white", fontSize: 15, fontWeight: 700, cursor: sending ? "wait" : "pointer", transition: "all 0.3s ease", fontFamily: "var(--font-space), sans-serif", boxShadow: "0 4px 20px rgba(14,165,233,0.3)" }}>
                    {sending ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .form-name-email {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : "14,165,233";
}
