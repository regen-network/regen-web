import { Trans } from '@lingui/react/macro';
import { Link } from '@mui/material';
import { URL_REGISTRY_TERMS_SERVICE, URL_WEB_PRIVACY } from 'config/globals';

import CookiesTopBanner from 'web-components/src/components/banner/CookiesTopBanner';

import {
  COOKIES_TOP_BANNER_ACCEPT_LABEL,
  COOKIES_TOP_BANNER_REJECT_LABEL,
} from '../organisms/RegistryLayout/RegistryLayout.constants';

export const LayoutCookiesTopBanner = () => {
  return (
    <CookiesTopBanner
      acceptLabel={COOKIES_TOP_BANNER_ACCEPT_LABEL}
      rejectLabel={COOKIES_TOP_BANNER_REJECT_LABEL}
    >
      <Trans>
        We use cookies to provide you with a great user experience. By using
        this site, you accept our use of{' '}
        <Link href={URL_WEB_PRIVACY} color="secondary.main">
          cookies policy
        </Link>{' '}
        and agree to our{' '}
        <Link href={URL_REGISTRY_TERMS_SERVICE} color="secondary.main">
          platform terms of service
        </Link>
        .
      </Trans>
    </CookiesTopBanner>
  );
};
