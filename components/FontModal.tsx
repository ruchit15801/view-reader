"use client";

export default function FontModal({
  fontSize,
  setFontSize,
  close
}: {
  fontSize: number
  setFontSize: (n: number) => void
  close: () => void
}) {

  return (

    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white p-4 rounded-xl flex items-center gap-4">

      <button onClick={() => setFontSize(fontSize - 2)} className="text-white text-xl">−</button>

      <input
        type="range"
        min={14}
        max={32}
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />

      <button onClick={() => setFontSize(fontSize + 2)} className="text-white text-xl">+</button>

      <button onClick={close} className="text-white text-xl">✕</button>

    </div>

  )

}