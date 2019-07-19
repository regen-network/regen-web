import { addParameters, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
});

const webStories = require.context('../../web', true, /\.stories\.((js|ts)x?)$/);

function loadStories() {
  webStories.keys().forEach(filename => webStories(filename));
}

configure(loadStories, module);
