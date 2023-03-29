import React from 'react';
import { Outlet } from 'react-router-dom';
import { URL_REGISTRY_TERMS_SERVICE, URL_WEB_PRIVACY } from 'config/globals';

import CookiesBanner from 'web-components/lib/components/banner/CookiesBanner';

import { PageViewTracking } from 'components/molecules/PageViewTracking';

import { ScrollToTop } from '../../atoms';
import { RegistryLayoutBannerModal } from './RegistryLayout.Banner';
import { RegistryLayoutConnectWalletModal } from './RegistryLayout.ConnectWalletModal';
import { RegistryLayoutErrorBannerModal } from './RegistryLayout.ErrorBanner';
import { RegistryLayoutFooter } from './RegistryLayout.Footer';
import { RegistryLayoutHeader } from './RegistryLayout.Header';
import { RegistryLayoutProcessingModal } from './RegistryLayout.ProcessingModal';
import { RegistryLayoutTxErrorModal } from './RegistryLayout.TxErrorModal';
import { RegistryLayoutTxSuccessfulModal } from './RegistryLayout.TxSuccessfulModal';

const RegistryLayout: React.FC = () => {
  return (
    <>
      <RegistryLayoutHeader />
      <Outlet />
      <RegistryLayoutFooter />
      <PageViewTracking />
      <ScrollToTop />
      <CookiesBanner
        privacyUrl={URL_WEB_PRIVACY}
        TOSUrl={URL_REGISTRY_TERMS_SERVICE}
      />
      <RegistryLayoutTxErrorModal />
      <RegistryLayoutBannerModal />
      <RegistryLayoutTxSuccessfulModal />
      <RegistryLayoutProcessingModal />
      <RegistryLayoutErrorBannerModal />
      <RegistryLayoutConnectWalletModal />
    </>
  );
};

export { RegistryLayout };
