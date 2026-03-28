import Image from "next/image";
import ScrollRevealText from "@/components/ScrollRevealText";
import ServicesAccordion from "@/components/ServicesAccordion";
import StickySection from "@/components/StickySection";
import HowWeWork from "@/components/HowWeWork";
import LatestWork from "@/components/LatestWork";
import Footer from "@/components/Footer";
import HeroIntro from "@/components/HeroIntro";

export default function Home() {
  return (
    <div className="font-body selection:bg-primary-container selection:text-on-primary">
      {/* 1. Hero Section */}
      <StickySection
        as="header"
        className="relative h-screen w-full overflow-hidden bg-black"
        zIndex={1}
        id="home"
      >
        <HeroIntro>
          <video
            id="hero-video"
            src="/hero.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </HeroIntro>
      </StickySection>

      {/* About / Scroll Reveal Text */}
      <div className="relative" style={{ zIndex: 2 }}>
        <ScrollRevealText />
      </div>

      {/* 2. Latest Work */}
      <div className="relative" style={{ zIndex: 3, isolation: "isolate" }}>
        <LatestWork />
      </div>

      {/* How We Work — horizontal scroll on vertical scroll */}
      <div className="relative" style={{ zIndex: 4 }}>
        <HowWeWork />
      </div>

      {/* 4. Testimonial */}
      <StickySection
        className="py-40 px-6 md:px-12 bg-black text-center overflow-hidden"
        zIndex={5}
      >
        <div className="max-w-5xl mx-auto relative">
          <span className="material-symbols-outlined text-[8rem] text-primary-container/10 absolute -top-16 left-0 -z-0">
            format_quote
          </span>
          <blockquote className="relative z-10">
            <p className="font-body text-[2.5rem] md:text-[4rem] leading-tight text-white uppercase italic tracking-tight">
              &ldquo;Asher doesn&apos;t just design websites; he builds{" "}
              <span className="text-primary-container">monuments</span> for the
              digital age.&rdquo;
            </p>
          </blockquote>
        </div>
      </StickySection>

      {/* 6. How I Can Help */}
      <StickySection zIndex={6} className="bg-black" overlap={80}>
        <ServicesAccordion />
      </StickySection>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
