"use client";

import { useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";

const EMOJIS = ["❤️", "🔥", "👏", "😂", "🤯", "😮", "😭", "😍", "😡", "👍"];

export default function ReactionBar({
    
}: { paragraphId: string }) {

    const [counts, setCounts] = useState<{ [key: string]: number }>({});

    const react = (emoji: string) => {

        setCounts(prev => ({
            ...prev,
            [emoji]: (prev[emoji] || 0) + 1
        }));

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // emoji animation
        gsap.fromTo(
            `.emoji-${emoji}`,
            { scale: 0.8 },
            { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 }
        );

    };

    return (

        <div className="flex gap-3 mt-3 flex-wrap">

            {EMOJIS.map(e => (

                <button
                    key={e}
                    onClick={() => react(e)}
                    className={`emoji-${e} bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1`}
                >

                    <span>{e}</span>

                    <span className="text-sm">
                        {counts[e] || 0}
                    </span>

                </button>

            ))}

        </div>

    );

}