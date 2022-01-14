import React from 'react';
import { IntercomProvider } from 'react-use-intercom';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';

const intercomAppId = process.env.GATSBY_INTERCOM_APP_ID || '';

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};

// // Wraps every page in a component
export const wrapPageElement = ({ element }) => {
  return (
    <IntercomProvider appId={intercomAppId} autoBoot>
      {element}
    </IntercomProvider>
  );
};
