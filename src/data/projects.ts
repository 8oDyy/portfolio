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
  /**
   * Optional video that replaces the cover image — its currentTime is driven
   * by scroll progress through the article (top enters viewport = 0,
   * bottom leaves viewport = end).
   */
  coverVideo?: {
    src: string;
    /** Poster fallback during load. Defaults to cover.src. */
    poster?: string;
    /** Captions displayed under the video, switching as scroll advances. */
    captions?: { untilProgress: number; label: string }[];
  };
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
      "Chaque tag NFC ou QR délivre une URL signée avec un token dynamique, valable une fois. L'avis part — connecté via Supabase Auth ou anonyme nominatif — et le dashboard pro agrège tout en temps réel : typologie, filtres, photos, rating recalculé à la volée.",
    tech: ["Nuxt 3", "Vue.js", "TypeScript", "Supabase", "PostgreSQL", "Supabase Auth", "Nuxt UI"],
    stack: [
      { category: "Front", items: ["Nuxt 3", "Vue 3", "Nuxt UI", "TypeScript"] },
      { category: "Back / Data", items: ["Supabase", "PostgreSQL", "Row Level Security"] },
      { category: "Auth", items: ["Supabase Auth", "publicMetadata.role"] },
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
          "Dépôt via Supabase Auth ou anonyme nominatif. Les deux identités ne se croisent jamais dans la base.",
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
      "Séparation stricte user / pro via Supabase Auth publicMetadata, gardée côté serveur.",
      "Types Supabase générés par CLI, partagés entre front et serveur sans divergence.",
      "Rating moyen et reviewCount recalculés automatiquement à l'insert et au delete.",
      "Photos rattachées à userId + businessId, reviewId optionnel pour la traçabilité.",
      "Horaires pro passés en validation admin avant publication.",
    ],
    architecture:
      "Full-stack Nuxt 3 + Supabase. Le front consomme une librairie serveur typée qui encapsule chaque accès Supabase. Les types TypeScript descendent du schéma Postgres via la CLI. Les rôles user/pro vivent dans publicMetadata Supabase Auth et sont contrôlés côté serveur sur chaque route sensible. Tables principales : users, businesses, reviews, photos, categories, features, hours, reactions, fraud_events.",
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
      src: "/projects/checkly/Etablissement.jpg",
      alt: "Page publique d'un commerce sur Checkly",
      ratio: "16/15",
      frame: "browser",
      url: "checkly.app/le-coq-gourmand",
    },
    gallery: [
      {
        src: "/projects/checkly/Research.jpg",
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
        src: "/projects/checkly/Avis.jpg",
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
      src: "/projects/melo/MainPage.jpg",
      alt: "Page d'accueil de l'app Melo",
      ratio: "9/19.5",
    },
    coverVideo: {
      src: "/projects/melo/hero.mp4",
      poster: "/projects/melo/MainPage.jpg",
      captions: [
        { untilProgress: 0.25, label: "Page d'accueil" },
        { untilProgress: 0.5, label: "Page produit" },
        { untilProgress: 1, label: "Recette pas à pas" },
      ],
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
        src: "/projects/melo/Week.png",
        alt: "Planning hebdomadaire",
        caption: "Planning 7 jours — repas générés par LLM",
        ratio: "9/19.5",
      },
    ],
  },
  {
    slug: "crowdmind",
    number: "03",
    title: "CrowdMind",
    year: 2026,
    category: "Backend",
    status: "En cours",
    tagline:
      "Et si une opinion se calculait ? 100 citoyens synthétiques, 22 topics pondérés, moteur déporté sur Raspberry Pi. Zero LLM en prod.",
    role: "Backend & infra — conception & développement",
    duration: "6 semaines — en cours",
    summary:
      "Projet de recherche backend. Une API FastAPI sur Azure génère des agents, délègue le calcul à un Raspberry Pi branché au bureau d'étude via WebSocket sortant, persiste dans Supabase, et renvoie la distribution — tout se calcule, rien ne s'invente.",
    problem:
      "Demander à un LLM unique « que pense le public ? », c'est demander à une seule tête. Cher, lent, imprévisible, aucune distribution en sortie — une moyenne n'a jamais fait un sondage.",
    solution:
      "100 agents tirés sur 5 clusters politiques français : centre-gauche progressiste, centre-droite conservateur, gauche radicale, droite radicale, divers. Chaque agent porte 4 axes idéologiques et 5 axes démographiques. Le moteur détecte les topics via 22 regex, pondère les axes, applique les modificateurs démographiques, injecte un bruit gaussien seedé par paire agent × question — et sort une distribution en moins de 200 ms.",
    tech: [
      "FastAPI",
      "Python 3.13",
      "Supabase",
      "PostgreSQL",
      "WebSockets",
      "Raspberry Pi",
      "Docker",
      "Nginx",
      "Azure",
      "GitHub Actions",
      "Redis",
    ],
    stack: [
      {
        category: "API (cloud)",
        items: ["FastAPI", "Python 3.13", "Pydantic", "Uvicorn"],
      },
      {
        category: "Worker (edge)",
        items: [
          "Raspberry Pi",
          "websockets",
          "systemd",
          "Moteur heuristique (pure stdlib)",
        ],
      },
      {
        category: "Data",
        items: ["Supabase", "PostgreSQL", "Redis"],
      },
      {
        category: "Infra",
        items: ["VPS Azure", "Docker Compose", "Nginx (TLS + WSS)", "GHCR"],
      },
      {
        category: "CI/CD",
        items: [
          "GitHub Actions (CI + CD)",
          "ruff check & format",
          "pytest cov ≥ 90 %",
          "SSH deploy + healthcheck 30 tentatives",
        ],
      },
    ],
    features: [
      {
        title: "5 clusters politiques français",
        description:
          "Population tirée sur gaussiennes centrées autour des cinq pôles du paysage français. Les axes démographiques — âge, éducation, classe sociale, urbain/rural — corrèlent avec les axes idéologiques, pas à l'aveugle.",
      },
      {
        title: "Moteur heuristique 22 topics",
        description:
          "Immigration, nucléaire, retraites, pouvoir d'achat, Europe, laïcité… Chaque topic est un couple (regex, poids par axe). Une question transversale matche plusieurs topics, les poids se moyennent automatiquement.",
      },
      {
        title: "100 % reproductible",
        description:
          "Même seed, mêmes agents, mêmes réponses. Chaque paire agent × question a son propre RNG dérivé d'un hash MD5 — indispensable pour comparer deux scénarios ou calibrer les poids sans bruit parasite.",
      },
      {
        title: "Calcul sur Raspberry Pi",
        description:
          "Le moteur tourne sur un Pi physique, au bureau d'étude. Connexion WebSocket sortante vers le backend, aucun port exposé, aucune IP publique requise. Reconnexion automatique avec backoff 1 s → 60 s.",
      },
      {
        title: "Calibration contre sondages IFOP",
        description:
          "10 cas de référence tirés de sondages IFOP. Chaque modification de poids est évaluée contre ces distributions avant merge — le moteur ne dérive pas en silence.",
      },
      {
        title: "Trois formats de questions",
        description:
          "Stance (pour/contre/mitigé), likert (échelle numérique), QCM (choix multiples). Les trois cohabitent dans un même questionnaire, agrégation automatique par type.",
      },
    ],
    highlights: [
      "Architecture hexagonale — endpoints, services, repositories, infrastructure. Les tests injectent FakePiClient et FakeRepository, zéro accès réseau.",
      "WebSocket sortant initié par le Pi — aucun port ouvert derrière le NAT domestique, aucun DynDNS à maintenir.",
      "Corrélation backend ↔ Pi par task_id UUID. PiWsManager expose un call_sync aux endpoints HTTP synchrones.",
      "Moins de 200 ms pour 100 agents × 5 questions. Zéro LLM, zéro appel externe en prod.",
      "Deux environnements mappés sur des GitHub environments distincts — dev bascule sur staging, main sur prod.",
      "Déploiement SSH avec healthcheck actif (30 tentatives, 2 s d'intervalle) — aucune validation avant que l'API réponde.",
    ],
    architecture:
      "Deux dépôts, trois étages physiquement séparés. Le backend FastAPI vit containerisé sur un VPS Azure, derrière un Nginx qui termine le TLS et proxifie HTTP comme WebSocket (timeout 3600 s). L'API parle à Supabase — 11 tables métier, relations tracées avec CASCADE et RESTRICT réfléchis — et délègue tout le calcul de simulation à un Raspberry Pi branché au bureau d'étude. Le Pi ouvre lui-même la connexion WebSocket, pas l'inverse ; chaque appel est corrélé par un task_id UUID géré par PiWsManager. Redis porte les sessions et la canalisation realtime. Côté livraison, deux workflows GitHub Actions : le CI lint (ruff), teste (pytest, cov ≥ 90 %), build l'image Docker et push sur GHCR ; le CD, déclenché au succès du CI, SCP le compose, SSH pour pull/up --force-recreate, boucle un healthcheck 30 fois, prune les images, recharge Nginx. Dev bascule sur staging, main sur prod.",
    challenges: [
      {
        title: "Encoder une opinion dans un scalaire",
        description:
          "Le vrai travail de fond. Trouver les bons poids par axe pour chaque topic, pour que la distribution colle à celle d'un vrai sondage. Beaucoup d'allers-retours sur la polarité (réduire / renforcer / négation) et les modificateurs démographiques — calibrés contre 10 sondages IFOP de référence.",
      },
      {
        title: "Tunneler le Pi sans l'exposer",
        description:
          "Le Pi vit derrière un NAT domestique. Contrainte : zéro port entrant, zéro IP publique, zéro DynDNS. Réponse : un WebSocket sortant permanent initié par le Pi, avec reconnexion automatique (backoff 1 s → 60 s) et corrélation des appels par task_id UUID côté backend.",
      },
      {
        title: "CI/CD zéro-intervention",
        description:
          "Rendre le déploiement impossible à casser à la main. Pipeline : lint → tests → build Docker → push GHCR → SCP compose → SSH pull/up --force-recreate → healthcheck 30 tentatives → prune → nginx reload. Dev bascule sur staging, main sur prod, via GitHub environments distincts — aucun SSH manuel requis.",
      },
    ],
    links: {
      github: "",
      demo: "",
    },
    cover: {
      src: "/projects/crowdmind/pi.jpg",
      alt: "CrowdMind — Raspberry Pi exécutant le moteur heuristique",
      ratio: "16/9",
      frame: "none",
    },
    gallery: [],
  },
];
