const KEYBOARD_SHORTCUTS: Record<string, () => void> = {
  '?': () => toggleCommandPalette(),
  Escape: () => closeCommandPalette(),
  h: () => scrollToSection('hero'),
  s: () => scrollToSection('skills'),
  p: () => scrollToSection('projects'),
  e: () => scrollToSection('experience'),
  c: () => scrollToSection('contact'),
}

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function toggleCommandPalette(): void {
  const palette = document.querySelector('.command-palette')
  if (!palette) return
  palette.classList.toggle('open')
}

function closeCommandPalette(): void {
  document.querySelector('.command-palette')?.classList.remove('open')
}

function createCommandPalette(): void {
  const palette = document.createElement('div')
  palette.className = 'command-palette'
  palette.innerHTML = `
    <div class="command-palette-inner">
      <h3>Keyboard shortcuts</h3>
      <div class="command-palette-list">
        <div class="command-palette-item" data-action="hero">
          <kbd>h</kbd>
          <span>Home</span>
        </div>
        <div class="command-palette-item" data-action="skills">
          <kbd>s</kbd>
          <span>Skills</span>
        </div>
        <div class="command-palette-item" data-action="projects">
          <kbd>p</kbd>
          <span>Projects</span>
        </div>
        <div class="command-palette-item" data-action="experience">
          <kbd>e</kbd>
          <span>Experience</span>
        </div>
        <div class="command-palette-item" data-action="contact">
          <kbd>c</kbd>
          <span>Contact</span>
        </div>
      </div>
    </div>
  `
  palette.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest('.command-palette-item')
    if (item) {
      const action = item.getAttribute('data-action')
      if (action) scrollToSection(action)
      closeCommandPalette()
    }
  })
  document.body.appendChild(palette)
}

export function initTerminal(): void {
  // Append palette to body so it's above everything
  createCommandPalette()

  document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    const key = e.key
    const handler = KEYBOARD_SHORTCUTS[key]
    if (handler) {
      e.preventDefault()
      handler()
    }
  })
}
