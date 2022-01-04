import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import Layout from './layout';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

const ThemeWrap = ({ children, location }: propTypes): JSX.Element => {
  return <Layout location={location}>{children}</Layout>;
};

export default ThemeWrap;
