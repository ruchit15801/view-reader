"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Type, Wand2 } from "lucide-react";

export default function ReaderControls({
    progress,
    openFont,
    openTheme,
    theme
}: {
    progress: number
    openFont: () => void
    openTheme: () => void
    theme: string
}) {

    const [open, setOpen] = useState(true);

    const TOTAL_MIN = 244;
    const currentMin = Math.floor((progress / 100) * TOTAL_MIN);

    return (

        <div className="fixed bottom-0 left-0 right-0 flex justify-center">

            <div className="relative w-[900px]">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-26 h-10 bg-black rounded-t-lg flex justify-center items-center">
                    <button onClick={() => setOpen(!open)} className="bg-black border border-gray-500 text-white rounded-full mb-10 p-2 shadow-lg">
                        {open ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
                    </button>
                </div>

                {open && (
                    <div
                        className={`rounded-t-3xl p-6 pt-8
                            ${theme === "dark"
                                ? "bg-[#F7F7F7] text-black"
                                : "bg-[#0f0f0f] text-white"
                            }`
                        }
                    >
                        <div className={`relative w-full h-[2px] mb-4 ${theme === "dark" ? "bg-gray-300" : "bg-gray-700"}`}>
                            <div className="absolute top-0 left-0 h-[3px] bg-white" style={{ width: `${progress}%` }} />
                            <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full" style={{ left: `${progress}%` }} />
                        </div>

                        <div className="text-[11px]">
                            {Math.floor(progress)}% ({currentMin} min / {TOTAL_MIN} min)
                        </div>

                        <div className="flex justify-center gap-4">
                            <CircleButton icon={<Type size={24} />} onClick={openFont} theme={theme} />
                            <CircleButton icon={<Wand2 size={24} />} onClick={openTheme} theme={theme} />
                        </div>
                    </div>
                )}
            </div>
        </div>

    );

}

function CircleButton({
    icon,
    onClick,
    theme
}: {
    icon: React.ReactNode
    onClick?: () => void,
    theme: string
}) {

    return (

        <button
            onClick={onClick}
            className={`p-3 rounded-full 
               ${theme === "dark"
                    ? "bg-black text-white"
                    : "bg-[#F7F7F7] text-black"
                }
                `}>
            {icon}
        </button>
    )
}

