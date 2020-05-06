import initStoryshots from '@storybook/addon-storyshots';
import path from 'path';
import './jest.mock';

initStoryshots({
  configPath: path.resolve(__dirname, '../../web-storybook/.storybook'),
  framework: 'react',
});
