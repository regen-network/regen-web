/* eslint-disable lingui/no-unlocalized-strings */
import type { Metadata, Viewport } from 'next';

import '../App.css';
import '../../../tailwind.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const metadata: Metadata =
  process.env.NEXT_PUBLIC_MARKETPLACE_CLIENT === 'terrasos'
    ? {
        title:
          'Terrasos – Inversiones para la Conservación de la Biodiversidad',
        description: 'Inversiones para la Conservación de la Biodiversidad',
        manifest: '/manifest.json',
        openGraph: {
          type: 'website',
          title:
            'Terrasos – Inversiones para la Conservación de la Biodiversidad',
          description: 'Inversiones para la Conservación de la Biodiversidad',
          url: new URL('https://terrasos.app.regen.network/'),
        },
        icons: {
          icon: [
            {
              url: 'terrasos-favicon-16x16.png',
              sizes: '16x16',
              type: 'image/png',
            },
            {
              url: 'terrasos-favicon-32x32.png',
              sizes: '32x32',
              type: 'image/png',
            },
          ],
          shortcut: 'terrasos-favicon.png',
        },
      }
    : {
        title: 'Regen Marketplace',
        description:
          'Regen Marketplace, the place to buy, sell, and retire on-chain carbon and ecological assets.',
        manifest: '/manifest.json',
        icons: {
          icon: [
            { url: 'favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: 'favicon-32x32.png', sizes: '32x32', type: 'image/png' },
          ],
          shortcut: 'favicon.ico',
        },
        openGraph: {
          type: 'website',
          title: 'Regen Marketplace',
          description:
            'Regen Marketplace, the place to buy, sell, and retire on-chain carbon and ecological assets.',
          url: new URL('https://app.regen.network/'),
          images: [
            new URL(
              'https://regen-registry.s3.amazonaws.com/preview-image.jpg',
            ),
          ],
        },
      };

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
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
