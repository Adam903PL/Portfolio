import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Beams from '@/components/ui/Beams';
import MiniNavbar from '@/components/ui/mini-navbar';
import Footer from '@/components/Footer';
import { SnowfallEffect } from '@/components/snowfall-effect';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Adam Pukaluk',
    template: '%s | Adam Pukaluk',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/img/logo.svg', type: 'image/svg+xml' },
    ],
  },
  description:
    'Official portfolio of Adam Pukaluk – young full-stack developer passionate about modern web technologies.',
  keywords: [
    'Adam Pukaluk',
    'Developer',
    'Portfolio',
    'React',
    'Next.js',
    'Full-Stack',
  ],
  authors: [{ name: 'Adam Pukaluk' }],
  creator: 'Adam Pukaluk',
  metadataBase: new URL('https://www.adampukaluk.pl'),

  openGraph: {
    title: 'Adam Pukaluk – Portfolio',
    description: 'Young full-stack developer building modern web experiences.',
    url: 'https://www.adampukaluk.pl',
    siteName: 'Adam Pukaluk Portfolio',
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Adam Pukaluk – Portfolio',
    description: 'Young full-stack developer building modern web experiences.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Statyczne tło z animowanymi liniami */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        >
          <Beams
            beamWidth={3}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={4.75}
            noiseIntensity={3.15}
            scale={0.25}
            rotation={30}
          />
        </div>

        <SnowfallEffect />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <MiniNavbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
