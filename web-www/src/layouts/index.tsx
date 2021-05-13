import React from 'react';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import Layout from './layout';

import { IntercomProvider } from 'react-use-intercom';

const INTERCOM_APP_ID = 'kn5di10s';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

const ThemeWrap = ({ children, location }: propTypes): JSX.Element => {
  return (
    <>
      <IntercomProvider appId={INTERCOM_APP_ID}>
        <ThemeProvider injectFonts>
          <Layout location={location}>{children}</Layout>
        </ThemeProvider>

      </IntercomProvider>
    </>
  );
};

export default ThemeWrap;
