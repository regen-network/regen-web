import type { Metadata } from 'next';

import '../App.css';

// TODO migrate rest of meta data from html bellow
export const metadata: Metadata = {
  // eslint-disable-next-line lingui/no-unlocalized-strings
  title: 'Regen Marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        {/* manifest.json provides metadata used when your web app is installed on a */}
        {/* user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Regen Marketplace" />
        <meta
          property="og:description"
          content="Regen Marketplace, the place to buy, sell, and retire on-chain carbon and ecological assets."
        />
        <meta property="og:url" content="https://app.regen.network/" />
        <meta
          property="og:image"
          content="https://regen-registry.s3.amazonaws.com/preview-image.jpg"
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
