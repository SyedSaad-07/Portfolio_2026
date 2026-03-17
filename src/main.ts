import './style.css'
import { initTerminal } from './terminal'
import { initDraggableWindows } from './draggable'
import { initTypewriter } from './typewriter'
import { initSkillOrbs } from './skills'
import { initCommandRunner } from './commands'

// Build the portfolio DOM
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="playground">
    <nav class="nav">
      <div class="nav-logo">
        <span class="prompt">$</span>
        <span class="logo-text">saad.dev</span>
      </div>
      <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false">
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
      <div class="nav-links" id="nav-links">
        <a href="#hero" class="nav-link">home</a>
        <a href="#skills" class="nav-link">skills</a>
        <a href="#projects" class="nav-link">projects</a>
        <a href="#experience" class="nav-link">experience</a>
        <a href="#contact" class="nav-link">contact</a>
      </div>
    </nav>

    <section id="hero" class="hero">
      <div class="terminal-window hero-terminal">
        <div class="terminal-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="terminal-title">saad@playground:~</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-line">
            <span class="prompt">$</span>
            <span id="typewriter" class="command"></span>
            <span class="cursor">|</span>
          </div>
          <div class="terminal-output" id="hero-output">
            <div class="output-line success">✓ Backend Engineer • 3 years experience</div>
            <div class="output-line">Node.js • SQL • NoSQL • Redis • Docker • CI/CD</div>
          </div>
        </div>
      </div>
    </section>

    <section id="skills" class="section">
      <h2 class="section-title"><span class="comment">//</span> tech stack</h2>
      <div class="skills-grid" id="skills-grid"></div>
    </section>

    <section id="projects" class="section">
      <h2 class="section-title"><span class="comment">//</span> projects</h2>
      <div class="windows-container" id="windows-container"></div>
    </section>

    <section id="experience" class="section">
      <h2 class="section-title"><span class="comment">//</span> experience</h2>
      <div class="terminal-window experience-terminal">
        <div class="terminal-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="terminal-title">experience.log</span>
        </div>
        <div class="terminal-body timeline">
          <div class="timeline-item">
            <span class="timeline-date">2022 – present</span>
            <span class="timeline-role">Backend Engineer</span>
            <span class="timeline-desc">Building scalable APIs, microservices, and data pipelines with Node.js</span>
          </div>
          <div class="timeline-item">
            <span class="timeline-date">Key focus areas</span>
            <span class="timeline-desc">REST & GraphQL • Database design • Caching strategies • Docker & K8s</span>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
      <h2 class="section-title"><span class="comment">//</span> get in touch</h2>
      <div class="terminal-window contact-terminal">
        <div class="terminal-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="terminal-title">contact.sh</span>
        </div>
        <div class="terminal-body">
          <div class="contact-commands" id="contact-commands"></div>
          <div class="terminal-output" id="contact-output"></div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <span>crafted with care</span>
      <span class="separator">•</span>
      <span>press <kbd>?</kbd> for commands</span>
    </footer>
  </div>
`

function initMobileNav(): void {
  const toggle = document.getElementById('nav-toggle')
  const links = document.getElementById('nav-links')
  if (!toggle || !links) return
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', String(!expanded))
    links.classList.toggle('nav-links-open', !expanded)
    toggle.classList.toggle('nav-toggle-active', !expanded)
  })
  links.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false')
      links.classList.remove('nav-links-open')
      toggle.classList.remove('nav-toggle-active')
    })
  })
}

// Initialize all interactive modules
initTypewriter()
initSkillOrbs()
initDraggableWindows()
initTerminal()
initCommandRunner()
initMobileNav()
