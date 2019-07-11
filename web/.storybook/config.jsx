"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@storybook/react");
var addon_info_1 = require("@storybook/addon-info");
var storybook_addon_material_ui_1 = require("storybook-addon-material-ui");
var theme_1 = require("../src/theme");
var req = require.context("../src", true, /.stories.tsx$/);
function loadStories() {
    react_1.addDecorator(addon_info_1.withInfo);
    react_1.addDecorator(storybook_addon_material_ui_1.muiTheme([theme_1.default, theme_1.theme2]));
    req.keys().forEach(req);
}
react_1.configure(loadStories, module);
