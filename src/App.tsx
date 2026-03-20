import { useState, lazy, Suspense } from 'react'
// import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'

const Scene3D = lazy(() => import('./components/Scene3D'))
// import Scene3D from './components/Scene3D'
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
    <>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-16 max-lg:px-5 max-lg:pb-12 max-md:px-4 max-md:pb-10 max-sm:px-3 max-sm:pb-8 pl-[max(24px,env(safe-area-inset-left))] pr-[max(24px,env(safe-area-inset-right))] pb-[max(60px,env(safe-area-inset-bottom))]">
        <Nav />
      <section id="hero" className="hero py-20 pb-16 max-lg:py-16 max-lg:pb-12 max-md:py-10 max-md:pb-8 max-sm:py-8 max-sm:pb-6 flex justify-center opacity-0">
        <Hero />
      </section>
      <section id="skills" className="section py-16 max-lg:py-12 max-md:py-8 max-sm:py-6 opacity-0">
        <h2 className="font-mono text-lg font-medium mb-8 max-lg:text-[1.1rem] max-lg:mb-6 max-md:text-base max-md:mb-5 max-sm:text-[0.95rem] max-sm:mb-4 text-text"><span className="text-text-dim">//</span> tech stack</h2>
        <Skills />
      </section>
      <section id="projects" className="section py-16 max-lg:py-12 max-md:py-8 max-sm:py-6 opacity-0">
        <h2 className="font-mono text-lg font-medium mb-8 max-lg:text-[1.1rem] max-lg:mb-6 max-md:text-base max-md:mb-5 max-sm:text-[0.95rem] max-sm:mb-4 text-text"><span className="text-text-dim">//</span> projects</h2>
        <Projects />
      </section>
      <section id="experience" className="section py-16 max-lg:py-12 max-md:py-8 max-sm:py-6 opacity-0">
        <h2 className="font-mono text-lg font-medium mb-8 max-lg:text-[1.1rem] max-lg:mb-6 max-md:text-base max-md:mb-5 max-sm:text-[0.95rem] max-sm:mb-4 text-text"><span className="text-text-dim">//</span> experience</h2>
        <Experience />
      </section>
      <section id="contact" className="section py-16 max-lg:py-12 max-md:py-8 max-sm:py-6 opacity-0">
        <h2 className="font-mono text-lg font-medium mb-8 max-lg:text-[1.1rem] max-lg:mb-6 max-md:text-base max-md:mb-5 max-sm:text-[0.95rem] max-sm:mb-4 text-text"><span className="text-text-dim">//</span> get in touch</h2>
        <Contact />
      </section>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </>
  )
}

export default App
