"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Type, Wand2, Pencil, List, Bookmark } from "lucide-react";

export default function ReaderControls({
    progress,
    openFont,
    openTheme
}: {
    progress: number
    openFont: () => void
    openTheme: () => void
}) {

    const [open, setOpen] = useState(true);

    const TOTAL_MIN = 244;
    const currentMin = Math.floor((progress / 100) * TOTAL_MIN);

    return (

        <div className="fixed bottom-0 left-0 right-0 flex justify-center">

            <div className="relative w-[800px]">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-10 bg-black rounded-t-2xl flex justify-center items-center">
                    <button onClick={() => setOpen(!open)} className="bg-black border border-gray-500 text-white rounded-full mb-10 p-3 shadow-lg">
                        {open ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
                    </button>
                </div>

                {open && (
                    <div className="bg-black text-white rounded-t-3xl p-6 pt-10">
                        <div className="relative w-full h-[2px] bg-gray-600 mb-6">
                            <div className="absolute top-0 left-0 h-[3px] bg-white" style={{ width: `${progress}%` }}/>
                            <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full" style={{ left: `${progress}%` }}/>
                        </div>

                        <div className="text-sm mb-6">
                            {Math.floor(progress)}% ({currentMin} min / {TOTAL_MIN} min)
                        </div>

                        <div className="flex justify-center gap-6">
                            <CircleButton icon={<Type />} onClick={openFont} />
                            <CircleButton icon={<Wand2 />} onClick={openTheme} />
                            <CircleButton icon={<Pencil />} />
                            <CircleButton icon={<List />} />
                            <CircleButton icon={<Bookmark />} />
                        </div>
                    </div>
                )}
            </div>
        </div>

    );

}

function CircleButton({
    icon,
    onClick
}: {
    icon: React.ReactNode
    onClick?: () => void
}) {

    return (

        <button
            onClick={onClick}
            className="bg-white text-black p-4 rounded-full">
            {icon}
        </button>
    )
}

