import { useState } from 'react'

const COMMANDS: Record<string, { action: string; url?: string }> = {
  email: { action: 'Opening mail client...', url: 'mailto:hello@saad.dev' },
  github: { action: 'Redirecting to GitHub...', url: 'https://github.com/SyedSaad-07' },
  linkedin: { action: 'Redirecting to LinkedIn...', url: 'https://www.linkedin.com/in/syed-saad-7938151b8/' },
}

const CONTACT_COMMANDS = [
  { cmd: 'email', label: 'Send email' },
  { cmd: 'github', label: 'GitHub' },
  { cmd: 'linkedin', label: 'LinkedIn' },
]

export default function Contact() {
  const [output, setOutput] = useState<string | null>(null)

  const handleClick = (cmd: string) => {
    const config = COMMANDS[cmd]
    if (!config) return
    setOutput(config.action)
    if (config.url) {
      setTimeout(() => window.open(config.url, '_blank'), 600)
    }
  }

  return (
    <div className="terminal-window contact-terminal">
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">contact.sh</span>
      </div>
      <div className="terminal-body">
        <div className="contact-commands">
          {CONTACT_COMMANDS.map(({ cmd, label }) => (
            <button
              key={cmd}
              type="button"
              className="contact-cmd"
              onClick={() => handleClick(cmd)}
            >
              <span className="prompt">$</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        {output && (
          <div className="terminal-output" id="contact-output">
            <div className="output-line success">{output}</div>
          </div>
        )}
      </div>
    </div>
  )
}
