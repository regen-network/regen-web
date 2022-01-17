import * as React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../../src/theme';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

export default function TopLayout(props) {
  return (
    <React.Fragment>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider injectFonts>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {props.children}
      </ThemeProvider>
    </React.Fragment>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node,
};
