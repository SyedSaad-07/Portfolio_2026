import { useState, useRef, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { animate } from '@motionone/dom'
import { spring } from '@motionone/dom'

const SKILLS = [
  { name: 'Node.js', category: 'runtime' },
  { name: 'TypeScript', category: 'language' },
  { name: 'SQL', category: 'database' },
  { name: 'NoSQL', category: 'database' },
  { name: 'Redis', category: 'cache' },
  { name: 'Docker', category: 'devops' },
  { name: 'CI/CD', category: 'devops' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Git', category: 'tools' },
  { name: 'REST APIs', category: 'api' },
  { name: 'WebSockets', category: 'realtime' },
  { name: 'Stripe', category: 'payment' },
  { name: 'Twilio', category: 'communication platform' },
]

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { threshold: 0.2 })

  useEffect(() => {
    if (!isInView || !gridRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const orbs = gridRef.current.querySelectorAll('.skill-orb')
    orbs.forEach((orb, i) => {
      animate(orb, { opacity: [0, 1], y: [20, 0], scale: [0.92, 1] }, {
        duration: 0.5,
        delay: i * 0.04,
        easing: spring({ stiffness: 150, damping: 20 }),
      })
    })
  }, [isInView])

  return (
    <div className="skills-grid" ref={gridRef}>
      {SKILLS.map((s) => (
        <button
          key={s.name}
          className={`skill-orb ${activeSkill === s.name ? 'active' : ''}`}
          onClick={() => setActiveSkill(activeSkill === s.name ? null : s.name)}
        >
          {s.name}
        </button>
      ))}
    </div>
  )
}
