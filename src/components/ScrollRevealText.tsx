"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLenis } from "./LenisProvider";

const words =
  "I combine years of Web Design and branding Expertise to craft meaningful, story-driven experiences".split(
    " "
  );

export default function ScrollRevealText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lenis = useLenis();

  const updateWords = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollableDistance = rect.height - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));

    const totalWords = words.length;
    const revealedFloat = progress * totalWords;

    wordRefs.current.forEach((span, i) => {
      if (!span) return;

      let opacity: number;
      let color: string;

      if (i < Math.floor(revealedFloat)) {
        opacity = 1;
        color = "#FFFFFF";
      } else if (i === Math.floor(revealedFloat)) {
        const wordProgress = revealedFloat - Math.floor(revealedFloat);
        opacity = 0.15 + 0.85 * wordProgress;
        color = wordProgress > 0.5 ? "#FFFFFF" : "rgba(255,255,255,0.15)";
      } else {
        opacity = 0.15;
        color = "rgba(255,255,255,0.15)";
      }

      span.style.opacity = String(opacity);
      span.style.color = color;
    });
  }, []);

  useEffect(() => {
    // Hook into Lenis scroll events
    if (lenis) {
      lenis.on("scroll", updateWords);
      // Run once to set initial state
      updateWords();
      return () => {
        lenis.off("scroll", updateWords);
      };
    }

    // Fallback: if Lenis isn't available yet, use rAF polling
    let rafId: number;
    function loop() {
      updateWords();
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [lenis, updateWords]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
        <p className="font-body text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.15] tracking-tight max-w-[1200px]">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className="inline-block mr-[0.3em]"
              style={{
                opacity: 0.15,
                color: "rgba(255,255,255,0.15)",
                transition: "opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
