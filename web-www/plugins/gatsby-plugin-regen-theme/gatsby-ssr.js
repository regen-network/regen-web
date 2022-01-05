import React from 'react';
import GatsbyPluginRegenThemeProvider from './gatsby-regen-theme-provider';

export const wrapRootElement = ({ element }) => {
  return <GatsbyPluginRegenThemeProvider>{element}</GatsbyPluginRegenThemeProvider>;
};
