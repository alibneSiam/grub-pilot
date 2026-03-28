import { useEffect, useId, useRef, useState } from 'react'

const FloatingField = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  className = '',
}) => {
  const [visible, setVisible] = useState(false)
  const [focused, setFocused] = useState(false)
  const id = useId()
  const inputRef = useRef(null)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type
  const labelRef = useRef(null)
  const targetCursor = useRef({ x: 24, y: 14 })
  const currentCursor = useRef({ x: 24, y: 14 })
  const frameRef = useRef(null)

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    targetCursor.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top - 18,
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    const tick = () => {
      const next = {
        x: currentCursor.current.x + (targetCursor.current.x - currentCursor.current.x) * 0.42,
        y: currentCursor.current.y + (targetCursor.current.y - currentCursor.current.y) * 0.42,
      }

      currentCursor.current = next

      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${next.x}px, ${next.y}px, 0) translate(-50%, -100%)`
      }

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <label htmlFor={id} className={`relative block overflow-visible pt-2 ${className}`} onMouseDown={focusInput} onClick={focusInput}>
      {label && (
        <span
          ref={labelRef}
          className={`pointer-events-none absolute z-20 rounded-full bg-black/85 px-2 py-1 text-[11px] text-amber-100/90 shadow-lg ring-1 ring-white/10 will-change-transform transition-opacity duration-150 ${
            focused ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: 0, top: 0, transform: 'translate3d(24px, 14px, 0) translate(-50%, -100%)' }}
        >
          {label}
        </span>
      )}
        <div
        className="relative min-h-[56px] cursor-text overflow-visible rounded-md bg-[#080808] ring-1 ring-white/10 transition focus-within:ring-orange-400"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseMove}
        onMouseDown={focusInput}
        onClick={focusInput}
      >
        <input
          id={id}
          ref={inputRef}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={(event) => {
            setFocused(true)
            event.currentTarget.placeholder = ''
          }}
          onBlur={(event) => {
            setFocused(false)
            event.currentTarget.placeholder = placeholder
          }}
          className="peer h-[56px] w-full bg-transparent px-3 text-white outline-none placeholder-gray-400"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-md px-2 py-1 text-lg text-amber-100/90 hover:bg-white/10"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    </label>
  )
}

export default FloatingField
