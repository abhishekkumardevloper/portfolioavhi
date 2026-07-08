"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + "px";
        dotRef.current.style.top = mouseY + "px";
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top = ringY + "px";
      }
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Click ripple
    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        width: 20px; height: 20px; border-radius: 50%;
        background: rgba(6,182,212,0.3); pointer-events: none;
        z-index: 99996; transform: translate(-50%,-50%) scale(0);
        animation: ripple 0.6s ease-out forwards;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${isHovering ? "hovering" : ""}`} />
    </>
  );
}
