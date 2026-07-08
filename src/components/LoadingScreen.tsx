"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "zoom" | "done">("loading");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Particle system
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; color: string;
    }> = [];

    const colors = ["#0ea5e9", "#8b5cf6", "#06b6d4", "#ec4899"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Draw connections
        particles.forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 80) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        ctx.globalAlpha = 1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 3 + 1;
      if (val >= 100) {
        val = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setPhase("zoom");
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 1000);
        }, 500);
      } else {
        setProgress(Math.floor(val));
      }
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* 3D Logo */}
            <motion.div
              animate={
                phase === "zoom"
                  ? { scale: 20, opacity: 0 }
                  : { rotateY: [0, 360], scale: [1, 1.05, 1] }
              }
              transition={
                phase === "zoom"
                  ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                  : { rotateY: { duration: 3, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }
              }
              style={{ perspective: 800 }}
              className="relative"
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  position: "relative",
                }}
              >
                {/* Outer ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -10,
                    border: "2px solid rgba(6,182,212,0.5)",
                    borderRadius: "50%",
                    boxShadow: "0 0 20px rgba(6,182,212,0.5), 0 0 40px rgba(6,182,212,0.3)",
                    animation: "rotate-slow 4s linear infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    border: "1px solid rgba(139,92,246,0.3)",
                    borderRadius: "50%",
                    animation: "rotate-reverse 6s linear infinite",
                  }}
                />
                {/* Logo center */}
                <div
                  style={{
                    width: 100,
                    height: 100,
                    background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(139,92,246,0.2))",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 0 30px rgba(14,165,233,0.3), 0 0 60px rgba(139,92,246,0.2)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 32,
                      background: "linear-gradient(135deg, #0ea5e9, #8b5cf6, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    AK
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Glowing text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  letterSpacing: "0.4em",
                  color: "rgba(6,182,212,0.9)",
                  textShadow: "0 0 20px rgba(6,182,212,0.8)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Building Tomorrow...
              </p>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.2em",
                }}
              >
                Abhishek Kumar · Portfolio
              </p>
            </motion.div>

            {/* Progress bar */}
            <div style={{ width: 280 }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  height: 2,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #0ea5e9, #8b5cf6, #06b6d4)",
                    borderRadius: 2,
                    width: `${progress}%`,
                    transition: "width 0.1s ease",
                    boxShadow: "0 0 10px rgba(14,165,233,0.8)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                <span>Initializing systems...</span>
                <span style={{ color: "rgba(6,182,212,0.8)" }}>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
