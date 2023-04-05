import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

import { CssBaseline } from '@mui/material';
import theme from 'web-components/lib/theme/muiTheme';

import '../styles/font.css';
import '../styles/web-components.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
