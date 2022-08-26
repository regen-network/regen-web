import { useCallback } from 'react';
import { Box } from '@mui/material';
import { MsgBuyDirect } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';

import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';
import { getJurisdictionIsoCode } from 'web-components/lib/utils/locationStandard';

import { UseStateSetter } from 'types/react/use-state';
import { microToDenom } from 'lib/denom.utils';

import { BuyCreditsValues } from 'components/organisms';
import { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  BUY_SELL_ORDER_HEADER,
  BUY_SELL_ORDER_TITLE,
} from '../Storefront.constants';

type Props = {
  accountAddress?: string;
  buttonTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalTitle: UseStateSetter<string>;
  setTxModalHeader: UseStateSetter<string>;
  setTxButtonTitle: UseStateSetter<string>;
  setSelectedSellOrder?: UseStateSetter<number | null>;
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
  buttonTitle,
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
      const isTradeable = retirementAction === 'manual';

      const msg = MsgBuyDirect.fromPartial({
        buyer: accountAddress,
        orders: [
          {
            sellOrderId: sellOrderId,
            bidPrice: { amount: String(price), denom: askDenom },
            disableAutoRetire: isTradeable,
            quantity: String(creditCount),
            retirementJurisdiction: isTradeable
              ? ''
              : getJurisdictionIsoCode({
                  country,
                  stateProvince,
                  postalCode,
                }),
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: retirementNote,
      };

      await signAndBroadcast(
        tx,
        () => setSelectedSellOrder && setSelectedSellOrder(null),
      );

      if (batchDenom && creditCount) {
        setCardItems([
          {
            label: 'total purchase price',
            value: {
              name: String(microToDenom(price) * creditCount),
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
            label: isTradeable ? 'NUMBER OF CREDITS' : 'amount retired',
            value: { name: getFormattedNumber(creditCount) },
          },
        ]);
        setTxModalHeader(BUY_SELL_ORDER_HEADER);
        setTxModalTitle(BUY_SELL_ORDER_TITLE);
        setTxButtonTitle(buttonTitle);
      }
    },
    [
      accountAddress,
      signAndBroadcast,
      setSelectedSellOrder,
      setCardItems,
      setTxModalHeader,
      setTxModalTitle,
      setTxButtonTitle,
      buttonTitle,
    ],
  );

  return buySellOrderSubmit;
};

export default useBuySellOrderSubmit;
