const PROJECTS = [
  {
    title: 'API Gateway',
    desc: 'High-throughput API gateway with rate limiting, caching, and auth.',
    tags: ['Node.js', 'Redis', 'Docker'],
  },
  {
    title: 'Data Pipeline',
    desc: 'Real-time ETL pipeline processing millions of events daily.',
    tags: ['SQL', 'NoSQL', 'CI/CD'],
  },
  {
    title: 'Microservices',
    desc: 'Distributed system with event-driven architecture and saga pattern.',
    tags: ['Node.js', 'Docker', 'Redis'],
  },
]

export function initDraggableWindows(): void {
  const container = document.getElementById('windows-container')
  if (!container) return

  container.innerHTML = PROJECTS.map(
    (p) => `
    <div class="project-window terminal-window" draggable="false">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="terminal-title">${p.title}.ts</span>
      </div>
      <div class="project-content">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-tags">
          ${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `
  ).join('')

  const windows = container.querySelectorAll('.project-window')
  windows.forEach((win) => {
    let isDragging = false
    let startX = 0
    let startY = 0
    let offsetX = 0
    let offsetY = 0

    const el = win as HTMLElement
    el.style.position = 'relative'

    const getClientCoords = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
      if ('touches' in e && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
      const ev = e as MouseEvent
      return { x: ev.clientX, y: ev.clientY }
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      if ('touches' in e) e.preventDefault()
      const { x, y } = getClientCoords(e)
      offsetX = x - startX
      offsetY = y - startY
      el.style.transform = `translate(${offsetX}px, ${offsetY}px)`
    }

    const onUp = () => {
      isDragging = false
      document.removeEventListener('mousemove', onMove as EventListener)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchmove', onMove as EventListener)
      document.removeEventListener('touchend', onUp)
    }

    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!(e.target as HTMLElement).closest('.terminal-header')) return
      const { x, y } = getClientCoords(e)
      isDragging = true
      startX = x - offsetX
      startY = y - offsetY
      document.addEventListener('mousemove', onMove as EventListener)
      document.addEventListener('mouseup', onUp)
      document.addEventListener('touchmove', onMove as EventListener, { passive: false })
      document.addEventListener('touchend', onUp)
    }

    el.addEventListener('mousedown', onDown as EventListener)
    el.addEventListener('touchstart', onDown as EventListener, { passive: true })
  })
}
