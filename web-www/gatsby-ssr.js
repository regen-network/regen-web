import React from 'react';
import { IntercomProvider } from 'react-use-intercom';

const intercomAppId = process.env.GATSBY_INTERCOM_APP_ID || '';

// // Wraps every page in a component
export const wrapPageElement = ({ element }) => {
  return (
    <IntercomProvider appId={intercomAppId} autoBoot>
      {element}
    </IntercomProvider>
  );
};
