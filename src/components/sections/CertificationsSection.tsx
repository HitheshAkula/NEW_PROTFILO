"use client";

import { CERTIFICATIONS } from '@/lib/data';
import { useState } from 'react';

export function CertificationsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section-pad hairline-top-bottom">
      <div className="section-shell grid gap-10 lg:grid-cols-[320px_1fr]">
        <div className="rv lg:sticky lg:top-28" style={{ ['--i' as never]: 0 }}>
          <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">05 — Certifications</div>
          <h2 className="text-[clamp(2.4rem,5vw,4.8rem)] font-black tracking-[-0.045em] leading-none">
            Always learning.
          </h2>
          <p className="mt-5 max-w-sm text-[1rem] leading-[1.7] text-[var(--ink-2)]">{CERTIFICATIONS.length} certifications from the résumé source.</p>
        </div>

        <div className="space-y-3">
          {CERTIFICATIONS.map((certification, index) => {
            const active = hovered === index;
            const rowClassName = "cert-row group relative block overflow-hidden rounded-[24px] border border-[var(--line)] bg-white px-5 py-5";
            return certification.href ? (
              <a
                key={certification.title}
                href={certification.href}
                onMouseEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                className={rowClassName}
              >
                <span className={`absolute inset-0 origin-left scale-x-0 bg-[var(--ink)] transition-transform duration-500 ${active ? 'scale-x-100' : ''}`} />
                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`mono text-[11px] uppercase tracking-[0.3em] ${active ? 'text-white' : 'text-[var(--mute)]'}`}>{String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <div className={`text-[1.15rem] font-bold tracking-[-0.03em] ${active ? 'text-white' : 'text-[var(--ink)]'}`}>{certification.title}</div>
                      <div className={`mt-2 text-[0.95rem] ${active ? 'text-white/80' : 'text-[var(--mute)]'}`}>{certification.issuer} · {certification.date}</div>
                    </div>
                  </div>
                  <div className={`mt-1 text-xl transition-transform duration-300 ${active ? 'translate-x-0 text-white' : '-translate-x-2 text-[var(--mute)]'}`}>↗</div>
                </div>
              </a>
            ) : (
              <div
                key={certification.title}
                onMouseEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                className={rowClassName}
                tabIndex={0}
              >
                <span className={`absolute inset-0 origin-left scale-x-0 bg-[var(--ink)] transition-transform duration-500 ${active ? 'scale-x-100' : ''}`} />
                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`mono text-[11px] uppercase tracking-[0.3em] ${active ? 'text-white' : 'text-[var(--mute)]'}`}>{String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <div className={`text-[1.15rem] font-bold tracking-[-0.03em] ${active ? 'text-white' : 'text-[var(--ink)]'}`}>{certification.title}</div>
                      <div className={`mt-2 text-[0.95rem] ${active ? 'text-white/80' : 'text-[var(--mute)]'}`}>{certification.issuer} · {certification.date}</div>
                    </div>
                  </div>
                  <div className={`mt-1 text-xl transition-transform duration-300 ${active ? 'translate-x-0 text-white' : '-translate-x-2 text-[var(--mute)]'}`}>↗</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}