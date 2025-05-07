/* eslint-disable lingui/no-unlocalized-strings */

'use client';
// import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import theme from 'web-components/src/theme/muiTheme';

export default function Page() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OutlinedButton>click</OutlinedButton>
    </ThemeProvider>
  );
}
