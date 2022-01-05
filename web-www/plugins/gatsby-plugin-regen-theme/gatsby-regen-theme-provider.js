import React from 'react';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import { StylesProvider } from '@material-ui/core/styles';

const GatsbyPluginRegenThemeProvider = ({ children }) => {
  return (
    <ThemeProvider injectFonts>
      <StylesProvider injectFirst>{children}</StylesProvider>
    </ThemeProvider>
  );
};

export default GatsbyPluginRegenThemeProvider;
