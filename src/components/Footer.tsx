export default function Footer() {
  return (
    <footer className="text-center py-10 pb-5 text-sm text-text-dim max-md:flex max-md:flex-col max-md:flex-wrap max-md:justify-center max-md:items-center max-md:gap-2 max-md:py-8 max-md:px-4 max-md:pb-6 max-md:text-xs">
      <span>crafted with care</span>
      <span className="mx-3 opacity-50 max-md:hidden">•</span>
      <span>press <kbd className="px-1.5 py-0.5 bg-elevated rounded font-mono">?</kbd> for commands</span>
    </footer>
  )
}
