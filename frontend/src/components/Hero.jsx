import React, { useMemo, useState } from "react"

const lines = [
  "Machines do not dream, but they remember what we forget.",
]

const Hero = () => {
  const [activeWord, setActiveWord] = useState(null)
  const quote = useMemo(() => lines[Math.floor(Math.random() * lines.length)], [])

  return (
    <section className="flex gap-12 items-end">
      <p className="text-left leading-relaxed font-mono font-xs cursor-pointer">
        {quote.split(" ").map((word, wordIndex) => (
          <span
            key={wordIndex}
            onMouseEnter={() => setActiveWord(String(wordIndex))}
            onMouseLeave={() => setActiveWord(null)}
            className={`inline-block mr-1 transition-colors duration-500 ${activeWord === String(wordIndex) ? "text-orange-600" : ""}`}
          >
            {word}
          </span>
        ))}
      </p>

      <div className="min-w-2 xl:min-w-16 border-r-4 border-orange-400 self-stretch"></div>

      <h1 className="text-3xl font-extrabold text-left">
        WELCOME TO
        <br />
        <span className="text-orange-300">gRUBPILOT</span>
      </h1>
    </section>
  )
}

export default Hero
