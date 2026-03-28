"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const asherTextRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the orange banner sliding up
      gsap.from(bannerRef.current, {
        yPercent: 40,
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top bottom",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Animate the ASHER text scaling up
      gsap.from(asherTextRef.current, {
        scale: 0.6,
        opacity: 0,
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top bottom",
          end: "top 50%",
          scrub: 1,
        },
      });

      // Animate the tagline
      gsap.from(taglineRef.current, {
        yPercent: 60,
        opacity: 0,
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative bg-black" style={{ zIndex: 8 }}>
      {/* Upper footer — links, contact, newsletter */}
      <div className="px-6 md:px-12 lg:px-20 pt-24 pb-20 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <span className="text-white/40 font-label text-[0.65rem] uppercase tracking-[0.15rem]">
                (Email)
              </span>
              <a
                href="mailto:hello@asher.com"
                className="block text-primary-container font-body text-lg md:text-xl font-bold mt-1 hover:text-white transition-colors"
              >
                hello@asher.com
              </a>
            </div>
            <div>
              <span className="text-white/40 font-label text-[0.65rem] uppercase tracking-[0.15rem]">
                (Phone)
              </span>
              <p className="text-white font-body text-lg md:text-xl font-bold mt-1">
                +12 345678
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <span className="text-white/40 font-label text-[0.65rem] uppercase tracking-[0.15rem] block mb-6">
              (Links)
            </span>
            <nav className="flex flex-col gap-3">
              {["Home", "About", "Works", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white font-body text-base hover:text-primary-container transition-colors w-fit"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <span className="text-white/40 font-label text-[0.65rem] uppercase tracking-[0.15rem] block mb-6">
              (Socials)
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { name: "X/Twitter", href: "#" },
                { name: "Instagram", href: "#" },
                { name: "LinkedIn", href: "#" },
                { name: "Behance", href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-body text-base hover:text-primary-container transition-colors w-fit flex items-center gap-1"
                >
                  {social.name}
                  <span className="text-white/40 text-xs">&#8599;</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-white font-body text-sm font-semibold leading-relaxed mb-6">
              Sign up for our newsletter to
              <br />
              get latest insights and updates
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary-container py-3 text-white placeholder:text-white/30 text-sm outline-none transition-colors"
              />
              <button className="w-full border border-white/20 rounded-full py-3 text-white font-label text-xs uppercase tracking-[0.15rem] hover:bg-white hover:text-black transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-20 pt-0 gap-4">
          <div>
            <p className="text-white/30 font-label text-[0.65rem] uppercase tracking-[0.1rem]">
              &copy;2025 ASHER. ALL RIGHTS RESERVED
            </p>
            <div className="flex gap-3 mt-1">
              <a
                href="#"
                className="text-white/50 font-label text-[0.65rem] uppercase tracking-[0.1rem] underline underline-offset-2 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-white/30 text-[0.65rem]">&bull;</span>
              <a
                href="#"
                className="text-white/50 font-label text-[0.65rem] uppercase tracking-[0.1rem] underline underline-offset-2 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Orange banner with large ASHER text */}
      <div
        ref={bannerRef}
        className="relative bg-primary-container overflow-hidden"
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 flex flex-col lg:flex-row items-end justify-between gap-8">
          {/* Large ASHER text */}
          <h2
            ref={asherTextRef}
            className="font-display text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] text-black uppercase leading-[0.8] tracking-tighter origin-bottom-left"
          >
            ASHER
            <sup className="text-[1.5rem] md:text-[2rem] align-top ml-1 tracking-normal">
              &reg;
            </sup>
          </h2>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="lg:text-right pb-4 lg:pb-8"
          >
            <p className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-black leading-[0.95] tracking-tight">
              Beyond
              <br />
              Visuals.
              <br />
              Built with
              <br />
              Vision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
