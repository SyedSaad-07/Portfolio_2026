import { useRef, useCallback } from 'react'

interface Project {
  title: string
  points: string[]
  tags: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef({ x: 0, y: 0 })
  const startRef = useRef({ x: 0, y: 0 })

  const getClientCoords = useCallback((e: MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!(e.target as HTMLElement).closest('[data-drag-handle]')) return
    const coords = getClientCoords(e.nativeEvent)
    startRef.current = { x: coords.x - offsetRef.current.x, y: coords.y - offsetRef.current.y }

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const { x, y } = getClientCoords(moveEvent)
      offsetRef.current = { x: x - startRef.current.x, y: y - startRef.current.y }
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px)`
      }
      if ('touches' in moveEvent) moveEvent.preventDefault()
    }

    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchmove', onMove, { passive: false } as AddEventListenerOptions)
      document.removeEventListener('touchend', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchmove', onMove, { passive: false })
    document.addEventListener('touchend', onUp)
  }, [getClientCoords])

  return (
    <div
      ref={cardRef}
      className="relative w-80 min-h-[220px] cursor-grab select-none active:cursor-grabbing max-lg:w-[calc(50%-8px)] max-lg:min-w-[280px] max-md:w-full max-md:min-w-0 max-md:min-h-[200px] bg-card border border-border rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div data-drag-handle className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-border cursor-grab max-md:touch-none">
        <span className="w-3 h-3 rounded-full bg-accent-red" />
        <span className="w-3 h-3 rounded-full bg-accent-orange" />
        <span className="w-3 h-3 rounded-full bg-accent-green" />
        <span className="ml-3 font-mono text-sm text-text-dim truncate max-w-[calc(100vw-100px)]">{project.title}.js</span>
      </div>
      <div className="p-5 text-sm max-md:p-4 max-md:text-[0.85rem] max-sm:p-3.5">
        <h3 className="font-mono text-base text-accent-cyan mb-2 max-md:text-[0.95rem]">{project.title}</h3>
        <ul className="project-points list-none p-0 mb-3">
          {project.points.map((point, i) => (
            <li key={i} className="text-text-dim leading-relaxed py-1 pl-4 relative">{point}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 bg-elevated rounded font-mono text-xs text-text-dim max-sm:text-[0.7rem]">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
