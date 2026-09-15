import type { Metadata } from 'next';
import { Figtree, Courier_Prime, DM_Mono } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mariya Shijo — Product Designer & Developer',
  description:
    'Full-stack developer & UI designer based in NJ/NYC. I design interfaces that feel obvious, then build them myself.',
  openGraph: {
    title: 'Mariya Shijo — Product Designer & Developer',
    description:
      'Full-stack developer & UI designer based in NJ/NYC.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${courierPrime.variable} ${dmMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-figtree, -apple-system, BlinkMacSystemFont, system-ui, sans-serif)' }}>
        {children}
      </body>
    </html>
  );
}
