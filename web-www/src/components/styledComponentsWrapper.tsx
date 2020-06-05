import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`...`;
import { StylesProvider } from '@material-ui/core/styles';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
interface props {
  children: React.ReactNode;
}
const styledComponentsWrapper = ({ children }: props) => (
  <>
    <CssBaseline />
    <ThemeProvider injectFonts>
      <StylesProvider>
        <GlobalStyle />
        {children}
      </StylesProvider>
    </ThemeProvider>
  </>
);

styledComponentsWrapper.defaultProps = {
  children: null,
};

styledComponentsWrapper.propTypes = {
  children: PropTypes.node,
};

export default styledComponentsWrapper;
