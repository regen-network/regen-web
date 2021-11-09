import React from 'react';
import { IntercomProvider } from 'react-use-intercom';

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const intercomAppId = process.env.GATSBY_INTERCOM_APP_ID || '';

// You can delete this file if you're not using it
export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};

// Wraps every page in a component
export const wrapPageElement = ({ element }) => {
  return (
    <IntercomProvider appId={intercomAppId} autoBoot>
      {element}
    </IntercomProvider>
  );
};
