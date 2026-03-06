"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const REACTIONS = {
  emoji: ["❤️", "🔥", "👏", "🤯", "😍", "👍"],

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
    "/reactions/gifs/g1.gif",
    "/reactions/gifs/g2.gif",
    "/reactions/gifs/g3.gif",
    "/reactions/gifs/g4.gif",
    "/reactions/gifs/g5.gif",
    "/reactions/gifs/g6.gif",
    "/reactions/gifs/g7.gif",
    "/reactions/gifs/g8.gif",
  ],

  gifs: [
    "/reactions/gifs/g9.webp",
    "/reactions/gifs/g10.webp",
    "/reactions/gifs/g11.webp",
    "/reactions/gifs/g12.webp",
    "/reactions/gifs/g13.webp",
    "/reactions/gifs/g14.webp",
    "/reactions/gifs/g15.webp",
    "/reactions/gifs/g16.webp",
  ],
};

export default function ReactionPopup({
  selection,
  onReact,
}: {
  selection: Range | null;
  onReact: (emoji: string) => void;
}) {

  const [tab, setTab] = useState<"emoji" | "animated" | "gifs">("emoji");

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

  const renderContent = () => {
    const items =
      tab === "emoji"
        ? REACTIONS.emoji
        : tab === "animated"
        ? REACTIONS.animated
        : REACTIONS.gifs;

    return (
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-5 gap-2 justify-items-center"
      >
        {items.map((item) => (
          <button
            key={item}
            onClick={() => react(item)}
            className="hover:scale-125 transition"
          >
            {tab === "emoji" ? (
              <span className="text-xl">{item}</span>
            ) : (
              <Image
                src={item}
                alt=""
                width={32}
                height={32}
              />
            )}
          </button>
        ))}
      </motion.div>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        top: rect.bottom + 12,
        left: rect.left + rect.width / 2,
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
      className="bg-neutral-900 text-white rounded-2xl shadow-2xl w-[260px] p-3"
    >
      {/* Tabs */}
      <div className="flex bg-neutral-800 rounded-full p-1 mb-3">
        <button
          onClick={() => setTab("emoji")}
          className={`flex-1 text-xs py-1 rounded-full transition ${
            tab === "emoji"
              ? "bg-white text-black font-medium"
              : "text-gray-400"
          }`}
        >
          Emoji
        </button>

        <button
          onClick={() => setTab("animated")}
          className={`flex-1 text-xs py-1 rounded-full transition ${
            tab === "animated"
              ? "bg-white text-black font-medium"
              : "text-gray-400"
          }`}
        >
          Animated
        </button>

        <button
          onClick={() => setTab("gifs")}
          className={`flex-1 text-xs py-1 rounded-full transition ${
            tab === "gifs"
              ? "bg-white text-black font-medium"
              : "text-gray-400"
          }`}
        >
          GIF
        </button>
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
}