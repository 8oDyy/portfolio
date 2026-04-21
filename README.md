# 🚀 Portfolio Développeur - Next.js 15 + Three.js

Portfolio moderne et immersif avec animations 3D, smooth scroll et design glassmorphism.

## ✨ Fonctionnalités

- 🎨 **Design moderne** : Thème dark avec accents néon (bleu/vert), glassmorphism
- 🌐 **Hero 3D interactif** : Sphère animée avec Three.js et particules
- 📱 **100% Responsive** : Mobile-first design
- ⚡ **Smooth scroll** : Navigation fluide avec Lenis
- 🎭 **Animations** : Framer Motion pour toutes les transitions
- 📊 **Sections complètes** : Hero, About, Projects, Stack, Contact
- 🌓 **Dark/Light mode** : Toggle dans la navbar
- 📧 **Formulaire contact** : Intégration EmailJS
- 🎯 **SEO optimisé** : Metadata et structure sémantique
- 🚀 **Vercel-ready** : Déploiement en un clic

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS 4
- **3D** : Three.js + @react-three/fiber + @react-three/drei
- **Animations** : Framer Motion
- **Smooth Scroll** : Lenis
- **Formulaire** : EmailJS
- **Icons** : Lucide React

## 📦 Installation


```bash
# Installer les dépendances
pnpm install
# ou
npm install
# ou
yarn install

# Lancer le serveur de développement
pnpm dev
# ou
npm run dev

# Ouvrir http://localhost:3000
```

## 🎨 Personnalisation

### 1. Informations personnelles

Modifiez les fichiers suivants avec vos informations :

**`src/components/Hero.tsx`** (lignes 79-86)
```tsx
<h1>Votre Nom</h1>
<p>Votre Spécialité (ex: Développeur Fullstack JavaScript)</p>
```

**`src/components/About.tsx`** (lignes 13-17)
```tsx
// Modifiez le tableau timeline avec votre parcours
const timeline = [
  { year: '2024', title: 'Votre poste', company: 'Votre entreprise', ... },
  ...
];
```

**`src/components/Projects.tsx`** (lignes 8-58)
```tsx
// Remplacez les projets fictifs par vos vrais projets
const projects = [
  {
    title: 'Votre Projet',
    description: 'Description de votre projet',
    tech: ['React', 'Node.js', ...],
    github: 'https://github.com/votre-username/projet',
    demo: 'https://votre-demo.com',
    ...
  },
];
```

**`src/components/Contact.tsx`** (lignes 58-60)
```tsx
// Remplacez les liens sociaux
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/votre-username', ... },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/votre-profil', ... },
  ...
];
```

### 2. Configuration EmailJS

Pour activer le formulaire de contact :

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Créez un service email (Gmail, Outlook, etc.)
3. Créez un template d'email
4. Récupérez vos identifiants

**`src/components/Contact.tsx`** (lignes 32-42)
```tsx
await emailjs.send(
  'YOUR_SERVICE_ID',      // Remplacez par votre Service ID
  'YOUR_TEMPLATE_ID',     // Remplacez par votre Template ID
  { ... },
  'YOUR_PUBLIC_KEY'       // Remplacez par votre Public Key
);
```

### 3. Images des projets

Ajoutez vos images de projets dans le dossier `public/` :
- `public/placeholder-project1.jpg`
- `public/placeholder-project2.jpg`
- etc.

Puis mettez à jour les chemins dans `src/components/Projects.tsx`.

### 4. Couleurs et thème

**`tailwind.config.ts`**
```ts
colors: {
  neon: {
    blue: "#00f0ff",    // Changez les couleurs néon
    green: "#00ff88",
    purple: "#b000ff",
  },
}
```

**`src/app/globals.css`**
```css
:root {
  --neon-blue: #00f0ff;
  --neon-green: #00ff88;
  --neon-purple: #b000ff;
}
```

## 📁 Structure du projet

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal avec metadata
│   │   ├── page.tsx            # Page d'accueil avec toutes les sections
│   │   └── globals.css         # Styles globaux et variables CSS
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation avec dark/light toggle
│   │   ├── Hero.tsx            # Section hero avec scène 3D
│   │   ├── About.tsx           # Timeline et compétences
│   │   ├── Projects.tsx        # Grid de projets avec filtres
│   │   ├── Stack.tsx           # Visualiseur 3D des technologies
│   │   ├── Contact.tsx         # Formulaire EmailJS
│   │   ├── Footer.tsx          # Footer avec back-to-top
│   │   └── LoadingScreen.tsx   # Écran de chargement
│   └── lib/
│       └── lenis.tsx           # Configuration smooth scroll
├── public/                     # Assets statiques
├── tailwind.config.ts          # Configuration Tailwind
├── next.config.ts              # Configuration Next.js
└── package.json                # Dépendances
```

## 🚀 Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Connectez-vous sur [Vercel](https://vercel.com)
3. Importez votre repository
4. Vercel détectera automatiquement Next.js
5. Cliquez sur "Deploy"

### Variables d'environnement (optionnel)

Si vous utilisez EmailJS, ajoutez dans Vercel :
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🎯 Performance

- ✅ Lighthouse Score > 95
- ✅ Optimisation des images avec Next.js Image
- ✅ Code splitting automatique
- ✅ Lazy loading des composants 3D
- ✅ CSS optimisé avec Tailwind

## 📝 Scripts disponibles

```bash
pnpm dev          # Démarre le serveur de développement
pnpm build        # Build de production
pnpm start        # Démarre le serveur de production
pnpm lint         # Lint du code
```

## 🐛 Troubleshooting

### Erreur Three.js
Si vous avez des erreurs avec Three.js, vérifiez que vous utilisez bien `'use client'` dans les composants qui utilisent Three.js.

### Smooth scroll ne fonctionne pas
Assurez-vous que Lenis est bien importé dans `layout.tsx` et que le composant est monté côté client.

### Formulaire EmailJS ne fonctionne pas
Vérifiez que vous avez bien configuré vos identifiants EmailJS et que votre compte est activé.

## 📄 Licence

MIT - Libre d'utilisation pour vos projets personnels et commerciaux.

## 🤝 Contribution

N'hésitez pas à forker ce projet et à l'adapter à vos besoins !

---

**Fait avec ❤️ et Next.js**
