"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TransitionType =
  | "stack-up"        // slides up and stacks over the previous
  | "scale-reveal"    // scales from 0.92 to 1 while fading in
  | "clip-reveal"     // circular/inset clip-path reveal
  | "parallax-up"     // content parallaxes up from below with slight rotation
  | "curtain";        // wipes in from the bottom like a curtain

interface SectionTransitionProps {
  children: React.ReactNode;
  type: TransitionType;
  className?: string;
}

export default function SectionTransition({
  children,
  type,
  className = "",
}: SectionTransitionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    let ctx: gsap.Context;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        switch (type) {
          case "stack-up":
            gsap.fromTo(
              inner,
              { yPercent: 30, opacity: 0.3 },
              {
                yPercent: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top bottom",
                  end: "top 20%",
                  scrub: 1,
                },
              }
            );
            break;

          case "scale-reveal":
            gsap.fromTo(
              inner,
              { scale: 0.88, opacity: 0, borderRadius: "24px" },
              {
                scale: 1,
                opacity: 1,
                borderRadius: "0px",
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top bottom",
                  end: "top 15%",
                  scrub: 1,
                },
              }
            );
            break;

          case "clip-reveal":
            gsap.fromTo(
              inner,
              { clipPath: "inset(15% 15% 15% 15% round 20px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top bottom",
                  end: "top 10%",
                  scrub: 1,
                },
              }
            );
            break;

          case "parallax-up":
            gsap.fromTo(
              inner,
              { yPercent: 20, rotateX: 3, opacity: 0.5, transformPerspective: 1200 },
              {
                yPercent: 0,
                rotateX: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top bottom",
                  end: "top 20%",
                  scrub: 1,
                },
              }
            );
            break;

          case "curtain":
            gsap.fromTo(
              inner,
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top bottom",
                  end: "top 20%",
                  scrub: 1,
                },
              }
            );
            break;
        }
      }, wrapper);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [type]);

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
