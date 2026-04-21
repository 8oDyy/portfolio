# Portfolio — Hugo Boulicaut-Raffort

Développeur fullstack, Annecy. Portfolio éditorial single-page construit avec Next.js 15 et animations scroll-driven.

## Stack

- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript (strict mode)
- **Styling** : Tailwind CSS 4 + variables CSS custom
- **Animations** : Framer Motion, GSAP (+ ScrollTrigger)
- **Formulaires** : EmailJS
- **Typographie** : Instrument Sans, Geist, Geist Mono

## Développement

```bash
pnpm dev          # Démarrer le serveur (http://localhost:3000)
pnpm build        # Build production
pnpm start        # Servir la build production
pnpm lint         # ESLint (flat config)
pnpm typecheck    # TypeScript check (strict)
pnpm format       # Prettier (plugin Tailwind)
```

CI (.github/workflows/ci.yml) exécute `lint` → `typecheck` → `build` sur push/PR à `main` et `develop`.

## Structure

```
src/
├── app/
│   ├── layout.tsx       # Server component, Geist fonts, CursorHalo
│   ├── page.tsx         # Client component, stack de sections
│   └── globals.css      # Variables CSS, utility classes
├── components/          # Hero, About, Projects, Stack, Contact, Navbar, Footer, LoadingScreen
└── lib/                 # Utilitaires (parallax hooks, etc.)
```

Alias path : `@/*` → `./src/*`

## Variables d'environnement

Le formulaire contact utilise EmailJS. Ajouter en variables de build Vercel :

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Actuellement hardcodées dans `src/components/Contact.tsx` — à migrer vers `.env.local`.

## Déploiement

Vercel : connecter le repo, autodétecte Next.js, déploie. Variables d'env à configurer dans les project settings.
