"use client";

import confetti from "canvas-confetti";
import Image from "next/image";

const REACTIONS = {
  simple: ["❤️", "🔥", "👏", "🤯", "😍", "👍"],

  gifs: [
    "/reactions/gifs/g1.gif",
    "/reactions/gifs/g2.gif",
    "/reactions/gifs/g3.gif",
    "/reactions/gifs/g4.gif",
    "/reactions/gifs/g5.gif",
    "/reactions/gifs/g6.gif",
    "/reactions/gifs/g7.gif",
    "/reactions/gifs/g8.gif",
  ],

  animated: [
    "/reactions/anim/a1.webp",
    "/reactions/anim/a2.webp",
    "/reactions/anim/a3.webp",
    "/reactions/anim/a4.webp",
    "/reactions/anim/a5.webp",
    "/reactions/anim/a6.webp",
    "/reactions/anim/a7.webp",
    "/reactions/anim/a8.webp",
    "/reactions/anim/a9.webp",
    "/reactions/anim/a10.webp",
  ],
};

export default function ReactionPopup({
  selection,
  onReact,
}: {
  selection: Range | null;
  onReact: (emoji: string) => void;
}) {
  if (!selection) return null;

  const rect = selection.getBoundingClientRect();

  const react = (emoji: string) => {
    onReact(emoji);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: rect.bottom + 10,
        left: rect.left + rect.width / 2,
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
      className="bg-black text-white px-3 py-2 rounded-xl shadow-xl flex flex-col gap-2"
    >
      {/* emoji */}
      <div className="flex gap-2">
        {REACTIONS.simple.map((e) => (
          <button
            key={e}
            onClick={() => react(e)}
            className="text-xl hover:scale-125 transition"
          >
            {e}
          </button>
        ))}
      </div>

      {/* gifs */}
      <div className="flex gap-2">
        {REACTIONS.gifs.map((src) => (
          <button key={src} onClick={() => react(src)}>
            <Image
              src={src}
              alt=""
              width={28}
              height={28}
              className="hover:scale-125 transition"
            />
          </button>
        ))}
      </div>

      {/* animated */}
      <div className="flex gap-2">
        {REACTIONS.animated.map((src) => (
          <button key={src} onClick={() => react(src)}>
            <Image
              src={src}
              alt=""
              width={28}
              height={28}
              className="hover:scale-125 transition"
            />
          </button>
        ))}
      </div>
    </div>
  );
}