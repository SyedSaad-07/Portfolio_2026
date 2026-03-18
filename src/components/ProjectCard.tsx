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
    if (!(e.target as HTMLElement).closest('.terminal-header')) return
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
      className="project-window terminal-window"
      style={{ position: 'relative' }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">{project.title}.js</span>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <ul className="project-points">
          {project.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <div className="project-tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
