"use client";

import { NAV, PROFILE } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type Indicator = { left: number; width: number };

export function Navigation() {
  const [active, setActive] = useState(NAV[0].href);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const linkRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = NAV.map((item) => document.querySelector(item.href)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActive(`#${current.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const index = NAV.findIndex((item) => item.href === active);
    const node = linkRefs.current[index];
    const bar = barRef.current;
    if (!node || !bar) return;
    const barRect = bar.getBoundingClientRect();
    const rect = node.getBoundingClientRect();
    setIndicator({ left: rect.left - barRect.left, width: rect.width });
  }, [active, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const initials = useMemo(() => PROFILE.name.split(' ').map((part) => part[0]).join('').slice(0, 2), []);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-[var(--soft)]">
        <div className="h-full bg-[var(--ink)] transition-[width] duration-150" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      <header
        className={`fixed inset-x-0 top-3 z-40 px-[var(--gutter)] transition-all duration-500 ${scrolled ? 'pt-1' : 'pt-3'}`}
      >
        <div
          className={`section-shell flex items-center justify-between gap-4 rounded-full px-4 py-3 backdrop-blur-md ${scrolled ? 'bg-white/75 shadow-[0_12px_35px_rgba(13,13,13,0.08)]' : 'bg-transparent'}`}
        >
          <button
            type="button"
            onClick={() => scrollToTarget('#top')}
            className={`group flex items-center gap-3 ${scrolled ? 'text-[var(--ink)]' : 'text-[var(--ink)]'}`}
            aria-label="Back to top"
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-black transition-all duration-500 ${scrolled ? 'border-[var(--ink)] bg-[var(--ink)] text-white' : 'border-[var(--line)] bg-transparent text-[var(--ink)] group-hover:rotate-[360deg]'}`}>
              {initials}
            </span>
            <span className={`hidden text-sm font-semibold tracking-[-0.02em] transition-opacity duration-300 md:block ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
              {PROFILE.name}
            </span>
          </button>

          <div className="hidden md:block">
            <div ref={barRef} className="relative flex items-center gap-1 rounded-full border border-[var(--line)] bg-white/90 p-1 shadow-[0_8px_30px_rgba(13,13,13,0.06)]">
              <div
                className="pointer-events-none absolute inset-y-1 rounded-full bg-[var(--ink)] transition-all duration-300"
                style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
              />
              {NAV.map((item, index) => (
                <button
                  key={item.href}
                  ref={(node) => {
                    linkRefs.current[index] = node;
                  }}
                  type="button"
                  onClick={() => scrollToTarget(item.href)}
                  className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold ${active === item.href ? 'text-white' : 'text-[var(--ink)] hover:text-[var(--mute)]'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button type="button" className="pill-button pill-outline" onClick={() => setMenuOpen(true)}>
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-[var(--paper)] transition-[clip-path,opacity] duration-500 md:hidden ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        style={{ clipPath: menuOpen ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)' }}
      >
        <div className="flex h-full flex-col px-[var(--gutter)] py-6">
          <div className="flex items-center justify-between">
            <span className="mono text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">Menu</span>
            <button type="button" className="pill-button pill-outline" onClick={() => setMenuOpen(false)}>
              Close
            </button>
          </div>
          <nav className="mt-14 flex flex-1 flex-col gap-4">
            {NAV.map((item, index) => (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToTarget(item.href);
                }}
                className="group flex items-center justify-between border-b border-[var(--line)] pb-4 text-left text-[clamp(2rem,8vw,4.5rem)] font-black tracking-[-0.05em]"
              >
                <span className="mono text-[12px] text-[var(--mute)]">0{index + 1}</span>
                <span className="flex-1 px-4">{item.label}</span>
                <span className="text-[var(--mute)] transition-transform group-hover:translate-x-1">↗</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}