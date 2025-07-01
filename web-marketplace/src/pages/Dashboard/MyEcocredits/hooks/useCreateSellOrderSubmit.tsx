import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import type { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { EventSell } from '@regen-network/api/regen/ecocredit/marketplace/v1/events';
import { MessageComposer } from '@regen-network/api/regen/ecocredit/marketplace/v1/tx.registry';
import { useQueryClient } from '@tanstack/react-query';
import { USD_DENOM, USDC_DENOM } from 'config/allowedBaseDenoms';
import { getDenomtrace } from 'utils/ibc/getDenomTrace';

import { Item } from 'web-components/src/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/src/utils/format';

import { useCreateSellOrderMutation } from 'generated/graphql';
import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';
import { denomToMicro } from 'lib/denom.utils';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.constants';
import { ALL_PROJECTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/graphql/getAllProjectsQuery/getAllProjectsQuery.constants';
import { getProjectByOnChainIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery.constants';
import { getProjectIdByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectIdByOnChainIdQuery/getProjectIdByOnChainIdQuery';
import { SellFailureEvent, SellSuccessEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { AmountWithCurrency } from 'components/molecules/AmountWithCurrency/AmountWithCurrency';
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
  const { _ } = useLingui();
  const { track } = useTracker();
  const reactQueryClient = useQueryClient();
  const { queryClient } = useLedger();
  const [createSellOrder] = useCreateSellOrderMutation();
  const { activeAccountId } = useAuth();
  const graphqlClient = useApolloClient();

  const createSellOrderSubmit = useCallback(
    async (values: CreateSellOrderFormSchemaType): Promise<void> => {
      if (!accountAddress) return Promise.reject();
      const { amount, batchDenom, price, enableAutoRetire, askDenom } = values;
      const usdDenom = askDenom === USD_DENOM;
      const cryptoDenom = usdDenom ? USDC_DENOM : askDenom;

      // convert to udenom
      const priceInMicro = price ? String(denomToMicro(price)) : ''; // TODO: When other currencies, check for micro denom before converting
      const msgSell = MessageComposer.withTypeUrl.sell({
        seller: accountAddress,
        orders: [
          {
            batchDenom,
            quantity: String(amount),
            askPrice: {
              denom: cryptoDenom,
              amount: priceInMicro,
            },
            disableAutoRetire: !enableAutoRetire,
          },
        ],
      });

      const tx = {
        msgs: [msgSell],
        fee: undefined,
        memo: undefined,
      };

      const batchInfo = credits?.find(batch => batch.denom === batchDenom);
      const projectId =
        batchInfo?.projectId ||
        batchDenom.substring(0, batchDenom.indexOf('-', 4));

      const onError = (err?: Error): void => {
        track<SellFailureEvent>('sellFailure', {
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
      const onSuccess = async (
        deliverTxResponse?: DeliverTxResponse,
      ): Promise<void> => {
        if (usdDenom && activeAccountId) {
          const data = await reactQueryClient.fetchQuery(
            getProjectIdByOnChainIdQuery({
              client: graphqlClient,
              enabled: !!projectId,
              onChainId: projectId as string,
            }),
          );
          const offChainProjectId = data?.data?.projectByOnChainId?.id;

          const sellOrderId = deliverTxResponse?.events
            .find(event => event.type === EventSell.typeUrl.replace('/', ''))
            ?.attributes?.find(attr => attr.key === 'sell_order_id')
            ?.value.replace(/"/g, '');

          if (sellOrderId) {
            await createSellOrder({
              variables: {
                input: {
                  sellOrder: {
                    onChainId: sellOrderId,
                    projectId: offChainProjectId,
                    sellerAccountId: activeAccountId,
                    price,
                  },
                },
              },
            });

            await reactQueryClient.invalidateQueries({
              queryKey: getProjectByOnChainIdKey(projectId),
              refetchType: 'all',
            });
            await reactQueryClient.invalidateQueries({
              queryKey: [ALL_PROJECTS_QUERY_KEY],
              refetchType: 'all',
            });
          }
        }

        track<SellSuccessEvent>('sellSuccess', {
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

      if (batchDenom && amount && cryptoDenom && credits) {
        const baseDenom = await getDenomtrace({
          denom: cryptoDenom,
          queryClient,
        });

        const projectName = batchInfo?.projectName;

        setCardItems([
          {
            label: _(msg`price per credit`),
            value: usdDenom
              ? {
                  children: (
                    <AmountWithCurrency
                      amount={price}
                      currency={{
                        askDenom: USD_DENOM,
                        askBaseDenom: USD_DENOM,
                      }}
                      displayDenom={USD_DENOM.toUpperCase()}
                      classes={{
                        root: 'items-start',
                        text: 'text-[14px] sm:text-base',
                      }}
                    />
                  ),
                }
              : {
                  name: String(price),
                  icon: (
                    <Box
                      sx={{
                        mr: '4px',
                        display: 'inline-block',
                        verticalAlign: 'bottom',
                      }}
                    >
                      <DenomIcon
                        baseDenom={baseDenom}
                        bankDenom={cryptoDenom}
                        sx={{ display: 'flex' }}
                      />
                    </Box>
                  ),
                },
          },
          {
            label: _(msg`project`),
            value: {
              name: projectName ?? projectId,
              url: `/project/${projectId}`,
            },
          },
          {
            label: _(msg`credit batch id`),
            value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
          },
          {
            label: _(msg`amount of credits`),
            value: { name: getFormattedNumber(amount) },
          },
        ]);
        setTxModalHeader(_(CREATE_SELL_ORDER_HEADER));
        setTxButtonTitle(_(CREATE_SELL_ORDER_BUTTON));
      }
    },
    [
      accountAddress,
      credits,
      signAndBroadcast,
      onTxBroadcast,
      track,
      activeAccountId,
      reactQueryClient,
      graphqlClient,
      createSellOrder,
      queryClient,
      setCardItems,
      _,
      setTxModalHeader,
      setTxButtonTitle,
    ],
  );

  return createSellOrderSubmit;
};

export default useCreateSellOrderSubmit;
