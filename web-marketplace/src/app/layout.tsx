/* eslint-disable lingui/no-unlocalized-strings */

import { Suspense } from 'react';
import { setI18n } from '@lingui/react/server';
// import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata, Viewport } from 'next';

// import regenTheme from 'web-components/src/theme/muiTheme';
import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';

import { LedgerProviderWithWallet } from 'ledger';
import { AuthProvider } from 'lib/auth/auth';
import { IS_TERRASOS } from 'lib/env';
import { WalletProvider } from 'lib/wallet/wallet';

import PageLoader from 'components/atoms/PageLoader';
import { ScrollToTop } from 'components/atoms/ScrollToTop';
import { LayoutAccountSwitchModal } from 'components/layout/Layout.AccountSwitchModal';
import { LayoutAddWalletModalSwitchWarning } from 'components/layout/Layout.AddWalletModalSwitchWarning';
import { LayoutBannerModal } from 'components/layout/Layout.Banner';
import { LayoutChooseHowToPurchaseModal } from 'components/layout/Layout.ChooseHowToPurchaseModal';
import { LayoutConnectedEmailErrorModal } from 'components/layout/Layout.ConnectedEmailErrorModal';
import { LayoutConnectWalletModal } from 'components/layout/Layout.ConnectWalletModal';
import { LayoutCookiesTopBanner } from 'components/layout/Layout.CookiesTopBanner';
import { LayoutErrorBannerModal } from 'components/layout/Layout.ErrorBanner';
import { LayoutFooter } from 'components/layout/Layout.Footer';
import { LayoutHeader } from 'components/layout/Layout.Header';
import { LayoutProcessingModal } from 'components/layout/Layout.ProcessingModal';
import { RetryFailedFunctions } from 'components/layout/Layout.RetryFailedFunctions';
import { LayoutSwitchWalletModal } from 'components/layout/Layout.SwitchWalletModal';
import { LayoutTxBuySuccessfulModal } from 'components/layout/Layout.TxBuySuccessfulModal';
import { LayoutTxErrorModal } from 'components/layout/Layout.TxErrorModal';
import { LayoutTxSuccessfulModal } from 'components/layout/Layout.TxSuccessfulModal';
import { LayoutWarningBannerModal } from 'components/layout/Layout.WarningBanner';
import { PageViewTracking } from 'components/molecules/PageViewTracking';
import { RegistryLayoutTerrasosFooter } from 'components/organisms/RegistryLayout/RegistryLayout.TerrasosFooter';
import { TerrasosHeader } from 'components/organisms/TerrasosHeader/TerrasosHeader';

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

  // TODO get user default local
  const i18n = getI18nInstance('en'); // get a ready-made i18n instance for the given locale
  setI18n(i18n);

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
              <div className="print:hidden">
                <ReactQueryDevtools
                  initialIsOpen={false}
                  buttonPosition="bottom-left"
                />
              </div>
              <LinguiClientProvider
                initialLocale={'en'}
                initialMessages={i18n.messages}
              >
                <ThemeProvider>
                  <Suspense fallback={<PageLoader />}>
                    <AnalyticsWrapper>
                      <AuthProvider>
                        <ChainWrapper>
                          <WalletProvider>
                            <LedgerProviderWithWallet>
                              {IS_TERRASOS ? (
                                <TerrasosHeader />
                              ) : (
                                <LayoutHeader />
                              )}
                              {children}
                              {IS_TERRASOS ? (
                                <RegistryLayoutTerrasosFooter />
                              ) : (
                                <LayoutFooter />
                              )}
                              <PageViewTracking />
                              <ScrollToTop />
                              <RetryFailedFunctions />
                              <LayoutCookiesTopBanner />
                              <LayoutTxErrorModal />
                              <LayoutTxSuccessfulModal />
                              <LayoutBannerModal />
                              <LayoutProcessingModal />
                              <LayoutErrorBannerModal />
                              <LayoutConnectWalletModal />
                              <LayoutSwitchWalletModal />
                              <LayoutAddWalletModalSwitchWarning />
                              <LayoutAccountSwitchModal />
                              <LayoutTxBuySuccessfulModal />
                              <LayoutWarningBannerModal />
                              <LayoutChooseHowToPurchaseModal />
                              <LayoutConnectedEmailErrorModal />
                            </LedgerProviderWithWallet>
                          </WalletProvider>
                        </ChainWrapper>
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
