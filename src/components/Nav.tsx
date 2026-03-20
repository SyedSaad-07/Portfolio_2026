import { useState, useEffect, useRef } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  const navItems = [
    { href: '#hero', label: 'home' },
    { href: '#skills', label: 'skills' },
    { href: '#projects', label: 'projects' },
    { href: '#experience', label: 'experience' },
    { href: '#contact', label: 'contact' },
  ]

  return (
    <nav ref={navRef} className="relative flex justify-between items-center py-5 border-b border-border">
      <div className="flex items-center gap-2">
        <span className="text-accent-green font-mono">$</span>
        <span className="font-mono font-semibold text-[1.1rem]">saad.dev</span>
      </div>
      <button
        className={`flex md:hidden flex-col justify-center gap-1.5 w-11 h-11 p-2.5 bg-transparent border border-border rounded-lg cursor-pointer transition-all duration-200 hover:border-accent-green ${menuOpen ? 'nav-toggle-active' : ''}`}
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="nav-toggle-bar block w-full h-0.5 bg-text rounded-sm transition-all duration-300" />
        <span className="nav-toggle-bar block w-full h-0.5 bg-text rounded-sm transition-all duration-300" />
        <span className="nav-toggle-bar block w-full h-0.5 bg-text rounded-sm transition-all duration-300" />
      </button>
      <div className={`flex gap-8 max-md:absolute max-md:top-full max-md:left-0 max-md:right-0 max-md:flex-col max-md:gap-0 max-md:p-4 max-md:bg-card max-md:border-b max-md:border-border max-md:shadow-[0_8px_24px_rgba(0,0,0,0.3)] max-md:z-[100] ${menuOpen ? 'max-md:flex' : 'max-md:hidden'}`}>
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="nav-link text-text-dim no-underline text-sm transition-all duration-200 relative hover:text-accent-green max-md:block max-md:py-3.5 max-md:px-4 max-md:text-base max-md:border-b max-md:border-border max-md:min-h-12 max-md:rounded-lg max-md:hover:bg-elevated max-md:transition-colors last:max-md:border-b-0"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
