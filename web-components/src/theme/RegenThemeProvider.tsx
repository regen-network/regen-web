import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from '@mui/material/styles';

import { regenThemeOptions } from './muiTheme';
import { darkPalette } from './palette/dark';
import { lightPalette } from './palette/light';

import 'web-components/src/theme/index.css';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

interface Props {
  readonly injectFonts?: boolean;
  readonly injectStyles?: (props?: any) => void;
  readonly children: React.ReactNode;
}

const RegenThemeProvider = ({
  injectFonts = false,
  injectStyles,
  children,
}: Props): JSX.Element => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const palette = prefersDarkMode ? darkPalette : lightPalette;

  const theme = React.useMemo(
    () =>
      createTheme({
        ...regenThemeOptions,
        //@ts-ignore
        palette: {
          ...palette,
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode, palette],
  );

  if (injectStyles) {
    injectStyles();
  }

  if (injectFonts) {
    require('web-components/src/theme/fonts.css');
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default RegenThemeProvider;
