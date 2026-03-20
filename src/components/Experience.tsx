export default function Experience() {
  return (
    <div className="max-w-[600px] max-md:max-w-none bg-card border border-border rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-border">
        <span className="w-3 h-3 rounded-full bg-accent-red" />
        <span className="w-3 h-3 rounded-full bg-accent-orange" />
        <span className="w-3 h-3 rounded-full bg-accent-green" />
        <span className="ml-3 font-mono text-sm text-text-dim">experience.log</span>
      </div>
      <div className="p-6 font-mono text-[0.95rem] flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-accent-purple">2022 – present</span>
          <span className="font-semibold text-text">Backend Engineer</span>
          <span className="text-text-dim text-sm">Building scalable APIs, maintaining backend services, and managing databases with Node.js along with other technologies.</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-accent-purple">Key focus areas</span>
          <span className="text-text-dim text-sm">REST APIs • Database design • Caching strategies • Basic Deployment</span>
        </div>
      </div>
    </div>
  )
}
