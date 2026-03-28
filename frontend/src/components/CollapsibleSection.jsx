const CollapsibleSection = ({ title, emoji, open, onToggle, children, className = '' }) => {

  return (
    <section className={`rounded-xl border border-orange-400/30 bg-black/20 ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left transition hover:bg-white/5 cursor-pointer"
      >
        <span className="text-2xl font-semibold">{emoji} {title}</span>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden px-6 pb-6">
          {children}
        </div>
      </div>
    </section>
  )
}

export default CollapsibleSection
