"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";

const services = [
  {
    n: "01.",
    title: "Web & App Dev",
    tagline: "Websites and apps built to perform, fully alive.",
    tags: ["Next.js", "React", "Mobile Apps", "E-commerce"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuABEBZssErfc35AU6PVI4UniFTRhZC4zAFZOkhALS4m583XddzLgQGWrGHV3jOR44I55n-dD-BiZN0tY6ruoaOv3UbZbphE8NMgmwWTW5eKsQZBav39fY1Ec37eKg6kLeBvwFs21Mdipf1z53k9NJkQOAvfHuH1OY8jdX0O9-k2XCUCh_qy0DvNh2KQUVWJy9OW5upczYmd3AOOCNklwamj-2-9MfjpJ9qEr3dfsy5PfGG2s6vrCZnDua99FUVMx8o1dg1bGpw7fcBk",
  },
  {
    n: "02.",
    title: "Social Media Management",
    tagline: "Grow your presence, consistently and intentionally.",
    tags: ["Content Calendars", "Platform Strategy", "Analytics", "Community"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAaPUpoKAiHBKfG2t3X_X_61pHyBzMGku77pN7HJYDHdKjg9Wf7egwY1ZCODdzGByMASEros32Q7pWY7Jlb7wPGhJbdIMulFxBowOTo1aLoG-TrhOeHxWNzkBpvP9XSPgS534W64EsGC_-wMg8eLblCnRSZwn_z983V7Heg2wK8dcDqwaSfbpqssyjDfSV3o7yLq8vEKWfh0uWnDlaaPykljrtwW7lvS9KQDqpBTrjDOlPnM2cPt_KM89hdXEDIuKpaKzF-YuYgFqF",
  },
  {
    n: "03.",
    title: "Branding",
    tagline: "Logos, colors, type — your brand, fully alive.",
    tags: ["Logo Design", "Brand Guidelines", "Color Systems", "Typography"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaLeTvvsWuDj4g_f6_GvSVZF7Zx29s-H5WaOeMliN1ZDiPOI5P3FTc40gkowx6Hl6r3Fr3qVyftDgzPzVz8o3lZgBKLyU2gZtRlmfjBdWKM74SzCnxvX1zqq7Eq9wijjdn9sW4qvjfaEHswHXZtaVx2FQB4Gs9euqXlN17ufq0oDGZVzniROKH-TbZdCyXZ4DTzsFMrxu6R_lsW2cjLogyn5XopDe89mHZbcg7hqfZKIevF8vQlCkr9VGkkm8XoH4FXXE2Bw7LMkoZ",
  },
  {
    n: "04.",
    title: "Content Creation",
    tagline: "Visuals and copy that make people stop scrolling.",
    tags: ["Photography", "Video Editing", "Copywriting", "Visual Assets"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVj0jvC3x4mitm3y1QtdD8hZEHexWApGsIQxOxPoFKmEx4RE1pcMzDQLES7mIbjHUwVqBGUFxqB8qJ0X0O-6n185mvzEjCqQV-7n8UvT9795tAkP5UwpNlkcrlqPLzIWSERxwuAaxd0pQP5wRr9g7QFjy-N8sYJWEQWDjfnvWn1qA6l4DFlp_XExu9WrY6nHv4HvLUeMN0ZJrP-T-HFcfes9NrTh14bcFovTMT5l3H89I2ZmShqfAK5Eaopngvsm6zjUonOSDq958B",
  },
];

function AccordionRow({
  s,
  isOpen,
  onEnter,
  onLeave,
}: {
  s: (typeof services)[number];
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const expandRef = useRef<HTMLDivElement>(null);
  const [expandHeight, setExpandHeight] = useState(0);

  useEffect(() => {
    if (expandRef.current) {
      setExpandHeight(expandRef.current.scrollHeight);
    }
  }, []);

  // Recalculate on resize
  useEffect(() => {
    const onResize = () => {
      if (expandRef.current) setExpandHeight(expandRef.current.scrollHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className="border-t border-white/10 cursor-pointer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Collapsed row */}
      <div
        className="flex items-center gap-8 overflow-hidden pointer-events-none"
        style={{
          maxHeight: isOpen ? 0 : 200,
          padding: isOpen ? "0 0" : "2rem 0",
          opacity: isOpen ? 0 : 1,
          transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1), padding 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
        }}
      >
        <span
          className="font-label text-base md:text-lg w-16 flex-shrink-0 transition-colors duration-300"
          style={{ color: isOpen ? "var(--color-primary-container)" : "rgba(255,255,255,0.3)" }}
        >
          {s.n}
        </span>
        <span
          className="font-display text-xl md:text-2xl lg:text-3xl uppercase tracking-tight transition-colors duration-300 ml-auto md:ml-[25%]"
          style={{ color: isOpen ? "#fff" : "rgba(255,255,255,0.8)" }}
        >
          {s.title}
        </span>
      </div>

      {/* Expanded content */}
      <div
        className="overflow-hidden"
        style={{
          height: isOpen ? expandHeight : 0,
          opacity: isOpen ? 1 : 0,
          transition: "height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease 0.05s",
        }}
      >
        <div ref={expandRef} className="py-8 md:py-10 flex flex-col md:flex-row items-start gap-6 md:gap-10">
          <span
            className="font-display text-[2rem] md:text-[3rem] text-primary-container leading-none flex-shrink-0 w-16"
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(15px)",
              opacity: isOpen ? 1 : 0,
              transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1) 0.1s, opacity 0.35s ease 0.1s",
            }}
          >
            {s.n}
          </span>

          <div
            className="relative w-full md:w-[260px] lg:w-[320px] aspect-[4/3] flex-shrink-0 overflow-hidden bg-surface-container-low rounded-sm"
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(15px)",
              opacity: isOpen ? 1 : 0,
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1) 0.12s, opacity 0.4s ease 0.12s",
            }}
          >
            <Image src={s.img} alt={s.title} fill className="object-cover scale-110" />
          </div>

          <div
            className="flex-1"
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(15px)",
              opacity: isOpen ? 1 : 0,
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1) 0.15s, opacity 0.4s ease 0.15s",
            }}
          >
            <h3 className="font-display text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] text-white uppercase leading-tight mb-3">
              {s.title}
            </h3>
            <p className="text-secondary text-sm md:text-base mb-6 font-label tracking-wide max-w-lg">
              {s.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {s.tags.map((tag, ti) => (
                <span
                  key={tag}
                  className="text-[0.75rem] md:text-[0.8rem] font-label uppercase tracking-widest border border-white/20 text-white/50 px-4 py-1.5 hover:border-primary-container hover:text-primary-container transition-all duration-300"
                  style={{
                    transform: isOpen ? "translateY(0)" : "translateY(8px)",
                    opacity: isOpen ? 1 : 0,
                    transition: `transform 0.35s cubic-bezier(0.4,0,0.2,1) ${0.2 + ti * 0.04}s, opacity 0.3s ease ${0.2 + ti * 0.04}s`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback((i: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(i);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(null), 200);
  }, []);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-black" id="process">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-start justify-between mb-16">
          <h2 className="font-display text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] text-white uppercase leading-[0.9] tracking-tight">
            HOW I CAN HELP
          </h2>
          <span className="font-label text-[0.65rem] uppercase tracking-[0.2rem] text-white/30 mt-2">
            SERVICES
          </span>
        </div>

        <div className="border-b border-white/10">
          {services.map((s, i) => (
            <AccordionRow
              key={s.n}
              s={s}
              isOpen={open === i}
              onEnter={() => handleEnter(i)}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
