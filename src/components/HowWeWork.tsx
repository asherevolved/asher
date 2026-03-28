'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useLenis } from './LenisProvider';

const steps = [
  {
    step: 'STEP 1',
    title: 'Discovery\nPhase',
    desc: 'Understanding your, goals, pain points, audience, and what sets you apart.',
  },
  {
    step: 'STEP 2',
    title: 'Project\nKickoff',
    desc: 'Setting up projects, aligning on scope and milestones, and diving into the work.',
  },
  {
    step: 'STEP 3',
    title: 'Receive\n& Refine',
    desc: 'Sharing initial designs, gathering feedback, and fine-tuning together.',
  },
  {
    step: 'STEP 4',
    title: 'Continue &\nGrow',
    desc: 'Launching with confidence and supporting your next extraordinary moves.',
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const updateTrack = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !track || !wrapper) return;

    const rect = section.getBoundingClientRect();
    const sectionScrollHeight = section.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / sectionScrollHeight));

    const maxTranslate = track.scrollWidth - wrapper.clientWidth;
    track.style.transform = `translateX(${-(progress * maxTranslate)}px)`;
  }, []);

  useEffect(() => {
    // Listen to Lenis scroll events directly
    if (lenis) {
      lenis.on('scroll', updateTrack);
      // Initial call
      updateTrack();
      return () => {
        lenis.off('scroll', updateTrack);
      };
    }

    // Fallback: native scroll if Lenis not available yet
    window.addEventListener('scroll', updateTrack, { passive: true });
    updateTrack();
    return () => window.removeEventListener('scroll', updateTrack);
  }, [lenis, updateTrack]);

  return (
    <div
      ref={sectionRef}
      /* Tall wrapper — creates the scroll room for the horizontal animation */
      style={{ height: '280vh' }}
    >
      {/* Sticky inner — stays pinned while user scrolls through the 280vh wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="h-full flex">

          {/* Left column — title */}
          <div className="shrink-0 hidden md:flex flex-col justify-between px-6 md:px-12 py-12 md:py-16 w-[36%] lg:w-[30%]">
            <div className="flex items-start gap-2">
              <h2 className="font-body text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] text-white uppercase font-bold leading-[0.88] tracking-tight">
                HOW I
                <br />
                WORK
              </h2>
              <span className="font-label text-[0.6rem] uppercase tracking-[0.2rem] text-white/40 mt-1">
                (PROCESS)
              </span>
            </div>
            <div />
          </div>

          {/* Right column — horizontal card track */}
          <div ref={wrapperRef} className="flex-1 flex items-stretch overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full will-change-transform"
            >
              {/* Mobile title card */}
              <div className="shrink-0 w-[80vw] md:hidden h-full flex flex-col justify-between px-6 py-10">
                <span className="font-label text-[0.6rem] uppercase tracking-[0.2rem] text-white/40">
                  (PROCESS)
                </span>
                <h2 className="font-body text-[3rem] text-white uppercase font-bold leading-[0.88] tracking-tight">
                  HOW I
                  <br />
                  WORK
                </h2>
                <div />
              </div>

              {steps.map(({ step, title, desc }, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[75vw] sm:w-[55vw] md:w-[30vw] lg:w-[24vw] h-full border-l border-white/10 flex flex-col justify-between px-6 md:px-8 py-10 md:py-14"
                >
                  <span className="font-label text-[0.75rem] uppercase tracking-[0.15rem] text-white/50">
                    {step}
                    <span className="text-[#FF4925]">.</span>
                  </span>
                  <div>
                    <h3 className="font-body text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-[0.95] tracking-tight whitespace-pre-line mb-6">
                      {title}
                    </h3>
                    <p className="font-label text-white/40 text-sm md:text-base leading-relaxed max-w-[16rem]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
