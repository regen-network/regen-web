import React from 'react';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

const GatsbyPluginRegenThemeProvider = ({ children }) => {
  return <ThemeProvider injectFonts>{children}</ThemeProvider>;
};

export default GatsbyPluginRegenThemeProvider;
