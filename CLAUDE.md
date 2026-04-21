# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm 10**.

```bash
pnpm dev           # Next.js dev server (http://localhost:3000)
pnpm build         # Production build
pnpm start         # Serve the production build
pnpm lint          # ESLint (flat config, eslint-config-next)
pnpm lint:fix      # ESLint with --fix
pnpm typecheck     # tsc --noEmit (strict mode)
pnpm format        # Prettier write across repo
pnpm format:check  # Prettier check only
```

CI (`.github/workflows/ci.yml`) runs `pnpm lint` + `pnpm typecheck`, then `pnpm build` on push/PR to `main` and `develop`. Keep those three green before pushing.

Path alias: `@/*` → `./src/*` (tsconfig).

## Architecture

Single-page portfolio. The entire site is composed in `src/app/page.tsx` as a vertical stack of section components (`Hero` → `About` → `Projects` → `Stack` → `Contact`) wrapped by `Navbar`, `Footer`, and `LoadingScreen`. There is no routing beyond the App Router root.

**Client-side heavy.** `page.tsx` is `'use client'` and every section uses Framer Motion hooks, so most components are client components. `layout.tsx` is the only server component of note — it loads Geist/Geist Mono via `next/font` and injects the global `CursorHalo` (fixed overlay behind all content).

**Theming is CSS-variable-driven, not Tailwind-class-driven.** All colors, glass effects, shadows, and scrollbar styles are defined as custom properties in `src/app/globals.css` under `:root/html.dark` and `html.light`. Components consume them via inline `style={{ color: 'var(--neon-blue)' }}` rather than Tailwind color classes. When adjusting colors, edit `globals.css` — `tailwind.config.ts` only mirrors a subset (`neon.blue/green/purple`). The dark/light toggle lives in `Navbar.tsx` and swaps the class on `<html>`.

**Utility classes worth knowing** (defined in `globals.css`, not Tailwind): `.glass`, `.glass-dark`, `.text-gradient`, `.neon-glow`, `.text-primary/secondary/muted/subtle`, `.bg-primary/secondary/card`, `.perspective-1000`, `.backface-hidden`. These are the primary building blocks — prefer them over inventing new styling.

**Animation patterns in use:**
- Framer Motion `variants` with `staggerChildren` for section reveals (see `containerVariants`/`itemVariants` in each section).
- `useInView` + `animate={isInView ? 'visible' : 'hidden'}` for scroll-triggered entrance (About, Projects, Contact).
- `useScroll` + `useTransform` for scroll-progress-driven animation (`Stack.tsx` uses a 300vh outer wrapper + sticky inner to build a scrubable reveal).
- Flip cards via `transformStyle: 'preserve-3d'` + `backfaceVisibility: 'hidden'` (About skills, Projects cards).
- `CursorHalo` writes `--halo-x/--halo-y` CSS vars from `mousemove` (rAF-throttled) and uses `mix-blend-screen` — cheap and decoupled from React state.

**Not actually used despite appearances:** `lenis` is in `package.json` and referenced by `.lenis` classes in `globals.css`, but no component currently imports or initializes it — smooth scroll is native. The README mentions Three.js, but `three`/`@react-three/*` are not installed. `src/lib/parallax.ts` exports `useMousePosition`, `useParallax`, `calculateRepulsion` but nothing imports them yet. Treat these as hooks available for future work, not active systems.

**EmailJS credentials are hardcoded** in `src/components/Contact.tsx` (service/template/public key). The README recommends `NEXT_PUBLIC_EMAILJS_*` env vars — if migrating, both the hardcoded values and the README need updating together.

## Conventions

- Components live in `src/components/` at the top level (flat, no nesting). Every section component is PascalCase and default-exports a single React component.
- TypeScript is strict. Shared types are declared inline near their use (e.g. the `Project` type at the top of `Projects.tsx`) rather than in a central `types/` folder.
- Prettier uses the Tailwind plugin (`prettier-plugin-tailwindcss`) — class ordering is enforced automatically.
- When adding a new section, register it in `src/app/page.tsx`, add an anchor id matching the navbar entry (`#hero`, `#about`, `#projects`, `#stack`, `#contact`), and wire it into `navItems` in `Navbar.tsx`.
