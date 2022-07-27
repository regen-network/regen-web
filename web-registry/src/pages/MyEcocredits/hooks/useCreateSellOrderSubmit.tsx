import { useCallback } from 'react';
import { Box } from '@mui/material';

import { FormValues as CreateSellOrderFormValues } from 'web-components/lib/components/form/CreateSellOrderForm';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';
<<<<<<< HEAD:web-registry/src/pages/MyEcocredits/hooks/useCreateSellOrderSubmit.tsx
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { MsgSell } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { useStateSetter } from '../../../types/react/use-state';
=======

import { UseStateSetter } from 'types/react/use-state';

>>>>>>> 92528156 (David/eslint simple import sort (#1075)):web-registry/src/pages/Dashboard/MyEcocredits/hooks/useCreateSellOrderSubmit.tsx
import {
  CREATE_SELL_ORDER_BUTTON,
  CREATE_SELL_ORDER_HEADER,
} from '../MyEcocredits.contants';
<<<<<<< HEAD:web-registry/src/pages/MyEcocredits/hooks/useCreateSellOrderSubmit.tsx
import { Box } from '@mui/material';
import { SignAndBroadcastType } from '../../../hooks/useMsgClient';
=======
>>>>>>> 92528156 (David/eslint simple import sort (#1075)):web-registry/src/pages/Dashboard/MyEcocredits/hooks/useCreateSellOrderSubmit.tsx

type Props = {
  accountAddress?: string;
  signAndBroadcast: SignAndBroadcastType;
  setCardItems: useStateSetter<Item[] | undefined>;
  setTxModalHeader: useStateSetter<string | undefined>;
  setTxButtonTitle: useStateSetter<string | undefined>;
  setSellOrderCreateOpen: useStateSetter<number>;
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
  const basketPutSubmit = useCallback(
    async (values: CreateSellOrderFormValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();

      const { amount, batchDenom, price, disableAutoRetire } = values;
      const msg = MsgSell.fromPartial({
        seller: accountAddress,
        orders: [
          {
            batchDenom,
            quantity: String(amount),
            askPrice: { denom: PRICE_DENOM, amount: String(price) },
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

  return basketPutSubmit;
};

export default useCreateSellOrderSubmit;
