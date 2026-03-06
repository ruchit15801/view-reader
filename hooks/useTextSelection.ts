import { useEffect, useState } from "react";

export default function useTextSelection() {
  const [range, setRange] = useState<Range | null>(null);

  useEffect(() => {
    const handler = () => {
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        setRange(null);
        return;
      }

      const r = sel.getRangeAt(0);

      if (r.toString().trim() === "") {
        setRange(null);
      } else {
        setRange(r);
      }
    };

    document.addEventListener("selectionchange", handler);

    return () =>
      document.removeEventListener("selectionchange", handler);
  }, []);

  const clearSelection = () => {
    setRange(null);
  };

  return { range, clearSelection };
}