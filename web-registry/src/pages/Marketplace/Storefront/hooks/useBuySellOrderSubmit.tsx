import { Box } from '@mui/material';
import { useCallback } from 'react';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';
import { BuyCreditsValues } from '../../../../components/organisms';
import { useStateSetter } from '../../../../types/react/use-state';
import {
  BUY_SELL_ORDER_BUTTON,
  BUY_SELL_ORDER_HEADER,
  BUY_SELL_ORDER_TITLE,
} from '../Storefront.constants';

type Props = {
  setCardItems: useStateSetter<Item[] | undefined>;
  setTxModalTitle: useStateSetter<string>;
  setTxModalHeader: useStateSetter<string>;
  setTxButtonTitle: useStateSetter<string>;
  setSelectedSellOrder: useStateSetter<number | null>;
  setIsProcessingModalOpen: useStateSetter<boolean>;
};

type ReturnType = (values: BuyCreditsValues) => Promise<void>;

const useBuySellOrderSubmit = ({
  setTxModalHeader,
  setCardItems,
  setTxModalTitle,
  setTxButtonTitle,
  setSelectedSellOrder,
  setIsProcessingModalOpen,
}: Props): ReturnType => {
  const buySellOrderSubmit = useCallback(
    async (values: BuyCreditsValues): Promise<void> => {
      const { batchDenom, price, creditCount } = values;
      setIsProcessingModalOpen(true);
      setSelectedSellOrder(null);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsProcessingModalOpen(false);

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
      setIsProcessingModalOpen,
    ],
  );

  return buySellOrderSubmit;
};

export default useBuySellOrderSubmit;
