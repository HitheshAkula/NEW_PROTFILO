"use client";

import { PROJECTS, SKILL_GROUPS, SKILLS } from '@/lib/data';
import { isBrand, TechLogo } from '@/components/ui/TechLogo';
import { useMemo, useState } from 'react';

export function SkillsSection() {
  const [activeFamily, setActiveFamily] = useState('All');
  const [hovered, setHovered] = useState(SKILLS[0]);

  const families = useMemo(() => ['All', ...SKILL_GROUPS.map((group) => group.title)], []);
  const filtered = activeFamily === 'All' ? SKILLS : SKILLS.filter((skill) => skill.family === activeFamily);

  return (
    <section id="skills" className="section-pad">
      <div className="section-shell grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <div>
          <div className="rv mb-8" style={{ ['--i' as never]: 0 }}>
            <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">03 — Skills</div>
            <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-black tracking-[-0.045em] leading-none">
              The periodic table of my <span className="serif-italic">stack</span>.
            </h2>
          </div>

          <div className="rv mb-6 flex flex-wrap gap-2" style={{ ['--i' as never]: 1 }}>
            {families.map((family) => (
              <button
                key={family}
                type="button"
                onClick={() => setActiveFamily(family)}
                className={`pill-button text-sm ${activeFamily === family ? 'pill-solid' : 'pill-outline'}`}
              >
                {family}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3 lg:grid-cols-8">
            {SKILLS.map((skill, index) => {
              const dimmed = activeFamily !== 'All' && skill.family !== activeFamily;
              return (
                <button
                  key={skill.name}
                  type="button"
                  className={`rv card-shell group flex aspect-square flex-col justify-between p-3 text-left ${dimmed ? 'opacity-25' : 'opacity-100'}`}
                  style={{ ['--i' as never]: index }}
                  onMouseEnter={() => setHovered(skill)}
                  onFocus={() => setHovered(skill)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="mono text-[10px] text-[var(--mute)]">{String(skill.atomic).padStart(2, '0')}</span>
                    <span className="mono text-[10px] text-[var(--mute)]">{skill.family}</span>
                  </div>

                  <div className="flex flex-1 items-center justify-center py-2 text-center">
                    {isBrand(skill.kind) ? (
                      <TechLogo name={skill.name} kind={skill.kind} logoKey={skill.logoKey} size={40} className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[0.85rem] font-bold text-[var(--ink-2)]">
                        {skill.symbol}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-[0.8rem] font-bold tracking-[-0.03em]">{skill.name}</div>
                    <div className="mono mt-1 text-[9px] uppercase tracking-[0.24em] text-[var(--mute)]">{skill.symbol}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rv xl:sticky xl:top-28" style={{ ['--i' as never]: 2 }}>
          <div className="card-shell p-6">
            <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">Inspector</div>
            <div className="flex items-center justify-center rounded-[24px] bg-[linear-gradient(180deg,#fbfbfb,white)] p-5">
              <TechLogo name={hovered.name} kind={hovered.kind} logoKey={hovered.logoKey} size={150} className="drop-shadow-[0_12px_24px_rgba(13,13,13,0.1)]" />
            </div>
            <div className="mt-5 space-y-3">
              <div>
                <div className="text-[1.4rem] font-black tracking-[-0.04em]">{hovered.name}</div>
                <div className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--mute)]">{hovered.family}</div>
              </div>
              <p className="text-[0.98rem] leading-[1.6] text-[var(--ink-2)]">
                Used in {hovered.projects.join(', ')}.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}