"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const metrics = [
  { label: "Revenue Generated", value: "$500K+", icon: "💰", color: "#22c55e", suffix: "" },
  { label: "Leads Generated", value: "50,000+", icon: "🎯", color: "#0ea5e9", suffix: "" },
  { label: "Ad Budget Managed", value: "₹1Cr+", icon: "📊", color: "#f59e0b", suffix: "" },
  { label: "Average ROAS", value: "5.2x", icon: "📈", color: "#8b5cf6", suffix: "" },
  { label: "Conversion Rate", value: "8.4%", icon: "⚡", color: "#06b6d4", suffix: "" },
  { label: "ROI Delivered", value: "320%", icon: "🚀", color: "#ec4899", suffix: "" },
];

const testimonials = [
  { name: "Rajesh Sharma", company: "TechVentures India", review: "Abhishek built our entire SaaS platform from scratch. Delivered in 6 weeks with pixel-perfect UI. Our revenue grew 3x in 6 months after launch.", avatar: "👨‍💼", rating: 5 },
  { name: "Priya Malhotra", company: "GrowthLabs", review: "The AI chatbot he built handles 2000+ customer queries daily with 95% satisfaction. Best ROI investment we've ever made.", avatar: "👩‍💻", rating: 5 },
  { name: "David Chen", company: "SaaS Rocket (Singapore)", review: "Exceptional developer. Built our lead generation system that generates 500 qualified leads/month. Highly recommend for any AI project.", avatar: "👨‍🦱", rating: 5 },
  { name: "Ananya Gupta", company: "FashionForward", review: "Our e-commerce sales tripled after Abhishek redesigned our store and automated our marketing funnels. Brilliant work.", avatar: "👩‍🎨", rating: 5 },
  { name: "Michael Torres", company: "Automate.io (USA)", review: "Delivered a complex automation system under budget and ahead of schedule. The code quality is enterprise-grade.", avatar: "👨‍💻", rating: 5 },
];

export default function MarketingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTestimonial(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="marketing" ref={sectionRef} style={{ padding: "120px 2rem", background: "linear-gradient(180deg, #050505 0%, #0a0508 50%, #050505 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Marketing Metrics */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(236,72,153,0.8)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// growth & results</span>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ color: "white" }}>Proven </span>
            <span style={{ background: "linear-gradient(135deg, #ec4899, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Results</span>
          </h2>
        </motion.div>

        {/* Metrics grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24, marginBottom: 100 }}>
          {metrics.map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}>
              <div style={{ padding: 28, borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center", backdropFilter: "blur(10px)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = m.color + "50"; (e.currentTarget as HTMLElement).style.background = `rgba(${hexToRgb(m.color)}, 0.06)`; (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(${hexToRgb(m.color)}, 0.15)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{m.icon}</div>
                <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: m.color, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8, textShadow: `0 0 30px ${m.color}60` }}>{m.value}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{m.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
          <h3 style={{ fontSize: 32, fontWeight: 700, color: "white", textAlign: "center", marginBottom: 48, fontFamily: "'Space Grotesk', sans-serif" }}>Client Testimonials</h3>

          {/* Main testimonial */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <motion.div key={currentTestimonial}
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{ padding: 40, borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", maxWidth: 700, margin: "0 auto", backdropFilter: "blur(20px)", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>❝</div>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: 28, fontStyle: "italic" }}>{testimonials[currentTestimonial].review}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(139,92,246,0.3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "1px solid rgba(255,255,255,0.1)" }}>{testimonials[currentTestimonial].avatar}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700, color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>{testimonials[currentTestimonial].name}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{testimonials[currentTestimonial].company}</div>
                </div>
                <div style={{ fontSize: 14, color: "#f59e0b", letterSpacing: 2 }}>{"★".repeat(testimonials[currentTestimonial].rating)}</div>
              </div>
            </motion.div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrentTestimonial(i)}
                style={{ width: i === currentTestimonial ? 24 : 8, height: 8, borderRadius: 4, background: i === currentTestimonial ? "#0ea5e9" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s ease", boxShadow: i === currentTestimonial ? "0 0 10px #0ea5e9" : "none" }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : "14,165,233";
}
