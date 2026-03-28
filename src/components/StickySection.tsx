"use client";

import { useRef, useState, useEffect } from "react";

interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
  zIndex?: number;
  id?: string;
  as?: "section" | "header" | "footer" | "div";
  /** Extra scroll breathing room after the section content (in vh). Default 50. */
  overlap?: number;
}

export default function StickySection({
  children,
  className = "",
  zIndex = 1,
  id,
  as: Tag = "section",
  overlap = 50,
}: StickySectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setContentH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className="relative"
      style={{
        zIndex,
        // content height + extra scroll room so you finish reading before next section covers
        height: contentH > 0 ? `calc(${contentH}px + ${overlap}vh)` : "auto",
      }}
    >
      <Tag
        ref={contentRef as React.Ref<HTMLDivElement>}
        className={`sticky top-0 ${className}`}
        id={id}
      >
        {children}
      </Tag>
    </div>
  );
}
