import { useCallback } from 'react';
import { Box } from '@mui/material';
import { MsgBuyDirect } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { getDenomtrace } from 'utils/ibc/getDenomTrace';

import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';
import { getJurisdictionIsoCode } from 'web-components/lib/utils/locationStandard';

import { UseStateSetter } from 'types/react/use-state';
import { microToDenom } from 'lib/denom.utils';

import { normalizeToUISellOrderInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import DenomIcon from 'components/molecules/DenomIcon';
import { BuyCreditsValues } from 'components/organisms';
import { SignAndBroadcastType } from 'hooks/useMsgClient';
import { RefetchSellOrdersResponse } from 'hooks/useQuerySellOrders';

import {
  BUY_SELL_ORDER_HEADER,
  BUY_SELL_ORDER_TITLE,
} from '../Storefront.constants';
import { checkIsBuyOrderInvalid } from '../Storefront.utils';

type Props = {
  accountAddress?: string;
  buttonTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalTitle: UseStateSetter<string>;
  setTxModalHeader: UseStateSetter<string>;
  setTxButtonTitle: UseStateSetter<string>;
  setSelectedSellOrder?: UseStateSetter<number | null>;
  refetchSellOrders?: () => RefetchSellOrdersResponse;
  onSubmitCallback?: (values: BuyCreditsValues) => void;
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
  refetchSellOrders,
  onSubmitCallback,
}: Props): ReturnType => {
  const buySellOrderSubmit = useCallback(
    async (values: BuyCreditsValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();

      if (onSubmitCallback) {
        onSubmitCallback(values);
      }

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

      if (refetchSellOrders) {
        const sellOrders = await refetchSellOrders();
        const uiSellOrdersInfo = sellOrders?.map(normalizeToUISellOrderInfo);
        const { isBuyOrderInvalid } = checkIsBuyOrderInvalid({
          creditCount,
          sellOrderId,
          sellOrders: uiSellOrdersInfo,
        });

        if (isBuyOrderInvalid) {
          return Promise.reject();
        }
      }

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

      const error = await signAndBroadcast(
        tx,
        () => setSelectedSellOrder && setSelectedSellOrder(null),
      );

      if (error && refetchSellOrders) {
        await refetchSellOrders();
        return Promise.reject();
      }

      if (batchDenom && creditCount && askDenom) {
        const baseDenom = await getDenomtrace({ denom: askDenom });

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
                    verticalAlign: 'bottom',
                  }}
                >
                  <DenomIcon denom={baseDenom} sx={{ display: 'flex' }} />
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
      refetchSellOrders,
      onSubmitCallback,
    ],
  );

  return buySellOrderSubmit;
};

export default useBuySellOrderSubmit;
