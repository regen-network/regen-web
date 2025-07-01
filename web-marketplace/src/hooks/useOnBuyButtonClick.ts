import { useCallback, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { buyFromProjectIdAtom } from 'legacy-pages/BuyCredits/BuyCredits.atoms';
import { useRouter } from 'next/navigation';

import {
  chooseHowToPurchaseModalAtom,
  switchWalletModalAtom,
} from 'lib/atoms/modals.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

type OnBuyButtonClickParams = {
  projectId?: string;
  loading: boolean;
  cardSellOrders?: CardSellOrder[];
};
export const useOnBuyButtonClick = () => {
  const router = useRouter();

  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  const setChooseHowToPurchaseModal = useSetAtom(chooseHowToPurchaseModalAtom);

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
        router.push(`/project/${projectId}/buy`);
      } else {
        if (!activeWalletAddr) {
          // no connected wallet address
          setChooseHowToPurchaseModal(atom => {
            atom.open = true;
            atom.projectId = projectId;
          });
        } else {
          if (isConnected) {
            router.push(`/project/${projectId}/buy`);
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
      setBuyFromProjectIdAtom,
      setChooseHowToPurchaseModal,
      setSwitchWalletModalAtom,
      router,
    ],
  );

  useEffect(() => {
    // As soon as user connects to the right wallet address,
    // we navigate to the buy page
    if (buyFromProjectId && isConnected) {
      router.push(`/project/${buyFromProjectId}/buy`);
      setBuyFromProjectIdAtom('');
    }
  }, [buyFromProjectId, isConnected, router, setBuyFromProjectIdAtom]);

  return onBuyButtonClick;
};
