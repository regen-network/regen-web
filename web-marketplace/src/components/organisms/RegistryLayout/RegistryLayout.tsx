import React from 'react';
import { Outlet } from 'react-router-dom';
import { URL_REGISTRY_TERMS_SERVICE, URL_WEB_PRIVACY } from 'config/globals';

import CookiesTopBanner from 'web-components/src/components/banner/CookiesTopBanner';

import { PageViewTracking } from 'components/molecules/PageViewTracking';

import { ScrollToTop } from '../../atoms';
import { RegistryLayoutAddWalletModalConnect } from './RegistryLayout.AddWalletModalConnect';
import { RegistryLayoutAddWalletModalRemove } from './RegistryLayout.AddWalletModalRemove';
import { RegistryLayoutAddWalletModalSwitch } from './RegistryLayout.AddWalletModalSwitch';
import { RegistryLayoutAddWalletModalSwitchWarning } from './RegistryLayout.AddWalletModalSwitchWarning';
import { RegistryLayoutBannerModal } from './RegistryLayout.Banner';
import { RegistryLayoutConnectWalletModal } from './RegistryLayout.ConnectWalletModal';
import { RegistryLayoutErrorBannerModal } from './RegistryLayout.ErrorBanner';
import { RegistryLayoutFooter } from './RegistryLayout.Footer';
import { RegistryLayoutHeader } from './RegistryLayout.Header';
import { RegistryLayoutProcessingModal } from './RegistryLayout.ProcessingModal';
import { RegistryLayoutSwitchWalletModal } from './RegistryLayout.SwitchWalletModal';
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
      <CookiesTopBanner
        privacyUrl={URL_WEB_PRIVACY}
        TOSUrl={URL_REGISTRY_TERMS_SERVICE}
      />
      <RegistryLayoutTxErrorModal />
      <RegistryLayoutBannerModal />
      <RegistryLayoutTxSuccessfulModal />
      <RegistryLayoutProcessingModal />
      <RegistryLayoutErrorBannerModal />
      <RegistryLayoutConnectWalletModal />
      <RegistryLayoutSwitchWalletModal />
      <RegistryLayoutAddWalletModalConnect />
      <RegistryLayoutAddWalletModalRemove />
      <RegistryLayoutAddWalletModalSwitch />
      <RegistryLayoutAddWalletModalSwitchWarning />
    </>
  );
};

export { RegistryLayout };
