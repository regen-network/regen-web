import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';

import {
  connectWalletModalAtom,
  switchWalletModalAtom,
} from 'lib/atoms/modals.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { buyFromProjectIdAtom } from 'pages/BuyCredits/BuyCredits.atoms';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

type OnBuyButtonClickParams = {
  projectId?: string;
  loading: boolean;
  cardSellOrders?: CardSellOrder[];
};
export const useOnBuyButtonClick = () => {
  const navigate = useNavigate();

  const setConnectWalletModal = useSetAtom(connectWalletModalAtom);
  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  const [buyFromProjectId, setBuyFromProjectIdAtom] =
    useAtom(buyFromProjectIdAtom);
  const { activeWalletAddr, isConnected } = useWallet();

  const onBuyButtonClick = useCallback(
    ({ projectId, loading, cardSellOrders }: OnBuyButtonClickParams) => {
      if (loading || !projectId) return;

      if (
        // some credits are available for fiat purchase
        cardSellOrders &&
        cardSellOrders.length > 0
      ) {
        // so we can always go to the buy page,
        // no matter if the user is logged in/connected to a wallet or not
        navigate(`/project/${projectId}/buy`);
      } else {
        if (!activeWalletAddr) {
          // no connected wallet address
          setBuyFromProjectIdAtom(projectId);
          setConnectWalletModal(atom => void (atom.open = true));
        } else {
          if (isConnected) {
            navigate(`/project/${projectId}/buy`);
          } else {
            // user logged in with web2 but not connected to the wallet address associated to his/er account
            setBuyFromProjectIdAtom(projectId);
            setSwitchWalletModalAtom(atom => void (atom.open = true));
          }
        }
      }
    },
    [
      activeWalletAddr,
      isConnected,
      navigate,
      setBuyFromProjectIdAtom,
      setConnectWalletModal,
      setSwitchWalletModalAtom,
    ],
  );

  useEffect(() => {
    // As soon as user connects to the right wallet address,
    // we navigate to the buy page
    if (buyFromProjectId && isConnected) {
      navigate(`/project/${buyFromProjectId}/buy`);
      setBuyFromProjectIdAtom('');
    }
  }, [buyFromProjectId, isConnected, navigate, setBuyFromProjectIdAtom]);

  return onBuyButtonClick;
};
