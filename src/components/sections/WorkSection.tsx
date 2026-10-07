"use client";

import { PROJECTS } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';
import { useState } from 'react';

const TECH_LOGO_MAP: Record<string, { kind: 'brand' | 'concept'; logoKey: string }> = {
  Python: { kind: 'brand', logoKey: 'python' },
  C: { kind: 'brand', logoKey: 'c' },
  HTML: { kind: 'brand', logoKey: 'html5' },
  CSS: { kind: 'brand', logoKey: 'css3' },
  JavaScript: { kind: 'brand', logoKey: 'javascript' },
  React: { kind: 'brand', logoKey: 'react' },
  'Node.js': { kind: 'brand', logoKey: 'nodedotjs' },
  'ML Predictive Analysis': { kind: 'concept', logoKey: 'ml' },
};

export function WorkSection() {
  const [active, setActive] = useState(PROJECTS[0].id);

  return (
    <section id="work" className="section-pad">
      <div className="section-shell">
        <div className="rv mb-8" style={{ ['--i' as never]: 0 }}>
          <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">04 — Work</div>
          <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-black tracking-[-0.045em] leading-none">
            Things I&apos;ve built <span className="serif-italic">quietly</span>.
          </h2>
        </div>

        <div className="flex min-h-[min(78svh,600px)] flex-col gap-3 lg:flex-row">
          {PROJECTS.map((project, index) => {
            const open = active === project.id;
            return (
              <article
                key={project.id}
                className={`card-shell group relative overflow-hidden transition-[flex,transform] duration-500 ${open ? 'flex-[8]' : 'flex-[1]'} ${index === 0 ? '' : 'lg:min-w-[88px]'}`}
                onMouseEnter={() => setActive(project.id)}
                onFocusCapture={() => setActive(project.id)}
                onTouchStart={() => setActive(project.id)}
              >
                <button
                  type="button"
                  className={`absolute inset-0 lg:hidden ${open ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'}`}
                  onClick={() => setActive(project.id)}
                  aria-label={`Open ${project.title}`}
                />

                <div className={`h-full ${open ? 'grid lg:grid-cols-[1.15fr_0.85fr]' : 'flex h-full items-end justify-center'}`}>
                  <div className={`p-5 ${open ? 'flex flex-col justify-between gap-8 lg:p-8' : 'hidden lg:flex lg:h-full lg:w-full lg:flex-col lg:items-center lg:justify-between lg:p-4'}`}>
                    {open ? (
                      <>
                        <div>
                          <div className="mono text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">{project.index} — {project.kicker}</div>
                          <h3 className="mt-4 max-w-xl text-[clamp(2rem,4vw,4.2rem)] font-black tracking-[-0.05em] leading-[0.95]">{project.title}</h3>
                          <p className="mt-5 max-w-xl text-[1rem] leading-[1.7] text-[var(--ink-2)]">{project.description}</p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                          <ul className="space-y-3 text-[0.98rem] leading-[1.6] text-[var(--ink-2)]">
                            {project.features.slice(0, 2).map((feature) => (
                              <li key={feature} className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[var(--ink)]" />{feature}</li>
                            ))}
                          </ul>
                          <ul className="space-y-3 text-[0.98rem] leading-[1.6] text-[var(--ink-2)]">
                            {project.features.slice(2).map((feature) => (
                              <li key={feature} className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[var(--ink)]" />{feature}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {project.tech.map((tech) => (
                            <span key={tech} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold">
                              <TechLogo name={tech} kind={TECH_LOGO_MAP[tech]?.kind ?? 'concept'} logoKey={TECH_LOGO_MAP[tech]?.logoKey ?? 'data'} size={18} />
                              {tech}
                            </span>
                          ))}
                          {project.github ? (
                            <a href={project.github} target="_blank" rel="noreferrer" className="pill-button pill-outline ml-auto">View on GitHub ↗</a>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mono text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">{project.index}</div>
                        <div className="rotate-180 text-[clamp(1.4rem,2vw,2.3rem)] font-black tracking-[-0.05em]" style={{ writingMode: 'vertical-rl' }}>
                          {project.title}
                        </div>
                        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-xl font-bold transition-transform group-hover:rotate-45">+</button>
                      </>
                    )}
                  </div>

                  {open ? (
                    <div className="border-t border-[var(--line)] bg-[linear-gradient(180deg,#fbfbfb,white)] p-4 lg:border-l lg:border-t-0 lg:p-6">
                      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--mute)]">Illustrative UI</div>
                      <IllustrativeUI projectId={project.id} />
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IllustrativeUI({ projectId }: { projectId: string }) {
  if (projectId === 'forensic-analyzer') {
    return (
      <div className="grid h-full min-h-[260px] gap-3 rounded-[24px] border border-[var(--line)] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(13,13,13,0.04)]">
        <div className="rounded-[18px] bg-[linear-gradient(180deg,#f8f8f8,white)] p-4">
          <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--mute)]"><span>Timeline</span><span>Evidence</span></div>
          <div className="space-y-2">
            <div className="h-2 w-3/4 rounded-full bg-[var(--soft)]" />
            <div className="h-2 w-1/2 rounded-full bg-[var(--soft)]" />
            <div className="h-2 w-full rounded-full bg-[var(--soft)]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="h-24 rounded-[18px] bg-[repeating-linear-gradient(135deg,#f1f1f1,#f1f1f1_8px,#fff_8px,#fff_16px)]" />
          <div className="h-24 rounded-[18px] border border-[var(--line)] bg-white p-3"><div className="h-2 w-full rounded-full bg-[var(--soft)]" /><div className="mt-3 h-12 rounded-[14px] bg-[var(--soft)]" /></div>
          <div className="h-24 rounded-[18px] bg-[linear-gradient(180deg,#fbfbfb,white)]" />
        </div>
      </div>
    );
  }

  if (projectId === 'edu-portal') {
    return (
      <div className="grid min-h-[260px] gap-3 rounded-[24px] border border-[var(--line)] bg-white p-4">
        <div className="rounded-[18px] border border-[var(--line)] p-4">
          <div className="flex items-center justify-between"><div className="h-8 w-28 rounded-full bg-[var(--soft)]" /><div className="h-8 w-8 rounded-full bg-[var(--soft)]" /></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="h-20 rounded-[16px] bg-[linear-gradient(180deg,#f8f8f8,white)]" />
            <div className="h-20 rounded-[16px] bg-[linear-gradient(180deg,#f8f8f8,white)]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="h-20 rounded-[16px] bg-[var(--soft)]" />
          <div className="h-20 rounded-[16px] bg-[linear-gradient(180deg,#f5f5f5,white)]" />
          <div className="h-20 rounded-[16px] bg-[var(--soft)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[260px] gap-3 rounded-[24px] border border-[var(--line)] bg-white p-4">
      <div className="rounded-[18px] border border-[var(--line)] p-4">
        <div className="flex items-center justify-between"><div className="h-3 w-20 rounded-full bg-[var(--soft)]" /><div className="h-3 w-12 rounded-full bg-[var(--soft)]" /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
          <div className="h-28 rounded-[18px] bg-[linear-gradient(180deg,#f7f7f7,white)]" />
          <div className="grid gap-3">
            <div className="h-12 rounded-[14px] bg-[var(--soft)]" />
            <div className="h-12 rounded-[14px] bg-[linear-gradient(180deg,#f4f4f4,white)]" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-20 rounded-[16px] bg-[var(--soft)]" />
        <div className="h-20 rounded-[16px] bg-[linear-gradient(180deg,#f5f5f5,white)]" />
        <div className="h-20 rounded-[16px] bg-[var(--soft)]" />
      </div>
    </div>
  );
}