import { useEffect, useRef } from 'react'
import { animate } from '@motionone/dom'
import { inView } from '@motionone/dom'
import { spring } from '@motionone/dom'

const springSmooth = { easing: spring({ stiffness: 200, damping: 22 }) }
const springGentle = { easing: spring({ stiffness: 150, damping: 20 }) }

export function useAnimations() {
  const heroAnimated = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.hero, .section').forEach((el) => {
        (el as HTMLElement).style.opacity = '1'
      })
      return
    }

    // Hero animation
    const hero = document.querySelector('.hero')
    const heroTerminal = document.querySelector('.hero-terminal')
    if (hero && heroTerminal && !heroAnimated.current) {
      heroAnimated.current = true
      animate(hero, { opacity: [0, 1], y: [28, 0] }, { duration: 0.8, ...springSmooth })
      animate(heroTerminal, { opacity: [0, 1], scale: [0.98, 1] }, { duration: 0.7, delay: 0.15, ...springGentle })
    }

    // Section reveal
    const sections = document.querySelectorAll('.section')
    sections.forEach((section) => {
      inView(section, () => {
        animate(section, { opacity: [0, 1], y: [32, 0] }, { duration: 0.65, ...springSmooth })
      }, { amount: 0.15 })
    })
  }, [])
}
