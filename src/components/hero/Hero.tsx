"use client";

import { PROFILE } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';
import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [visible, setVisible] = useState(true);
  const firstName = PROFILE.name.split(' ')[0].toUpperCase();

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35, 0.7] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
        setBlocked(false);
      } catch {
        setMuted(true);
        setBlocked(true);
        try {
          await video.play();
        } catch {
          // ignore; user interaction will retry
        }
      }
    };

    if (visible) playVideo();
    else video.pause();
  }, [visible]);

  useEffect(() => {
    const unlock = async () => {
      const video = videoRef.current;
      if (!video) return;
      setMuted(false);
      video.muted = false;
      try {
        await video.play();
        setBlocked(false);
      } catch {
        // keep muted fallback
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchend', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('touchend', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchend', unlock);
    };
  }, []);

  return (
    <section id="top" ref={heroRef} className="section-pad relative min-h-[96svh] overflow-clip pt-28">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="rv relative z-10" style={{ ['--i' as never]: 0 }}>
          <div className="mb-6 max-w-xl">
            <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">01 — Hero</div>
            <h1 className="text-balance text-[clamp(3.6rem,9vw,8.8rem)] font-black tracking-[-0.06em] leading-[0.9]">
              {PROFILE.role}.
            </h1>
          </div>
          <p className="max-w-xl text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.6] text-[var(--ink-2)]">
            Problem-Solving, Team Player, Project Management, Adaptability, Leadership, Quick Learner.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => scrollToTarget('#work')} className="pill-button pill-solid">Explore work</button>
            <button type="button" onClick={() => scrollToTarget('#contact')} className="pill-button pill-outline">Let's talk</button>
            <a href={PROFILE.resumePath} download className="pill-button pill-outline inline-flex items-center gap-2">
              Résumé <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="select-none text-[clamp(8rem,22vw,18rem)] font-black tracking-[-0.08em] text-transparent" style={{ WebkitTextStroke: '1px rgba(13,13,13,0.12)' }}>
              {firstName}
            </span>
          </div>

          <div className="relative w-full max-w-[768px]">
            <video
              ref={videoRef}
              className="relative z-10 aspect-[768/960] w-full rounded-[32px] object-cover mix-blend-multiply"
              autoPlay
              loop
              playsInline
              preload="auto"
              muted={muted}
              aria-label="Intro video of Hithesh Akula speaking to camera"
              poster="/portrait-bust.webp"
            >
              <source src="/hero/hero.webm" type="video/webm" />
              <source src="/hero/hero.mp4" type="video/mp4" />
            </video>

            <button
              type="button"
              onClick={() => {
                const nextMuted = !muted;
                setMuted(nextMuted);
                const video = videoRef.current;
                if (video) {
                  video.muted = nextMuted;
                  if (!nextMuted) video.play().catch(() => undefined);
                }
              }}
              className={`absolute bottom-5 right-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-[var(--ink)] text-white shadow-[0_16px_35px_rgba(13,13,13,0.22)] ${blocked ? 'after:absolute after:inset-[-8px] after:rounded-full after:border after:border-[var(--ink)] after:opacity-40 after:content-[""] after:animate-ping' : ''}`}
              aria-label={muted ? 'Enable sound' : 'Disable sound'}
            >
              <span aria-hidden>{muted ? '▶' : '❚❚'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}