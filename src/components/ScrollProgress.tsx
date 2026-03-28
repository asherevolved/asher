"use client";

import { useEffect, useState, useCallback } from "react";
import { useLenis } from "./LenisProvider";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setProgress(Math.min(1, Math.max(0, scrollTop / docHeight)));
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.on("scroll", updateProgress);
      updateProgress();
      return () => { lenis.off("scroll", updateProgress); };
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, [lenis, updateProgress]);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999]">
      <div
        className="h-full bg-[#FF4925] origin-left transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
