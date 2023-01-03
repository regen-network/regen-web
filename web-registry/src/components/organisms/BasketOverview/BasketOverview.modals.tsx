import { useState } from 'react';

import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';
import { Item } from 'web-components/lib/components/modal/TxModal';

import {
  useBasketDetailSetStore,
  useBasketDetailStore,
} from 'pages/BasketDetails/BasketDetails.context';
import useBasketPutSubmit from 'pages/Dashboard/MyEcocredits/hooks/useBasketPutSubmit';
import { useFetchBaskets } from 'pages/Dashboard/MyEcocredits/hooks/useFetchBaskets';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { useMsgClient } from 'hooks';
import { BasketTokens } from 'hooks/useBasketTokens';

import {
  PUT_BASKET_LABEL,
  TAKE_BASKET_LABEL,
} from './BasketOverview.constants';
import { BasketPutData } from './hooks/useBasketPutData';

type Props = {
  basketPutData: BasketPutData;
};

export const BasketOverviewModals = ({ basketPutData }: Props): JSX.Element => {
  const setStore = useBasketDetailSetStore();
  const [isPutModalOpen] = useBasketDetailStore(store => store.isPutModalOpen);

  const [, setCardItems] = useState<Item[] | undefined>();
  const [, setBasketTakeTokens] = useState<BasketTokens | undefined>();
  const [, setTxModalHeader] = useState<string | undefined>();
  const [, setTxModalTitle] = useState<string | undefined>();
  const [basketPutOpen, setBasketPutOpen] = useState<number>(-1);

  const { credits } = useFetchEcocredits();
  const { baskets } = useFetchBaskets({ credits });

  const handleTxQueued = (): void => void 0;
  const handleTxDelivered = (): void => void 0;
  const handleError = (): void => void 0;

  const { signAndBroadcast, wallet } = useMsgClient(
    handleTxQueued,
    handleTxDelivered,
    handleError,
  );
  const accountAddress = wallet?.address;

  const { basketOption, creditBatchDenoms, totalTradableCredits } =
    basketPutData;

  const basketPutSubmit = useBasketPutSubmit({
    accountAddress,
    baskets,
    basketPutOpen,
    basketPutTitle: PUT_BASKET_LABEL,
    basketTakeTitle: TAKE_BASKET_LABEL,
    credits,
    setBasketPutOpen,
    setBasketTakeTokens,
    setCardItems,
    setTxModalHeader,
    setTxModalTitle,
    signAndBroadcast,
  });

  return (
    <>
      <BasketPutModal
        basketOptions={[basketOption]}
        availableTradableAmount={totalTradableCredits}
        batchDenoms={creditBatchDenoms}
        open={isPutModalOpen}
        onClose={() => setStore({ isPutModalOpen: false })}
        onSubmit={basketPutSubmit}
      />
    </>
  );
};
