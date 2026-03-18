# Saad's Playground Portfolio

An engaging, interactive portfolio built with **React** and a terminal/playground aesthetic — perfect for showcasing backend engineering skills.

## Features

- **Terminal-style hero** — Typewriter effect cycling through commands (`node --version`, `docker ps`, `redis-cli ping`, `whoami`)
- **Interactive skill orbs** — Click to highlight your tech stack (Node.js, SQL, Redis, Docker, CI/CD, etc.)
- **Draggable project windows** — Drag project cards by their header like desktop windows
- **Command palette** — Press `?` for keyboard shortcuts (`h`, `s`, `p`, `e`, `c` to jump to sections)
- **Clickable contact commands** — Terminal-style buttons to open email, GitHub, LinkedIn

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for production

```bash
npm run build
npm run preview
```

## Customize

- **Contact links** — Edit `src/components/Contact.tsx` and replace URLs (GitHub, LinkedIn, email)
- **Projects** — Edit the `PROJECTS` array in `src/components/Projects.tsx`
- **Skills** — Edit the `SKILLS` array in `src/components/Skills.tsx`
- **Typewriter phrases** — Edit `PHRASES` in `src/components/Hero.tsx`
- **Experience** — Update the timeline in `src/components/Experience.tsx`
