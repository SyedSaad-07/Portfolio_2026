const COMMANDS: Record<string, { action: string; url?: string }> = {
  email: { action: 'Opening mail client...', url: 'mailto:hello@saad.dev' },
  github: { action: 'Redirecting to GitHub...', url: 'https://github.com' },
  linkedin: { action: 'Redirecting to LinkedIn...', url: 'https://linkedin.com' },
  twitter: { action: 'Redirecting to X...', url: 'https://x.com' },
}

export function initCommandRunner(): void {
  const output = document.getElementById('contact-output')
  const commandsEl = document.getElementById('contact-commands')
  if (!output || !commandsEl) return

  const contactCommands = [
    { cmd: 'email', label: 'Send email' },
    { cmd: 'github', label: 'GitHub' },
    { cmd: 'linkedin', label: 'LinkedIn' },
    { cmd: 'twitter', label: 'X / Twitter' },
  ]

  commandsEl.innerHTML = contactCommands
    .map(
      (c) => `
    <div class="contact-cmd" data-cmd="${c.cmd}">
      <span class="prompt">$</span>
      <span>${c.label}</span>
    </div>
  `
    )
    .join('')

  commandsEl.querySelectorAll('.contact-cmd').forEach((el) => {
    el.addEventListener('click', () => {
      const cmd = (el as HTMLElement).dataset.cmd
      if (!cmd) return
      const config = COMMANDS[cmd]
      if (!config) return
      output.innerHTML = `<div class="output-line success">${config.action}</div>`
      if (config.url) {
        setTimeout(() => window.open(config.url, '_blank'), 600)
      }
    })
  })
}
