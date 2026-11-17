import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kajal & Harshal | A Celebration of Love',
  description: 'Together with our families, we invite you to celebrate the wedding of Kajal and Harshal on 5 December 2026 in Hadapsar, Pune.',
  applicationName: 'Kajal & Harshal Wedding Invitation',
  openGraph: {
    title: 'Kajal & Harshal | A Celebration of Love',
    description: 'Save the date — 5 December 2026 · Hadapsar, Pune',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#651a26',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
