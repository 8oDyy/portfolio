"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAIL = "hugoboulicaut@gmail.com";

const socials = [
  { label: "GitHub", url: "https://github.com/8oDyy" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/boulicautraffort-hugo/" },
  { label: "Email", url: `mailto:${EMAIL}` },
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState({ name: "", email: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        "service_fv7r9tk",
        "template_i5y4s5k",
        { from_name: data.name, from_email: data.email, message: data.message },
        "gxO199Q3iQXQ1dZfg",
      );
      setStatus("success");
      setData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative bg-bone text-ink">
      <div className="px-6 md:px-10 pt-24 md:pt-36 rule-t">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">04 / Contact</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="display text-[clamp(3.5rem,11vw,11rem)] leading-[0.88]">
              Travaillons
              <br />
              <span className="display-italic">ensemble.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted">
              Je suis en recherche d&apos;alternance à partir de maintenant et
              ouvert aux opportunités en développement. Écris-moi : je réponds
              toujours.
            </p>
          </div>
        </div>

        {/* Email mega-link */}
        <div className="my-20 md:my-32">
          <a
            href={`mailto:${EMAIL}`}
            className="block group"
            aria-label="Envoyer un email"
          >
            <span className="eyebrow block mb-4">Par email direct</span>
            <span className="display block text-[clamp(2rem,7vw,7rem)] leading-[0.9] break-words">
              <span className="marker">{EMAIL}</span>
              <span className="inline-block ml-4 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                ↗
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Form + socials */}
      <div className="px-6 md:px-10 py-20 md:py-28 rule-t">
        <div className="grid grid-cols-12 gap-10 md:gap-16">
          <div className="col-span-12 md:col-span-7">
            <span className="eyebrow block mb-6">Ou envoyez un mot ici</span>

            <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-10">
              <EditorialField
                label="Votre nom"
                id="name"
                value={data.name}
                onChange={(v) => setData({ ...data, name: v })}
                required
              />
              <EditorialField
                label="Votre email"
                id="email"
                type="email"
                value={data.email}
                onChange={(v) => setData({ ...data, email: v })}
                required
              />
              <EditorialField
                label="Votre message"
                id="message"
                textarea
                value={data.message}
                onChange={(v) => setData({ ...data, message: v })}
                required
              />

              <div className="flex items-center justify-between gap-6 mt-2">
                <SubmitHint status={status} />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mono inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.22em] bg-ink text-bone hover:bg-pollen hover:text-ink disabled:opacity-50 transition-colors"
                >
                  {status === "sending" ? "Envoi…" : status === "success" ? "Envoyé ✓" : status === "error" ? "Erreur — réessayer" : "Envoyer"}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          </div>

          <aside className="col-span-12 md:col-span-5 md:border-l md:border-[var(--line)] md:pl-10">
            <span className="eyebrow block mb-6">Ailleurs</span>
            <ul className="flex flex-col">
              {socials.map((s) => (
                <li key={s.label} className="rule-t">
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between py-5"
                  >
                    <span className="display text-3xl md:text-4xl leading-none">
                      <span className="marker">{s.label}</span>
                    </span>
                    <span className="mono text-xs uppercase tracking-[0.22em] text-subtle group-hover:text-ink transition-colors">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 rule-t pt-5">
              <span className="eyebrow block mb-3">Basé à</span>
              <p className="display-italic text-3xl leading-tight">Annecy — France</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function EditorialField({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  textarea,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 border-b border-[var(--line-strong)] pb-2 focus-within:border-ink">
      <span className="eyebrow flex items-center justify-between">
        {label}
        {required && <span className="text-subtle">— requis</span>}
      </span>
      {textarea ? (
        <textarea
          id={id}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="bg-transparent text-lg md:text-xl leading-relaxed text-ink outline-none resize-none placeholder:text-subtle"
          placeholder="Dis-m&apos;en plus…"
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-lg md:text-xl leading-relaxed text-ink outline-none placeholder:text-subtle"
          placeholder={type === "email" ? "nom@domaine.com" : "Hugo Boulicaut-Raffort"}
        />
      )}
    </label>
  );
}

function SubmitHint({ status }: { status: Status }) {
  const msg =
    status === "success"
      ? "Message reçu. Je réponds sous 48h."
      : status === "error"
        ? "Erreur à l'envoi. Essaye l'email direct."
        : status === "sending"
          ? "Envoi en cours…"
          : "Chiffré via EmailJS.";
  return <span className="mono text-xs uppercase tracking-[0.22em] text-subtle">{msg}</span>;
}
