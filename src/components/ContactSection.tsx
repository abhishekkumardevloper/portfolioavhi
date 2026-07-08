"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Earth/globe animation
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

      // Globe
      const grad = ctx.createRadialGradient(70, 70, 0, cx, cy, r);
      grad.addColorStop(0, "rgba(14,165,233,0.4)");
      grad.addColorStop(0.6, "rgba(14,165,233,0.15)");
      grad.addColorStop(1, "rgba(14,165,233,0.05)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(14,165,233,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude lines
      ctx.strokeStyle = "rgba(14,165,233,0.15)";
      ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = cy + (lat / 90) * r;
        const w = Math.sqrt(Math.max(0, r * r - (y - cy) * (y - cy)));
        if (w > 0) {
          ctx.beginPath();
          ctx.ellipse(cx, y, w, w * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Meridian lines (rotating)
      for (let i = 0; i < 6; i++) {
        const a = angle + (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(Math.cos(a)) * r, r, a > Math.PI / 2 && a < (3 * Math.PI) / 2 ? 0 : 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(14,165,233,0.1)";
        ctx.stroke();
      }

      // Pulse rings (India location)
      const px = cx + 20, py = cy - 10;
      [1, 2, 3].forEach(ring => {
        const pr = (Date.now() % 2000) / 2000 * 30 * ring;
        if (pr < 30) {
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6,182,212,${1 - pr / 30})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Location dot
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#06b6d4";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#06b6d4";
      ctx.fill();
      ctx.shadowBlur = 0;

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

  const inputStyle = {
    width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white",
    fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", outline: "none",
    transition: "all 0.3s ease",
  };

  return (
    <section id="contact" ref={sectionRef} style={{ padding: "120px 2rem", background: "linear-gradient(180deg, #050505 0%, #050a15 100%)", position: "relative", overflow: "hidden" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)", filter: "blur(100px)", transform: "translateX(-50%)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(14,165,233,0.8)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// control room</span>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ color: "white" }}>Let&apos;s </span>
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 16 }}>Ready to build something extraordinary? Let&apos;s talk.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60, alignItems: "start" }}>
          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            {/* Globe */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
              <canvas ref={canvasRef} style={{ width: 200, height: 200 }} />
            </div>

            {/* Contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {[
                { icon: "📧", label: "Email", value: "abhishek@example.com", href: "mailto:abhishek@example.com", color: "#0ea5e9" },
                { icon: "💬", label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210", color: "#22c55e" },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/abhishek", href: "https://linkedin.com", color: "#0ea5e9" },
                { icon: "🐙", label: "GitHub", value: "github.com/abhishek", href: "https://github.com", color: "#8b5cf6" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", transition: "all 0.3s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = link.color + "50"; (e.currentTarget as HTMLElement).style.background = `rgba(${hexToRgb(link.color)}, 0.06)`; (e.currentTarget as HTMLElement).style.transform = "translateX(6px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                  <span style={{ fontSize: 20 }}>{link.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: link.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>{link.label}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{link.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Book meeting CTA */}
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: "16px 24px", borderRadius: 14, background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(139,92,246,0.15))", border: "1px solid rgba(14,165,233,0.3)", color: "white", textDecoration: "none", textAlign: "center", fontWeight: 700, fontSize: 15, transition: "all 0.3s ease", fontFamily: "'Space Grotesk', sans-serif" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(139,92,246,0.25))"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(139,92,246,0.15))"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
              📅 Book a Free Strategy Call
            </a>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <div style={{ padding: 40, borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 64, marginBottom: 20 }}>🚀</div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: "white", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>Thank you for reaching out! I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>Send a Message</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Name</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required style={inputStyle}
                        onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(14,165,233,0.5)"; (e.target as HTMLElement).style.boxShadow = "0 0 20px rgba(14,165,233,0.1)"; }}
                        onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.boxShadow = "none"; }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Email</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required style={inputStyle}
                        onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(14,165,233,0.5)"; (e.target as HTMLElement).style.boxShadow = "0 0 20px rgba(14,165,233,0.1)"; }}
                        onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.boxShadow = "none"; }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Service</label>
                    <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="" style={{ background: "#0a0a0a" }}>Select a service...</option>
                      {["AI Development", "Website Development", "SaaS Platform", "Marketing Strategy", "Automation", "Lead Generation", "Brand Identity"].map(s => (
                        <option key={s} value={s} style={{ background: "#0a0a0a" }}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about your project..." required rows={5}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(14,165,233,0.5)"; (e.target as HTMLElement).style.boxShadow = "0 0 20px rgba(14,165,233,0.1)"; }}
                      onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.boxShadow = "none"; }} />
                  </div>
                  <button type="submit" disabled={sending}
                    style={{ padding: "16px", background: sending ? "rgba(14,165,233,0.3)" : "linear-gradient(135deg, #0ea5e9, #8b5cf6)", border: "none", borderRadius: 12, color: "white", fontSize: 15, fontWeight: 700, cursor: sending ? "wait" : "pointer", transition: "all 0.3s ease", fontFamily: "'Space Grotesk', sans-serif", boxShadow: "0 4px 20px rgba(14,165,233,0.3)" }}>
                    {sending ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : "14,165,233";
}
