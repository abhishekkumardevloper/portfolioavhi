"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "AI Lab", href: "#ai" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9990, padding: "0 2rem" }}
      >
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "12px 24px" : "20px 24px",
          background: scrolled ? "rgba(5,5,5,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderRadius: scrolled ? "16px" : "0",
          border: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          marginTop: scrolled ? 12 : 0,
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(139,92,246,0.3))",
              border: "1px solid rgba(14,165,233,0.4)",
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(14,165,233,0.2)",
            }}>
              <span style={{ fontWeight: 700, fontSize: 14, background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AK</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>Abhishek Kumar</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => handleNav(link.href)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", padding: "8px 14px", borderRadius: 8, cursor: "pointer", transition: "all 0.2s ease", fontFamily: "'Space Grotesk', sans-serif" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "white"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)"; (e.target as HTMLElement).style.background = "none"; }}>
                {link.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => handleNav("#contact")}
              className="hidden md:block"
              style={{ padding: "10px 24px", background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", border: "none", borderRadius: 50, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.3s ease", boxShadow: "0 4px 20px rgba(14,165,233,0.3)", fontFamily: "'Space Grotesk', sans-serif" }}>
              Hire Me
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden"
              style={{ display: "flex", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 22, height: 2, background: "white", borderRadius: 2, transition: "all 0.3s ease", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none" }} />
              ))}
            </button>
          </div>
        </div>

        <motion.div animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          style={{ overflow: "hidden", background: "rgba(5,5,5,0.95)", backdropFilter: "blur(20px)", borderRadius: "0 0 16px 16px", border: "1px solid rgba(255,255,255,0.06)", borderTop: "none" }}>
          <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => handleNav(link.href)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 500, padding: "12px 16px", borderRadius: 8, cursor: "pointer", textAlign: "left", fontFamily: "'Space Grotesk', sans-serif" }}>
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
