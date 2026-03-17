const PHRASES = [
  'node --version',
  'docker ps',
  'redis-cli ping',
  'whoami',
]

const COMMAND_OUTPUTS: Record<string, string> = {
  'node --version': 'v20.10.0',
  'docker ps': 'CONTAINER ID   IMAGE     STATUS\nnginx-proxy   nginx     Up 2 days',
  'redis-cli ping': 'PONG',
  whoami: 'saad',
}

export function initTypewriter(): void {
  const el = document.getElementById('typewriter')
  const outputEl = document.getElementById('hero-output')
  if (!el) return

  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let currentPhrase = ''
  const TYPING_SPEED = 80
  const DELETING_SPEED = 50
  const PAUSE_BEFORE_DELETE = 1500
  const PAUSE_BETWEEN_PHRASES = 500

  function type(): void {
    if (!el) return
    const phrase = PHRASES[phraseIndex]
    if (!phrase) return
    currentPhrase = phrase

    if (isDeleting) {
      charIndex--
      el.textContent = phrase.slice(0, charIndex)
      if (charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % PHRASES.length
        setTimeout(type, PAUSE_BETWEEN_PHRASES)
      } else {
        setTimeout(type, DELETING_SPEED)
      }
    } else {
      charIndex++
      if (el) el.textContent = phrase.slice(0, charIndex)
      if (charIndex === phrase.length) {
        isDeleting = true
        setTimeout(type, PAUSE_BEFORE_DELETE)
      } else {
        setTimeout(type, TYPING_SPEED)
      }
    }
  }

  function runCommand(): void {
    const output = COMMAND_OUTPUTS[currentPhrase] ?? '(command not found)'
    if (outputEl) {
      const line = document.createElement('div')
      line.className = 'output-line success'
      line.textContent = output.replace('\n', ' ')
      outputEl.appendChild(line)
      outputEl.scrollTop = outputEl.scrollHeight
    }
  }

  const terminalBody = el.closest('.terminal-body')
  terminalBody?.addEventListener('click', runCommand)

  setTimeout(type, 500)
}
