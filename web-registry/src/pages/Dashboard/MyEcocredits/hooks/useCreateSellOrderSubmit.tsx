import { useCallback } from 'react';
import { Box } from '@mui/material';
import { MsgSell } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { getDenomtrace } from 'utils/ibc/getDenomTrace';

import { FormValues as CreateSellOrderFormValues } from 'web-components/lib/components/form/CreateSellOrderForm';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';

import { UseStateSetter } from 'types/react/use-state';
import { denomToMicro } from 'lib/denom.utils';

import DenomIcon from 'components/molecules/DenomIcon';
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
  onTxBroadcast: () => void;
};

type ReturnType = (values: CreateSellOrderFormValues) => Promise<void>;

const useCreateSellOrderSubmit = ({
  accountAddress,
  signAndBroadcast,
  setTxModalHeader,
  setCardItems,
  setTxButtonTitle,
  onTxBroadcast,
}: Props): ReturnType => {
  const createSellOrderSubmit = useCallback(
    async (values: CreateSellOrderFormValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();
      const { amount, batchDenom, price, enableAutoRetire, askDenom } = values;

      // convert to udenom
      const priceInMicro = price ? String(denomToMicro(price)) : ''; // TODO: When other currencies, check for micro denom before converting
      const msg = MsgSell.fromPartial({
        seller: accountAddress,
        orders: [
          {
            batchDenom,
            quantity: String(amount),
            askPrice: { denom: askDenom, amount: priceInMicro },
            disableAutoRetire: !enableAutoRetire,
          },
        ],
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
        memo: undefined,
      };

      signAndBroadcast(tx, onTxBroadcast);

      if (batchDenom && amount && askDenom) {
        const baseDenom = await getDenomtrace({ denom: askDenom });

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
                    verticalAlign: 'bottom',
                  }}
                >
                  <DenomIcon denom={baseDenom} sx={{ display: 'flex' }} />
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
      setTxButtonTitle,
      signAndBroadcast,
      onTxBroadcast,
    ],
  );

  return createSellOrderSubmit;
};

export default useCreateSellOrderSubmit;
