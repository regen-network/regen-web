import { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

import { KeplrWalletConnectModal } from 'web-components/src/components/modal/keplr-wallet-connect-modal/KeplrWalletConnectModal';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { ConnectWalletFlow } from '../ConnectWalletFlow/ConnectWalletFlow';
import { ConnectWalletModal } from './components/ConnectWalletModal/ConnectWalletModal';
import {
  KEPLR_CONNECT_BUTTON,
  KEPLR_LINK_TEXT,
  KEPLR_LINK_URL,
} from './RegistryLayout.constants';

export const RegistryLayoutConnectWalletModal = (): JSX.Element => {
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
            text: KEPLR_LINK_TEXT,
          }}
          button={{
            text: KEPLR_CONNECT_BUTTON,
            onClick: async () => {
              connect &&
                (await connect({
                  walletType: WalletType.Keplr,
                  doLogin: false,
                }));
            },
            startIcon: (
              <Box
                component="img"
                src={'/png/wallets/keplr-wallet-extension.png'}
                alt="keplr"
                sx={{ width: 21, mr: 2 }}
              />
            ),
          }}
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
