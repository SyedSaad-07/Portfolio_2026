import { useState, useEffect } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

export function useInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: UseInViewOptions = {}
) {
  const [isInView, setIsInView] = useState(false)
  const { threshold = 0.1, rootMargin = '0px' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return isInView
}
