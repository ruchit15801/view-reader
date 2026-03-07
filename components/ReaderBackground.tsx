"use client";

import { useMemo } from "react";

export default function ReaderBackground({ theme }: { theme: string }) {
  const variant = useMemo(() => {
    if (theme === "dark") return "reader-bg-dark";
    if (theme === "paper") return "reader-bg-paper";
    return "reader-bg-light";
  }, [theme]);

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className={`absolute inset-0 ${variant} reader-bg-animate`} />

      {/* Stars / subtle shimmer */}
      <div className="absolute inset-0 reader-bg-stars" />

      {/* Aurora glow (premium depth, subtle motion) */}
      <div className="absolute inset-0 reader-bg-aurora reader-bg-aurora-animate" />

      {/* Soft bokeh highlights */}
      <div className="absolute inset-0 reader-bg-bokeh reader-bg-bokeh-animate" />

      {/* Light sweep */}
      <div className="absolute inset-0 reader-bg-sweep reader-bg-sweep-animate" />

      {/* Grain + vignette (gives that premium feel) */}
      <div className="absolute inset-0 reader-bg-grain opacity-35 mix-blend-overlay" />
      <div className="absolute inset-0 reader-bg-vignette" />
    </div>
  );
}
