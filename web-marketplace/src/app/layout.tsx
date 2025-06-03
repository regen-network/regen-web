/* eslint-disable lingui/no-unlocalized-strings */

import { setI18n } from '@lingui/react/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata, Viewport } from 'next';

import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';

import { LedgerProviderWithWallet } from 'ledger';
import { AuthProvider } from 'lib/auth/auth';
import { IS_TERRASOS } from 'lib/env';
import { WalletProvider } from 'lib/wallet/wallet';

import { AnalyticsWrapper } from './AnalyticsWrapper';
import { ApolloWrapper } from './ApolloWrapper';
import { getI18nInstance } from './appRouterI18n';
import { ChainWrapper } from './ChainWrapper';
import { LinguiClientProvider } from './LinguiClientProvider';
import QueryClientWrapper from './QueryClientWrapper';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontModule = IS_TERRASOS
    ? await import('../lib/fonts/terrasos')
    : await import('../lib/fonts/regen');

  const fontClassNames = Object.values(fontModule)
    .map(font => font.variable)
    .join(' ');

  const i18n = getI18nInstance('en'); // get a ready-made i18n instance for the given locale
  setI18n(i18n);

  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <AppRouterCacheProvider>
          <QueryClientWrapper>
            <ApolloWrapper>
              <LinguiClientProvider
                initialLocale={'en'}
                initialMessages={i18n.messages}
              >
                <AnalyticsWrapper>
                  <ThemeProvider>
                    <AuthProvider>
                      <ChainWrapper>
                        <WalletProvider>
                          <LedgerProviderWithWallet>
                            <div id="root">{children}</div>
                          </LedgerProviderWithWallet>
                        </WalletProvider>
                      </ChainWrapper>
                    </AuthProvider>
                  </ThemeProvider>
                </AnalyticsWrapper>
              </LinguiClientProvider>
            </ApolloWrapper>
          </QueryClientWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
