import { addDecorator, addParameters, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import theme from 'web-components/lib/theme/muiTheme';
import { muiTheme } from 'storybook-addon-material-ui';
import 'web-components/src/theme/fonts.css';
import requireContext from 'require-context.macro';

addDecorator(muiTheme([theme]));

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
  const webStories = requireContext('../../web', true, /\.stories\.((js|ts)x?)$/);
  const webComponentStories = requireContext('../../web-components', true, /\.stories\.((js|ts)x?)$/);
  webStories.keys().forEach(filename => allExports.push(webStories(filename)));
  webComponentStories.keys().forEach(filename => allExports.push(webComponentStories(filename)));
  return allExports;
};

configure(loaderFn, module);
