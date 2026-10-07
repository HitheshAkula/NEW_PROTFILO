"use client";

import { PROFILE, EDUCATION } from '@/lib/data';
import { useEffect, useMemo, useRef, useState } from 'react';

export function AboutSection() {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const tilt = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      const state = tilt.current;
      state.x += (state.targetX - state.x) * 0.08;
      state.y += (state.targetY - state.y) * 0.08;
      if (cardRef.current) {
        cardRef.current.style.setProperty('--tilt-x', `${state.x}deg`);
        cardRef.current.style.setProperty('--tilt-y', `${state.y}deg`);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const aboutLine = PROFILE.resumeSummary || 'Problem-Solving, Team Player, Project Management, Adaptability, Leadership, Quick Learner';
  const secondLine = EDUCATION[0]?.highlight || 'Computer Science and Engineering; CGPA: 7.03';

  const facts = useMemo(
    () => [
      { label: 'Location', value: PROFILE.location },
      { label: 'Education', value: 'B.Tech CSE' },
      { label: 'Email', value: PROFILE.email },
    ],
    [],
  );

  return (
    <section id="about" className="section-pad">
      <div className="section-shell grid gap-10 lg:grid-cols-[1fr_320px_1fr] lg:items-stretch">
        <div className="rv flex flex-col justify-between gap-8" style={{ ['--i' as never]: 0 }}>
          <div>
            <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">02 — About</div>
            <h2 className="max-w-xl text-[clamp(2.4rem,5vw,5rem)] font-black tracking-[-0.045em] leading-none">
              Hi, I&apos;m <span className="serif-italic">Hithesh</span>.
            </h2>
          </div>

          <div className="max-w-xl space-y-4 text-[1.05rem] leading-[1.7] text-[var(--ink-2)]">
            <p>{aboutLine}</p>
            <p>{secondLine}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={PROFILE.resumePath} download className="pill-button pill-solid">Résumé</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="pill-button pill-outline">GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="pill-button pill-outline">LinkedIn</a>
          </div>
        </div>

        <div className="rv flex items-center justify-center" style={{ ['--i' as never]: 1 }}>
          <button
            ref={cardRef}
            type="button"
            onClick={() => setFlipped((value) => !value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setFlipped((value) => !value);
              }
            }}
            onPointerMove={(event) => {
              const target = event.currentTarget.getBoundingClientRect();
              tilt.current.targetX = ((event.clientY - target.top) / target.height - 0.5) * -8;
              tilt.current.targetY = ((event.clientX - target.left) / target.width - 0.5) * 8;
            }}
            onPointerLeave={() => {
              tilt.current.targetX = 0;
              tilt.current.targetY = 0;
            }}
            aria-pressed={flipped}
            className="group relative h-[404px] w-full max-w-[300px] rounded-[28px] outline-none [animation:id-sway_12s_ease-in-out_infinite] [perspective:1200px]"
          >
            <div
              className={`relative h-full w-full rounded-[28px] transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
              style={{ transform: `rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))` }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-[var(--card)] shadow-[0_30px_80px_rgba(13,13,13,0.08)] [backface-visibility:hidden]">
                <div className="absolute inset-x-0 top-0 h-11 bg-[var(--ink)] text-center text-[10px] font-bold tracking-[0.35em] text-white">
                  <span className="relative top-[13px] inline-block">DEVELOPER ID</span>
                </div>
                <div className="absolute left-1/2 top-14 -translate-x-1/2 rounded-[22px] border border-[var(--soft)] bg-[linear-gradient(180deg,#f9f9f9,white)] p-3 shadow-[inset_0_0_0_1px_rgba(13,13,13,0.06),0_15px_40px_rgba(13,13,13,0.08)]">
                  <div className="h-[156px] w-[128px] overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_50%_30%,rgba(13,13,13,0.08),transparent_55%),linear-gradient(180deg,#f1f1f1,white)]">
                    <img src="/portrait-bust.webp" alt="Portrait of Hithesh Akula" className="h-full w-full object-cover object-center" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 pt-[260px] text-center">
                  <div className="text-[1.25rem] font-black tracking-[-0.04em]">{PROFILE.name}</div>
                  <div className="mt-1 text-[0.95rem] font-semibold text-[var(--mute)]">{PROFILE.role}</div>
                  <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-left text-[0.8rem] text-[var(--ink-2)]">
                    <div>
                      <div className="mono text-[9px] uppercase tracking-[0.28em] text-[var(--mute)]">ID No.</div>
                      <div>HA-2026-01</div>
                    </div>
                    <div>
                      <div className="mono text-[9px] uppercase tracking-[0.28em] text-[var(--mute)]">Dept.</div>
                      <div>Computer Science</div>
                    </div>
                    <div>
                      <div className="mono text-[9px] uppercase tracking-[0.28em] text-[var(--mute)]">Valid till</div>
                      <div>2025</div>
                    </div>
                    <div>
                      <div className="mono text-[9px] uppercase tracking-[0.28em] text-[var(--mute)]">Status</div>
                      <div>Active student</div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-end gap-3">
                    <div className="h-12 flex-1 rounded bg-[repeating-linear-gradient(90deg,#111,#111_2px,transparent_2px,transparent_5px)] opacity-70" />
                    <div className="h-12 w-12 rounded-full border border-[var(--line)] bg-[radial-gradient(circle at 40% 35%,rgba(255,255,255,0.95),rgba(13,13,13,0.08))]" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-[var(--card)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="flex h-full flex-col justify-between p-6">
                  <div>
                    <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">What I am</div>
                    <div className="space-y-3 text-[0.98rem] leading-[1.6] text-[var(--ink-2)]">
                      <p>{PROFILE.role} with a focus on building responsive interfaces.</p>
                      <p>{EDUCATION[0]?.highlight || 'Computer Science and Engineering; CGPA: 7.03'}</p>
                      <p>Problem-Solving, Team Player, Project Management, Adaptability, Leadership, Quick Learner.</p>
                      <p>Forensic Analyzer Tool, Educational Portal, and Real-estate Management System.</p>
                      <p>HackerRank Python (Basic) Certification and HackerRank SQL (Basic) Certification.</p>
                    </div>
                  </div>
                  <div className="border-t border-dashed border-[var(--line)] pt-5 text-[0.95rem] text-[var(--ink-2)]">
                    <div>Hithesh Akula</div>
                    <div className="mt-2 text-[var(--mute)]">If found, say hello · {PROFILE.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="rv flex flex-col justify-between gap-8" style={{ ['--i' as never]: 2 }}>
          <div>
            <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">Quick facts</div>
            <dl className="space-y-4 text-[0.98rem]">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-3 last:border-0">
                  <dt className="text-[var(--mute)]">{fact.label}</dt>
                  <dd className="text-right font-semibold text-[var(--ink)]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="max-w-sm text-[1.1rem] leading-[1.7] text-[var(--ink-2)]">
            A quick learner with problem-solving, team, and leadership strengths — the résumé&apos;s own language, kept close and calm.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes id-sway {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(3px) rotate(0.6deg); }
        }
      `}</style>
    </section>
  );
}