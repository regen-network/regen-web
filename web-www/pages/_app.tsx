import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir';

import theme from 'web-components/lib/theme/muiTheme';

import '../styles/font.css';
import '../styles/web-components.css';
import Layout from '@/components/templates/Layout/Layout';

const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: 'css' });

export { augmentDocumentWithEmotionCache };

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default withAppEmotionCache(App);
