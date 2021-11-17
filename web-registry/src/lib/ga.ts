import ReactGA from 'react-ga';
import Cookies from 'js-cookie';
import 'clientjs';

const COOKIE_GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_COOKIES_ENABLED =
  'gatsby-plugin-google-analytics-gdpr_cookies-enabled';
const trackingId = 'UA-119338253-2';
// the following running modes are used with window.GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_RUNNING_WITH_MODE
const GA_MODE_RUNNING_COOKIES_DISABLED = 'runningCookiesDisabled';
const GA_MODE_RUNNING_COOKIES_ENABLED = 'runningCookieEnabled';

declare global {
  interface Window {
    GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_RUNNING_WITH_MODE: string;
  }
}

function determineClientId(): number {
  const client = new window.ClientJS();
  const fingerprint = client.getFingerprint();
  return fingerprint;
}

function initializeGA(): void {
  var gaOptions = {};
  if (!isCookiesEnabled()) {
    const clientFingerprint = determineClientId();
    gaOptions = {
      storage: 'none', // disable cookies for google analytics
      clientId: clientFingerprint, // set custom client fingerprint
    };
    window.GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_RUNNING_WITH_MODE = GA_MODE_RUNNING_COOKIES_DISABLED;
  } else {
    window.GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_RUNNING_WITH_MODE = GA_MODE_RUNNING_COOKIES_ENABLED;
  }

  // var ractGaOptions = { gaOptions: gaOptions };
  // if (pluginOptions.reactGaOptions !== undefined) {
  //   gaOptions = { ...pluginOptions.reactGaOptions.gaOptions, ...gaOptions };
  //   ractGaOptions = { ...pluginOptions.reactGaOptions, ...{ gaOptions: gaOptions } };
  // }

  ReactGA.initialize(trackingId, { gaOptions });
  ReactGA.set({ anonymizeIp: true });
}

function isCookiesEnabled(): boolean {
  return (
    Cookies.get(COOKIE_GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_COOKIES_ENABLED) ===
    'true'
  );
}

export function init(): void {
  if (process.env.NODE_ENV === 'production') {
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
  }
}

function isGARunningInCorrectMode(): boolean {
  const runningWithCookiesEnabled =
    window.GATSBY_PLUGIN_GOOGLE_ANALYTICS_GDPR_RUNNING_WITH_MODE ===
    GA_MODE_RUNNING_COOKIES_ENABLED;
  return isCookiesEnabled() === runningWithCookiesEnabled;
}

export function setPageView(location: { pathname: string }): void {
  if (process.env.NODE_ENV === 'production') {
    // restart google analytics with correct settings if needed
    if (!isGARunningInCorrectMode()) {
      ReactGA.ga('remove');
      initializeGA();
    }

    ReactGA.set({ page: location.pathname, anonymizeIp: true });
    ReactGA.pageview(location.pathname);
  }
}
