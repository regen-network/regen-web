import * as React from 'react';
import { GlobalStyles } from '@mui/material';

import ThemeProvider from '../../theme/RegenThemeProvider';

interface Props {
  readonly children: React.ReactNode;
}

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        boxSizing: 'inherit',
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      },
      'a:-webkit-any-link': {
        color: 'inherit',
      },
      '*::before, *::after': {
        boxSizing: 'inherit',
      },
      html: {
        fontSize: `14px`,
      },
      body: {
        margin: '0',
        padding: '0',
        bottom: '0',
        top: '0',
        left: '0',
        right: '0',
        overflowX: 'hidden',
        fontFamily: '"Lato",-apple-system,sans-serif',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        textRendering: 'geometricPrecision',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },
    }}
  />
);

export const Storybook = ({ children }: Props): JSX.Element => (
  <ThemeProvider injectFonts>
    {inputGlobalStyles}
    {children}
  </ThemeProvider>
);
