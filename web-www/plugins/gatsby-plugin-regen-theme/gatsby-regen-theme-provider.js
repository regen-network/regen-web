import { StyledEngineProvider } from '@mui/material/styles';
import ThemeProvider from '@regen-network/web-components/lib/theme/RegenThemeProvider';
import React from 'react';

const GatsbyPluginRegenThemeProvider = ({ children }) => {
  return (
    <ThemeProvider injectFonts>
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  );
};

export default GatsbyPluginRegenThemeProvider;
