import React, { useState, useEffect } from 'react';
import { useTheme, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  MsgSend,
  MsgRetire,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/tx';
import {
  MsgPut,
  MsgTake,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import {
  BasketPutModal,
  title as basketPutTitle,
} from 'web-components/lib/components/modal/BasketPutModal';
import {
  BasketTakeModal,
  title as basketTakeTitle,
} from 'web-components/lib/components/modal/BasketTakeModal';
import {
  CreditSendModal,
  title as creditSendTitle,
} from 'web-components/lib/components/modal/CreditSendModal';
import {
  CreditRetireModal,
  title as creditRetireTitle,
} from 'web-components/lib/components/modal/CreditRetireModal';

import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { FormValues as CreditSendFormValues } from 'web-components/lib/components/form/CreditSendForm';
import { RetireFormValues as CreditRetireFormValues } from 'web-components/lib/components/form/CreditRetireForm';
import { FormValues as BasketPutFormValues } from 'web-components/lib/components/form/BasketPutForm';
import { MsgTakeValues } from 'web-components/lib/components/form/BasketTakeForm';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import {
  useEcocredits,
  useBasketsWithClasses,
  useBasketTokens,
} from '../hooks';
import { BasketTokens } from '../hooks/useBasketTokens';
import useMsgClient from '../hooks/useMsgClient';
import {
  PortfolioTemplate,
  WithBasketsProps,
  withBaskets,
} from '../components/templates';
import { Link } from '../components/atoms';
// import { ReactComponent as Sell } from '../assets/svgs/sell.svg';
import { ReactComponent as PutInBasket } from '../assets/svgs/put-in-basket.svg';
import { ReactComponent as TakeFromBasket } from '../assets/svgs/take-from-basket.svg';
// import { ReactComponent as WithdrawIBC } from '../assets/svgs/withdraw-ibc.svg';
// import { ReactComponent as DepositIBC } from '../assets/svgs/deposit-ibc.svg';
import { useLedger } from '../ledger';
import { getHashUrl } from '../lib/block-explorer';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const WrappedMyEcocredits: React.FC<WithBasketsProps> = ({ baskets }) => {
  const styles = useStyles();
  const theme = useTheme();

  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };

  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle(undefined);
    setDeliverTxResponse(undefined);
    setError(undefined);
  };

  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    // Refetch basket/ecocredits data so it shows latest values
    fetchBasketTokens();
    fetchCredits();
  };

  const handleError = (): void => {
    setIsProcessingModalOpen(false);
  };

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || '';
  const {
    signAndBroadcast,
    setDeliverTxResponse,
    wallet,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const accountAddress = wallet?.address;
  const { credits, fetchCredits } = useEcocredits(accountAddress);
  const { basketTokens, fetchBasketTokens } = useBasketTokens(
    accountAddress,
    baskets,
  );
  const basketsWithClasses = useBasketsWithClasses(baskets);
  const { api } = useLedger();

  const [creditBaskets, setCreditBaskets] = useState<
    (QueryBasketResponse | undefined)[][]
  >([]);
  const [basketPutOpen, setBasketPutOpen] = useState<number>(-1);
  const [creditSendOpen, setCreditSendOpen] = useState<number>(-1);
  const [creditRetireOpen, setCreditRetireOpen] = useState<number>(-1);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [basketTakeTokens, setBasketTakeTokens] = useState<
    BasketTokens | undefined
  >(undefined);
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>(
    undefined,
  );
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);

  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);

  useEffect(() => {
    // Get available baskets to put credits into
    if (basketsWithClasses && basketsWithClasses.length > 0) {
      setCreditBaskets(
        credits.map(c =>
          basketsWithClasses.filter(b => b?.classes.includes(c.class_id)),
        ),
      );
    }
  }, [credits, basketsWithClasses]);

  const openTakeModal = (rowIndex: number): void => {
    const selectedBasketDenom =
      basketsWithClasses?.[rowIndex]?.basket?.basketDenom;
    if (selectedBasketDenom) {
      const selectedBasketTokens = basketTokens.find(
        bt => bt.basket.basketDenom === selectedBasketDenom,
      );
      setBasketTakeTokens(selectedBasketTokens);
    }
  };

  const basketTakeSubmit = async (values: MsgTakeValues): Promise<void> => {
    if (!api?.msgClient?.broadcast || !accountAddress) return Promise.reject();

    const amount = values?.amount;
    const basket = baskets?.baskets.find(
      b => b.basketDenom === values.basketDenom,
    );

    const msg = MsgTake.fromPartial({
      owner: accountAddress,
      basketDenom: values.basketDenom,
      amount,
      retirementLocation: values.retirementLocation || '',
      retireOnTake: values.retireOnTake || false,
    });

    const tx = {
      msgs: [msg],
      fee: undefined,
      memo: values?.retirementNote,
    };

    await signAndBroadcast(tx, () => setBasketTakeTokens(undefined));

    if (basket && amount) {
      setCardItems([
        {
          label: 'basket',
          value: { name: basket.name },
        },
        {
          label: 'amount',
          value: { name: parseInt(amount) / Math.pow(10, basket.exponent) },
        },
      ]);
      setTxModalTitle(basketTakeTitle);
    }
  };

  const creditSendSubmit = async (
    values: CreditSendFormValues,
  ): Promise<void> => {
    if (!api?.msgClient?.broadcast || !accountAddress) return Promise.reject();
    const batchDenom = credits[creditSendOpen].batch_denom;
    const recipient = values.recipient;
    const msg = MsgSend.fromPartial({
      sender: accountAddress,
      recipient,
      credits: [
        {
          batchDenom,
          tradableAmount: values.tradableAmount.toString(),
          retiredAmount: values.retiredAmount.toString(),
          retirementLocation: values.retirementLocation,
        },
      ],
    });

    const tx = {
      msgs: [msg],
      fee: undefined,
      memo: values?.note,
    };

    await signAndBroadcast(tx, () => setCreditSendOpen(-1));
    if (batchDenom && recipient) {
      setCardItems([
        {
          label: 'batch denom',
          value: { name: batchDenom },
        },
        {
          label: 'recipient',
          value: { name: recipient },
        },
      ]);
      setTxModalTitle(creditSendTitle);
    }
  };

  const basketPutSubmit = async (
    values: BasketPutFormValues,
  ): Promise<void> => {
    const amount = values.amount?.toString();
    const msg = MsgPut.fromPartial({
      basketDenom: values.basketDenom,
      owner: accountAddress,
      credits: [
        {
          batchDenom: credits[basketPutOpen].batch_denom,
          amount,
        },
      ],
    });
    await signAndBroadcast({ msgs: [msg] }, () => setBasketPutOpen(-1));
    const basket = baskets?.baskets.find(
      b => b.basketDenom === values.basketDenom,
    );
    if (basket && amount) {
      setCardItems([
        {
          label: 'basket',
          value: { name: basket.name },
        },
        {
          label: 'amount',
          value: { name: amount },
        },
      ]);
      setTxModalTitle(basketPutTitle);
    }
  };

  const creditRetireSubmit = async (
    values: CreditRetireFormValues,
  ): Promise<void> => {
    if (!api?.msgClient?.broadcast || !accountAddress) return Promise.reject();
    const batchDenom = credits[creditRetireOpen].batch_denom;
    const amount = values.retiredAmount.toString();
    const msg = MsgRetire.fromPartial({
      holder: accountAddress,
      location: values.retirementLocation,
      credits: [
        {
          batchDenom,
          amount,
        },
      ],
    });

    const tx = {
      msgs: [msg],
      fee: undefined,
      memo: values?.note,
    };

    await signAndBroadcast(tx, () => setCreditRetireOpen(-1));
    if (batchDenom && amount) {
      setCardItems([
        {
          label: 'batch denom',
          value: { name: batchDenom },
        },
        {
          label: 'number of credits',
          value: { name: amount },
        },
      ]);
      setTxModalTitle(creditRetireTitle);
    }
  };

  return (
    <>
      <PortfolioTemplate
        credits={credits}
        basketTokens={basketTokens}
        renderCreditActionButtons={
          credits.findIndex(c => Number(c.tradable_amount) > 0) > -1
            ? (i: number) => {
                // No CTA available without tradable credit for given credit batch
                if (Number(credits[i].tradable_amount) <= 0) {
                  return undefined;
                }
                const buttons = [
                  // Disabling for now until the marketplace is
                  // released on regen-ledger
                  // {
                  //   icon: <Sell />,
                  //   label: 'Sell',
                  //   // eslint-disable-next-line no-console
                  //   onClick: () => console.log(`TODO sell credit ${i}`),
                  // },
                  {
                    icon: (
                      <ArrowDownIcon
                        className={styles.arrow}
                        color={theme.palette.secondary.main}
                        direction="next"
                      />
                    ),
                    label: creditSendTitle,
                    onClick: () => setCreditSendOpen(i),
                  },
                  {
                    icon: (
                      <ArrowDownIcon
                        className={styles.arrow}
                        color={theme.palette.secondary.main}
                        direction="down"
                      />
                    ),
                    label: creditRetireTitle,
                    onClick: () => setCreditRetireOpen(i),
                  },
                ];

                // Only add ability to put credits into basket
                // if there's at least one basket that accepts those credits
                if (creditBaskets[i] && creditBaskets[i].length > 0) {
                  buttons.splice(1, 0, {
                    // buttons.splice(2, 0, { TODO: Replace once we had 'Sell'
                    icon: <PutInBasket />,
                    label: basketPutTitle,
                    onClick: () => setBasketPutOpen(i),
                  });
                }
                return <TableActionButtons buttons={buttons} />;
              }
            : // Hide full CTA column if no credits tradable for all credit batches
              undefined
        }
        renderBasketActionButtons={(i: number) => (
          <TableActionButtons
            buttons={[
              {
                icon: <TakeFromBasket />,
                label: basketTakeTitle,
                onClick: () => openTakeModal(i),
              },
              // This will be handled from osmosis
              // so hiding these for now
              // {
              //   icon: <WithdrawIBC />,
              //   label: 'Withdraw (IBC)',
              //   onClick: () => `TODO withdraw ${i}`,
              // },
              // {
              //   icon: <DepositIBC />,
              //   label: 'Deposit (IBC)',
              //   onClick: () => `TODO deposit ${i}`,
              // },
            ]}
          />
        )}
      />
      {creditSendOpen > -1 && !!accountAddress && (
        <CreditSendModal
          sender={accountAddress}
          batchDenom={credits[creditSendOpen].batch_denom}
          availableTradableAmount={Number(
            credits[creditSendOpen].tradable_amount,
          )}
          mapboxToken={mapboxToken}
          open={creditSendOpen > -1}
          onClose={() => setCreditSendOpen(-1)}
          onSubmit={creditSendSubmit}
        />
      )}
      {basketPutOpen > -1 && (
        <BasketPutModal
          basketOptions={
            creditBaskets[basketPutOpen]
              .map(b => ({
                label: b?.basket?.name,
                value: b?.basket?.basketDenom,
              }))
              .filter(v => v.label && v.value) as Option[]
          }
          availableTradableAmount={Number(
            credits[basketPutOpen].tradable_amount,
          )}
          batchDenom={credits[basketPutOpen].batch_denom}
          open={basketPutOpen > -1}
          onClose={() => setBasketPutOpen(-1)}
          onSubmit={basketPutSubmit}
        />
      )}
      {creditRetireOpen > -1 && !!accountAddress && (
        <CreditRetireModal
          batchDenom={credits[creditRetireOpen].batch_denom}
          availableTradableAmount={Number(
            credits[creditRetireOpen].tradable_amount,
          )}
          mapboxToken={mapboxToken}
          open={creditRetireOpen > -1}
          onClose={() => setCreditRetireOpen(-1)}
          onSubmit={creditRetireSubmit}
        />
      )}
      {!!basketTakeTokens?.basket && !!accountAddress && (
        <BasketTakeModal
          open={true}
          accountAddress={accountAddress}
          basket={basketTakeTokens?.basket}
          basketDisplayDenom={
            basketTakeTokens?.metadata?.metadata?.display || ''
          }
          balance={
            parseInt(basketTakeTokens?.balance?.balance?.amount || '0') /
            Math.pow(10, basketTakeTokens?.basket?.exponent)
          }
          mapboxToken={mapboxToken}
          onClose={() => setBasketTakeTokens(undefined)}
          onSubmit={basketTakeSubmit}
        />
      )}
      <ProcessingModal
        open={!deliverTxResponse && isProcessingModalOpen}
        onClose={() => setIsProcessingModalOpen(false)}
      />
      {!error && txHash && cardItems && txModalTitle && (
        <TxSuccessfulModal
          open={!error && (!!txModalTitle || !!deliverTxResponse)}
          onClose={handleTxModalClose}
          txHash={txHash}
          txHashUrl={txHashUrl}
          cardTitle={txModalTitle}
          cardItems={cardItems}
          linkComponent={Link}
          onViewPortfolio={handleTxModalClose}
        />
      )}
      {error && txModalTitle && (
        <TxErrorModal
          error={error}
          open={!!error && (!!txModalTitle || !!deliverTxResponse)}
          onClose={handleTxModalClose}
          txHash={txHash || ''}
          txHashUrl={txHashUrl}
          cardTitle={txModalTitle}
          linkComponent={Link}
          onViewPortfolio={handleTxModalClose}
        />
      )}
    </>
  );
};

export const MyEcocredits = withBaskets(WrappedMyEcocredits);
