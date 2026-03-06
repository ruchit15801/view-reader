"use client";

import { Type, Wand2 } from "lucide-react";

export default function ProgressBar({
  progress,
  openFont,
  openTheme
}:{
  progress:number
  openFont:()=>void
  openTheme:()=>void
}){

  const TOTAL_MIN = 244;
  const currentMin = Math.floor((progress/100)*TOTAL_MIN);

  return(

    <div className="fixed bottom-0 left-0 right-0 flex justify-center">

      <div className="bg-black text-white w-[800px] rounded-t-3xl p-6">

        {/* progress */}

        <div className="relative w-full h-[4px] bg-gray-600 mb-4">

          <div
            className="absolute top-0 left-0 h-[4px] bg-white"
            style={{width:`${progress}%`}}
          />

          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full"
            style={{left:`${progress}%`}}
          />

        </div>

        <div className="text-sm mb-6">
          {Math.floor(progress)}% ({currentMin} min / {TOTAL_MIN} min)
        </div>

        {/* icons */}

        <div className="flex justify-center gap-6">

          <CircleButton icon={<Type />} onClick={openFont} />

          <CircleButton icon={<Wand2 />} onClick={openTheme} />

        </div>

      </div>

    </div>

  );

}

function CircleButton({
  icon,
  onClick
}:{
  icon:React.ReactNode
  onClick:()=>void
}){

  return(

    <button
      onClick={onClick}
      className="bg-white text-black p-4 rounded-full"
    >
      {icon}
    </button>

  )

}