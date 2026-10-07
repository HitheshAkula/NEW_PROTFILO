import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const interTight = localFont({
  src: [
    {
      path: '../fonts/InterTight-Variable.woff2',
      style: 'normal',
      weight: '100 900',
    },
  ],
  display: 'swap',
  variable: '--font-inter-tight',
});

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/InstrumentSerif-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../fonts/InstrumentSerif-Italic.woff2',
      style: 'italic',
      weight: '400',
    },
  ],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const jetBrainsMono = localFont({
  src: [
    {
      path: '../fonts/JetBrainsMono-Variable.woff2',
      style: 'normal',
      weight: '100 800',
    },
  ],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Hithesh Akula — Portfolio',
  description: 'Personal portfolio built from the résumé and intro video.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Hithesh Akula — Portfolio',
    description: 'Personal portfolio built from the résumé and intro video.',
    images: ['/og.jpg'],
  },
};

export const viewport = {
  themeColor: '#f4f2ee',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}