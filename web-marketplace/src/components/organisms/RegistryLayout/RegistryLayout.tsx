import React from 'react';
import { Outlet } from 'react-router-dom';

import { IS_TERRASOS } from 'lib/env';

import { PageViewTracking } from 'components/molecules/PageViewTracking';

import { ScrollToTop } from '../../atoms';
import TerrasosHeader from '../TerrasosHeader';
import { RegistryLayoutAccountSwitchModal } from './RegistryLayout.AccountSwitchModal';
import { RegistryLayoutAddWalletModalSwitchWarning } from './RegistryLayout.AddWalletModalSwitchWarning';
import { RegistryLayoutBannerModal } from './RegistryLayout.Banner';
import { RegistryLayoutChooseHowToPurchaseModal } from './RegistryLayout.ChooseHowToPurchaseModal';
import { RegistryLayoutConnectWalletModal } from './RegistryLayout.ConnectWalletModal';
import { RegistryLayoutCookiesTopBanner } from './RegistryLayout.CookiesTopBanner';
import { RegistryLayoutErrorBannerModal } from './RegistryLayout.ErrorBanner';
import { RegistryLayoutFooter } from './RegistryLayout.Footer';
import { RegistryLayoutHeader } from './RegistryLayout.Header';
import { RegistryLayoutProcessingModal } from './RegistryLayout.ProcessingModal';
import { RetryFailedFunctions } from './RegistryLayout.RetryFailedFunctions';
import { RegistryLayoutSwitchWalletModal } from './RegistryLayout.SwitchWalletModal';
import { RegistryLayoutTerrasosFooter } from './RegistryLayout.TerrasosFooter';
import { RegistryLayoutTxBuySuccessfulModal } from './RegistryLayout.TxBuySuccessfulModal';
import { RegistryLayoutTxErrorModal } from './RegistryLayout.TxErrorModal';
import { RegistryLayoutTxSuccessfulModal } from './RegistryLayout.TxSuccessfulModal';
import { RegistryLayoutWarningBannerModal } from './RegistryLayout.WarningBanner';

const RegistryLayout: React.FC = () => {
  return (
    <>
      {IS_TERRASOS ? <TerrasosHeader /> : <RegistryLayoutHeader />}
      <Outlet />
      {IS_TERRASOS ? (
        <RegistryLayoutTerrasosFooter />
      ) : (
        <RegistryLayoutFooter />
      )}
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
      <RegistryLayoutTxBuySuccessfulModal />
      <RegistryLayoutWarningBannerModal />
      <RegistryLayoutChooseHowToPurchaseModal />
    </>
  );
};

export { RegistryLayout };
