"use client";

export default function ThemeModal({
  setTheme,
  close
}:{
  setTheme:(t:string)=>void
  close:()=>void
}){

  return(

    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-[#1a1a1a] p-4 rounded-xl flex gap-4">

      <button
        onClick={()=>setTheme("light")}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Light
      </button>

      <button
        onClick={()=>setTheme("dark")}
        className="bg-black text-white border px-4 py-2 rounded"
      >
        Dark
      </button>

      <button onClick={close}>✕</button>

    </div>

  )

}