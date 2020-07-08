import React from 'react';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import Layout from './layout';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

const ThemeWrap = ({ children, location }: propTypes): JSX.Element => {
  return (
    <>
      <ThemeProvider injectFonts>
        <Layout location={location}>{children}</Layout>
      </ThemeProvider>
    </>
  );
};

export default ThemeWrap;
