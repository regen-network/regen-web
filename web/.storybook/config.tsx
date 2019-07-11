import {addDecorator, configure} from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import {withInfo} from '@storybook/addon-info';
import {muiTheme} from 'storybook-addon-material-ui';
import theme, {theme2} from '../src/theme';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';

addLocaleData(enLocaleData);
addLocaleData(esLocaleData);

// Provide your messages
const messages = {
};

// Provide your formats (optional)
const formats = {
};

const getMessages = (locale) => messages[locale];
const getFormats = (locale) => formats[locale];

// Set intl configuration
setIntlConfig({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  getMessages,
  getFormats,
});

const req = require.context("../src", true, /.stories.tsx$/);

function loadStories() {
  addDecorator(withInfo);
  addDecorator(muiTheme([theme, theme2]));
  addDecorator(withIntl);
  req.keys().forEach(req);
}

configure(loadStories, module);
