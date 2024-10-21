import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { ERRORS } from 'config/errors';
import { useAtom, useSetAtom } from 'jotai';

import { BasketPutModal } from 'web-components/src/components/modal/BasketPutModal';
import { BasketTakeModal } from 'web-components/src/components/modal/BasketTakeModal';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import {
  errorModalAtom,
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import {
  AMOUNT_LABEL,
  BASKET_LABEL,
  BASKET_PUT_SUBMIT_LABEL,
  BASKET_TAKE_AMOUNT_ERROR_TEXT,
  BASKET_TAKE_SUBMIT_LABEL,
  BATCH_DESCRIPTION,
  BATCH_LABEL,
  getBottomFieldsTextMapping,
  INSUFFICIENT_CREDITS,
  INVALID_AMOUNT,
  INVALID_DECIMAL_COUNT,
  INVALID_MEMO_LENGTH,
  MAX_LABEL,
  REQUIRED_MESSAGE,
  RETIRE_ON_TAKE_LABEL,
  RETIRE_ON_TAKE_TOOLTIP,
  RETIREMENT_INFO_TEXT,
  STATE_PROVINCE_ERROR_TEXT,
  SUBMIT_ERROR_TEXT,
} from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

import { basketDetailAtom } from 'pages/BasketDetails/BasketDetails.store';
import useBasketPutSubmit from 'pages/Dashboard/MyEcocredits/hooks/useBasketPutSubmit';
import useBasketTakeSubmit from 'pages/Dashboard/MyEcocredits/hooks/useBasketTakeSubmit';
import {
  BASKET_TAKE_SUBTITLE,
  BASKET_TAKE_TITLE,
} from 'pages/Dashboard/MyEcocredits/MyEcocredits.constants';
import { OnTxSuccessfulProps } from 'pages/Dashboard/MyEcocredits/MyEcocredits.types';
import { useMsgClient } from 'hooks';

import { AVAILABLE_LABEL } from '../../../lib/constants/shared.constants';
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
  const { _ } = useLingui();
  const [{ isPutModalOpen, isTakeModalOpen }, setBasketDetailAtom] =
    useAtom(basketDetailAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const setErrorCodeAtom = useSetAtom(errorCodeAtom);
  const setErrorModalAtom = useSetAtom(errorModalAtom);
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const { wallet } = useWallet();
  const accountAddress = wallet?.address ?? '';
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || '';
  const bottomFieldsTextMapping = useMemo(
    () => getBottomFieldsTextMapping(_),
    [_],
  );

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
      atom.buttonTitle = _(VIEW_PORTFOLIO);
      atom.buttonLink = '/dashboard/portfolio';
    });
  };

  const onError = (error?: Error): void => {
    setErrorCodeAtom(ERRORS.DEFAULT);
    setErrorModalAtom(atom => void (atom.description = String(error)));
    setProcessingModalAtom(atom => void (atom.open = false));
  };

  const { signAndBroadcast } = useMsgClient();
  const { basketOption, basketInfo, credit, creditBatchDenoms } = basketPutData;
  const { basketToken } = basketTakeData;

  const basketPutSubmit = useBasketPutSubmit({
    accountAddress,
    baskets: basketInfo ? [basketInfo] : [],
    basketPutTitle: _(PUT_BASKET_LABEL),
    credit,
    onBroadcast,
    onTxSuccessful,
    onErrorCallback: onError,
    signAndBroadcast,
  });

  const basketTakeSubmit = useBasketTakeSubmit({
    accountAddress,
    baskets: basketInfo ? [basketInfo] : [],
    basketTakeTitle: _(TAKE_BASKET_LABEL),
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
        batchLabel={_(BATCH_LABEL)}
        batchDescription={BATCH_DESCRIPTION}
        basketLabel={_(BASKET_LABEL)}
        amountLabel={_(AMOUNT_LABEL)}
        submitLabel={_(BASKET_PUT_SUBMIT_LABEL)}
        submitErrorText={_(SUBMIT_ERROR_TEXT)}
        title={_(BASKET_PUT_SUBMIT_LABEL)}
        maxLabel={_(MAX_LABEL)}
        availableLabel={_(AVAILABLE_LABEL)}
        requiredMessage={_(REQUIRED_MESSAGE)}
        invalidAmount={_(INVALID_AMOUNT)}
        insufficientCredits={_(INSUFFICIENT_CREDITS)}
        invalidDecimalCount={_(INVALID_DECIMAL_COUNT)}
      />
      <BasketTakeModal
        open={isTakeModalOpen}
        title={_(BASKET_TAKE_TITLE)}
        subtitle={_(BASKET_TAKE_SUBTITLE)}
        accountAddress={accountAddress}
        basket={basketToken?.basket}
        basketDisplayDenom={basketToken?.metadata?.metadata?.display || ''}
        balance={
          parseInt(basketToken?.balance?.balance?.amount || '0') /
          Math.pow(10, basketToken?.basket?.exponent ?? 0)
        }
        mapboxToken={mapboxToken}
        amountErrorText={_(BASKET_TAKE_AMOUNT_ERROR_TEXT)}
        amountLabel={_(AMOUNT_LABEL)}
        retireOnTakeLabel={_(RETIRE_ON_TAKE_LABEL)}
        retireOnTakeTooltip={_(RETIRE_ON_TAKE_TOOLTIP)}
        submitLabel={_(BASKET_TAKE_SUBMIT_LABEL)}
        submitErrorText={_(SUBMIT_ERROR_TEXT)}
        stateProvinceErrorText={_(STATE_PROVINCE_ERROR_TEXT)}
        retirementInfoText={_(RETIREMENT_INFO_TEXT)}
        bottomTextMapping={bottomFieldsTextMapping}
        onClose={onCloseTakeModal}
        onSubmit={basketTakeSubmit}
        maxLabel={_(MAX_LABEL)}
        availableLabel={_(AVAILABLE_LABEL)}
        requiredMessage={_(REQUIRED_MESSAGE)}
        invalidAmount={_(INVALID_AMOUNT)}
        insufficientCredits={_(INSUFFICIENT_CREDITS)}
        invalidDecimalCount={_(INVALID_DECIMAL_COUNT)}
        invalidMemoLength={_(INVALID_MEMO_LENGTH)}
      />
    </>
  );
};
