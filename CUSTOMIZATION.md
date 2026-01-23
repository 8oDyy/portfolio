# 🎨 Guide de Personnalisation

Ce document vous guide pas à pas pour personnaliser votre portfolio.

## 📝 Checklist de personnalisation

### 1. Informations personnelles (OBLIGATOIRE)

#### Hero Section
**Fichier** : `src/components/Hero.tsx`

Ligne 79 : Remplacez "Votre Nom" par votre nom
```tsx
Votre Nom
```

Ligne 86 : Remplacez par votre spécialité
```tsx
Développeur Fullstack JavaScript
```

#### About Section - Parcours
**Fichier** : `src/components/About.tsx`

Lignes 13-17 : Modifiez votre timeline
```tsx
const timeline = [
  { year: '2024', title: 'Développeur Fullstack Senior', company: 'Tech Company', description: 'Lead technique sur projets web innovants' },
  { year: '2022', title: 'Développeur Frontend', company: 'Startup Inc', description: 'Création d\'interfaces modernes et performantes' },
  { year: '2020', title: 'Développeur Junior', company: 'Digital Agency', description: 'Apprentissage et développement web' },
  { year: '2019', title: 'Formation Développement Web', company: 'École/Bootcamp', description: 'Diplôme en développement web fullstack' },
];
```

#### About Section - Compétences
**Fichier** : `src/components/About.tsx`

Lignes 8-12 : Personnalisez vos compétences
```tsx
const skills = [
  { name: 'Frontend', icon: Code, items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { name: 'Backend', icon: Database, items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'] },
  { name: 'Design', icon: Palette, items: ['Figma', 'UI/UX', 'Animations', 'Three.js'] },
  { name: 'DevOps', icon: Rocket, items: ['Docker', 'CI/CD', 'AWS', 'Vercel'] },
];
```

### 2. Projets (OBLIGATOIRE)

**Fichier** : `src/components/Projects.tsx`

Lignes 8-58 : Remplacez par vos vrais projets
```tsx
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce complète avec panier, paiement et gestion admin.',
    image: '/placeholder-project1.jpg',  // Ajoutez vos images dans public/
    tech: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
    github: 'https://github.com/votre-username/projet1',
    demo: 'https://demo-projet1.vercel.app',
    category: 'Fullstack',
  },
  // Ajoutez vos autres projets...
];
```

**Images** : Ajoutez vos captures d'écran dans `public/` :
- `public/project1.jpg`
- `public/project2.jpg`
- etc.

### 3. Stack Technique

**Fichier** : `src/components/Stack.tsx`

Lignes 27-31 : Personnalisez vos technologies
```tsx
const technologies = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Nginx', 'CI/CD'] },
  { category: 'Tools', items: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest', 'ESLint'] },
];
```

### 4. Contact & Réseaux sociaux (OBLIGATOIRE)

**Fichier** : `src/components/Contact.tsx`

Lignes 58-62 : Mettez à jour vos liens
```tsx
const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/votre-username', color: 'hover:text-white' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/votre-profil', color: 'hover:text-blue-500' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/votre-username', color: 'hover:text-blue-400' },
  { name: 'Email', icon: Mail, url: 'mailto:votre.email@example.com', color: 'hover:text-neon-green' },
];
```

**Fichier** : `src/components/Footer.tsx`

Lignes 27-39 : Mettez à jour les liens du footer

### 5. Configuration EmailJS (OPTIONNEL)

Pour activer le formulaire de contact :

1. **Créez un compte** sur https://www.emailjs.com/
2. **Ajoutez un service email** (Gmail, Outlook, etc.)
3. **Créez un template** avec ces variables :
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
4. **Récupérez vos IDs**

**Fichier** : `src/components/Contact.tsx`

Lignes 32-42 : Remplacez les placeholders
```tsx
await emailjs.send(
  'YOUR_SERVICE_ID',      // Votre Service ID
  'YOUR_TEMPLATE_ID',     // Votre Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  'YOUR_PUBLIC_KEY'       // Votre Public Key
);
```

### 6. Metadata SEO

**Fichier** : `src/app/layout.tsx`

Lignes 16-26 : Personnalisez les metadata
```tsx
export const metadata: Metadata = {
  title: "Portfolio - Développeur Fullstack",
  description: "Portfolio moderne et immersif d'un développeur fullstack JavaScript",
  keywords: ["portfolio", "développeur", "fullstack", "react", "nextjs", "threejs"],
  authors: [{ name: "Votre Nom" }],
  openGraph: {
    title: "Portfolio - Développeur Fullstack",
    description: "Portfolio moderne et immersif",
    type: "website",
  },
};
```

## 🎨 Personnalisation avancée

### Couleurs du thème

**Fichier** : `tailwind.config.ts`
```ts
colors: {
  neon: {
    blue: "#00f0ff",    // Couleur principale
    green: "#00ff88",   // Couleur secondaire
    purple: "#b000ff",  // Couleur accent
  },
}
```

**Fichier** : `src/app/globals.css`
```css
:root {
  --neon-blue: #00f0ff;
  --neon-green: #00ff88;
  --neon-purple: #b000ff;
}
```

### Animations

Les animations sont configurées dans `tailwind.config.ts` :
- `animate-float` : Animation flottante
- `animate-glow` : Effet de lueur
- `animate-slide-up` : Glissement vers le haut
- `animate-fade-in` : Fondu d'apparition

### Scène 3D Hero

**Fichier** : `src/components/Hero.tsx`

Pour modifier la sphère 3D :
- Ligne 18 : Couleur de la sphère
- Ligne 21 : Intensité de distorsion (0-1)
- Ligne 22 : Vitesse d'animation

### Smooth Scroll

**Fichier** : `src/lib/lenis.tsx`

Ajustez la configuration :
```tsx
const lenis = new Lenis({
  duration: 1.2,        // Durée du scroll (secondes)
  easing: (t) => ...,   // Fonction d'easing
  smoothWheel: true,    // Smooth scroll à la molette
});
```

## 🚀 Après personnalisation

1. **Testez localement** : `pnpm dev`
2. **Vérifiez tous les liens** : GitHub, LinkedIn, Email, etc.
3. **Ajoutez vos images** de projets
4. **Testez le formulaire** de contact (si EmailJS configuré)
5. **Build de production** : `pnpm build`
6. **Déployez sur Vercel**

## ✅ Checklist finale

- [ ] Nom et spécialité dans Hero
- [ ] Timeline de parcours personnalisée
- [ ] Compétences mises à jour
- [ ] Projets réels ajoutés avec images
- [ ] Liens sociaux configurés
- [ ] EmailJS configuré (optionnel)
- [ ] Metadata SEO personnalisées
- [ ] Couleurs du thème ajustées (optionnel)
- [ ] Test local réussi
- [ ] Déployé sur Vercel

---

**Besoin d'aide ?** Consultez le README.md pour plus d'informations.
