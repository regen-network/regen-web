import React from 'react';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from 'web-components/lib/theme/muiTheme';
import 'web-components/src/theme/fonts.css';
import requireContext from 'require-context.macro';

const MuiDecorator = storyFn => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {storyFn()}
  </MuiThemeProvider>
);
addDecorator(MuiDecorator);

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
});

// const webStories = require.context('../../web', true, /\.stories\.((js|ts)x?)$/);
// const webComponentStories = require.context('../../web-components', true, /\.stories\.((js|ts)x?)$/);
//
// function loadStories() {
//   webStories.keys().forEach(filename => webStories(filename));
//   webComponentStories.keys().forEach(filename => webComponentStories(filename));
// }

const loaderFn = () => {
  const allExports = [];
  const webStories = requireContext('../../web-registry', true, /\.stories\.((js|ts)x?)$/);
  const webComponentStories = requireContext('../../web-components', true, /\.stories\.((js|ts)x?)$/);
  webStories.keys().forEach(filename => allExports.push(webStories(filename)));
  webComponentStories.keys().forEach(filename => allExports.push(webComponentStories(filename)));
  return allExports;
};

configure(loaderFn, module);
