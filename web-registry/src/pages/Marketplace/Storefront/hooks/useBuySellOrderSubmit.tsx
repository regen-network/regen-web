import { useCallback } from 'react';
import { Box } from '@mui/material';
import { MsgBuyDirect } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';

import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';

import { UseStateSetter } from 'types/react/use-state';

import { BuyCreditsValues } from 'components/organisms';
import { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  BUY_SELL_ORDER_BUTTON,
  BUY_SELL_ORDER_HEADER,
  BUY_SELL_ORDER_TITLE,
} from '../Storefront.constants';

type Props = {
  accountAddress?: string;
  signAndBroadcast: SignAndBroadcastType;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalTitle: UseStateSetter<string>;
  setTxModalHeader: UseStateSetter<string>;
  setTxButtonTitle: UseStateSetter<string>;
  setSelectedSellOrder: UseStateSetter<number | null>;
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
      const disableAutoRetire = retirementAction === 'manual';
      const stateProvinceValue = stateProvince ? `-${stateProvince}` : '';
      const postalCodeValue = stateProvince ? ` ${postalCode}` : '';

      const msg = MsgBuyDirect.fromPartial({
        buyer: accountAddress,
        orders: [
          {
            sellOrderId: sellOrderId,
            bidPrice: { amount: String(price), denom: askDenom },
            disableAutoRetire,
            quantity: String(creditCount),
            retirementJurisdiction: disableAutoRetire
              ? ''
              : `${country}${stateProvinceValue}${postalCodeValue}`,
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
            label: disableAutoRetire ? 'NUMBER OF CREDITS' : 'amount retired',
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
