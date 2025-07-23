/* eslint-disable lingui/no-unlocalized-strings */

import { Suspense } from 'react';
import { setI18n } from '@lingui/react/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RegenProviders } from 'clients/regen/Regen.Providers';
import terrasosMuiTheme from 'clients/terrasos/Terrasos.muiTheme';
import { TerrasosProviders } from 'clients/terrasos/Terrasos.Providers';
import type { Metadata, Viewport } from 'next';

import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';

import { AuthProvider } from 'lib/auth/auth';
import { IS_TERRASOS } from 'lib/env';

import PageLoader from 'components/atoms/PageLoader';
import { ScrollToTop } from 'components/atoms/ScrollToTop';
import { LayoutCookiesTopBanner } from 'components/layout/Layout.CookiesTopBanner';
import { LayoutModalManager } from 'components/layout/Layout.ModalManager';
import { RetryFailedFunctions } from 'components/layout/Layout.RetryFailedFunctions';
import { PageViewTracking } from 'components/molecules/PageViewTracking';

import { fontClassNames } from '../lib/fonts';
import { AnalyticsWrapper } from './AnalyticsWrapper';
import { ApolloWrapper } from './ApolloWrapper';
import { getI18nInstance } from './appRouterI18n';
import { LinguiClientProvider } from './LinguiClientProvider';
import QueryClientWrapper from './QueryClientWrapper';

import '../App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Import the stylesheet that our predev/prebuild scripts generate
// (see scripts/setClientCSS.js and package.json).
import '../generated/client-tailwind.css';

export const metadata: Metadata = IS_TERRASOS
  ? {
      title: 'Terrasos – Inversiones para la Conservación de la Biodiversidad',
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
          new URL('https://regen-registry.s3.amazonaws.com/preview-image.jpg'),
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
  // TODO get user default local
  const i18n = getI18nInstance('en'); // get a ready-made i18n instance for the given locale
  setI18n(i18n);

  const customTheme = IS_TERRASOS ? terrasosMuiTheme : null;

  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <AppRouterCacheProvider
          options={{
            enableCssLayer:
              true /* https://mui.com/material-ui/integrations/nextjs/#using-other-styling-solutions */,
          }}
        >
          <QueryClientWrapper>
            <ApolloWrapper>
              {process.env.NODE_ENV === 'development' && (
                <div className="print:hidden">
                  <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-left"
                  />
                </div>
              )}
              <LinguiClientProvider
                initialLocale={'en'}
                initialMessages={i18n.messages}
              >
                <ThemeProvider customTheme={customTheme}>
                  <Suspense fallback={<PageLoader />}>
                    <AnalyticsWrapper>
                      <AuthProvider>
                        {IS_TERRASOS ? (
                          <TerrasosProviders>{children}</TerrasosProviders>
                        ) : (
                          <RegenProviders>{children}</RegenProviders>
                        )}
                        <PageViewTracking />
                        <ScrollToTop />
                        <RetryFailedFunctions />
                        <LayoutCookiesTopBanner />
                        <LayoutModalManager />
                      </AuthProvider>
                    </AnalyticsWrapper>
                  </Suspense>
                </ThemeProvider>
              </LinguiClientProvider>
            </ApolloWrapper>
          </QueryClientWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
