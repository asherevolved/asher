"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HeroIntro({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay to start after loading screen wipes away (~5.5s total loading duration)
    const tl = gsap.timeline({ delay: 5.2 });

    // Video scales from slightly zoomed to normal
    tl.fromTo(
      videoRef.current,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
      0
    );

    // Top right text slides in from right
    tl.fromTo(
      topTextRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      0.4
    );

    // Bottom left text slides in from left
    tl.fromTo(
      bottomTextRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      0.6
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      <div ref={videoRef} className="absolute inset-0" style={{ opacity: 0 }}>
        {children}
      </div>
      <div className="absolute inset-0 bg-black/40" />

      {/* Top Right text */}
      <div ref={topTextRef} className="absolute right-6 md:right-12 top-24 md:top-32 z-10" style={{ opacity: 0 }}>
        <h1 className="font-body text-white text-4xl md:text-6xl lg:text-[5.5rem] leading-[0.9] tracking-tighter text-right font-bold flex flex-col items-end">
          <span className="text-white/40">Beyond</span>
          <span className="text-white/40">Visuals.</span>
          <span>Built with</span>
          <span>Vision.</span>
        </h1>
      </div>

      {/* Bottom Left text */}
      <div ref={bottomTextRef} className="absolute bottom-12 md:bottom-20 left-6 md:left-12 z-10 max-w-2xl" style={{ opacity: 0 }}>
        <p className="font-body text-xl md:text-2xl lg:text-3xl text-white font-semibold tracking-tight leading-[1.1]">
          We build brands, websites, <br />
          and digital experiences <span className="text-white/40">with</span> <br />
          <span className="text-white/40">intention, clarity and care.</span>
        </p>
      </div>
    </>
  );
}
