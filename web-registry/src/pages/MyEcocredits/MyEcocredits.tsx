import { useTheme } from '@mui/material';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import React, { useState } from 'react';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import {
  BasketPutModal,
  title as basketPutTitle,
} from 'web-components/lib/components/modal/BasketPutModal';
import {
  BasketTakeModal,
  title as basketTakeTitle,
} from 'web-components/lib/components/modal/BasketTakeModal';
import {
  CreditRetireModal,
  title as creditRetireTitle,
} from 'web-components/lib/components/modal/CreditRetireModal';
import {
  CreditSendModal,
  title as creditSendTitle,
} from 'web-components/lib/components/modal/CreditSendModal';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
// import { ReactComponent as WithdrawIBC } from '../../assets/svgs/withdraw-ibc.svg';
// import { ReactComponent as DepositIBC } from '../../assets/svgs/deposit-ibc.svg';
// import { ReactComponent as Sell } from '../../assets/svgs/sell.svg';
import { ReactComponent as PutInBasket } from '../../assets/svgs/put-in-basket.svg';
import { ReactComponent as TakeFromBasket } from '../../assets/svgs/take-from-basket.svg';
import { Link } from '../../components/atoms';
import { Portfolio } from '../../components/organisms/Portfolio';
import {
  useBasketsWithClasses,
  useBasketTokens,
  useEcocredits,
} from '../../hooks';
import { BasketTokens } from '../../hooks/useBasketTokens';
import useMsgClient from '../../hooks/useMsgClient';
import useQueryBaskets from '../../hooks/useQueryBaskets';
import { useLedger } from '../../ledger';
import { getHashUrl } from '../../lib/block-explorer';
import useBasketPutSubmit from './hooks/useBasketPutSubmit';
import useBasketTakeSubmit from './hooks/useBasketTakeSubmit';
import useCreditRetireSubmit from './hooks/useCreditRetireSubmit';
import useCreditSendSubmit from './hooks/useCreditSendSubmit';
import { default as useStyles } from './hooks/useMyEcocreditsStyles';
import useOpenTakeModal from './hooks/useOpenTakeModal';
import useUpdateCrediBaskets from './hooks/useUpdateCrediBaskets';

export const MyEcocredits = (): JSX.Element => {
  const [basketPutOpen, setBasketPutOpen] = useState<number>(-1);
  const [creditSendOpen, setCreditSendOpen] = useState<number>(-1);
  const [creditRetireOpen, setCreditRetireOpen] = useState<number>(-1);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [creditBaskets, setCreditBaskets] = useState<
    (QueryBasketResponse | undefined)[][]
  >([]);
  const [basketTakeTokens, setBasketTakeTokens] = useState<
    BasketTokens | undefined
  >(undefined);
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>(
    undefined,
  );

  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };

  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle(undefined);
    setDeliverTxResponse(undefined);
    setError(undefined);
  };

  const handleError = (): void => {
    setIsProcessingModalOpen(false);
  };

  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    // Refetch basket/ecocredits data so it shows latest values
    fetchBasketTokens();
    fetchCredits();
  };

  const {
    signAndBroadcast,
    setDeliverTxResponse,
    wallet,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);

  const { api } = useLedger();
  const styles = useStyles();
  const theme = useTheme();
  const baskets = useQueryBaskets();
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const accountAddress = wallet?.address;
  const { credits, fetchCredits } = useEcocredits(accountAddress);
  const basketsWithClasses = useBasketsWithClasses(baskets);
  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || '';
  const { basketTokens, fetchBasketTokens } = useBasketTokens(
    accountAddress,
    baskets,
  );

  useUpdateCrediBaskets({ basketsWithClasses, credits, setCreditBaskets });

  const openTakeModal = useOpenTakeModal({
    basketTokens,
    basketsWithClasses,
    setBasketTakeTokens,
  });

  const basketTakeSubmit = useBasketTakeSubmit({
    api,
    accountAddress,
    basketTakeTitle,
    baskets,
    setBasketTakeTokens,
    setCardItems,
    setTxModalTitle,
    signAndBroadcast,
  });

  const creditSendSubmit = useCreditSendSubmit({
    api,
    accountAddress,
    creditSendOpen,
    creditSendTitle,
    credits,
    setCardItems,
    setCreditSendOpen,
    setTxModalTitle,
    signAndBroadcast,
  });

  const basketPutSubmit = useBasketPutSubmit({
    accountAddress,
    baskets,
    basketPutOpen,
    basketPutTitle,
    basketTakeTitle,
    credits,
    setBasketPutOpen,
    setBasketTakeTokens,
    setCardItems,
    setTxModalTitle,
    signAndBroadcast,
  });

  const creditRetireSubmit = useCreditRetireSubmit({
    api,
    accountAddress,
    creditRetireOpen,
    creditRetireTitle,
    credits,
    setCardItems,
    setCreditRetireOpen,
    setTxModalTitle,
    signAndBroadcast,
  });

  return (
    <>
      <Portfolio
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
