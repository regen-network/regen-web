'use client';
import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from '@mui/material/styles';

import theme from './muiTheme';

import 'web-components/src/theme/index.css';
import 'web-components/src/theme/fonts.css';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

interface Props {
  readonly injectFonts?: boolean;
  readonly injectStyles?: (props?: any) => void;
  readonly children: ReactNode;
  customTheme?: Theme;
}

const RegenThemeProvider = ({
  injectStyles,
  customTheme,
  children,
}: Props): JSX.Element => {
  if (injectStyles) {
    injectStyles();
  }
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme ?? theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default RegenThemeProvider;
