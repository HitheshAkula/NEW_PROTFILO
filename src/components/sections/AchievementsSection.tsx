"use client";

import { ACHIEVEMENTS } from '@/lib/data';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useScrollProgress } from '@/lib/hooks';

export function AchievementsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progress = useScrollProgress(sectionRef);
  const [travel, setTravel] = useState(0);
  const [counts, setCounts] = useState<number[]>(ACHIEVEMENTS.map(() => 0));

  useEffect(() => {
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      setTravel(Math.max(track.scrollWidth - window.innerWidth + 48, 0));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const translateX = useMemo(() => -progress * travel, [progress, travel]);
  const centerIndex = Math.min(ACHIEVEMENTS.length - 1, Math.round(progress * (ACHIEVEMENTS.length - 1)));

  useEffect(() => {
    const next = [...counts];
    let frame = 0;

    const animate = (timestamp: number) => {
      const start = timestamp;
      const duration = 1400;

      const step = (now: number) => {
        const elapsed = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 4);
        let changed = false;

        for (let index = 0; index <= centerIndex; index += 1) {
          const target = ACHIEVEMENTS[index].value;
          const value = Math.round(target * eased);
          if (next[index] !== value) {
            next[index] = value;
            changed = true;
          }
        }

        if (changed) setCounts([...next]);
        if (elapsed < 1) {
          frame = requestAnimationFrame(step);
        }
      };

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [centerIndex]);

  return (
    <section id="achievements" ref={sectionRef} className="relative" style={{ height: `calc(100svh + ${travel}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden py-24">
        <div className="section-shell h-full">
          <div className="rv mb-8 flex items-end justify-between" style={{ ['--i' as never]: 0 }}>
            <div>
              <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">07 — Achievements</div>
              <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-black tracking-[-0.045em] leading-none">
                Pinned wins <span className="serif-italic">and counting</span>.
              </h2>
            </div>
            <div className="mono hidden text-[11px] uppercase tracking-[0.34em] text-[var(--mute)] md:block">{Math.round(progress * 100)}%</div>
          </div>

          <div className="h-px w-full bg-[var(--soft)]">
            <div className="h-full bg-[var(--ink)]" style={{ width: `${progress * 100}%` }} />
          </div>

          <div className="mt-8 overflow-hidden">
            <div ref={trackRef} className="flex gap-4 will-change-transform" style={{ transform: `translate3d(${translateX}px, 0, 0)` }}>
              {ACHIEVEMENTS.map((achievement, index) => {
                const active = index === centerIndex;
                const counted = counts[index] || achievement.value;
                return (
                  <article key={achievement.title} className={`card-shell flex w-[clamp(340px,40vw,540px)] flex-none flex-col justify-between p-6 transition-transform duration-300 ${active ? '-translate-y-3 shadow-[0_26px_70px_rgba(13,13,13,0.08)]' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-[72px] w-[72px] place-items-center rounded-[20px] border border-[var(--line)] bg-[linear-gradient(180deg,#fafafa,white)]">
                        <div className="text-[0.9rem] font-black tracking-[-0.04em] text-[var(--ink-2)]">{achievement.index}</div>
                      </div>
                      <div className="mono text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">{achievement.issuer}</div>
                    </div>

                    <div className="mt-8">
                      <div className="text-[1.2rem] font-black tracking-[-0.04em]">{achievement.title}</div>
                      <div className="mt-3 text-[0.95rem] text-[var(--mute)]">{achievement.caption}</div>
                      <p className="mt-3 text-[0.98rem] leading-[1.7] text-[var(--ink-2)]">{achievement.detail}</p>
                    </div>

                    <div className="mt-8 flex items-end justify-between gap-4">
                      <div className="text-[0.9rem] text-[var(--mute)]">{achievement.caption}</div>
                      <div className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-[-0.08em] leading-none">{counted}</div>
                    </div>
                  </article>
                );
              })}

              <div className="card-shell flex w-[clamp(280px,30vw,420px)] flex-none items-center justify-center p-8 text-center text-[1.3rem] font-black tracking-[-0.04em] text-[var(--ink-2)]">
                and counting →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}