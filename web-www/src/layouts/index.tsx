import React from 'react';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import { IntercomProvider } from 'react-use-intercom';
import Layout from './layout';

const intercomAppId = process.env.GATSBY_INTERCOM_APP_ID || '';

interface propTypes {
  children: Array<React.ReactElement>;
  location: Location;
}

const ThemeWrap = ({ children, location }: propTypes): JSX.Element => {
  return (
    <>
      <IntercomProvider appId={intercomAppId} autoBoot>
        <ThemeProvider injectFonts>
          <Layout location={location}>{children}</Layout>
        </ThemeProvider>

      </IntercomProvider>
    </>
  );
};

export default ThemeWrap;
