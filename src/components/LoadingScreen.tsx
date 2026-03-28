"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // Animate counter from 0 to 100
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 3.2,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.val)}`;
        }
      },
    });

    // Fade out counter, scale up ASHER text
    tl.to(counterRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, "-=0.4");

    tl.to(textRef.current, {
      scale: 1.15,
      duration: 0.7,
      ease: "power2.inOut",
    }, "-=0.2");

    // Wipe up the entire overlay
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    }, "+=0.3");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-primary-container flex flex-col items-center justify-center"
    >
      {/* ASHER text */}
      <h1
        ref={textRef}
        className="font-display text-[5rem] md:text-[8rem] lg:text-[12rem] uppercase leading-none tracking-tighter"
        style={{ color: "#000000" }}
      >
        ASHER
      </h1>

      {/* Counter */}
      <span
        ref={counterRef}
        className="font-label text-sm text-black/40 tracking-[0.3rem] mt-6"
      >
        0
      </span>
    </div>
  );
}
