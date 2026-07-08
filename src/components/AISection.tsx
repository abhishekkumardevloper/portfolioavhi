"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const aiServices = [
  { icon: "🧠", title: "Custom AI Agents", desc: "Autonomous AI agents that can browse, code, analyze, and execute complex multi-step tasks.", color: "#10a37f" },
  { icon: "💬", title: "AI Chatbots", desc: "Smart chatbots with memory, personality, and domain-specific knowledge for your business.", color: "#0ea5e9" },
  { icon: "🔍", title: "RAG Systems", desc: "Retrieval-Augmented Generation systems that give AI perfect memory over your documents.", color: "#8b5cf6" },
  { icon: "🎤", title: "Voice AI", desc: "Real-time voice AI assistants using Whisper, ElevenLabs, and custom TTS/STT pipelines.", color: "#06b6d4" },
  { icon: "👁️", title: "Vision AI", desc: "Computer vision systems for image analysis, OCR, object detection, and visual QA.", color: "#a855f7" },
  { icon: "🔗", title: "LLM Integration", desc: "Seamless integration of OpenAI, Claude, Gemini, and open-source LLMs into your stack.", color: "#f59e0b" },
  { icon: "⚙️", title: "AI Automation", desc: "End-to-end intelligent automation pipelines that eliminate manual work at scale.", color: "#ec4899" },
  { icon: "📡", title: "AI APIs", desc: "Production-ready AI APIs with rate limiting, authentication, caching, and monitoring.", color: "#22c55e" },
  { icon: "✨", title: "Prompt Engineering", desc: "Advanced prompting strategies: chain-of-thought, few-shot, tree-of-thought, and more.", color: "#ef4444" },
];

const techStack = [
  "React", "Next.js", "FastAPI", "Python", "Node.js", "Docker", "Redis", "AWS",
  "Supabase", "Firebase", "OpenAI", "Claude", "Gemini", "LangChain", "Pinecone", "MongoDB",
];

export default function AISection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Neural network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    type Node = { x: number; y: number; r: number; vx: number; vy: number; color: string };
    const nodes: Node[] = [];
    const colors = ["#10a37f", "#0ea5e9", "#8b5cf6", "#06b6d4"];
    for (let i = 0; i < 40; i++) {
      nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 3 + 1, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, color: colors[Math.floor(Math.random() * colors.length)] });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;

        nodes.forEach(n2 => {
          const d = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = n.color;
            ctx.globalAlpha = (1 - d / 120) * 0.3;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [visible]);

  return (
    <section id="ai" ref={sectionRef} style={{ padding: "120px 2rem", background: "linear-gradient(180deg, #050505 0%, #000a08 50%, #050505 100%)", position: "relative", overflow: "hidden" }}>
      {/* Neural canvas background */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,163,127,0.08) 0%, transparent 70%)", filter: "blur(80px)", transform: "translate(-50%, -50%)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: "center", marginBottom: 80 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(16,163,127,0.8)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", display: "block", marginBottom: 16 }}>// ai laboratory</span>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ color: "white" }}>AI </span>
            <span style={{ background: "linear-gradient(135deg, #10a37f, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Capabilities</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>Cutting-edge AI solutions built with the latest models and frameworks.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 80 }}>
          {aiServices.map((svc, i) => (
            <motion.div key={svc.title}
              initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06 }}>
              <div style={{ padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = svc.color + "50"; (e.currentTarget as HTMLElement).style.background = `rgba(${hexToRgb(svc.color)}, 0.06)`; (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{svc.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{svc.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack holograms */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", textAlign: "center", marginBottom: 32, fontFamily: "'Space Grotesk', sans-serif" }}>Technology Stack</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            {techStack.map((tech, i) => (
              <motion.div key={tech}
                initial={{ opacity: 0, scale: 0.8 }} animate={visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}>
                <div style={{ padding: "10px 20px", borderRadius: 50, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'JetBrains Mono', monospace", transition: "all 0.3s ease", cursor: "default" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(14,165,233,0.1)"; (e.target as HTMLElement).style.borderColor = "rgba(14,165,233,0.4)"; (e.target as HTMLElement).style.color = "#0ea5e9"; (e.target as HTMLElement).style.boxShadow = "0 0 20px rgba(14,165,233,0.2)"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"; (e.target as HTMLElement).style.boxShadow = "none"; }}>
                  {tech}
                </div>
              </motion.div>
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
