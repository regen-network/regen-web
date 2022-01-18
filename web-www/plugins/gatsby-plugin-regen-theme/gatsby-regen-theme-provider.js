import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

const GatsbyPluginRegenThemeProvider = ({ children }) => {
  return (
    <ThemeProvider injectFonts>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export default GatsbyPluginRegenThemeProvider;
