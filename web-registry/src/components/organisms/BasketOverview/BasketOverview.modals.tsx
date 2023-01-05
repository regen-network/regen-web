import { ERRORS } from 'config/errors';

import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';

import { useGlobalSetStore } from 'lib/context/globalContext';

import {
  useBasketDetailSetStore,
  useBasketDetailStore,
} from 'pages/BasketDetails/BasketDetails.context';
import useBasketPutSubmit, {
  OnTxSuccessfulProps,
} from 'pages/Dashboard/MyEcocredits/hooks/useBasketPutSubmit';
import { useMsgClient } from 'hooks';

import {
  CLOSE_BUTTON_LABEL,
  PUT_BASKET_LABEL,
  TAKE_BASKET_LABEL,
} from './BasketOverview.constants';
import { BasketPutData } from './hooks/useBasketPutData';

type Props = {
  basketPutData: BasketPutData;
};

export const BasketOverviewModals = ({ basketPutData }: Props): JSX.Element => {
  const setBasketDetailStore = useBasketDetailSetStore();
  const setGlobalStore = useGlobalSetStore();
  const [isPutModalOpen] = useBasketDetailStore(store => store.isPutModalOpen);

  // Modals callbacks
  const onClosePutModal = (): void =>
    setBasketDetailStore({ isPutModalOpen: false });

  const onBroadcastPutModal = (): void => {
    onClosePutModal();
    setGlobalStore({ processingModal: { open: true } });
  };

  const onError = (error?: Error): void => {
    setGlobalStore({
      errorCode: ERRORS.DEFAULT,
      errorModal: { description: String(error) },
      processingModal: {
        open: false,
      },
    });
  };

  const onTxSuccessful = ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps): void => {
    setGlobalStore({
      processingModal: {
        open: false,
      },
      txSuccessfulModal: {
        open: true,
        cardItems,
        title,
        cardTitle,
        buttonTitle: CLOSE_BUTTON_LABEL,
      },
    });
  };

  const { signAndBroadcast, wallet } = useMsgClient();
  const accountAddress = wallet?.address;

  const { basketOption, basketInfo, credit, creditBatchDenoms } = basketPutData;

  const basketPutSubmit = useBasketPutSubmit({
    accountAddress,
    baskets: basketInfo ? [basketInfo] : [],
    basketPutTitle: PUT_BASKET_LABEL,
    basketTakeTitle: TAKE_BASKET_LABEL,
    credit,
    onBroadcast: onBroadcastPutModal,
    onTxSuccessful,
    onErrorCallback: onError,
    signAndBroadcast,
  });

  return (
    <>
      <BasketPutModal
        basketOptions={[basketOption]}
        availableTradableAmount={Number(credit.balance?.tradableAmount ?? '0')}
        batchDenoms={creditBatchDenoms}
        open={isPutModalOpen}
        onClose={onClosePutModal}
        onSubmit={basketPutSubmit}
        onBatchDenomChange={batchDenom =>
          setBasketDetailStore({ creditBatchDenom: batchDenom })
        }
      />
    </>
  );
};
