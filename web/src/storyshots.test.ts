import initStoryshots from '@storybook/addon-storyshots';
import path from 'path';
import './matchMedia.mock';

initStoryshots({
  configPath: path.resolve(__dirname, '../../web-storybook/.storybook'),
  framework: 'react',
});
