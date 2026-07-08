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

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9990, padding: "0 1rem" }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "10px 20px" : "18px 20px",
          background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderRadius: scrolled ? "16px" : "0",
          border: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          marginTop: scrolled ? 10 : 0,
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(139,92,246,0.3))", border: "1px solid rgba(14,165,233,0.4)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(14,165,233,0.2)" }}>
              <span style={{ fontWeight: 700, fontSize: 13, background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AK</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, color: "white", fontFamily: "var(--font-space), sans-serif" }}>Abhishek Kumar</span>
          </div>

          {/* Desktop nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="nav-desktop">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => handleNav(link.href)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", padding: "8px 13px", borderRadius: 8, cursor: "pointer", transition: "all 0.2s ease", fontFamily: "var(--font-space), sans-serif" }}
                onMouseEnter={e => { const t = e.target as HTMLElement; t.style.color = "white"; t.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { const t = e.target as HTMLElement; t.style.color = "rgba(255,255,255,0.6)"; t.style.background = "none"; }}>
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => handleNav("#contact")}
              className="nav-hire-btn"
              style={{ padding: "9px 22px", background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", border: "none", borderRadius: 50, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.3s ease", boxShadow: "0 4px 20px rgba(14,165,233,0.3)", fontFamily: "var(--font-space), sans-serif", flexShrink: 0 }}>
              Hire Me
            </button>

            {/* Hamburger */}
            <button
              className="nav-hamburger"
              onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
              style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8, flexShrink: 0 }}
              aria-label="Toggle menu">
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 22, height: 2, background: "white", borderRadius: 2, transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                      : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                      : "scaleX(0)"
                    : "none",
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <motion.div
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          style={{ overflow: "hidden", background: "rgba(5,5,10,0.97)", backdropFilter: "blur(24px)", borderRadius: "0 0 20px 20px", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none" }}>
          <div style={{ padding: "8px 16px 20px" }}>
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNav(link.href)}
                style={{ display: "block", width: "100%", background: "none", border: "none", color: "rgba(255,255,255,0.75)", fontSize: 16, fontWeight: 500, padding: "13px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left", fontFamily: "var(--font-space), sans-serif", transition: "all 0.2s ease" }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.color = "white"; t.style.background = "rgba(14,165,233,0.08)"; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.color = "rgba(255,255,255,0.75)"; t.style.background = "none"; }}>
                {link.label}
              </motion.button>
            ))}
            <button onClick={() => handleNav("#contact")}
              style={{ width: "100%", marginTop: 8, padding: "13px", background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", border: "none", borderRadius: 12, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-space), sans-serif", boxShadow: "0 4px 20px rgba(14,165,233,0.3)" }}>
              Hire Me 🚀
            </button>
          </div>
        </motion.div>
      </motion.nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hire-btn { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
