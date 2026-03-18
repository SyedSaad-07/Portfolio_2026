import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: '#hero', label: 'home' },
    { href: '#skills', label: 'skills' },
    { href: '#projects', label: 'projects' },
    { href: '#experience', label: 'experience' },
    { href: '#contact', label: 'contact' },
  ]

  return (
    <nav className="nav">
      <div className="nav-logo">
        <span className="prompt">$</span>
        <span className="logo-text">saad.dev</span>
      </div>
      <button
        className={`nav-toggle ${menuOpen ? 'nav-toggle-active' : ''}`}
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
