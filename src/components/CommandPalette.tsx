import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { animate } from '@motionone/dom'
import { spring } from '@motionone/dom'

const SHORTCUTS = [
  { key: 'h', action: 'hero', label: 'Home' },
  { key: 's', action: 'skills', label: 'Skills' },
  { key: 'p', action: 'projects', label: 'Projects' },
  { key: 'e', action: 'experience', label: 'Experience' },
  { key: 'c', action: 'contact', label: 'Contact' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    window.location.hash = id
  }
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const run = () => {
      if (backdropRef.current) {
        animate(backdropRef.current, { opacity: [0, 1] }, { duration: 0.2 })
      }
      if (innerRef.current) {
        animate(innerRef.current, { opacity: [0, 1], scale: [0.92, 1], y: [-16, 0] }, {
          duration: 0.4,
          easing: spring({ stiffness: 300, damping: 28 }),
        })
      }
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.command-palette-item')
        items.forEach((item, i) => {
          animate(item, { opacity: [0, 1], x: [-20, 0] }, {
            duration: 0.35,
            delay: 0.06 + i * 0.06,
            easing: spring({ stiffness: 150, damping: 20 }),
          })
        })
      }
    }
    requestAnimationFrame(run)
  }, [open])

  const handleSelect = (action: string) => {
    scrollToSection(action)
    onClose()
  }

  if (!open) return null

  return createPortal(
    <div
      ref={backdropRef}
      className="command-palette open"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="command-palette-inner" ref={innerRef} onClick={(e) => e.stopPropagation()}>
        <h3>Keyboard shortcuts</h3>
        <div className="command-palette-list" ref={listRef}>
          {SHORTCUTS.map(({ key, action, label }) => (
            <button
              key={action}
              type="button"
              className="command-palette-item"
              onClick={() => handleSelect(action)}
            >
              <kbd>{key}</kbd>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}
