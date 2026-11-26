import { apiUri } from 'lib/apiUri';

import { withServerRequestHeader } from './serverApiHeader.utils';

const INSTALLED = Symbol.for('regen.serverRequestHeader');

/**
 * Makes every fetch this server sends to our API carry the secret header
 * (see serverApiHeader.utils). Called once at server startup from
 * instrumentation.ts, so it never runs in the browser.
 *
 * The secret comes from CLOUDFLARE_SSR_SECRET. It has no NEXT_PUBLIC_ prefix,
 * so Next.js never puts its value in code sent to browsers.
 * The wrapper is installed only for an HTTPS API URL.
 */
export function installServerRequestHeader() {
  const secret = process.env.CLOUDFLARE_SSR_SECRET;
  const globalWithFlag = globalThis as typeof globalThis & {
    [INSTALLED]?: boolean;
  };
  if (
    !secret ||
    globalWithFlag[INSTALLED] ||
    !URL.canParse(apiUri) ||
    new URL(apiUri).protocol !== 'https:'
  ) {
    return;
  }
  globalThis.fetch = withServerRequestHeader(globalThis.fetch, {
    apiUri,
    secret,
  });
  globalWithFlag[INSTALLED] = true;
}
