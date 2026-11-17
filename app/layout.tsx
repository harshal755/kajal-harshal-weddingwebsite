import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kajal & Harshal | The Journey to Forever',
  description: 'Join Kajal and Harshal as they celebrate their wedding on 5 December 2026 at Netaji Mangal Karyalay, Hadapsar, Pune.',
  applicationName: 'Kajal & Harshal Wedding Invitation',
  openGraph: {
    title: 'Kajal & Harshal | The Journey to Forever',
    description: 'A celebration of love and togetherness · 5 December 2026 · Hadapsar, Pune',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5b2930',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
