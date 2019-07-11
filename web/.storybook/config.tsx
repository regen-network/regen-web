import {addDecorator, configure} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {muiTheme} from 'storybook-addon-material-ui';
import theme, {theme2} from '../src/theme';

const req = require.context("../src", true, /.stories.tsx$/);

function loadStories() {
  addDecorator(withInfo);
  addDecorator(muiTheme([theme, theme2]));
  req.keys().forEach(req);
}

configure(loadStories, module);
