import { useCallback } from 'react';
import { Box } from '@mui/material';
import { MsgSell } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';

import { FormValues as CreateSellOrderFormValues } from 'web-components/lib/components/form/CreateSellOrderForm';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';

import { UseStateSetter } from 'types/react/use-state';
import { denomToMicro } from 'lib/denom.utils';

import { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  CREATE_SELL_ORDER_BUTTON,
  CREATE_SELL_ORDER_HEADER,
} from '../MyEcocredits.contants';

type Props = {
  accountAddress?: string;
  signAndBroadcast: SignAndBroadcastType;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxButtonTitle: UseStateSetter<string | undefined>;
  setSellOrderCreateOpen: UseStateSetter<number>;
};

type ReturnType = (values: CreateSellOrderFormValues) => Promise<void>;

const PRICE_DENOM = 'uregen';

const useCreateSellOrderSubmit = ({
  accountAddress,
  signAndBroadcast,
  setTxModalHeader,
  setCardItems,
  setTxButtonTitle,
  setSellOrderCreateOpen,
}: Props): ReturnType => {
  const createSellOrderSubmit = useCallback(
    async (values: CreateSellOrderFormValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();
      const { amount, batchDenom, price, disableAutoRetire } = values;

      // convert to udenom
      const priceInMicro = price ? String(denomToMicro(price)) : ''; // TODO: When other currencies, check for micro denom before converting
      const msg = MsgSell.fromPartial({
        seller: accountAddress,
        orders: [
          {
            batchDenom,
            quantity: String(amount),
            askPrice: { denom: PRICE_DENOM, amount: priceInMicro },
            disableAutoRetire,
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: undefined,
      };

      signAndBroadcast(tx, () => setSellOrderCreateOpen(-1));

      if (batchDenom && amount) {
        setCardItems([
          {
            label: 'batch denom',
            value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
          },
          {
            label: 'price per credit',
            value: {
              name: String(price),
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
            label: 'number of credits',
            value: { name: getFormattedNumber(amount) },
          },
        ]);
        setTxModalHeader(CREATE_SELL_ORDER_HEADER);
        setTxButtonTitle(CREATE_SELL_ORDER_BUTTON);
      }
    },
    [
      accountAddress,
      setCardItems,
      setTxModalHeader,
      setSellOrderCreateOpen,
      setTxButtonTitle,
      signAndBroadcast,
    ],
  );

  return createSellOrderSubmit;
};

export default useCreateSellOrderSubmit;
