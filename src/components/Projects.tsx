import { useRef, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { animate } from '@motionone/dom'
import { spring } from '@motionone/dom'
import ProjectCard from './ProjectCard'

const PROJECTS = [
  {
    title: 'IVR - Interactive Voice Response',
    points: [
      'Complete IVR system using Twilio with multi-level menu and sub-menu structure',
      'User input via voice commands or keypad (DTMF) selections',
      'Intelligent navigation to options, submenus, or services based on input',
      'Redis for caching and BullMQ for background queue',
    ],
    tags: ['Node.js', 'Twilio', 'MongoDB', 'Redis', 'BullMQ'],
  },
  {
    title: 'Fitness Application',
    points: [
      'Trainer and User roles with goal tracking, friend requests, posts, and reactions',
      'Dynamic trainer packages for customized plans',
      'RevenueCat webhooks for in-app purchases',
      'Cron jobs for package expirations and daily goal notifications',
      'Real-time sockets for private and group chat',
    ],
    tags: ['Node.js', 'MySQL', 'Cron Jobs', 'RevenueCat', 'WebSockets', 'Notifications', 'JWT', 'Role-Based Access Control'],
  },
  {
    title: 'Match making platform',
    points: [
      'Scalable Node.js backend with JWT auth and role-based authorization',
      'Recommendation features for friends and restaurants based on preferences',
      'Real-time messaging with multi-device socket management',
      'Social networking features with user connections',
      'Multi-vendor e-commerce with product and order management',
      'Restaurant booking with reservation analytics',
      'Stripe Webhooks and BullMQ for payments and background jobs',
    ],
    tags: ['Node.js', 'MySQL', 'Docker', 'Redis', 'WebSockets', 'Stripe', 'BullMQ', 'JWT', 'Role-Based Access Control'],
  },
]

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { threshold: 0.15 })

  useEffect(() => {
    if (!isInView || !containerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = containerRef.current.querySelectorAll('.project-window')
    cards.forEach((card, i) => {
      animate(card, { opacity: [0, 1], y: [28, 0] }, {
        duration: 0.55,
        delay: i * 0.08,
        easing: spring({ stiffness: 200, damping: 22 }),
      })
    })
  }, [isInView])

  return (
    <div className="windows-container" ref={containerRef}>
      {PROJECTS.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
    </div>
  )
}
