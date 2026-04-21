export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic ratio, e.g. "16/10", "4/5". Used for placeholders. */
  ratio?: string;
  /**
   * Visual frame around the image. Phone is auto-detected by ratio;
   * browser is opt-in for desktop screenshots.
   */
  frame?: "browser" | "phone" | "none";
  /** Fake URL rendered in the browser chrome when frame is "browser". */
  url?: string;
};

/** A horizontal strip of aligned phone screenshots — used for flows. */
export type ProjectStrip = {
  kind: "strip";
  images: ProjectImage[];
  caption?: string;
};

export type ProjectGalleryItem = ProjectImage | ProjectStrip;

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
  gallery: ProjectGalleryItem[];
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
      "Avis anti-fraude par NFC ou QR. Un scan, un token unique. Fini les notes truquées.",
    role: "Fullstack — conception & développement",
    duration: "6 mois — en cours",
    summary:
      "Plateforme d'avis pour restaurants, commerces et hôtels. Chaque scan génère un token signé à usage unique — les liens ne se rejouent plus, les faux comptes tombent, les pros voient des retours réels.",
    problem:
      "Les avis en ligne se truquent sans effort : liens statiques rejouables, multi-comptes, bots, aucun ancrage avec le point de vente. Les pros encaissent sans moyen de trier le vrai du faux, et perdent du temps à répondre à des retours fictifs.",
    solution:
      "Chaque tag NFC ou QR délivre une URL signée avec un token dynamique, valable une fois. L'avis part — connecté via Clerk ou anonyme nominatif — et le dashboard pro agrège tout en temps réel : typologie, filtres, photos, rating recalculé à la volée.",
    tech: ["Nuxt 3", "Vue.js", "TypeScript", "Supabase", "PostgreSQL", "Clerk", "Nuxt UI"],
    stack: [
      { category: "Front", items: ["Nuxt 3", "Vue 3", "Nuxt UI", "TypeScript"] },
      { category: "Back / Data", items: ["Supabase", "PostgreSQL", "Row Level Security"] },
      { category: "Auth", items: ["Clerk", "publicMetadata.role"] },
      { category: "Outillage", items: ["Supabase CLI (types)", "Vercel"] },
    ],
    features: [
      {
        title: "Scan NFC ou QR",
        description:
          "Chaque scan ouvre une URL signée, valable une seule fois. Aucun lien rejouable, aucun contournement.",
      },
      {
        title: "Anti-fraude natif",
        description:
          "Tokens régénérés à chaque passage, détection des motifs suspects, rate-limit par IP et empreinte.",
      },
      {
        title: "Avis connecté ou anonyme",
        description:
          "Dépôt via Clerk ou anonyme nominatif. Les deux identités ne se croisent jamais dans la base.",
      },
      {
        title: "Dashboard Pro",
        description:
          "Config du commerce, suivi des avis, rating moyen, stats et réponses. Tout en temps réel.",
      },
      {
        title: "Modération admin",
        description:
          "Les horaires saisis par les pros passent en validation avant publication. Aucune donnée douteuse en ligne.",
      },
      {
        title: "Médias traçables",
        description:
          "Photos ancrées à userId + businessId (et reviewId si pertinent). Catégories, filtres, recherche.",
      },
    ],
    highlights: [
      "Token dynamique à chaque scan — zéro lien rejouable.",
      "Séparation stricte user / pro via Clerk publicMetadata, gardée côté serveur.",
      "Types Supabase générés par CLI, partagés entre front et serveur sans divergence.",
      "Rating moyen et reviewCount recalculés automatiquement à l'insert et au delete.",
      "Photos rattachées à userId + businessId, reviewId optionnel pour la traçabilité.",
      "Horaires pro passés en validation admin avant publication.",
    ],
    architecture:
      "Full-stack Nuxt 3 + Supabase. Le front consomme une librairie serveur typée qui encapsule chaque accès Supabase. Les types TypeScript descendent du schéma Postgres via la CLI. Les rôles user/pro vivent dans publicMetadata Clerk et sont contrôlés côté serveur sur chaque route sensible. Tables principales : users, businesses, reviews, photos, categories, features, hours, reactions, fraud_events.",
    challenges: [
      {
        title: "Sécurité vs latence",
        description:
          "Régénérer un token à chaque scan sans ralentir le dépôt d'avis. Il a fallu pré-signer côté serveur et paralléliser la vérification avec l'ouverture du formulaire.",
      },
      {
        title: "Deux identités, un seul utilisateur",
        description:
          "Un même user peut apparaître connecté ou anonyme selon l'avis. Les deux identités coexistent dans les tables sans jamais être reliées — même pas par déduction.",
      },
    ],
    links: {
      github: "https://github.com/8oDyy/checkly",
      demo: "",
    },
    cover: {
      src: "/projects/checkly/Etablissment.png",
      alt: "Page publique d'un commerce sur Checkly",
      ratio: "16/15",
      frame: "browser",
      url: "checkly.app/le-coq-gourmand",
    },
    gallery: [
      {
        src: "/projects/checkly/Research.png",
        alt: "Recherche d'un commerce sur Checkly",
        caption: "Recherche — découvrir un commerce à proximité",
        ratio: "16/9",
        frame: "browser",
        url: "checkly.app/recherche",
      },
      {
        src: "/projects/checkly/Dashboard.png",
        alt: "Dashboard Pro Checkly",
        caption: "Dashboard pro — retours et stats en temps réel",
        ratio: "2/1",
        frame: "browser",
        url: "pro.checkly.app/dashboard",
      },
      {
        src: "/projects/checkly/Avis.png",
        alt: "Dépôt d'avis Checkly sur mobile après scan validé",
        caption: "Dépôt d'avis — formulaire servi après scan validé",
        ratio: "9/19.5",
        frame: "phone",
      },
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
      "Copilote alimentaire mobile. Profil nutri, repas suggérés par LLM, planning hebdo, courses. Zéro régime imposé.",
    role: "Fullstack — app Flutter & orchestration backend",
    duration: "8 mois — en cours",
    summary:
      "App mobile cross-plateforme (iOS, Android, Web, macOS). 15 écrans d'onboarding construisent un profil nutritionnel côté serveur (BMR, TDEE, macros), puis un backend VPS orchestre un LLM pour générer repas, recettes et planning — ajustés au profil réel, pas à un régime standard.",
    problem:
      "Manger équilibré selon son budget, ses goûts et son temps demande un vrai effort quotidien. Les apps de diète imposent des plans rigides, ignorent le contexte (courses, envie, timing) et laissent peu la main à l'utilisateur.",
    solution:
      "L'onboarding bâtit un profil complet en 15 étapes. Le serveur calcule les macros, construit les prompts, appelle le LLM, renvoie du JSON strict. Le client Flutter — MVVM + Provider — parse avec défense, affiche via GoRouter, gère l'achat via RevenueCat. Les réponses LLM sont normalisées avant d'atteindre la présentation.",
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
        title: "Onboarding 15 écrans",
        description:
          "Profil complet : objectif, morphologie, contraintes, activité. Le serveur calcule BMR, TDEE et macros cibles, mis en cache local pour la session.",
      },
      {
        title: "Repas suggérés par LLM",
        description:
          "Onglet Home — idées contextualisées (petit-déj, déjeuner, dîner, snack) selon les contraintes. Recette détaillée à la demande.",
      },
      {
        title: "Planning hebdomadaire",
        description:
          "Onglet Week — grille 7 jours × repas. Re-génération case par case, export des ingrédients vers les Courses.",
      },
      {
        title: "Courses agrégées",
        description:
          "Les ingrédients du planning groupés par catégorie, quantités ajustées. Cochables, persistants entre sessions.",
      },
      {
        title: "Paywall RevenueCat",
        description:
          "Abonnement natif sur App Store, Play Store, Web. Gate les fonctions premium (planning illimité, recettes avancées).",
      },
      {
        title: "Une base, quatre plateformes",
        description:
          "iOS, Android, Web, macOS. Une seule base Flutter, transitions GoRouter adaptées à chaque plateforme.",
      },
    ],
    highlights: [
      "MVVM strict — 8 ViewModels découplés, chacun testé isolément.",
      "Backend VPS orchestre le LLM. Le client ne voit jamais le prompt brut, uniquement du JSON typé.",
      "Parsing défensif : les sorties LLM arrivent parfois enrobées de markdown ou de texte parasite. Les fromJson nettoient et isolent le JSON valide avant de planter.",
      "Domain models immutables. Toute mutation passe par copyWith, zéro surprise d'état partagé.",
      "Calculs BMR/TDEE/macros côté serveur. Une seule source de vérité, les formules évoluent sans re-livrer l'app.",
      "Google Sign-In v7 + Sign in with Apple. Sessions unifiées, tokens rafraîchis en silence.",
    ],
    architecture:
      "Client Flutter en trois couches : Presentation (Screens + widgets Material 3), ViewModels (ChangeNotifier Provider), Services (API, auth, billing). Domain models immutables avec fromJson/toJson défensifs. Navigation GoRouter, transitions custom par plateforme. Côté serveur, une API REST sur VPS orchestre : profil → calculs nutritionnels → prompts → LLM → normalisation JSON stricte → réponse. Credentials dans un .env chargé au boot via flutter_dotenv. RevenueCat gère les trois stores de facturation. SharedPreferences persiste profil, planning et courses en local.",
    challenges: [
      {
        title: "Domestiquer le LLM",
        description:
          "Les réponses arrivent propres, parfois enrobées de ```json, parfois en texte libre avec des retours à la ligne parasites. Les fromJson nettoient et isolent le JSON valide avant qu'il atteigne la couche présentation.",
      },
      {
        title: "Quatre plateformes, une logique",
        description:
          "iOS et Android demandent deux providers d'auth natifs (Google, Apple) et deux stores de billing. Le Web et macOS exigent une dégradation propre quand l'API native n'existe pas.",
      },
      {
        title: "15 écrans sans perdre l'utilisateur",
        description:
          "Chaque étape capture un champ ou un choix et autorise le retour arrière sans perte. Un seul ViewModel porte l'état jusqu'à la soumission finale.",
      },
    ],
    links: {
      github: "",
      demo: "",
    },
    cover: {
      src: "/projects/melo/MainPage.png",
      alt: "Page d'accueil de l'app Melo",
      ratio: "9/19.5",
    },
    gallery: [
      {
        kind: "strip",
        caption: "Onboarding — du profil nutritionnel à l'objectif",
        images: [
          { src: "/projects/melo/Onboarding1.png", alt: "Onboarding Melo — étape 1", ratio: "9/19.5" },
          { src: "/projects/melo/Onboarding2.png", alt: "Onboarding Melo — étape 2", ratio: "9/19.5" },
          { src: "/projects/melo/Onboarding3.png", alt: "Onboarding Melo — étape 3", ratio: "9/19.5" },
          { src: "/projects/melo/Onboarding4.png", alt: "Onboarding Melo — étape 4", ratio: "9/19.5" },
          { src: "/projects/melo/Onboarding5.png", alt: "Onboarding Melo — étape 5", ratio: "9/19.5" },
        ],
      },
      {
        src: "/projects/melo/MealPage.png",
        alt: "Liste des recettes",
        caption: "Catalogue — filtrage et recherche",
        ratio: "9/19.5",
      },
      {
        kind: "strip",
        caption: "Recette — ingrédients, macros et étapes pas à pas",
        images: [
          { src: "/projects/melo/Cokking0.png", alt: "Recette — entrée", ratio: "9/19.5" },
          { src: "/projects/melo/Cooking.png", alt: "Recette — vue d'ensemble", ratio: "9/19.5" },
          { src: "/projects/melo/Cooking2.png", alt: "Recette — étapes", ratio: "9/19.5" },
          { src: "/projects/melo/cooking3.png", alt: "Recette — synthèse macros", ratio: "9/19.5" },
        ],
      },
      {
        src: "/projects/melo/Week.png",
        alt: "Planning hebdomadaire",
        caption: "Planning 7 jours — repas générés par LLM",
        ratio: "9/19.5",
      },
    ],
  },
  {
    slug: "social-media-app",
    number: "03",
    title: "Social Media App",
    year: 2024,
    category: "Fullstack",
    status: "Concept",
    tagline:
      "Réseau social complet — feed, DMs temps réel, notifications. Posé sur Next.js + Socket.io + Redis.",
    role: "Fullstack",
    duration: "Side-project",
    summary:
      "MVP social qui tient la charge : feed trié par engagement, messagerie instantanée backée par Redis, notifications ciblées par événement. Pas une démo, un produit.",
    problem:
      "Monter un produit social viable sans sur-ingénierie. Les briques de base — auth, feed, DMs, notifs — doivent marcher ensemble, pas se contenter d'exister côte à côte.",
    solution:
      "Next.js pour le rendu hybride, Socket.io pour les DMs, Redis pour la persistance des sessions et la diffusion d'événements. Feed trié par engagement, notifications groupées par topic.",
    tech: ["Next.js", "Socket.io", "Redis", "AWS"],
    stack: [
      { category: "Front", items: ["Next.js", "React"] },
      { category: "Back", items: ["Socket.io", "Redis"] },
      { category: "Infra", items: ["AWS"] },
    ],
    features: [
      { title: "Feed personnalisé", description: "Tri par engagement croisé avec le signal d'abonnement." },
      { title: "DMs temps réel", description: "Socket.io pour la connexion, Redis pour la persistance de sessions." },
      { title: "Notifications push", description: "Événements ciblés, groupés par topic, débrayables par utilisateur." },
    ],
    highlights: [],
    architecture:
      "Next.js côté front. API Socket.io backée par Redis pour les sessions et la messagerie. Déploiement AWS avec scaling horizontal sur les workers websocket.",
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
