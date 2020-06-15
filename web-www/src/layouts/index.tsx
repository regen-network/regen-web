import React from 'react';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import Layout from './layout.tsx';

interface propTypes {
  children: Array<React.ReactElement>;
}

const ThemeWrap = ({ children }: propTypes): JSX.Element => {
  return (
    <>
      <ThemeProvider injectFonts>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </>
  );
};

export default ThemeWrap;
