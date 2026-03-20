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
    <div className="max-w-[500px] max-md:max-w-none bg-card border border-border rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-border">
        <span className="w-3 h-3 rounded-full bg-accent-red" />
        <span className="w-3 h-3 rounded-full bg-accent-orange" />
        <span className="w-3 h-3 rounded-full bg-accent-green" />
        <span className="ml-3 font-mono text-sm text-text-dim">contact.sh</span>
      </div>
      <div className="p-6 font-mono text-[0.95rem]">
        <div className="flex flex-col gap-3">
          {CONTACT_COMMANDS.map(({ cmd, label }) => (
            <button
              key={cmd}
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 bg-elevated border border-border rounded-lg cursor-pointer transition-all duration-200 text-white hover:border-accent-green hover:translate-x-1 max-md:py-3.5 max-md:min-h-12"
              onClick={() => handleClick(cmd)}
            >
              <span className="text-accent-green">$</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        {output && (
          <div className="terminal-output mt-4" id="contact-output">
            <div className="py-1 text-accent-green">{output}</div>
          </div>
        )}
      </div>
    </div>
  )
}
