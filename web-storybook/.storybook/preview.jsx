import React, { useEffect } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { Buffer } from 'buffer';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';
import 'web-components/src/theme/fonts.css';
import '../../tailwind.css';

window.Buffer = Buffer;

const StorybookI18nProvider = ({ children }) => {
  useEffect(() => {
    const loadTranslations = async () => {
      const { messages } = await import(
        `web-marketplace/src/lib/i18n/locales/en.po`
      );

      i18n.load('en', messages);
      i18n.activate('en');
    };

    loadTranslations();
  }, []);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export const decorators = [
  Story => (
    <StorybookI18nProvider>
      <ThemeProvider injectFonts>
        <CssBaseline />
        <Router>
          <Story />
        </Router>
      </ThemeProvider>
    </StorybookI18nProvider>
  ),
];

export const parameters = {
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
};
