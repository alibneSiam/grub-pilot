import React, { useState } from "react"

const Choice = ({ title }) => {
  const initialItems = ["Chicken", "Beef", "Fish"]
  const [items, setItems] = useState(initialItems)
  const [dragIndex, setDragIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const handleDragStart = (index) => setDragIndex(index)

  const handleDragOver = (index, e) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return

    const updated = [...items]
    const [moved] = updated.splice(dragIndex, 1)
    updated.splice(dropIndex, 0, moved)

    setItems(updated)
    setDragIndex(null)
    setDragOverIndex(null)
  }

  return (
    <div className="text-center w-72 max-w-128 backdrop-blur-md rounded-xl p-8 shadow-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      <p className="text-sm text-gray-100">
        {items.join(" - ")}
      </p>
      <br />
      <hr />
      <br />
      <div className="space-y-6">
        {items.map((item, index) => {
          const isDragging = index === dragIndex
          const isDragOver = index === dragOverIndex && dragIndex !== index

          return (
            <div
              key={item}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(index, e)}
              onDrop={() => handleDrop(index)}
              className={`
                relative cursor-grab active:cursor-grabbing
                px-4 py-3 rounded-sm
                bg-orange-400
                transition-all duration-300 ease-out
                ${isDragging ? "opacity-70" : ""}
                ${isDragOver ? "translate-y-4" : ""}
                hover:shadow-md
                group
              `}
            >
              <span
                className="
                  pointer-events-none
                  absolute -inset-1
                  bg-orange-600/70
                  opacity-0
                  transition-all duration-300 ease-out
                  group-hover:opacity-80
                "
              />

              <div className="relative flex items-center gap-4 text-black">
                <span className="text-sm font-semibold">{index + 1} </span>
                <span className="font-medium">{item}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Choice
