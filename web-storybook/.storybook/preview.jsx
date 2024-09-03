import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { Buffer } from 'buffer';
import { i18n } from '@lingui/core';

import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';
import 'web-components/src/theme/fonts.css';
import '../../tailwind.css';

window.Buffer = Buffer;
i18n.activate('en');

export const decorators = [
  Story => (
    <I18nProvider i18n={i18n}>
      <ThemeProvider injectFonts>
        <CssBaseline />
        <Router>
          <Story />
        </Router>
      </ThemeProvider>
    </I18nProvider>
  ),
];

export const parameters = {
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
};
