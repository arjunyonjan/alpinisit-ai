---
name: interactive-nextjs-dashboard
description: Build an interactive Next.js dashboard page with SVG organigrams, Framer Motion animations, glassmorphism cards, and embedded educational content
source: auto-skill
extracted_at: '2026-05-28T07:12:20.049Z'
---

## Approach

When building a rich interactive dashboard page in a Next.js App Router project:

### Step 1 — Survey project state first
- Read `package.json` to confirm available deps (framer-motion, lucide-react, tailwind version)
- Read `app/layout.tsx` for existing layout structure (sidebar, root body classes)
- Read `app/page.tsx` to understand what you're replacing
- Read `app/globals.css` for existing CSS variables and theme setup
- Read key components (e.g., sidebar) to match visual language

### Step 2 — Decide: replace homepage or new route?
- **If the user wants a separate page** (not the homepage): create a new route directory like `app/llmchat-project-structure/page.tsx`. Do NOT overwrite `app/page.tsx`.
- **If you accidentally overwrote the homepage**: restore it with `git checkout HEAD -- app/page.tsx`
- **Add a sidebar link** so the new route is accessible — import a new icon from lucide-react and add an entry to the `links` array

### Step 3 — Prepare supporting files before the main page
- **globals.css**: Add custom `@keyframes` animations (blob, pulse-glow, tooltip-fade) and Tailwind utility classes. For Tailwind v4, use `@import "tailwindcss"` (no config file needed for most things).
- **layout.tsx**: Add Google fonts via `next/font/google` (Inter, Geist) as CSS variables. Apply the variable class to body.
- **sidebar.tsx**: If adding a logo, use `h-10 w-full object-contain` to prevent distortion. Place subtext labels (e.g., location) below the logo with small text sizes (`text-[10px] tracking-widest`).

### Step 4 — Build the page as a single file with inline SVG
- Define TypeScript interfaces at the top (`TreeNode`, `CommandItem`, `LoggingLevel`, etc.)
- Define static data arrays (tree structure, commands, educational content) outside the component
- Create small sub-components for reusability: `TreeItem`, `CopyButton`, `Tooltip`, `SVGFlowGraph`, `CursorGlow`
- Use Framer Motion (`motion.div`, `AnimatePresence`) for enter/exit animations on expandable sections
- Use inline `<svg>` elements for:
  - Directory tree organigram with connecting lines
  - Module flow diagrams with animated dashed paths (`<animate attributeName="stroke-dashoffset" ...>`)
  - Pulsing dots on active components (`<animate attributeName="r" ...>`)
  - Gradient definitions via `<defs><linearGradient>`
- Use Tailwind classes for all styling: glassmorphism (`bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200`)
- Add cursor glow effect with a fixed-position div tracking mouse position

### Step 5 — Clean up before commit
- Remove any floating/sticky buttons from the original homepage that are no longer needed
- Remove logo overlays if sidebar now handles branding

### Step 6 — Verify
- Run `npx next build` to check TypeScript and compilation errors
- Start dev server and open in browser

## Key patterns

| Pattern | Code |
|---|---|
| Glassmorphism card | `bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm` |
| Animated blob bg | Absolute positioned ellipses/divs with `blur-3xl` + CSS keyframe animation |
| Expandable section | `AnimatePresence` + `motion.div` with `height: "auto"` exit animation |
| Copy button | `navigator.clipboard.writeText()` + stateful feedback ("Copied!" → "Copy") |
| Train/Test toggle | Button with conditional classes + absolute thumb with `translate-x-6` |
| Tooltip on hover | `onMouseEnter/onMouseLeave` + `AnimatePresence` for fade in/out |
| SVG animated dashed line | `<path strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.5s" repeatCount="indefinite" /></path>` |
| SVG pulsing dot | `<circle r="3"><animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" /></circle>` |
| Cursor glow | Fixed div with `radial-gradient(circle at ${x}px ${y}px, ...)` updated on `mousemove` |
| Sidebar logo (no distortion) | `<img src="/logo.png" className="h-10 w-full object-contain" />` |
| Restore homepage from git | `git checkout HEAD -- app/page.tsx` |
| Create new route | `mkdir app/route-name && write app/route-name/page.tsx` |
| Add sidebar nav link | Add `{ name: "Title", href: "/route-name", icon: Icon }` to `links` array |

## Tailwind v4 notes
- Uses `@import "tailwindcss"` in globals.css (not `@tailwind base/components/utilities`)
- No `tailwind.config.ts` needed for most custom values — use `@theme inline` block
- Color utilities work the same as v3
- Use arbitrary values like `bg-[#f8fafc]` for specific colors
