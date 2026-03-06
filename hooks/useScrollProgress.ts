import { useEffect, useRef, useState } from "react";

export default function useScrollProgress() {

  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(-1);

  useEffect(()=>{

    const compute = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const raw = height <= 0 ? 0 : (scrollTop / height) * 100;
      const next = Math.max(0, Math.min(100, raw));

      // Avoid re-render spam; 0.1% granularity is plenty.
      const rounded = Math.round(next * 10) / 10;
      if (rounded !== lastRef.current) {
        lastRef.current = rounded;
        setProgress(rounded);
      }
    };

    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        compute();
      });
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    compute();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };

  },[]);

  return progress;

}