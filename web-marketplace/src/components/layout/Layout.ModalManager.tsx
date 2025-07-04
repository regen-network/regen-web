'use client';

import { useMemo } from 'react';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

import { bannerTextAtom, warningBannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom, errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  accountSwitchModalAtom,
  addWalletModalSwitchWarningAtom,
  chooseHowToPurchaseModalAtom,
  connectedEmailErrorModalAtom,
  connectWalletModalAtom,
  processingModalAtom,
  switchWalletModalAtom,
  txBuySuccessfulModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';

// Dynamic modals/banners imports
const MODAL_REGISTRY = {
  connectWallet: dynamic(
    () =>
      import('./Layout.ConnectWalletModal').then(m => ({
        default: m.LayoutConnectWalletModal,
      })),
    {
      ssr: false,
      loading: () => null, // Prevent loading fallback before component mounts
    },
  ),
  switchWallet: dynamic(
    () =>
      import('./Layout.SwitchWalletModal').then(m => ({
        default: m.LayoutSwitchWalletModal,
      })),
    { ssr: false, loading: () => null },
  ),
  addWalletWarning: dynamic(
    () =>
      import('./Layout.AddWalletModalSwitchWarning').then(m => ({
        default: m.LayoutAddWalletModalSwitchWarning,
      })),
    { ssr: false, loading: () => null },
  ),
  accountSwitch: dynamic(
    () =>
      import('./Layout.AccountSwitchModal').then(m => ({
        default: m.LayoutAccountSwitchModal,
      })),
    { ssr: false, loading: () => null },
  ),
  chooseHowToPurchase: dynamic(
    () =>
      import('./Layout.ChooseHowToPurchaseModal').then(m => ({
        default: m.LayoutChooseHowToPurchaseModal,
      })),
    { ssr: false, loading: () => null },
  ),
  connectedEmailError: dynamic(
    () =>
      import('./Layout.ConnectedEmailErrorModal').then(m => ({
        default: m.LayoutConnectedEmailErrorModal,
      })),
    { ssr: false, loading: () => null },
  ),
  processing: dynamic(
    () =>
      import('./Layout.ProcessingModal').then(m => ({
        default: m.LayoutProcessingModal,
      })),
    { ssr: false, loading: () => null },
  ),
  txError: dynamic(
    () =>
      import('./Layout.TxErrorModal').then(m => ({
        default: m.LayoutTxErrorModal,
      })),
    { ssr: false, loading: () => null },
  ),
  txSuccess: dynamic(
    () =>
      import('./Layout.TxSuccessfulModal').then(m => ({
        default: m.LayoutTxSuccessfulModal,
      })),
    { ssr: false, loading: () => null },
  ),
  txBuySuccess: dynamic(
    () =>
      import('./Layout.TxBuySuccessfulModal').then(m => ({
        default: m.LayoutTxBuySuccessfulModal,
      })),
    { ssr: false, loading: () => null },
  ),
  banner: dynamic(
    () =>
      import('./Layout.Banner').then(m => ({
        default: m.LayoutBannerModal,
      })),
    { ssr: false, loading: () => null },
  ),
  errorBanner: dynamic(
    () =>
      import('./Layout.ErrorBanner').then(m => ({
        default: m.LayoutErrorBannerModal,
      })),
    { ssr: false, loading: () => null },
  ),
  warningBanner: dynamic(
    () =>
      import('./Layout.WarningBanner').then(m => ({
        default: m.LayoutWarningBannerModal,
      })),
    { ssr: false, loading: () => null },
  ),
} as const;

export const LayoutModalManager = () => {
  const [connectWalletModal] = useAtom(connectWalletModalAtom);
  const [switchWalletModal] = useAtom(switchWalletModalAtom);
  const [addWalletWarningModal] = useAtom(addWalletModalSwitchWarningAtom);
  const [accountSwitchModal] = useAtom(accountSwitchModalAtom);
  const [chooseHowToPurchaseModal] = useAtom(chooseHowToPurchaseModalAtom);
  const [connectedEmailErrorModal] = useAtom(connectedEmailErrorModalAtom);
  const [processingModal] = useAtom(processingModalAtom);
  const [txSuccessModal] = useAtom(txSuccessfulModalAtom);
  const [txBuySuccessModal] = useAtom(txBuySuccessfulModalAtom);
  const [errorCode] = useAtom(errorCodeAtom);
  const [bannerText] = useAtom(bannerTextAtom);
  const [errorBannerText] = useAtom(errorBannerTextAtom);
  const [warningBannerText] = useAtom(warningBannerTextAtom);

  const activeModals = useMemo(() => {
    const modals = [];

    if (connectWalletModal.open) {
      const ConnectWalletModal = MODAL_REGISTRY.connectWallet;
      modals.push(<ConnectWalletModal key="connectWalletModal" />);
    }

    if (switchWalletModal.open) {
      const SwitchWalletModal = MODAL_REGISTRY.switchWallet;
      modals.push(<SwitchWalletModal key="switchWalletModal" />);
    }

    if (addWalletWarningModal.open) {
      const AddWalletWarningModal = MODAL_REGISTRY.addWalletWarning;
      modals.push(<AddWalletWarningModal key="addWalletWarningModal" />);
    }

    if (accountSwitchModal.open) {
      const AccountSwitchModal = MODAL_REGISTRY.accountSwitch;
      modals.push(<AccountSwitchModal key="accountSwitchModal" />);
    }

    if (chooseHowToPurchaseModal.open) {
      const ChooseHowToPurchaseModal = MODAL_REGISTRY.chooseHowToPurchase;
      modals.push(<ChooseHowToPurchaseModal key="chooseHowToPurchaseModal" />);
    }

    if (connectedEmailErrorModal.open) {
      const ConnectedEmailErrorModal = MODAL_REGISTRY.connectedEmailError;
      modals.push(<ConnectedEmailErrorModal key="connectedEmailErrorModal" />);
    }

    if (processingModal.open) {
      const ProcessingModal = MODAL_REGISTRY.processing;
      modals.push(<ProcessingModal key="processingModal" />);
    }

    if (txSuccessModal.open) {
      const TxSuccessModal = MODAL_REGISTRY.txSuccess;
      modals.push(<TxSuccessModal key="txSuccessModal" />);
    }

    if (txBuySuccessModal.open) {
      const TxBuySuccessModal = MODAL_REGISTRY.txBuySuccess;
      modals.push(<TxBuySuccessModal key="txBuySuccessModal" />);
    }

    if (errorCode) {
      const TxErrorModal = MODAL_REGISTRY.txError;
      modals.push(<TxErrorModal key="txErrorModal" />);
    }

    if (bannerText) {
      const BannerModal = MODAL_REGISTRY.banner;
      modals.push(<BannerModal key="bannerModal" />);
    }

    if (errorBannerText) {
      const ErrorBannerModal = MODAL_REGISTRY.errorBanner;
      modals.push(<ErrorBannerModal key="errorBannerModal" />);
    }

    if (warningBannerText) {
      const WarningBannerModal = MODAL_REGISTRY.warningBanner;
      modals.push(<WarningBannerModal key="warningBannerModal" />);
    }

    return modals;
  }, [
    connectWalletModal.open,
    switchWalletModal.open,
    addWalletWarningModal.open,
    accountSwitchModal.open,
    chooseHowToPurchaseModal.open,
    connectedEmailErrorModal.open,
    processingModal.open,
    txSuccessModal.open,
    txBuySuccessModal.open,
    errorCode,
    bannerText,
    errorBannerText,
    warningBannerText,
  ]);

  return <>{activeModals}</>;
};
