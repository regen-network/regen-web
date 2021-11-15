import React from 'react';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from 'web-components/lib/theme/muiTheme';
import 'web-components/src/theme/fonts.css';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
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