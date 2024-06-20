import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir';

import theme from 'web-components/src/theme/muiTheme';

import '../styles/font.css';
import '../styles/web-components.css';
import '../styles/background.css';
import '../../tailwind.css';
import Layout from '@/components/templates/Layout/Layout';

const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: 'css' });

export { augmentDocumentWithEmotionCache };

const App = ({ Component, pageProps }: AppProps) => {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      <DefaultSeo
        title="Regen Network / Invest in high-integrity carbon credits"
        description="Regen Network provides tools to create standards and market for sustainable companies to buy carbon credits and nature-based solutions to reduce carbon footprint "
        openGraph={{
          images: [
            {
              url: 'images/home/science.jpg',
              width: 1440,
              height: 640,
            },
          ],
        }}
      />
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="google-analytics">
            {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', '${GA_MEASUREMENT_ID}');
           `}
          </Script>
        </>
      )}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default withAppEmotionCache(App);
