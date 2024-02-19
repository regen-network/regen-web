import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { MsgBuyDirect } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { quantityFormatNumberOptions } from 'config/decimals';
import { getDenomtrace } from 'utils/ibc/getDenomTrace';

import { Item } from 'web-components/src/components/modal/TxModal';
import {
  formatNumber,
  getFormattedNumber,
} from 'web-components/src/utils/format';
import { getJurisdictionIsoCode } from 'web-components/src/utils/locationStandard';

import { UseStateSetter } from 'types/react/use-state';
import { microToDenom } from 'lib/denom.utils';
import { BuyFailureEvent, BuySuccessEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { normalizeToUISellOrderInfo } from 'pages/Projects/AllProjects/hooks/useProjectsSellOrders.utils';
import DenomIcon from 'components/molecules/DenomIcon';
import { BuyCreditsValues } from 'components/organisms';
import { SignAndBroadcastType } from 'hooks/useMsgClient';
import { RefetchSellOrdersResponse } from 'hooks/useQuerySellOrders';

import {
  BUY_SELL_ORDER_HEADER,
  BUY_SELL_ORDER_TITLE,
} from '../Storefront.constants';
import { checkIsBuyOrderInvalid } from '../Storefront.utils';

interface Project {
  id: string;
  name: string;
}

type Props = {
  accountAddress?: string;
  buttonTitle: string;
  project?: Project;
  signAndBroadcast: SignAndBroadcastType;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalTitle: UseStateSetter<string>;
  setTxModalHeader: UseStateSetter<string>;
  setTxButtonTitle: UseStateSetter<string>;
  onBroadcast?: () => void;
  refetchSellOrders?: () => RefetchSellOrdersResponse;
  onSubmitCallback?: (values: BuyCreditsValues) => void;
};

type Params = (values: BuyCreditsValues) => Promise<void>;

const useBuySellOrderSubmit = ({
  accountAddress,
  buttonTitle,
  project,
  signAndBroadcast,
  setTxModalHeader,
  setCardItems,
  setTxModalTitle,
  setTxButtonTitle,
  onBroadcast,
  refetchSellOrders,
  onSubmitCallback,
}: Props): Params => {
  const { track } = useTracker();
  const location = useLocation();
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
        retirementReason,
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
            retirementReason: retirementReason,
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
      };

      const onError = (err?: Error): void => {
        track<'buyFailure', BuyFailureEvent>('buyFailure', {
          url: location.pathname,
          price: String(price),
          batchDenom: batchDenom,
          projectName: project?.name,
          projectId: project?.id,
          quantity: creditCount,
          currencyDenom: askDenom,
          retirementAction: retirementAction,
          errorMessage: err?.message,
        });
      };
      const onSuccess = (): void => {
        track<'buySuccess', BuySuccessEvent>('buySuccess', {
          url: location.pathname,
          price: String(price),
          batchDenom: batchDenom,
          projectName: project?.name,
          projectId: project?.id,
          quantity: creditCount,
          currencyDenom: askDenom,
          retirementAction: retirementAction,
        });
      };
      const error = await signAndBroadcast(
        tx,
        () => onBroadcast && onBroadcast(),
        { onError, onSuccess },
      );

      if (error && refetchSellOrders) {
        await refetchSellOrders();
        return Promise.reject();
      }

      if (batchDenom && creditCount && askDenom && project) {
        const baseDenom = await getDenomtrace({ denom: askDenom });

        setCardItems([
          {
            label: 'total purchase price',
            value: {
              name: formatNumber({
                num: creditCount * microToDenom(price),
                ...quantityFormatNumberOptions,
              }),
              icon: (
                <Box
                  component="span"
                  sx={{
                    mr: '4px',
                    display: 'inline-block',
                    verticalAlign: 'bottom',
                  }}
                >
                  <DenomIcon baseDenom={baseDenom} sx={{ display: 'flex' }} />
                </Box>
              ),
            },
          },
          {
            label: 'project',
            value: {
              name: project.name,
              url: `/project/${project.id}`,
            },
          },
          {
            label: 'credit batch id',
            value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
          },
          {
            label: isTradeable ? 'amount of credits' : 'amount retired',
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
      onSubmitCallback,
      refetchSellOrders,
      signAndBroadcast,
      project,
      track,
      onBroadcast,
      setCardItems,
      setTxModalHeader,
      setTxModalTitle,
      setTxButtonTitle,
      buttonTitle,
      location,
    ],
  );

  return buySellOrderSubmit;
};

export default useBuySellOrderSubmit;
