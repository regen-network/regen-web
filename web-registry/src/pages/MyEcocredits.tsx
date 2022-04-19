import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import {
  MsgPut,
  MsgTake,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';
import { BasketTakeModal } from 'web-components/lib/components/modal/BasketTakeModal';
import {
  TxSuccessfulModal,
  Item,
} from 'web-components/lib/components/modal/TxSuccessfulModal';
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

  const handleTxSuccessfulModalClose = (): void => {
    setCardItems(undefined);
    setIsTxSuccessfulModalTitle(undefined);
    setDeliverTxResponse(undefined);
  };

  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    // Refetch basket/ecocredits data so it shows latest values
    fetchBasketTokens();
    fetchCredits();
  };

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || '';
  // TODO handle error when signing and broadcasting tx
  // https://github.com/regen-network/regen-registry/issues/884
  const { signAndBroadcast, setDeliverTxResponse, wallet, deliverTxResponse } =
    useMsgClient(handleTxQueued, handleTxDelivered);
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
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [basketTakeTokens, setBasketTakeTokens] = useState<
    BasketTokens | undefined
  >(undefined);
  const [isTxSuccessfulModalTitle, setIsTxSuccessfulModalTitle] = useState<
    string | undefined
  >(undefined);
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);

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
    const msgClient = api?.msgClient;
    if (!msgClient?.broadcast || !accountAddress) return Promise.reject();

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

    const message = {
      msgs: [msg],
      fee: undefined,
      memo: values?.retirementNote,
    };

    await signAndBroadcast(message, () => setBasketTakeTokens(undefined));

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
    }
    setIsTxSuccessfulModalTitle('Take from basket');
  };

  const basketPutSubmit = async (
    values: BasketPutFormValues,
  ): Promise<void> => {
    const amount = values.amount?.toString();
    const msg = MsgPut.fromPartial({
      basketDenom: values.basketDenom,
      owner: wallet?.address,
      credits: [
        {
          batchDenom: credits[basketPutOpen].batch_denom,
          amount: amount,
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
      setIsTxSuccessfulModalTitle('Put in basket');
    }
  };

  return (
    <>
      <PortfolioTemplate
        credits={credits}
        basketTokens={basketTokens}
        renderCreditActionButtons={(i: number) => {
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
              label: 'Send',
              // eslint-disable-next-line no-console
              onClick: () => console.log(`TODO send credit ${i}`),
            },
            {
              icon: (
                <ArrowDownIcon
                  className={styles.arrow}
                  color={theme.palette.secondary.main}
                  direction="down"
                />
              ),
              label: 'Retire',
              // eslint-disable-next-line no-console
              onClick: () => console.log(`TODO retire credit ${i}`),
            },
          ];

          // Only add ability to put credits into basket
          // if there's at least one basket that accepts those credits
          if (creditBaskets[i] && creditBaskets[i].length > 0) {
            buttons.splice(1, 0, {
              // buttons.splice(2, 0, { TODO: Replace once we had 'Sell'
              icon: <PutInBasket />,
              label: 'Put in basket',
              onClick: () => setBasketPutOpen(i),
            });
          }
          return <TableActionButtons buttons={buttons} />;
        }}
        renderBasketActionButtons={(i: number) => (
          <TableActionButtons
            buttons={[
              {
                icon: <TakeFromBasket />,
                label: 'Take from basket',
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
      {deliverTxResponse?.transactionHash &&
        cardItems &&
        isTxSuccessfulModalTitle && (
          <TxSuccessfulModal
            open={!!isTxSuccessfulModalTitle || !!deliverTxResponse}
            onClose={handleTxSuccessfulModalClose}
            txHash={deliverTxResponse?.transactionHash}
            txHashUrl={getHashUrl(deliverTxResponse?.transactionHash)}
            cardTitle={isTxSuccessfulModalTitle}
            cardItems={cardItems}
            linkComponent={Link}
            onViewPortfolio={handleTxSuccessfulModalClose}
          />
        )}
    </>
  );
};

export const MyEcocredits = withBaskets(WrappedMyEcocredits);
