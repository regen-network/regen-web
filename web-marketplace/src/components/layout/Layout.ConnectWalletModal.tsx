'use client';

import { useCallback, useEffect } from 'react';
import { useLingui } from '@lingui/react';
import { useAtom, useSetAtom } from 'jotai';
import Image from 'next/image';

import { KeplrWalletConnectModal } from 'web-components/src/components/modal/keplr-wallet-connect-modal/KeplrWalletConnectModal';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import keplrWalletExtension from '../../../public/png/wallets/keplr-wallet-extension.png';
import { ConnectWalletFlow } from '../organisms/ConnectWalletFlow/ConnectWalletFlow';
import { ConnectWalletModal } from '../organisms/RegistryLayout/components/ConnectWalletModal/ConnectWalletModal';
import {
  KEPLR_CONNECT_BUTTON,
  KEPLR_LINK_TEXT,
  KEPLR_LINK_URL,
  KEPLR_WALLET_CONNECT_LEARN_HOW_TEXT,
  KEPLR_WALLET_CONNECT_SUBTITLE,
  KEPLR_WALLET_CONNECT_TITLE,
} from '../organisms/RegistryLayout/RegistryLayout.constants';

export const LayoutConnectWalletModal = (): JSX.Element => {
  const { _ } = useLingui();
  const [connectWalletModal, setConnectWalletModal] = useAtom(
    connectWalletModalAtom,
  );

  const setError = useSetAtom(errorBannerTextAtom);
  const { loaded, isConnected, connect } = useWallet();
  const { open, onClose } = connectWalletModal;
  const { activeAccount, privActiveAccount } = useAuth();

  const isWeb2UserWithoutWallet =
    !!privActiveAccount?.email && !activeAccount?.addr;

  const onCloseModal = useCallback(() => {
    setConnectWalletModal(atom => void (atom.open = false));
    if (onClose && !isConnected) onClose();
  }, [setConnectWalletModal, onClose, isConnected]);

  useEffect(() => {
    if (loaded && isConnected) onCloseModal();
  }, [isConnected, loaded, onCloseModal]);

  return (
    <>
      {open && !isWeb2UserWithoutWallet && (
        <ConnectWalletModal open={open ?? false} onClose={onCloseModal} />
      )}
      {open && isWeb2UserWithoutWallet && (
        <KeplrWalletConnectModal
          open={open ?? false}
          onClose={onCloseModal}
          helpLink={{
            href: KEPLR_LINK_URL,
            text: _(KEPLR_LINK_TEXT),
          }}
          button={{
            text: _(KEPLR_CONNECT_BUTTON),
            onClick: async () => {
              connect &&
                (await connect({
                  walletType: WalletType.Keplr,
                  doLogin: false,
                }));
            },
            startIcon: (
              <Image
                src={keplrWalletExtension}
                alt="keplr"
                className="w-[21px] mr-[8px]"
              />
            ),
          }}
          title={_(KEPLR_WALLET_CONNECT_TITLE)}
          subtitle={_(KEPLR_WALLET_CONNECT_SUBTITLE)}
          learnMoreText={_(KEPLR_WALLET_CONNECT_LEARN_HOW_TEXT)}
        />
      )}
      <ConnectWalletFlow
        isConnectModalOpened={!!open}
        setError={(e: unknown) => {
          setError(String(e));
          onCloseModal();
        }}
        onConnectModalClose={onCloseModal}
      />
    </>
  );
};
