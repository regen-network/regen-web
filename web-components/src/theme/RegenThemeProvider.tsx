import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material/styles';
import * as React from 'react';
import theme from './muiTheme';

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
  if (injectStyles) {
    injectStyles();
  }

  if (injectFonts) {
    require('web-components/src/theme/fonts.css');
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default RegenThemeProvider;
