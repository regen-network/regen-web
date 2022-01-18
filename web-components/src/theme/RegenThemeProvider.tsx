import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import * as React from 'react';
import theme from './muiTheme';
import 'web-components/src/theme/index.css';

interface Props {
  readonly injectFonts?: boolean;
  readonly injectStyles?: (props?: any) => void;
  readonly children: React.ReactNode;
}

const RegenThemeProvider = ({ injectFonts = false, injectStyles, children }: Props): JSX.Element => {
  if (injectStyles) {
    injectStyles();
  }

  if (injectFonts) {
    require('web-components/src/theme/fonts.css');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default RegenThemeProvider;
