"use client";

import HorizontalTimeline, { type TimelineEntry } from "./about/HorizontalTimeline";

const timeline: TimelineEntry[] = [
  {
    year: "2022",
    title: "Baccalauréat",
    place: "Louis Armand — Chambéry",
    description:
      "Fondations solides en sciences et résolution de problèmes techniques.",
  },
  {
    year: "2023",
    title: "École 42",
    place: "Lyon",
    description:
      "Formation intensive en algorithmique et développement logiciel collaboratif.",
  },
  {
    year: "2025",
    title: "Création d'Alp-Web",
    place: "Agence Web",
    description:
      "Conception d'interfaces modernes et performantes avec stacks variées — Nuxt, Next, Supabase.",
  },
  {
    year: "2026",
    title: "BTS CIEL",
    place: "Saint-Michel — Annecy",
    description:
      "Développement fullstack d'applications web innovantes et sécurisées.",
  },
];

type SkillGroup = {
  category: string;
  items: string[];
};

const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vue 3", "Nuxt 3", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    category: "Backend / Data",
    items: ["Node.js", "Express", "Supabase", "PostgreSQL", "MongoDB", "REST", "GraphQL"],
  },
  {
    category: "Mobile / Systèmes",
    items: ["Flutter", "Dart", "C / C++"],
  },
  {
    category: "Outillage / Infra",
    items: ["Git", "Docker", "Vercel", "AWS", "GitHub Actions", "Figma"],
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-bone text-ink">
      {/* Intro */}
      <div className="px-6 md:px-10 pt-24 md:pt-36 rule-b">
        <div className="grid grid-cols-12 gap-6 md:gap-10 pb-16 md:pb-24">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">01 / À propos</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="display text-[clamp(2.2rem,5.5vw,5.5rem)] leading-[1.02]">
              Je fais du <span className="marker marker-on">développement web</span>{" "}
              depuis quelques années — avec une attention particulière pour
              l&apos;<span className="display-italic">UX, les détails</span>, et la
              robustesse du code.
            </p>
            <p className="mt-10 max-w-2xl text-base md:text-lg leading-relaxed text-muted">
              J&apos;aime construire proprement. Des bases solides, des interfaces
              lisibles, du code qu&apos;on relit sans grimacer. Je livre des solutions
              adaptées aux besoins réels, pas à des specs imaginaires.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal timeline */}
      <HorizontalTimeline entries={timeline} />

      {/* Skills — editorial list */}
      <div className="px-6 md:px-10 py-24 md:py-36 rule-t">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">Compétences</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h3 className="display text-[clamp(2.5rem,6vw,6rem)] leading-[0.92]">
              Les outils que <span className="display-italic">j&apos;utilise</span>.
            </h3>
          </div>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {skills.map((g) => (
            <div key={g.category} className="col-span-12 md:col-span-6 lg:col-span-3 rule-t pt-6">
              <dt className="eyebrow mb-6">{g.category}</dt>
              <dd className="flex flex-col gap-1">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="display text-3xl md:text-4xl leading-tight cursor-default"
                  >
                    <span className="marker">{s}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
