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
    <div className="terminal-window hero-terminal" onClick={runCommand}>
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">saad@playground:~</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="prompt">$</span>
          <span className="command">{text}</span>
          <span className="cursor">|</span>
        </div>
        <div className="terminal-output" id="hero-output">
          <div className="output-line success">✓ Backend Engineer • 3 years experience</div>
          <div className="output-line">Node.js • SQL • NoSQL • Redis • Docker • CI/CD</div>
          {outputs.map((line, i) => (
            <div key={i} className="output-line success">{line}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
