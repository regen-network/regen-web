import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

import theme from 'web-components/lib/theme/muiTheme';

import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir';

import '../styles/font.css';
import '../styles/web-components.css';

const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: 'css' });

export { augmentDocumentWithEmotionCache };

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default withAppEmotionCache(App);
