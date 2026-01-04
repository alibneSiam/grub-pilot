import React, { useState } from "react"

const text = `In the Age of Ancients, the world was famished
A land of abundance, amnesia, and ever-hungry goobers
But then... there was revolution
And with revolution came machines...
Machines that REMEMBERS TO ORDER YOUR FOOD`

const Hero = () => {
  const [activeWord, setActiveWord] = useState(null)

  return (
    <section className="flex gap-12 items-end">
      <p className="text-left leading-relaxed font-mono font-xs cursor-pointer">
        {text.split("\n").map((line, lineIndex) => (
          <span key={lineIndex}>
            {line.split(" ").map((word, wordIndex) => {
              const id = `${lineIndex}-${wordIndex}`
              return (
                <span
                  key={id}
                  onMouseEnter={() => setActiveWord(id)}
                  onMouseLeave={() => setActiveWord(null)}
                  className={`
                    inline-block mr-1
                    transition-colors duration-500
                    ${activeWord === id ? "text-orange-600" : ""}
                  `}
                >
                  {word}
                </span>
              )
            })}
            <br />
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
