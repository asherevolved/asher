"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  name: string;
  title: string;
  description: string;
  images: string[];
  url?: string;
}

const projects: Project[] = [
  {
    id: "deos-originals",
    number: "01",
    name: "Deos Originals",
    title: "Deos Originals",
    description: "Website for a Marketing Agency",
      images: ["/deoss original.png"],
    url: "https://deos-website-final.vercel.app",
  },
  {
    id: "seasons-landscapers",
    number: "02",
    name: "Seasons Landscapers",
    title: "Seasons Landscapers",
    description: "Website for a Landscaping Company",
      images: ["/seson.png"],
    url: "https://seasonslandscapers.com",
  },
  {
    id: "seven-scale",
    number: "03",
    name: "Seven Scale",
    title: "Seven Scale",
    description: "Website for a Marketing Agency",
      images: ["/seven scaleee.png"],
    url: "https://sevenscale.in",
  },
  {
    id: "valt-xi",
    number: "04",
    name: "Valt Xi",
    title: "Valt Xi",
    description: "Concept Website",
      images: ["/valt xi (2).png"],
    url: "https://valt-one.vercel.app",
  },
];

export default function LatestWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setProjectRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      projectRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Wait for layout to settle
    const raf = requestAnimationFrame(() => {
      projectRefs.current.forEach((el, i) => {
        if (!el) return;
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        });
        triggers.push(st);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  const active = projects[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black w-full overflow-visible"
      id="work"
    >
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-32 pb-16 max-w-[1920px] mx-auto">
        <h2 className="font-display text-[4rem] md:text-[7rem] lg:text-[10rem] text-white uppercase leading-[0.85] tracking-tighter">
          Latest
          <br />
          Work
          <span className="text-white/30 text-[1rem] md:text-[1.5rem] align-top ml-2 tracking-normal">
            (04)
          </span>
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pb-32">
        {/* Left Column — Sticky */}
        <div className="hidden lg:block lg:w-[35%] xl:w-[30%]">
          <div className="sticky top-0 h-screen flex flex-col justify-between py-20">
            {/* Large background number */}
            <div>
              <span
                key={active.number}
                className="font-display text-[8rem] xl:text-[12rem] text-white/[0.07] leading-none block"
              >
                {active.number}.
              </span>
            </div>

            {/* Project navigation list */}
            <nav className="flex flex-col gap-3 -mt-12">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    const el = projectRefs.current[i];
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                  className={`flex items-center gap-3 text-left transition-all duration-500 group ${
                    i === activeIndex
                      ? "text-white"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  <span
                    className={`h-[1px] transition-all duration-500 ${
                      i === activeIndex
                        ? "w-8 bg-white"
                        : "w-4 bg-white/30 group-hover:w-6 group-hover:bg-white/50"
                    }`}
                  />
                  <span
                    className={`font-body text-sm uppercase tracking-wider transition-all duration-500 ${
                      i === activeIndex ? "font-bold" : "font-normal"
                    }`}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
            </nav>

            {/* Active project info */}
            <div className="space-y-4">
              <h3
                key={`title-${active.id}`}
                className="font-body text-4xl xl:text-5xl font-bold text-white leading-none"
              >
                {active.title}
              </h3>
              <p
                key={`desc-${active.id}`}
                className="font-body text-base text-white/50 leading-relaxed max-w-xs"
              >
                {active.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column — Scrollable images */}
        <div className="lg:w-[65%] xl:w-[70%] flex flex-col gap-8">
          {projects.map((project, projectIndex) => (
            <div
              key={project.id}
              ref={setProjectRef(projectIndex)}
              className="flex flex-col gap-8"
              style={{
                // Give the last project enough height so the sticky left can reach it
                minHeight:
                  projectIndex === projects.length - 1 ? "80vh" : undefined,
              }}
            >
              {/* Mobile-only project info */}
              <div className="lg:hidden space-y-2 pt-12">
                <span className="font-display text-[4rem] text-white/[0.07] leading-none block">
                  {project.number}.
                </span>
                <h3 className="font-body text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-white/50">
                  {project.description}
                </p>
              </div>

              {project.images.map((img, imgIndex) => {
                const imageBlock = (
                  <div
                    className={`relative w-full overflow-hidden rounded-sm${project.url ? " group/img cursor-pointer" : ""}`}
                  >
                    <div className="relative w-full aspect-[16/10]">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${imgIndex + 1}`}
                        fill
                        className={`object-cover object-center transition-transform duration-500${project.url ? " group-hover/img:scale-[1.03]" : ""}`}
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        quality={90}
                      />
                    </div>
                  </div>
                );
                return project.url ? (
                  <a
                    key={imgIndex}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {imageBlock}
                  </a>
                ) : (
                  <div key={imgIndex}>{imageBlock}</div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
