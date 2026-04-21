"use client";

import type { Project, ProjectGalleryItem, ProjectImage as ProjectImageType, ProjectStrip } from "@/data/projects";
import ProjectImage from "./ProjectImage";

type Props = {
  project: Project;
  /** true for the first project — no top rule, closer to the section header. */
  first?: boolean;
};

export default function ProjectArticle({ project, first }: Props) {
  return (
    <article
      id={`project-${project.slug}`}
      className={`${first ? "pt-16 md:pt-24" : "pt-32 md:pt-48"} pb-24 md:pb-36 ${
        first ? "" : "rule-t"
      }`}
    >
      <div className="px-6 md:px-10">
        {/* Header */}
        <header className="grid grid-cols-12 gap-6 md:gap-10 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
            <span className="eyebrow">
              N° {project.number} / {project.year} / {project.category}
            </span>
            <StatusPill status={project.status} />
          </div>
          <h2 data-invert-zone className="col-span-12 md:col-span-12 display text-[clamp(3.5rem,11vw,11rem)] leading-[0.88]">
            {project.title}
          </h2>
          <p className="col-span-12 md:col-span-8 md:col-start-5 text-xl md:text-2xl leading-snug">
            <span className="display-italic text-ink/90">{project.tagline}</span>
          </p>
        </header>

        {/* Main body — sticky cover + scrolling narrative */}
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {/* Cover (sticky on desktop) */}
          <div className="col-span-12 md:col-span-5">
            <div className="md:sticky md:top-24">
              <div
                className="mx-auto md:max-w-[var(--cover-cap,none)]"
                style={{ "--cover-cap": computeCoverCap(project.cover.ratio) } as React.CSSProperties}
              >
                <ProjectImage image={project.cover} priority={first} />
              </div>
              <MetaBlock project={project} />
            </div>
          </div>

          {/* Narrative */}
          <div className="col-span-12 md:col-span-7 space-y-14">
            <Section eyebrow="Contexte" title="En deux lignes">
              <p className="text-lg md:text-xl leading-relaxed text-ink/90">{project.summary}</p>
            </Section>

            <Section eyebrow="Problème" title="Ce qu'il fallait résoudre">
              <p className="text-base md:text-lg leading-relaxed text-ink/80">{project.problem}</p>
            </Section>

            <Section eyebrow="Réponse" title="L'approche retenue">
              <p className="text-base md:text-lg leading-relaxed text-ink/80">{project.solution}</p>
            </Section>

            {project.features.length > 0 && (
              <Section eyebrow="Fonctionnalités" title="Ce que le projet fait">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  {project.features.map((f, i) => (
                    <li key={f.title} className="flex flex-col gap-2">
                      <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <h4 className="display text-2xl leading-tight">{f.title}</h4>
                      <p className="text-sm leading-relaxed text-muted">{f.description}</p>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {project.architecture && (
              <Section eyebrow="Architecture" title="Comment c'est construit">
                <p className="text-base md:text-lg leading-relaxed text-ink/80">{project.architecture}</p>
              </Section>
            )}

            {project.highlights.length > 0 && (
              <Section eyebrow="Points clés" title="À retenir">
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-4 items-baseline rule-t pt-3">
                      <span className="eyebrow tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-base leading-relaxed text-ink/90">{h}</p>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <Section eyebrow="Obstacles" title="Ce qui a demandé des choix">
                <ul className="grid grid-cols-1 gap-8">
                  {project.challenges.map((c) => (
                    <li key={c.title} className="flex flex-col gap-2">
                      <h4 className="display text-2xl leading-tight">{c.title}</h4>
                      <p className="text-sm leading-relaxed text-muted">{c.description}</p>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {project.metrics && project.metrics.length > 0 && (
              <Section eyebrow="Chiffres" title="Impact">
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1 rule-t pt-3">
                      <dt className="eyebrow">{m.label}</dt>
                      <dd className="display text-4xl leading-none">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
            )}

            <StackBlock project={project} />

            <LinksBlock project={project} />
          </div>
        </div>

        {/* Full-width gallery below */}
        {project.gallery.length > 0 && (
          <div className="mt-24 md:mt-32">
            <div className="mb-8 flex items-baseline gap-4 rule-t pt-4">
              <span className="eyebrow">Galerie</span>
              <span className="eyebrow text-subtle">— {countGalleryVisuals(project.gallery)} visuels</span>
            </div>
            <div className="flex flex-col gap-10 md:gap-16">
              {groupGallery(project.gallery).map((g, i) =>
                g.kind === "strip" ? (
                  <GalleryStrip key={i} strip={g.strip} />
                ) : g.items.length === 1 ? (
                  <div key={i} className="md:mx-auto md:max-w-sm">
                    <ProjectImage image={g.items[0]} />
                  </div>
                ) : (
                  <SinglesGroup key={i} items={g.items} />
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-baseline gap-4">
        <span className="eyebrow">{eyebrow}</span>
        <span className="flex-1 h-px bg-[var(--line)]" />
      </header>
      <h3 className="display text-3xl md:text-4xl leading-tight">{title}</h3>
      {children}
    </section>
  );
}

function MetaBlock({ project }: { project: Project }) {
  const rows: [string, string][] = [
    ["Rôle", project.role],
    ["Durée", project.duration],
    ["Année", String(project.year)],
    ["Statut", project.status],
  ];
  if (project.teamSize) rows.push(["Équipe", project.teamSize]);
  return (
    <dl className="mt-6 divide-y divide-[var(--line)] border-t border-[var(--line)]">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between py-2.5">
          <dt className="eyebrow">{k}</dt>
          <dd className="mono text-xs text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function StackBlock({ project }: { project: Project }) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-baseline gap-4">
        <span className="eyebrow">Stack</span>
        <span className="flex-1 h-px bg-[var(--line)]" />
      </header>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {project.stack.map((g) => (
          <div key={g.category} className="flex flex-col gap-2">
            <dt className="eyebrow">{g.category}</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1">
              {g.items.map((it) => (
                <span key={it} className="text-base text-ink">
                  {it}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function LinksBlock({ project }: { project: Project }) {
  const { github, demo, case: caseUrl } = project.links;
  if (!github && !demo && !caseUrl) return null;
  return (
    <section className="flex flex-col gap-3 rule-t pt-6">
      <span className="eyebrow">Liens</span>
      <div className="flex flex-wrap gap-3">
        {demo && <LinkPill href={demo} label="Voir la demo" primary />}
        {github && <LinkPill href={github} label="Voir le code" />}
        {caseUrl && <LinkPill href={caseUrl} label="Étude de cas" />}
      </div>
    </section>
  );
}

function LinkPill({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mono inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.18em] transition ${
        primary
          ? "bg-ink text-bone hover:bg-pollen hover:text-ink"
          : "border border-[var(--line-strong)] text-ink hover:bg-ink hover:text-bone"
      }`}
    >
      <span>{label}</span>
      <span aria-hidden>↗</span>
    </a>
  );
}

type GalleryGroup =
  | { kind: "singles"; items: ProjectImageType[] }
  | { kind: "strip"; strip: ProjectStrip };

function groupGallery(items: ProjectGalleryItem[]): GalleryGroup[] {
  const groups: GalleryGroup[] = [];
  let buf: ProjectImageType[] = [];
  for (const item of items) {
    if ("kind" in item && item.kind === "strip") {
      if (buf.length) groups.push({ kind: "singles", items: buf });
      groups.push({ kind: "strip", strip: item });
      buf = [];
    } else {
      buf.push(item as ProjectImageType);
    }
  }
  if (buf.length) groups.push({ kind: "singles", items: buf });
  return groups;
}

function countGalleryVisuals(items: ProjectGalleryItem[]): number {
  return items.reduce(
    (n, it) => n + ("kind" in it && it.kind === "strip" ? it.images.length : 1),
    0,
  );
}

function GalleryStrip({ strip }: { strip: ProjectStrip }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="-mx-6 overflow-x-auto md:mx-0 md:overflow-visible">
        <div className="flex gap-4 px-6 md:gap-6 md:px-0">
          {strip.images.map((img, i) => (
            <div
              key={i}
              className="w-[42vw] shrink-0 md:w-auto md:flex-1 md:shrink"
            >
              <ProjectImage image={img} />
            </div>
          ))}
        </div>
      </div>
      {strip.caption && (
        <figcaption className="eyebrow flex items-baseline gap-3">
          <span className="inline-block h-px w-6 bg-ink" />
          {strip.caption}
        </figcaption>
      )}
    </figure>
  );
}

function isLandscape(ratio?: string): boolean {
  if (!ratio) return false;
  const [w, h] = ratio.split("/").map(Number);
  if (!w || !h) return false;
  return w > h;
}

type Row =
  | { kind: "full"; item: ProjectImageType }
  | { kind: "pair"; items: [ProjectImageType, ProjectImageType] };

function buildRows(items: ProjectImageType[]): Row[] {
  const rows: Row[] = [];
  let buf: ProjectImageType[] = [];
  items.forEach((img, j) => {
    const promoted = j % 3 === 0 && isLandscape(img.ratio);
    if (promoted) {
      if (buf.length === 1) {
        rows.push({ kind: "full", item: buf[0] });
        buf = [];
      }
      rows.push({ kind: "full", item: img });
    } else {
      buf.push(img);
      if (buf.length === 2) {
        rows.push({ kind: "pair", items: [buf[0], buf[1]] });
        buf = [];
      }
    }
  });
  if (buf.length === 1) {
    rows.push({ kind: "full", item: buf[0] });
  }
  return rows;
}

function SinglesGroup({ items }: { items: ProjectImageType[] }) {
  const rows = buildRows(items);
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {rows.map((row, k) => {
        if (row.kind === "full") {
          return <ProjectImage key={k} image={row.item} />;
        }
        const [a, b] = row.items;
        const aPortrait = !isLandscape(a.ratio);
        const bPortrait = !isLandscape(b.ratio);
        if (aPortrait !== bPortrait) {
          const landscape = aPortrait ? b : a;
          const portrait = aPortrait ? a : b;
          const landscapeFirst = !aPortrait;
          const chromePx = landscape.frame === "browser" ? 36 : 0;
          const gapPx = 40;
          const widths = computePairWidths(
            landscape.ratio,
            portrait.ratio,
            chromePx,
            gapPx,
          );
          const landscapeEl = (
            <div
              key="l"
              className="w-full md:w-[var(--l-w,auto)] md:shrink-0"
              style={{ "--l-w": widths.landscape } as React.CSSProperties}
            >
              <ProjectImage image={landscape} />
            </div>
          );
          const portraitEl = (
            <div
              key="p"
              className="mx-auto w-full max-w-[280px] md:mx-0 md:w-[var(--p-w,auto)] md:max-w-none md:shrink-0"
              style={{ "--p-w": widths.portrait } as React.CSSProperties}
            >
              <ProjectImage image={portrait} />
            </div>
          );
          return (
            <div
              key={k}
              className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10"
            >
              {landscapeFirst ? [landscapeEl, portraitEl] : [portraitEl, landscapeEl]}
            </div>
          );
        }
        return (
          <div
            key={k}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10"
          >
            <ProjectImage image={a} />
            <ProjectImage image={b} />
          </div>
        );
      })}
    </div>
  );
}

function computePairWidths(
  landscapeRatio?: string,
  portraitRatio?: string,
  chromePx = 0,
  gapPx = 0,
): { landscape: string; portrait: string } {
  const [lw, lh] = (landscapeRatio ?? "1/1").split("/").map(Number);
  const [pw, ph] = (portraitRatio ?? "1/1").split("/").map(Number);
  if (!lw || !lh || !pw || !ph) {
    return { landscape: "50%", portrait: "50%" };
  }
  const lRatio = lh / lw;
  const pRatio = ph / pw;
  const alpha = pRatio / (lRatio + pRatio);
  const beta = chromePx / (lRatio + pRatio);
  const landscape = `calc((100% - ${gapPx}px) * ${alpha.toFixed(4)} - ${beta.toFixed(2)}px)`;
  const portrait = `calc((100% - ${gapPx}px) * ${(1 - alpha).toFixed(4)} + ${beta.toFixed(2)}px)`;
  return { landscape, portrait };
}

function computeCoverCap(ratio?: string): string {
  if (!ratio) return "none";
  const [w, h] = ratio.split("/").map(Number);
  if (!w || !h || h / w <= 1.3) return "none";
  const coeff = (w / h).toFixed(4);
  return `calc((100vh - 8rem) * ${coeff})`;
}

function StatusPill({ status }: { status: Project["status"] }) {
  const map: Record<Project["status"], string> = {
    Live: "bg-pollen text-ink",
    "En cours": "bg-ink text-bone",
    Concept: "border border-[var(--line-strong)] text-muted",
    Archivé: "border border-[var(--line-strong)] text-muted",
  };
  return (
    <span className={`mono inline-flex self-start items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${map[status]}`}>
      <span className={`inline-block h-1.5 w-1.5 ${status === "Live" ? "bg-ink" : "bg-current"}`} />
      {status}
    </span>
  );
}
