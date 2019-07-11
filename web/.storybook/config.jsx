"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@storybook/react");
var storybook_addon_intl_1 = require("storybook-addon-intl");
var addon_info_1 = require("@storybook/addon-info");
var storybook_addon_material_ui_1 = require("storybook-addon-material-ui");
var theme_1 = require("../src/theme");
var react_intl_1 = require("react-intl");
var en_1 = require("react-intl/locale-data/en");
var es_1 = require("react-intl/locale-data/es");
react_intl_1.addLocaleData(en_1.default);
react_intl_1.addLocaleData(es_1.default);
// Provide your messages
var messages = {};
// Provide your formats (optional)
var formats = {};
var getMessages = function (locale) { return messages[locale]; };
var getFormats = function (locale) { return formats[locale]; };
// Set intl configuration
storybook_addon_intl_1.setIntlConfig({
    locales: ['en', 'es'],
    defaultLocale: 'en',
    getMessages: getMessages,
    getFormats: getFormats,
});
var req = require.context("../src", true, /.stories.tsx$/);
function loadStories() {
    react_1.addDecorator(addon_info_1.withInfo);
    react_1.addDecorator(storybook_addon_material_ui_1.muiTheme([theme_1.default, theme_1.theme2]));
    react_1.addDecorator(storybook_addon_intl_1.withIntl);
    req.keys().forEach(req);
}
react_1.configure(loadStories, module);
