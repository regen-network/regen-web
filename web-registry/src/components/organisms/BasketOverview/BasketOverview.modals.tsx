import { ERRORS } from 'config/errors';
import { useAtom } from 'jotai';

import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';
import { BasketTakeModal } from 'web-components/lib/components/modal/BasketTakeModal';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { basketDetailAtom } from 'pages/BasketDetails/BasketDetails.store';
import useBasketPutSubmit from 'pages/Dashboard/MyEcocredits/hooks/useBasketPutSubmit';
import useBasketTakeSubmit from 'pages/Dashboard/MyEcocredits/hooks/useBasketTakeSubmit';
import { OnTxSuccessfulProps } from 'pages/Dashboard/MyEcocredits/MyEcocredits.types';
import { useMsgClient } from 'hooks';

import {
  PUT_BASKET_LABEL,
  TAKE_BASKET_LABEL,
  VIEW_PORTFOLIO,
} from './BasketOverview.constants';
import { BasketPutData } from './hooks/useBasketPutData';
import { BasketTakeData } from './hooks/useBasketTakeData';

type Props = {
  basketPutData: BasketPutData;
  basketTakeData: BasketTakeData;
};

export const BasketOverviewModals = ({
  basketPutData,
  basketTakeData,
}: Props): JSX.Element => {
  const [{ isPutModalOpen, isTakeModalOpen }, setBasketDetailAtom] =
    useAtom(basketDetailAtom);
  const [, setProcessingModalAtom] = useAtom(processingModalAtom);
  const [, setErrorCodeAtom] = useAtom(errorCodeAtom);
  const [, setErrorModalAtom] = useAtom(errorModalAtom);
  const [, setTxSuccessfulModalAtom] = useAtom(txSuccessfulModalAtom);
  const { wallet } = useWallet();
  const accountAddress = wallet?.address ?? '';
  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

  // Modals callbacks
  const onClosePutModal = (): void =>
    setBasketDetailAtom(atom => void (atom.isPutModalOpen = false));

  const onCloseTakeModal = (): void =>
    setBasketDetailAtom(atom => void (atom.isTakeModalOpen = false));

  const onBroadcast = (): void => {
    if (isPutModalOpen) {
      onClosePutModal();
    }
    if (isTakeModalOpen) {
      onCloseTakeModal();
    }
    setProcessingModalAtom(atom => void (atom.open = true));
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
      atom.buttonTitle = VIEW_PORTFOLIO;
      atom.buttonLink = '/ecocredits/portfolio';
    });
  };

  const onError = (error?: Error): void => {
    setErrorCodeAtom(ERRORS.DEFAULT);
    setErrorModalAtom(atom => (atom.description = String(error)));
    setProcessingModalAtom(atom => void (atom.open = false));
  };

  const { signAndBroadcast } = useMsgClient();
  const { basketOption, basketInfo, credit, creditBatchDenoms } = basketPutData;
  const { basketToken } = basketTakeData;

  const basketPutSubmit = useBasketPutSubmit({
    accountAddress,
    baskets: basketInfo ? [basketInfo] : [],
    basketPutTitle: PUT_BASKET_LABEL,
    credit,
    onBroadcast,
    onTxSuccessful,
    onErrorCallback: onError,
    signAndBroadcast,
  });

  const basketTakeSubmit = useBasketTakeSubmit({
    accountAddress,
    baskets: basketInfo ? [basketInfo] : [],
    basketTakeTitle: TAKE_BASKET_LABEL,
    onBroadcast,
    onTxSuccessful,
    onErrorCallback: onError,
    signAndBroadcast,
  });

  return (
    <>
      <BasketPutModal
        open={isPutModalOpen}
        basketOptions={[basketOption]}
        availableTradableAmount={Number(credit.balance?.tradableAmount ?? '0')}
        batchDenoms={creditBatchDenoms}
        onClose={onClosePutModal}
        onSubmit={basketPutSubmit}
        onBatchDenomChange={batchDenom =>
          setBasketDetailAtom(
            atom => void (atom.creditBatchDenom = batchDenom ?? ''),
          )
        }
      />
      <BasketTakeModal
        open={isTakeModalOpen}
        accountAddress={accountAddress}
        basket={basketToken?.basket}
        basketDisplayDenom={basketToken?.metadata?.metadata?.display || ''}
        balance={
          parseInt(basketToken?.balance?.balance?.amount || '0') /
          Math.pow(10, basketToken?.basket?.exponent ?? 0)
        }
        mapboxToken={mapboxToken}
        onClose={onCloseTakeModal}
        onSubmit={basketTakeSubmit}
      />
    </>
  );
};
