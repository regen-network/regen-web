/* eslint-disable lingui/no-unlocalized-strings */

import type { Viewport } from 'next';

import { fontClassNames } from '../lib/fonts';

import '../App.css';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontClassNames}>
      <body>{children}</body>
    </html>
  );
}
