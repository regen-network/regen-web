import { Box } from '@mui/material';
import { useCallback } from 'react';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';
import { BuyCreditsValues } from '../../../../components/organisms';
import { SignAndBroadcastType } from '../../../../hooks/useMsgClient';
import { useStateSetter } from '../../../../types/react/use-state';
import { MsgBuyDirect } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import {
  BUY_SELL_ORDER_BUTTON,
  BUY_SELL_ORDER_HEADER,
  BUY_SELL_ORDER_TITLE,
} from '../Storefront.constants';

type Props = {
  accountAddress?: string;
  signAndBroadcast: SignAndBroadcastType;
  setCardItems: useStateSetter<Item[] | undefined>;
  setTxModalTitle: useStateSetter<string>;
  setTxModalHeader: useStateSetter<string>;
  setTxButtonTitle: useStateSetter<string>;
  setSelectedSellOrder: useStateSetter<number | null>;
};

type ReturnType = (values: BuyCreditsValues) => Promise<void>;

const useBuySellOrderSubmit = ({
  accountAddress,
  signAndBroadcast,
  setTxModalHeader,
  setCardItems,
  setTxModalTitle,
  setTxButtonTitle,
  setSelectedSellOrder,
}: Props): ReturnType => {
  const buySellOrderSubmit = useCallback(
    async (values: BuyCreditsValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();

      const {
        batchDenom,
        price,
        creditCount,
        sellOrderId,
        retirementNote,
        stateProvince,
        retirementAction,
        country,
        askDenom,
        postalCode,
      } = values;

      const msg = MsgBuyDirect.fromPartial({
        buyer: accountAddress,
        orders: [
          {
            sellOrderId: sellOrderId,
            bidPrice: { amount: String(creditCount), denom: askDenom },
            disableAutoRetire: retirementAction === 'manual',
            quantity: String(creditCount),
            retirementJurisdiction: `${stateProvince} ${postalCode} ${country}`,
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: retirementNote,
      };

      signAndBroadcast(tx, () => setSelectedSellOrder(null));

      if (batchDenom && creditCount) {
        setCardItems([
          {
            label: 'total purchase price',
            value: {
              name: String(price * creditCount),
              icon: (
                <Box
                  sx={{
                    mr: '4px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                  }}
                >
                  <RegenTokenIcon />
                </Box>
              ),
            },
          },
          {
            label: 'batch denom',
            value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
          },
          {
            label: 'amount retired',
            value: { name: getFormattedNumber(creditCount) },
          },
        ]);
        setTxModalHeader(BUY_SELL_ORDER_HEADER);
        setTxModalTitle(BUY_SELL_ORDER_TITLE);
        setTxButtonTitle(BUY_SELL_ORDER_BUTTON);
      }
    },
    [
      setCardItems,
      setTxModalTitle,
      setTxModalHeader,
      setSelectedSellOrder,
      setTxButtonTitle,
      accountAddress,
      signAndBroadcast,
    ],
  );

  return buySellOrderSubmit;
};

export default useBuySellOrderSubmit;
