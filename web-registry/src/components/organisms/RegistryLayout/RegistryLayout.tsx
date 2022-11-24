import React from 'react';
import { Outlet } from 'react-router-dom';
import { URL_PRIVACY, URL_TERMS_SERVICE } from 'globals';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';

import { PageViewTracking } from 'components/molecules/PageViewTracking';

import { ScrollToTop } from '../../atoms';
import { RegistryLayoutFooter } from './RegistryLayout.Footer';
import { RegistryLayoutHeader } from './RegistryLayout.Header';

const RegistryLayout: React.FC = () => {
  return (
    <>
      <RegistryLayoutHeader />
      <Outlet />
      <RegistryLayoutFooter />
      <PageViewTracking />
      <ScrollToTop />
      <CookiesBanner privacyUrl={URL_PRIVACY} TOSUrl={URL_TERMS_SERVICE} />
    </>
  );
};

export { RegistryLayout };
