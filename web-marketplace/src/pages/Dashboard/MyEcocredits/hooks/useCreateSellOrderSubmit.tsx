import { useCallback } from 'react';
import { Box } from '@mui/material';
import { MsgSell } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { useQueryClient } from '@tanstack/react-query';
import { getDenomtrace } from 'utils/ibc/getDenomTrace';

import { Item } from 'web-components/src/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/src/utils/format';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { denomToMicro } from 'lib/denom.utils';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery';
import { SellFailureEvent, SellSuccessEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import DenomIcon from 'components/molecules/DenomIcon';
import { CreateSellOrderFormSchemaType } from 'components/organisms/CreateSellOrderForm/CreateSellOrderForm.schema';
import { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  CREATE_SELL_ORDER_BUTTON,
  CREATE_SELL_ORDER_HEADER,
} from '../MyEcocredits.constants';

type Props = {
  accountAddress?: string;
  credits?: BatchInfoWithBalance[];
  signAndBroadcast: SignAndBroadcastType;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxButtonTitle: UseStateSetter<string | undefined>;
  onTxBroadcast: () => void;
};

type Return = (values: CreateSellOrderFormSchemaType) => Promise<void>;

const useCreateSellOrderSubmit = ({
  accountAddress,
  credits,
  signAndBroadcast,
  setTxModalHeader,
  setCardItems,
  setTxButtonTitle,
  onTxBroadcast,
}: Props): Return => {
  const { track } = useTracker();
  const reactQueryClient = useQueryClient();
  const createSellOrderSubmit = useCallback(
    async (values: CreateSellOrderFormSchemaType): Promise<void> => {
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

      const onError = (err?: Error): void => {
        const batchInfo = credits?.find(batch => batch.denom === batchDenom);
        track<'sellFailure', SellFailureEvent>('sellFailure', {
          batchDenom,
          projectId: batchInfo?.projectId,
          projectName: !!batchInfo?.projectName
            ? batchInfo.projectName
            : undefined,
          creditClassId: batchInfo?.projectId.split('-')[0],
          price,
          enableAutoRetire,
          currencyDenom: askDenom,
          errorMessage: err?.message,
        });
      };
      const onSuccess = (): void => {
        const batchInfo = credits?.find(batch => batch.denom === batchDenom);
        track<'sellSuccess', SellSuccessEvent>('sellSuccess', {
          batchDenom,
          projectId: batchInfo?.projectId,
          projectName: !!batchInfo?.projectName
            ? batchInfo.projectName
            : undefined,
          creditClassId: batchInfo?.projectId.split('-')[0],
          price,
          enableAutoRetire,
          currencyDenom: askDenom,
        });
        reactQueryClient.invalidateQueries({
          queryKey: [SELL_ORDERS_EXTENTED_KEY],
        });
      };
      signAndBroadcast(tx, onTxBroadcast, { onError, onSuccess });

      if (batchDenom && amount && askDenom && credits) {
        const baseDenom = await getDenomtrace({ denom: askDenom });

        const batchInfo = credits.find(batch => batch.denom === batchDenom);
        const projectId =
          batchInfo?.projectId ||
          batchDenom.substring(0, batchDenom.indexOf('-', 4));
        const projectName = batchInfo?.projectName;

        setCardItems([
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
                  <DenomIcon baseDenom={baseDenom} sx={{ display: 'flex' }} />
                </Box>
              ),
            },
          },
          {
            label: 'project',
            value: {
              name: projectName ?? projectId,
              url: `/project/${projectId}`,
            },
          },
          {
            label: 'credit batch id',
            value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
          },
          {
            label: 'amount of credits',
            value: { name: getFormattedNumber(amount) },
          },
        ]);
        setTxModalHeader(CREATE_SELL_ORDER_HEADER);
        setTxButtonTitle(CREATE_SELL_ORDER_BUTTON);
      }
    },
    [
      accountAddress,
      signAndBroadcast,
      onTxBroadcast,
      credits,
      track,
      setCardItems,
      setTxModalHeader,
      setTxButtonTitle,
      reactQueryClient,
    ],
  );

  return createSellOrderSubmit;
};

export default useCreateSellOrderSubmit;
