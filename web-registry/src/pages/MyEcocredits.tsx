import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { MsgPut } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';
import {
  TxSuccessfulModal,
  Item,
} from 'web-components/lib/components/modal/TxSuccessfulModal';
import { FormValues as BasketPutFormValues } from 'web-components/lib/components/form/BasketPutForm';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { MsgTake } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';

import {
  useEcocredits,
  useBasketsWithClasses,
  useTakeBasketTokens,
  useBasketTokens,
} from '../hooks';
import useMsgClient from '../hooks/useMsgClient';
import {
  PortfolioTemplate,
  WithBasketsProps,
  withBaskets,
} from '../components/templates';
import { BasketTakeModal } from '../components/molecules';
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

  // TODO handle error when signing and broadcasting tx
  const { signAndBroadcast, setDeliverTxResponse, wallet, deliverTxResponse } =
    useMsgClient(handleTxQueued, handleTxDelivered);
  const accountAddress = wallet?.address;
  const { credits, fetchCredits } = useEcocredits(accountAddress);
  const { basketTokens, fetchBasketTokens } = useBasketTokens(
    accountAddress,
    baskets,
  );
  const basketsWithClasses = useBasketsWithClasses(baskets);
  const { signTake } = useTakeBasketTokens();
  const { api } = useLedger();

  const [creditBaskets, setCreditBaskets] = useState<
    (QueryBasketResponse | undefined)[][]
  >([]);
  const [basketPutOpen, setBasketPutOpen] = useState<number>(-1);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [selectedBasketDenom, setSelectedBasketDenom] = useState('');
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
    if (!accountAddress) return;
    const selectedBasket = basketsWithClasses?.[rowIndex]?.basket;
    if (selectedBasket?.basketDenom) {
      setSelectedBasketDenom(selectedBasket.basketDenom);
    }
  };

  const handleTakeCredits = async (values: any): Promise<void> => {
    const msgClient = api?.msgClient;
    if (!msgClient?.broadcast || !accountAddress) return Promise.reject();

    console.log('MsgTake ', values);
    // const txBytes = await signTake(
    //   accountAddress,
    //   values.basketDenom,
    //   values.amount,
    //   values.retirementLocation,
    //   values.retireOnTake,
    // );
    // onTxQueued(txBytes);
    // console.log('txBytes ', txBytes);

    const msg = MsgTake.fromPartial({
      owner: accountAddress,
      basketDenom: values.basketDenom,
      amount: values?.amount?.toString(),
      retirementLocation: values.retirementLocation || '',
      retireOnTake: values.retireOnTake || false,
    });

    await signAndBroadcast([msg]);
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
                // eslint-disable-next-line no-console
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
          onSubmit={async (values: BasketPutFormValues) => {
            setBasketPutOpen(-1);
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
            await signAndBroadcast([msg]);
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
          }}
        />
      )}
      {baskets && !!selectedBasketDenom && !!accountAddress && (
        <BasketTakeModal
          open={!!selectedBasketDenom}
          accountAddress={accountAddress}
          basketDenom={selectedBasketDenom}
          baskets={baskets}
          onClose={() => setSelectedBasketDenom('')}
          onSubmit={handleTakeCredits}
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
