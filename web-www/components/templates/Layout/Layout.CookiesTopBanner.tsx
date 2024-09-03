import React from 'react';
import { Link } from '@mui/material';

import CookiesTopBanner from 'web-components/src/components/banner/CookiesTopBanner';

import {
  COOKIES_TOP_BANNER_ACCEPT_LABEL,
  COOKIES_TOP_BANNER_REJECT_LABEL,
  URL_PRIVACY,
  URL_TERMS_SERVICE,
} from './Layout.constants';

export const LayoutCookiesTopBanner = () => {
  return (
    <CookiesTopBanner
      acceptLabel={COOKIES_TOP_BANNER_ACCEPT_LABEL}
      rejectLabel={COOKIES_TOP_BANNER_REJECT_LABEL}
    >
      <>
        We use cookies to provide you with a great user experience. By using
        this site, you accept our use of{' '}
        <Link href={URL_PRIVACY} color="secondary.main">
          cookies policy
        </Link>{' '}
        and agree to our{' '}
        <Link href={URL_TERMS_SERVICE} color="secondary.main">
          platform terms of service
        </Link>
        .
      </>
    </CookiesTopBanner>
  );
};
