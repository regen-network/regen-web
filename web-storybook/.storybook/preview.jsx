import React, { useEffect } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { Buffer } from 'buffer';
import { i18n } from '@lingui/core';

import ThemeProvider from 'web-components/src/theme/RegenThemeProvider';
import 'web-components/src/theme/fonts.css';
import '../../tailwind.css';
import { AuthApolloProvider } from '../../web-marketplace/src/apollo';
import { QueryClientProvider } from '@tanstack/react-query';
import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';
import { AnalyticsProvider } from 'use-analytics';
import Analytics from 'analytics';

window.Buffer = Buffer;
const analytics = Analytics();

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
    <QueryClientProvider client={reactQueryClient}>
      <AuthApolloProvider apolloClientFactory={apolloClientFactory}>
        <StorybookI18nProvider>
          <AnalyticsProvider instance={analytics}>
            <ThemeProvider injectFonts>
              <CssBaseline />
              <Router>
                <Story />
              </Router>
            </ThemeProvider>
          </AnalyticsProvider>
        </StorybookI18nProvider>
      </AuthApolloProvider>
    </QueryClientProvider>
  ),
];

export const parameters = {
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
};
