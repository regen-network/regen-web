import { useCallback } from 'react';
import { FormValues as CreateSellOrderFormValues } from 'web-components/lib/components/form/CreateSellOrderForm';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { useStateSetter } from '../../../types/react/use-state';
import {
  CREATE_SELL_ORDER_BUTTON,
  CREATE_SELL_ORDER_HEADER,
} from '../MyEcocredits.contants';
import { Box } from '@mui/material';

type Props = {
  setCardItems: useStateSetter<Item[] | undefined>;
  setTxModalTitle: useStateSetter<string | undefined>;
  setTxModalHeader: useStateSetter<string | undefined>;
  setTxButtonTitle: useStateSetter<string | undefined>;
  setSellOrderCreateOpen: useStateSetter<number>;
};

type ReturnType = (values: CreateSellOrderFormValues) => Promise<void>;

const useCreateSellOrderSubmit = ({
  setTxModalHeader,
  setCardItems,
  setTxModalTitle,
  setTxButtonTitle,
  setSellOrderCreateOpen,
}: Props): ReturnType => {
  const basketPutSubmit = useCallback(
    async (values: CreateSellOrderFormValues): Promise<void> => {
      const { amount, batchDenom, price } = values;
      await new Promise(resolve => setTimeout(resolve, 3000));
      setSellOrderCreateOpen(-1);

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
        setTxModalTitle(`Sell Order #xxx`);
        setTxButtonTitle(CREATE_SELL_ORDER_BUTTON);
      }
    },
    [
      setCardItems,
      setTxModalTitle,
      setTxModalHeader,
      setSellOrderCreateOpen,
      setTxButtonTitle,
    ],
  );

  return basketPutSubmit;
};

export default useCreateSellOrderSubmit;
