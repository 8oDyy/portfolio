export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic ratio, e.g. "16/10", "4/5". Used for placeholders. */
  ratio?: string;
};

export type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectChallenge = {
  title: string;
  description: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectStackGroup = {
  category: string;
  items: string[];
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  year: number;
  category: "Fullstack" | "Frontend" | "Backend";
  status: "Live" | "En cours" | "Archivé" | "Concept";
  tagline: string;
  role: string;
  duration: string;
  teamSize?: string;
  /** Concise context — what this project is about, in one or two sentences. */
  summary: string;
  /** The underlying problem or user need. */
  problem: string;
  /** The approach and reasoning. */
  solution: string;
  /** Flat tech list (for meta/badges). */
  tech: string[];
  /** Grouped tech breakdown for the dedicated stack block. */
  stack: ProjectStackGroup[];
  features: ProjectFeature[];
  highlights: string[];
  architecture: string;
  challenges?: ProjectChallenge[];
  metrics?: ProjectMetric[];
  links: {
    github?: string;
    demo?: string;
    case?: string;
  };
  /** Cover image shown in the sticky column. */
  cover: ProjectImage;
  /** Additional images displayed inline below the narrative. */
  gallery: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "checkly",
    number: "01",
    title: "Checkly",
    year: 2025,
    category: "Fullstack",
    status: "En cours",
    tagline:
      "Notation fiable par NFC / QR Code pour restaurants, commerces et hôtels.",
    role: "Fullstack — conception & développement",
    duration: "6 mois — en cours",
    summary:
      "Plateforme de notation anti-fraude pour professionnels, avec token dynamique à chaque scan, avis connectés ou anonymes, et dashboard pro temps réel.",
    problem:
      "Les systèmes d'avis classiques sont contournables : liens statiques exploitables, multi-comptes, bots, absence de lien avec le point de vente. Les professionnels n'ont aucune garantie que les retours reçus sont honnêtes, ni aucun outil pour répondre en contexte.",
    solution:
      "Un tag NFC ou QR Code génère à chaque scan une URL signée avec un token dynamique unique. L'utilisateur dépose son avis — connecté via Clerk ou en anonyme nominatif — et le dashboard pro agrège les retours en temps réel avec typologie, filtre, photos et rating automatiquement recalculé.",
    tech: ["Nuxt 3", "Vue.js", "TypeScript", "Supabase", "PostgreSQL", "Clerk", "Nuxt UI"],
    stack: [
      { category: "Front", items: ["Nuxt 3", "Vue 3", "Nuxt UI", "TypeScript"] },
      { category: "Back / Data", items: ["Supabase", "PostgreSQL", "Row Level Security"] },
      { category: "Auth", items: ["Clerk", "publicMetadata.role"] },
      { category: "Outillage", items: ["Supabase CLI (types)", "Vercel"] },
    ],
    features: [
      {
        title: "Scan NFC / QR Code",
        description:
          "Ouverture d'une URL signée avec un token dynamique unique à chaque scan. Aucun lien statique réutilisable.",
      },
      {
        title: "Anti-fraude intégré",
        description:
          "Tokens régénérés à chaque scan, détection de comportements suspects, limite par IP et empreinte.",
      },
      {
        title: "Avis connecté ou anonyme",
        description:
          "Dépôt via Clerk ou en anonyme avec nom d'usage indépendant — jamais lié au compte.",
      },
      {
        title: "Dashboard Pro",
        description:
          "Configuration du commerce, suivi des avis, rating moyen, statistiques et réponses en temps réel.",
      },
      {
        title: "Modération & validation admin",
        description:
          "Les horaires d'ouverture saisis par les pros passent en validation admin avant publication.",
      },
      {
        title: "Médias liés & taxonomie",
        description:
          "Photos liées à userId + businessId (+ reviewId optionnel), catégories et filtres dans la recherche.",
      },
    ],
    highlights: [
      "Token dynamique à chaque scan — zéro lien statique exploitable.",
      "Séparation stricte des rôles user / pro via Clerk publicMetadata.",
      "Types Supabase générés par CLI, consommés strictement côté front et serveur.",
      "Rating moyen et reviewCount maintenus automatiquement à l'insertion / suppression.",
      "Photos rattachées à userId + businessId, avec reviewId optionnel pour traçabilité.",
      "Pipeline de validation admin avant publication des horaires pro.",
    ],
    architecture:
      "Architecture full-stack Nuxt 3 + Supabase. Le front consomme une librairie serveur typée qui encapsule chaque accès à Supabase. Les types TypeScript sont générés depuis le schéma Postgres via la CLI Supabase. Les rôles utilisateur/pro sont stockés dans publicMetadata Clerk et gardés côté serveur sur chaque route sensible. Les tables principales : users, businesses, reviews, photos, categories, features, hours, reactions, fraud_events.",
    challenges: [
      {
        title: "Unicité anti-fraude vs UX rapide",
        description:
          "Trouver le bon équilibre entre renouvellement de token à chaque scan et latence ressentie par l'utilisateur au dépôt d'avis.",
      },
      {
        title: "Double identité utilisateur",
        description:
          "Permettre à un même utilisateur d'apparaître tantôt connecté, tantôt anonyme, sans jamais lier les deux identités au niveau des avis.",
      },
    ],
    links: {
      github: "https://github.com/8oDyy/checkly",
      demo: "",
    },
    cover: {
      src: "",
      alt: "Aperçu de l'interface Checkly",
      ratio: "4/5",
    },
    gallery: [
      { src: "", alt: "Page de scan NFC", caption: "Arrivée post-scan avec token signé", ratio: "3/4" },
      { src: "", alt: "Formulaire d'avis", caption: "Dépôt d'avis — connecté ou anonyme", ratio: "3/4" },
      { src: "", alt: "Dashboard Pro", caption: "Dashboard professionnel — stats temps réel", ratio: "16/10" },
      { src: "", alt: "Page commerce publique", caption: "Page publique d'un commerce", ratio: "16/10" },
    ],
  },
  {
    slug: "melo",
    number: "02",
    title: "Melo",
    year: 2025,
    category: "Fullstack",
    status: "En cours",
    tagline:
      "Copilote alimentaire mobile — suggestions de repas et planning hebdomadaire pilotés par LLM.",
    role: "Fullstack — app Flutter & orchestration backend",
    duration: "8 mois — en cours",
    summary:
      "Application mobile multi-plateforme (iOS/Android/Web/macOS) qui génère des suggestions de repas personnalisées et un planning hebdomadaire via un backend orchestrant un LLM, avec onboarding profond, abonnement RevenueCat et calculs nutritionnels côté serveur.",
    problem:
      "Composer des repas équilibrés adaptés à son profil, son budget et ses contraintes alimentaires demande un effort quotidien. Les apps de diète existantes imposent des plans rigides, délèguent peu à l'utilisateur et ne s'ajustent pas au contexte réel (envie, courses, temps disponible).",
    solution:
      "Un onboarding de 15 écrans bâtit un profil nutritionnel complet (BMR/TDEE/macros) calculé serveur-side, puis un backend sur VPS orchestre un LLM pour proposer des idées de repas contextualisées, des recettes détaillées et un planning hebdomadaire. Le client Flutter — MVVM + Provider — absorbe les retours LLM avec un parsing JSON défensif et offre une navigation fluide via GoRouter.",
    tech: [
      "Flutter",
      "Dart",
      "Material 3",
      "Provider",
      "GoRouter",
      "REST API",
      "LLM",
      "RevenueCat",
      "Google Sign-In",
      "Sign in with Apple",
    ],
    stack: [
      {
        category: "Client mobile",
        items: ["Flutter 3.5+", "Dart", "Material 3", "GoRouter", "Provider (ChangeNotifier)"],
      },
      {
        category: "Auth & Billing",
        items: [
          "Google Sign-In v7",
          "Sign in with Apple",
          "RevenueCat (purchases_flutter)",
        ],
      },
      {
        category: "Back / Data",
        items: ["API REST (VPS)", "Orchestration LLM", "SharedPreferences", "flutter_dotenv"],
      },
      {
        category: "Média & UX",
        items: ["Lottie", "flutter_svg", "Pexels (photos de repas)", "permission_handler"],
      },
      {
        category: "Outillage",
        items: ["flutter_test (8 ViewModels sous test)", "Mocks API", "Env stagé .env"],
      },
    ],
    features: [
      {
        title: "Onboarding profond — 15 écrans",
        description:
          "Profil complet (objectif, morphologie, contraintes, activité). Le serveur calcule BMR/TDEE et les macros cibles, stockés localement pour toute la session.",
      },
      {
        title: "Suggestions de repas par LLM",
        description:
          "Onglet Home — l'utilisateur génère des idées contextualisées (petit-déjeuner, déjeuner, dîner, snack) selon ses contraintes, avec recette détaillée à la demande.",
      },
      {
        title: "Planning hebdomadaire",
        description:
          "Onglet Week — visualisation 7 jours × repas, ré-génération par case, export des ingrédients vers l'onglet Courses.",
      },
      {
        title: "Liste de courses agrégée",
        description:
          "Les ingrédients du planning sont regroupés par catégorie et ajustés aux quantités. Les items peuvent être cochés et persistent entre sessions.",
      },
      {
        title: "Abonnement RevenueCat",
        description:
          "Paywall natif avec RevenueCat — App Store / Play Store / Web. Gate les fonctionnalités premium (planning illimité, recettes avancées).",
      },
      {
        title: "Multi-plateforme",
        description:
          "Une base de code Flutter livrée sur iOS, Android, Web et macOS, avec transitions GoRouter personnalisées selon la plateforme.",
      },
    ],
    highlights: [
      "Architecture MVVM stricte — 8 ViewModels découplés, chacun testé indépendamment.",
      "Backend VPS orchestrant un LLM — le client ne voit jamais le prompt brut, juste des réponses JSON typées.",
      "Parsing défensif : les sorties LLM arrivent parfois enrobées de markdown ou de texte parasite — les fromJson absorbent, nettoient, isolent le JSON valide.",
      "Domain models immutables — toute mutation passe par copyWith, aucune surprise d'état partagé.",
      "Calculs BMR/TDEE/macros côté serveur — un seul endroit de vérité, les formules peuvent évoluer sans re-livrer le binaire.",
      "Google Sign-In v7 + Sign in with Apple — gestion unifiée des sessions côté client, tokens rafraîchis en silence.",
    ],
    architecture:
      "Client Flutter découpé en trois couches : Presentation (Screens + Widgets Material 3), ViewModels (ChangeNotifier Provider), Services (clients API + auth + billing). Les Domain Models sont immutables avec fromJson/toJson défensifs. La navigation passe par GoRouter avec des transitions personnalisées. Côté serveur, une API REST hébergée sur VPS agit comme orchestrateur : elle reçoit le profil utilisateur, calcule les métriques nutritionnelles, construit les prompts, appelle le LLM, normalise la réponse en JSON strict avant de la renvoyer. Les credentials sensibles vivent dans un .env chargé au boot via flutter_dotenv. RevenueCat gère les achats sur les trois plateformes de facturation. SharedPreferences persiste profil, planning et liste de courses en local.",
    challenges: [
      {
        title: "Domestiquer les sorties LLM",
        description:
          "Le LLM renvoie parfois du JSON propre, parfois du JSON enrobé dans ```json, parfois du texte libre avec des sauts de ligne parasites. Les fromJson ont été renforcés pour tolérer ces variantes sans faire planter la couche présentation.",
      },
      {
        title: "Unifier quatre plateformes",
        description:
          "iOS et Android impliquent deux providers d'auth natifs (Google / Apple) et deux stores de billing. Le Web et macOS demandent une dégradation propre quand une API native n'existe pas.",
      },
      {
        title: "Onboarding de 15 écrans sans perdre l'utilisateur",
        description:
          "Chaque écran collecte un champ ou un choix et doit pouvoir revenir en arrière sans perte. Le state est porté par un ViewModel unique jusqu'à la soumission finale au backend.",
      },
    ],
    links: {
      github: "",
      demo: "",
    },
    cover: {
      src: "",
      alt: "Écran principal de l'app Melo",
      ratio: "4/5",
    },
    gallery: [
      { src: "", alt: "Onboarding Melo", caption: "Onboarding 15 écrans — profil nutritionnel", ratio: "3/4" },
      { src: "", alt: "Home — suggestions de repas", caption: "Suggestions contextuelles générées par LLM", ratio: "3/4" },
      { src: "", alt: "Planning hebdomadaire", caption: "Planning 7 jours × repas — régénération à la case", ratio: "16/10" },
      { src: "", alt: "Liste de courses", caption: "Liste de courses agrégée depuis le planning", ratio: "3/4" },
    ],
  },
  {
    slug: "social-media-app",
    number: "03",
    title: "Social Media App",
    year: 2024,
    category: "Fullstack",
    status: "Concept",
    tagline: "Réseau social — posts, messagerie temps réel et notifications.",
    role: "Fullstack",
    duration: "Side-project",
    summary:
      "Application sociale complète : feed personnalisé, système de followers, messagerie instantanée et notifications push.",
    problem:
      "Construire une base solide pour un produit social sans sur-ingénierie : authentification, feed, messagerie, notifications.",
    solution:
      "Stack Next.js + Socket.io + Redis, avec un feed trié par engagement et une messagerie instantanée scalable.",
    tech: ["Next.js", "Socket.io", "Redis", "AWS"],
    stack: [
      { category: "Front", items: ["Next.js", "React"] },
      { category: "Back", items: ["Socket.io", "Redis"] },
      { category: "Infra", items: ["AWS"] },
    ],
    features: [
      { title: "Feed personnalisé", description: "Tri par engagement + signal d'abonnement." },
      { title: "Messagerie temps réel", description: "Socket.io + Redis pour la persistance de sessions." },
      { title: "Notifications push", description: "Notifications ciblées par événement." },
    ],
    highlights: [],
    architecture: "Next.js côté front, API Socket.io backée par Redis pour les sessions et la messagerie, déploiement AWS.",
    links: {
      github: "",
      demo: "",
    },
    cover: {
      src: "",
      alt: "Social Media App",
      ratio: "4/5",
    },
    gallery: [],
  },
];
