import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { initialize } from 'msw-storybook-addon';

import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import 'web-components/src/theme/fonts.css';
import '../../tailwind.css';

// Initialize MSW
initialize();

export const decorators = [
  Story => (
    <ThemeProvider injectFonts>
      <CssBaseline />
      <Router>
        <Story />
      </Router>
    </ThemeProvider>
  ),
  // mswDecorator
];

export const parameters = {
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
};

// export const loaders = [mswLoader]

