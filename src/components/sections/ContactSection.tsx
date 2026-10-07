"use client";

import { PROFILE } from '@/lib/data';
import { useMemo, useState } from 'react';

export function ContactSection() {
  const letters = useMemo(() => "Let's build / something together.".split(''), []);
  const [copied, setCopied] = useState(false);

  return (
    <section id="contact" className="section-pad pb-16">
      <div className="section-shell">
        <div className="rv" style={{ ['--i' as never]: 0 }}>
          <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">08 — Contact</div>
          <h2 className="max-w-5xl text-[clamp(3rem,7vw,8rem)] font-black tracking-[-0.06em] leading-[0.92]">
            {letters.map((letter, index) => (
              <span key={`${letter}-${index}`} className="inline-block transition-transform duration-200 hover:-translate-y-2 hover:animate-[bounce_500ms_ease]">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <div className="rv flex flex-wrap items-center gap-4" style={{ ['--i' as never]: 1 }}>
              <a href={PROFILE.emailHref} className="text-[clamp(1.6rem,4vw,3.4rem)] font-black tracking-[-0.05em] underline decoration-[0.08em] underline-offset-[0.18em]">
                {PROFILE.email}
              </a>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(PROFILE.email);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
                className="pill-button pill-outline"
                aria-live="polite"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            <div className="rv flex flex-wrap gap-3 text-[1rem]" style={{ ['--i' as never]: 2 }}>
              <a href={PROFILE.phoneHref} className="pill-button pill-outline">{PROFILE.phone}</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="pill-button pill-outline">GitHub</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="pill-button pill-outline">LinkedIn</a>
            </div>
          </div>

          <div className="rv flex items-center justify-start lg:justify-end" style={{ ['--i' as never]: 3 }}>
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-[var(--line)] bg-white text-center text-[0.95rem] font-black uppercase tracking-[0.28em] text-[var(--mute)] [animation:spin_14s_linear_infinite]">
              say hello
            </div>
          </div>
        </div>

        <footer className="rv mt-16 flex flex-col gap-4 border-t border-[var(--line)] pt-6 text-[0.95rem] text-[var(--mute)] md:flex-row md:items-center md:justify-between" style={{ ['--i' as never]: 4 }}>
          <div>© {new Date().getFullYear()} {PROFILE.name}</div>
          <a href="#top" className="font-semibold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4">Back to top</a>
          <div>Built with Next.js</div>
        </footer>
      </div>
    </section>
  );
}