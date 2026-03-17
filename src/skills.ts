const SKILLS = [
  { name: 'Node.js', category: 'runtime' },
  { name: 'TypeScript', category: 'language' },
  { name: 'SQL', category: 'database' },
  { name: 'NoSQL', category: 'database' },
  { name: 'Redis', category: 'cache' },
  { name: 'Docker', category: 'devops' },
  { name: 'CI/CD', category: 'devops' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Git', category: 'tools' },
  { name: 'REST APIs', category: 'api' },
  { name: 'GraphQL', category: 'api' },
]

export function initSkillOrbs(): void {
  const grid = document.getElementById('skills-grid')
  if (!grid) return

  grid.innerHTML = SKILLS.map(
    (s) => `
    <button class="skill-orb" data-skill="${s.name}" data-category="${s.category}">
      ${s.name}
    </button>
  `
  ).join('')

  const orbs = grid.querySelectorAll('.skill-orb')
  orbs.forEach((orb) => {
    orb.addEventListener('click', () => {
      orbs.forEach((o) => o.classList.remove('active'))
      orb.classList.add('active')
    })
  })
}
