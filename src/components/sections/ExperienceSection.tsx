"use client";

import { EDUCATION } from '@/lib/data';
import { useRef } from 'react';
import { useScrollProgress } from '@/lib/hooks';

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(sectionRef);

  return (
    <section id="experience" ref={sectionRef} className="section-pad">
      <div className="section-shell">
        <div className="rv mb-10" style={{ ['--i' as never]: 0 }}>
          <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">06 — Experience</div>
          <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-black tracking-[-0.045em] leading-none">
            Education and experience on one <span className="serif-italic">path</span>.
          </h2>
        </div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-3 top-0 h-full w-px bg-[var(--soft)] md:left-5">
            <div className="absolute left-0 top-0 h-full w-px origin-top bg-[var(--ink)]" style={{ transform: `scaleY(${progress})` }} />
          </div>

          <div className="space-y-10">
            {EDUCATION.map((item, index) => {
              const active = progress >= (index + 1) / EDUCATION.length;
              return (
                <article key={`${item.title}-${item.year}`} className="rv relative" style={{ ['--i' as never]: index }}>
                  <div className={`absolute -left-[1.9rem] top-2 h-4 w-4 rounded-full border-2 ${active ? 'border-[var(--ink)] bg-[var(--ink)]' : 'border-[var(--soft)] bg-[var(--paper)]'}`} />
                  <div className="grid gap-3 md:grid-cols-[220px_1fr] md:gap-8">
                    <div className="mono text-[11px] uppercase tracking-[0.3em] text-[var(--mute)]">{item.year}</div>
                    <div className="card-shell p-6">
                      <div className="text-[1.35rem] font-black tracking-[-0.04em]">{item.title}</div>
                      <div className="mt-2 text-[0.98rem] font-semibold text-[var(--mute)]">{item.place}</div>
                      <div className="mt-4 text-[1rem] leading-[1.7] text-[var(--ink-2)]">{item.detail}</div>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="rv ml-4 rounded-[24px] border border-dashed border-[var(--line)] bg-white p-6 md:ml-8" style={{ ['--i' as never]: EDUCATION.length + 1 }}>
              <div className="mono text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">Next</div>
              <div className="mt-3 text-[1.35rem] font-black tracking-[-0.04em]">Your team?</div>
              <p className="mt-2 text-[1rem] leading-[1.7] text-[var(--ink-2)]">The timeline is ready for the next role, internship, or collaboration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}