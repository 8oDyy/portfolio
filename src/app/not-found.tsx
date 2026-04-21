import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-bone text-ink">
      {/* Top meta bar */}
      <div className="absolute inset-x-0 top-14 z-10 px-6 md:px-10 pt-10">
        <div className="flex items-baseline justify-between rule-b pb-3">
          <span className="eyebrow">N° 404 / Page introuvable</span>
          <span className="eyebrow">Portfolio — HBR</span>
        </div>
      </div>

      {/* Central composition */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-10">
        <h1 className="display text-[22vw] md:text-[18vw] leading-[0.86] tracking-tight">
          404<span className="text-pollen">.</span>
        </h1>
        <p className="display-italic text-3xl md:text-5xl mt-8 max-w-2xl leading-tight">
          Ceci n&rsquo;est pas une page.
        </p>
        <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted">
          Le lien est peut-être ancien, la page a peut-être été retirée. On reprend à l&rsquo;accueil&nbsp;?
        </p>
        <div className="mt-12">
          <Link
            href="/"
            className="mono inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.22em] bg-ink text-bone hover:bg-pollen hover:text-ink transition-colors"
          >
            Revenir à l&rsquo;accueil
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute inset-x-0 bottom-6 z-10 px-6 md:px-10">
        <div className="flex items-center justify-between rule-t pt-3">
          <span className="eyebrow">Annecy — France</span>
          <span className="eyebrow hidden md:block">© 2026 — HBR</span>
        </div>
      </div>
    </main>
  );
}
