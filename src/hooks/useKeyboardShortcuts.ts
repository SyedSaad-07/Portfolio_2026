import { useEffect } from 'react'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    window.location.hash = id
  }
}

export function useKeyboardShortcuts(
  paletteOpen: boolean,
  setPaletteOpen: (open: boolean) => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const key = e.key

      if (key === '?') {
        e.preventDefault()
        setPaletteOpen(!paletteOpen)
        return
      }

      if (key === 'Escape') {
        e.preventDefault()
        setPaletteOpen(false)
        return
      }

      const shortcuts: Record<string, string> = {
        h: 'hero',
        s: 'skills',
        p: 'projects',
        e: 'experience',
        c: 'contact',
      }

      const section = shortcuts[key]
      if (section) {
        e.preventDefault()
        scrollToSection(section)
        setPaletteOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [paletteOpen, setPaletteOpen])
}
