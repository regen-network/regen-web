import { useMemo } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir';

import { regenThemeOptions } from 'web-components/lib/theme/muiTheme';

import '../styles/background.css';
import '../styles/font.css';
import '../styles/web-components.css';
import Layout from '@/components/templates/Layout/Layout';

const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: 'css' });

export { augmentDocumentWithEmotionCache };

const App = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        ...regenThemeOptions,
        //@ts-ignore
        palette: {
          ...regenThemeOptions.palette,
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

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
