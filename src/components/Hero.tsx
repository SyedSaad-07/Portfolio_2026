import { useState, useEffect, useRef, useCallback } from 'react'

const PHRASES = ['node --version', 'docker ps', 'redis-cli ping', 'whoami']
const COMMAND_OUTPUTS: Record<string, string> = {
  'node --version': 'v20.10.0',
  'docker ps': 'CONTAINER ID   IMAGE     STATUS nginx-proxy   nginx     Up 2 days',
  'redis-cli ping': 'PONG',
  'whoami': 'saad',
}

export default function Hero() {
  const [text, setText] = useState('')
  const [outputs, setOutputs] = useState<string[]>([])
  const phraseIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const isDeletingRef = useRef(false)

  const runCommand = useCallback(() => {
    const phrase = PHRASES[phraseIndexRef.current]
    const output = COMMAND_OUTPUTS[phrase] ?? '(command not found)'
    setOutputs((prev) => [...prev, output.replace('\n', ' ')])
  }, [])

  useEffect(() => {
    const TYPING_SPEED = 80
    const DELETING_SPEED = 50
    const PAUSE_BEFORE_DELETE = 1500
    const PAUSE_BETWEEN_PHRASES = 500

    const type = () => {
      const phrase = PHRASES[phraseIndexRef.current]
      if (!phrase) return

      if (isDeletingRef.current) {
        charIndexRef.current--
        setText(phrase.slice(0, charIndexRef.current))
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false
          phraseIndexRef.current = (phraseIndexRef.current + 1) % PHRASES.length
          setTimeout(type, PAUSE_BETWEEN_PHRASES)
        } else {
          setTimeout(type, DELETING_SPEED)
        }
      } else {
        charIndexRef.current++
        setText(phrase.slice(0, charIndexRef.current))
        if (charIndexRef.current === phrase.length) {
          isDeletingRef.current = true
          setTimeout(type, PAUSE_BEFORE_DELETE)
        } else {
          setTimeout(type, TYPING_SPEED)
        }
      }
    }

    const id = setTimeout(type, 500)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="hero-terminal w-full max-w-[700px] bg-card border border-border rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] cursor-pointer" onClick={runCommand}>
      <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-border">
        <span className="w-3 h-3 rounded-full bg-accent-red" />
        <span className="w-3 h-3 rounded-full bg-accent-orange" />
        <span className="w-3 h-3 rounded-full bg-accent-green" />
        <span className="ml-3 font-mono text-sm text-text-dim">saad@playground:~</span>
      </div>
      <div className="p-6 font-mono text-[0.95rem]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent-green">$</span>
          <span className="text-text">{text}</span>
          <span className="text-accent-green cursor-blink">|</span>
        </div>
        <div className="terminal-output" id="hero-output">
          <div className="py-1 text-accent-green">✓ Backend Engineer • 3 years experience</div>
          <div className="py-1 text-text-dim">Node.js • SQL • NoSQL • Redis • Docker • CI/CD</div>
          {outputs.map((line, i) => (
            <div key={i} className="py-1 text-accent-green">{line}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
