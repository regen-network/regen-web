import React from 'react';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from 'web-components/lib/theme/muiTheme';
import 'web-components/src/theme/fonts.css';

export const decorators = [
  (Story) => (
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
      <Story />
    </MuiThemeProvider>
  ),
];

export const parameters = {
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
};