const React = require('react');
const { IntercomProvider } = require('react-use-intercom');

const intercomAppId = process.env.GATSBY_INTERCOM_APP_ID || '';

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};

// Wraps every page in a component
exports.wrapPageElement = ({ element }) => {
  return (
    <IntercomProvider appId={intercomAppId} autoBoot>
      {element}
    </IntercomProvider>
  );
};
