import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useAnimations } from './hooks/useAnimations'

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  useKeyboardShortcuts(paletteOpen, setPaletteOpen)
  useAnimations()

  return (
    <div className="playground">
      <Nav />
      <section id="hero" className="hero">
        <Hero />
      </section>
      <section id="skills" className="section">
        <h2 className="section-title"><span className="comment">//</span> tech stack</h2>
        <Skills />
      </section>
      <section id="projects" className="section">
        <h2 className="section-title"><span className="comment">//</span> projects</h2>
        <Projects />
      </section>
      <section id="experience" className="section">
        <h2 className="section-title"><span className="comment">//</span> experience</h2>
        <Experience />
      </section>
      <section id="contact" className="section">
        <h2 className="section-title"><span className="comment">//</span> get in touch</h2>
        <Contact />
      </section>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}

export default App
