import { ERRORS } from 'config/errors';
import { useAtom } from 'jotai';

import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';

import { errorCodeAtom } from 'lib/store/error.store';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/store/modals.store';

import { basketDetailAtom } from 'pages/BasketDetails/BasketDetails.store';
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
  const [{ isPutModalOpen }, setBasketDetailAtom] = useAtom(basketDetailAtom);
  const [, setProcessingModalAtom] = useAtom(processingModalAtom);
  const [, setErrorCodeAtom] = useAtom(errorCodeAtom);
  const [, setErrorModalAtom] = useAtom(errorModalAtom);
  const [, setTxSuccessfulModalAtom] = useAtom(txSuccessfulModalAtom);

  // Modals callbacks
  const onClosePutModal = (): void =>
    setBasketDetailAtom(atom => void (atom.isPutModalOpen = false));

  const onBroadcastPutModal = (): void => {
    onClosePutModal();
    setProcessingModalAtom(atom => void (atom.open = true));
  };

  const onError = (error?: Error): void => {
    setErrorCodeAtom(ERRORS.DEFAULT);
    setErrorModalAtom(atom => (atom.description = String(error)));
    setProcessingModalAtom(atom => void (atom.open = false));
  };

  const onTxSuccessful = ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps): void => {
    setProcessingModalAtom(atom => void (atom.open = false));
    setTxSuccessfulModalAtom(atom => {
      atom.open = true;
      atom.cardItems = cardItems;
      atom.title = title;
      atom.cardTitle = cardTitle;
      atom.buttonTitle = CLOSE_BUTTON_LABEL;
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
          setBasketDetailAtom(
            atom => void (atom.creditBatchDenom = batchDenom ?? ''),
          )
        }
      />
    </>
  );
};
