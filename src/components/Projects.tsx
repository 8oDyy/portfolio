"use client";

import { projects } from "@/data/projects";
import ProjectArticle from "./projects/ProjectArticle";

export default function Projects() {
  return (
    <section id="projects" className="relative bg-bone text-ink">
      <header className="px-6 md:px-10 pt-24 md:pt-36">
        <div className="grid grid-cols-12 gap-6 md:gap-10 rule-b pb-8 md:pb-12">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">02 / Projets</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="display text-[clamp(3rem,9vw,9rem)] leading-[0.88]">
              Ce que je{" "}
              <span className="marker">
                <span className="display-italic">construis</span>
              </span>
              .
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted">
              Trois projets. Ce qu&apos;ils sont, ce qu&apos;ils résolvent,
              ce qui a demandé de choisir.
            </p>
          </div>
        </div>
      </header>

      {projects.map((p, i) => (
        <ProjectArticle key={p.slug} project={p} first={i === 0} />
      ))}
    </section>
  );
}
