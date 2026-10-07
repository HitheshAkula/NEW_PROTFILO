"use client";

import type { ReactNode } from 'react';

type TechLogoProps = {
  name: string;
  kind: 'brand' | 'concept';
  logoKey: string;
  size?: number;
  className?: string;
};

export const BRAND: Record<string, { src: string; label: string }> = {
  python: { src: '/logos/python.svg', label: 'Python' },
  c: { src: '/logos/c.svg', label: 'C' },
  html5: { src: '/logos/html5.svg', label: 'HTML5' },
  css3: { src: '/logos/css3.svg', label: 'CSS3' },
  javascript: { src: '/logos/javascript.svg', label: 'JavaScript' },
  react: { src: '/logos/react.svg', label: 'React' },
  nodedotjs: { src: '/logos/nodedotjs.svg', label: 'Node.js' },
  mongodb: { src: '/logos/mongodb.svg', label: 'MongoDB' },
  microsoftsqlserver: { src: '/logos/microsoftsqlserver.svg', label: 'Microsoft SQL Server' },
  tableau: { src: '/logos/tableau.svg', label: 'Tableau' },
  informatica: { src: '/logos/informatica.svg', label: 'Informatica' },
  github: { src: '/logos/github.svg', label: 'GitHub' },
  linkedin: { src: '/logos/linkedin.svg', label: 'LinkedIn' },
  springboard: { src: '/logos/springboard.svg', label: 'Springboard' },
  coursera: { src: '/logos/coursera.svg', label: 'Coursera' },
  hackerrank: { src: '/logos/hackerrank.svg', label: 'HackerRank' },
  streamlit: { src: '/logos/streamlit.svg', label: 'Streamlit' },
};

export const CONCEPT: Record<string, ReactNode> = {
  pandas: <path d="M6 18c2.7-7 5.3-10.5 7.9-10.5S19 11 22 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  etl: (
    <>
      <path d="M6 8h12M6 16h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 5 20 12l-6 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  data: <path d="M5 9.5c0 3 3 5.5 7 5.5s7-2.5 7-5.5S19 4 12 4 5 6.5 5 9.5Zm0 6c0 3 3 5.5 7 5.5s7-2.5 7-5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  'problem-solving': <path d="M12 5a6 6 0 0 0-3 11.2V19h6v-2.8A6 6 0 0 0 12 5Zm-2 15h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  team: <path d="M7 18v-1.2c0-2 1.8-3.3 5-3.3s5 1.3 5 3.3V18M9 9a3 3 0 1 0 0-.1ZM15 9a3 3 0 1 0 0-.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  'project-management': <path d="M6 18V8m6 10V4m6 14v-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  adaptability: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  leadership: <path d="M12 4 8 11h8L12 4Zm0 8v8M6 20h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  'quick-learner': <path d="M6 18V6l12 12V6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  ml: <path d="M5 18V6m0 0 5 5 4-4 5 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
};

export function isBrand(kind: 'brand' | 'concept') {
  return kind === 'brand';
}

export function TechLogo({ name, kind, logoKey, size = 48, className = '' }: TechLogoProps) {
  const brand = BRAND[logoKey];

  if (kind === 'brand' && brand) {
    return <img src={brand.src} alt={brand.label} width={size} height={size} className={className} />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-label={name}
      className={className}
      fill="none"
    >
      {CONCEPT[logoKey] ?? <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />}
    </svg>
  );
}