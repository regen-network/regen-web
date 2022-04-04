import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { MsgPut } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/tx';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { BasketPutModal } from 'web-components/lib/components/modal/BasketPutModal';
import { FormValues as BasketPutFormValues } from 'web-components/lib/components/form/BasketPutForm';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import { useEcocredits, useBasketsWithClasses } from '../hooks';
import useMsgClient from '../hooks/useMsgClient';
import {
  PortfolioTemplate,
  WithBasketsProps,
  withBaskets,
} from '../components/templates';
import { ProcessingModal, ConfirmationModal } from '../components/organisms';
// import { ReactComponent as Sell } from '../assets/svgs/sell.svg';
import { ReactComponent as PutInBasket } from '../assets/svgs/put-in-basket.svg';
import { ReactComponent as TakeFromBasket } from '../assets/svgs/take-from-basket.svg';
// import { ReactComponent as WithdrawIBC } from '../assets/svgs/withdraw-ibc.svg';
// import { ReactComponent as DepositIBC } from '../assets/svgs/deposit-ibc.svg';

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

  const handleConfirmationModalClose = (): void => {
    setIsConfirmationModalOpen(false);
    setDeliverTxResponse(undefined);
  };

  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    // TODO refetch basket/ecocredits data so it shows latest values
  };

  const { signAndBroadcast, setDeliverTxResponse, wallet, deliverTxResponse } =
    useMsgClient(handleTxQueued, handleTxDelivered);
  const accountAddress = wallet?.address;
  const credits = useEcocredits(accountAddress);
  const basketsWithClasses = useBasketsWithClasses(baskets);

  const [creditBaskets, setCreditBaskets] = useState<
    (QueryBasketResponse | undefined)[][]
  >([]);
  const [basketPutOpen, setBasketPutOpen] = useState<number>(-1);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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

  return (
    <>
      <PortfolioTemplate
        credits={credits}
        baskets={baskets}
        accountAddress={accountAddress}
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
                onClick: () => console.log(`TODO take from basket ${i}`),
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
            const msg = MsgPut.fromPartial({
              basketDenom: values.basketDenom,
              owner: wallet?.address,
              credits: [
                {
                  batchDenom: credits[basketPutOpen].batch_denom,
                  amount: values.amount?.toString(),
                },
              ],
            });
            await signAndBroadcast([msg]);
            setBasketPutOpen(-1);
          }}
        />
      )}
      <ProcessingModal
        open={!deliverTxResponse && isProcessingModalOpen}
        txHash={deliverTxResponse?.transactionHash}
        onClose={() => setIsProcessingModalOpen(false)}
      />
      {/* TODO Implement new confirmation modal */}
      <ConfirmationModal
        open={!!isConfirmationModalOpen || !!deliverTxResponse}
        onClose={handleConfirmationModalClose}
        data={deliverTxResponse}
      />
    </>
  );
};

export const MyEcocredits = withBaskets(WrappedMyEcocredits);
