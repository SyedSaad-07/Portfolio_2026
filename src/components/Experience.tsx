export default function Experience() {
  return (
    <div className="terminal-window experience-terminal">
      <div className="terminal-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">experience.log</span>
      </div>
      <div className="terminal-body timeline">
        <div className="timeline-item">
          <span className="timeline-date">2022 – present</span>
          <span className="timeline-role">Backend Engineer</span>
          <span className="timeline-desc">Building scalable APIs, maintaining backend services, and managing databases with Node.js along with other technologies.</span>
        </div>
        <div className="timeline-item">
          <span className="timeline-date">Key focus areas</span>
          <span className="timeline-desc">REST APIs • Database design • Caching strategies • Basic Deployment</span>
        </div>
      </div>
    </div>
  )
}
