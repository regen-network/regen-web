import React from 'react';
import { Outlet } from 'react-router-dom';

import { PageViewTracking } from 'components/molecules/PageViewTracking';

import { ScrollToTop } from '../../atoms';
import { RegistryLayoutAccountSwitchModal } from './RegistryLayout.AccountSwitchModal';
import { RegistryLayoutAddWalletModalSwitchWarning } from './RegistryLayout.AddWalletModalSwitchWarning';
import { RegistryLayoutBannerModal } from './RegistryLayout.Banner';
import { RegistryLayoutConnectWalletModal } from './RegistryLayout.ConnectWalletModal';
import { RegistryLayoutCookiesTopBanner } from './RegistryLayout.CookiesTopBanner';
import { RegistryLayoutErrorBannerModal } from './RegistryLayout.ErrorBanner';
import { RegistryLayoutFooter } from './RegistryLayout.Footer';
import { RegistryLayoutHeader } from './RegistryLayout.Header';
import { RegistryLayoutProcessingModal } from './RegistryLayout.ProcessingModal';
import { RetryFailedFunctions } from './RegistryLayout.RetryFailedFunctions';
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
      <RetryFailedFunctions />
      <RegistryLayoutCookiesTopBanner />
      <RegistryLayoutTxErrorModal />
      <RegistryLayoutBannerModal />
      <RegistryLayoutTxSuccessfulModal />
      <RegistryLayoutProcessingModal />
      <RegistryLayoutErrorBannerModal />
      <RegistryLayoutConnectWalletModal />
      <RegistryLayoutSwitchWalletModal />
      <RegistryLayoutAddWalletModalSwitchWarning />
      <RegistryLayoutAccountSwitchModal />
    </>
  );
};

export { RegistryLayout };
