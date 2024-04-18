import { useCallback, useEffect, useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { WalletRepo } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react-lite';

import { UseStateSetter } from 'types/react/use-state';
import { useAuth } from 'lib/auth/auth';
import { WalletContextType } from 'lib/wallet/wallet';
import { KEPLR_MOBILE } from 'lib/wallet/wallet.constants';
import { ConnectParams } from 'lib/wallet/wallet.types';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';
import { DRAFT_ID } from 'pages/Dashboard/MyProjects/MyProjects.constants';
import { LoginModalState } from 'components/organisms/LoginModal/LoginModal.types';

type Props = {
  connect?: WalletContextType['connect'];
  connectWalletConnect?: WalletRepo['connect'];
  setModalState: UseStateSetter<LoginModalState>;
  onModalClose: () => void;
  navigateCreateProject?: NavigateFunction;
  isConnectingRef?: React.MutableRefObject<boolean>;
};

type Response = ({ walletType }: ConnectParams) => Promise<void>;

export const useConnectToWallet = ({
  connect,
  connectWalletConnect,
  onModalClose,
  navigateCreateProject,
  isConnectingRef,
}: Props): Response => {
  const { openView } = useChain('regen');
  const { isIssuer, isLoadingIsIssuer } = useProfileItems({});
  const { activeAccountId } = useAuth();
  const navigate = useNavigate();

  const connectToWallet = useCallback(
    async ({ walletType }: ConnectParams): Promise<void> => {
      if (connect && walletType === WalletType.Keplr) {
        if (isConnectingRef) isConnectingRef.current = true;
        await connect({ walletType });
        onModalClose();
      }
      if (
        connectWalletConnect &&
        walletType === WalletType.WalletConnectKeplr
      ) {
        onModalClose();
        openView();
        await connectWalletConnect(KEPLR_MOBILE, true);
      }
    },
    [connect, connectWalletConnect, onModalClose, openView],
  );

  return connectToWallet;
};
