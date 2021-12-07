import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CssBaseline } from '@mui/material';

import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import 'web-components/src/theme/fonts.css';

export const decorators = [
  (Story) => (
    <ThemeProvider injectFonts>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
};