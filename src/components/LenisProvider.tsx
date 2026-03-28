'use client';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Context ─────────────────────────────────────────────────────────────── */
const LenisContext = createContext<Lenis | null>(null);

/**
 * Hook to access the Lenis instance from any child component.
 * Returns null if called outside <LenisProvider>.
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/* ─── Provider ────────────────────────────────────────────────────────────── */
interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    /* Initialise Lenis */
    const instance = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      autoRaf: false,
    });

    setLenis(instance);

    /* Connect Lenis to GSAP ticker so ScrollTrigger stays perfectly in sync */
    instance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      instance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    /* Smooth anchor navigation */
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        instance.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(instance.raf);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
