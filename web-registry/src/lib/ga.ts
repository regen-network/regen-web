import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import 'clientjs';

const COOKIE_GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_COOKIES_ENABLED =
  'gatsby-plugin-google-analytics-gdpr_cookies-enabled';
const trackingId = 'UA-119338253-2';

function determineClientId(): number {
  const client = new window.ClientJS();
  const fingerprint = client.getFingerprint();
  return fingerprint;
}

function initializeGA(): void {
  let gaOptions = {};
  if (!isCookiesEnabled()) {
    // if the user does not have cookies enabled, we make sure to respect
    // the choice when initializing GA by disabling cookies for GA.
    const clientFingerprint = determineClientId();
    gaOptions = {
      storage: 'none', // disable cookies for google analytics
      // because we do not want to use a cookie, which is where by default the
      // google analytics plugin creates and stores the pseudonoymus clientId,
      // we pass our own method for generating a client fingerprint. see here
      // for more:
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#clientId
      clientId: clientFingerprint, // set custom client fingerprint
    };
  }
  ReactGA.initialize(trackingId, { gaOptions });
  ReactGA.set({ anonymizeIp: true });
}

function isCookiesEnabled(): boolean {
  return (
    Cookies.get(COOKIE_GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_COOKIES_ENABLED) ===
    'true'
  );
}

export function useGoogleAnalyticsInit(): void {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // if the user is coming from regen.network and they have not yet
      // accepted the cookie use policy, we assume that they have not yet
      // agreed to the policy, and we say that we must run without cookies.
      if (
        Cookies.get(
          COOKIE_GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_COOKIES_ENABLED,
        ) === undefined
      ) {
        Cookies.set(
          COOKIE_GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_COOKIES_ENABLED,
          'false',
        );
      }
      initializeGA();
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      // send pageviews to GA
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
}
