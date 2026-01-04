import { useState, useRef, useEffect } from "react"

const Tabs = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)
  const [height, setHeight] = useState(0)
  const contentRefs = useRef({})

  useEffect(() => {
    const current = contentRefs.current[activeTab]
    if (current) {
      setHeight(current.offsetHeight)
    }
  }, [activeTab])

  return (
    <div className="flex flex-col w-full">
      <div className="flex my-8 justify-evenly">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 p-2 font-semibold transition-all duration-500 justify-items-stretch
              ${activeTab === tab.id
                ? "border-b-8 border-orange-400 text-amber-100"
                : "cursor-pointer hover:text-orange-500"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="relative w-full overflow-hidden transition-[height] duration-1000 ease-in-out"
        style={{ height }}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            ref={(el) => (contentRefs.current[tab.id] = el)}
            className={`
              w-full transition-transform duration-1000 ease-in-out
              ${activeTab === tab.id
                ? "translate-x-0 opacity-100 z-10 relative"
                : "translate-x-full opacity-0 absolute top-0 left-0 z-0"
              }
            `}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
