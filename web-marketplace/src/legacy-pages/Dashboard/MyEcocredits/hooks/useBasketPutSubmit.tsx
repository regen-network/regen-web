import { useCallback } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import type { BasketInfo } from '@regen-network/api/regen/ecocredit/basket/v1/query';
import { basketPutAction, wrapRbamActions } from 'utils/dashboard.rbam.utils';

import type { FormValues as BasketPutFormValues } from 'web-components/src/components/form/BasketPutForm/BasketPutForm';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import {
  PutInBasket2Event,
  PutInBasketFailureEvent,
  PutInBasketSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import { orgRoles } from 'hooks/org-members/constants';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { useDashboardContext } from '../../Dashboard.context';
import { PUT_HEADER } from '../MyEcocredits.constants';
import { OnTxSuccessfulProps } from '../MyEcocredits.types';

type Props = {
  accountAddress?: string;
  baskets?: BasketInfo[];
  basketPutTitle: string;
  credit: BatchInfoWithBalance;
  signAndBroadcast: SignAndBroadcastType;
  onBroadcast: () => void;
  onErrorCallback?: (error?: Error) => void;
  onTxSuccessful: ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps) => void;
};

type Return = (values: BasketPutFormValues) => Promise<void>;

const useBasketPutSubmit = ({
  accountAddress,
  baskets,
  basketPutTitle,
  credit,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): Return => {
  const { _ } = useLingui();
  const { track } = useTracker();
  const { wallet } = useWallet();
  const { isOrganizationDashboard, organizationRole, organizationRbamAddress } =
    useDashboardContext();

  const roleConfig = organizationRole
    ? orgRoles[organizationRole.toLowerCase() as keyof typeof orgRoles]
    : undefined;

  const basketPutSubmit = useCallback(
    async (values: BasketPutFormValues): Promise<void> => {
      const amount = values.amount?.toString();
      if (!amount || !values.basketDenom || !accountAddress) return;

      const basket = baskets?.find(
        basketInfo => basketInfo.basketDenom === values.basketDenom,
      );

      track<PutInBasket2Event>('putInBasket2', {
        quantity: values.amount,
        basketName: basket?.name,
        batchDenom: credit.denom,
        creditClassId: credit.classId,
        projectId: credit.projectId,
      });

      // Build the message based on context (organization vs personal)
      let finalMsg;

      if (
        isOrganizationDashboard &&
        roleConfig &&
        organizationRbamAddress &&
        wallet?.address
      ) {
        // Organization context: wrap in RBAM execute_actions
        const action = basketPutAction({
          roleId: roleConfig.roleId,
          authorizationId: roleConfig.authorizations.can_manage_credits!,
          owner: accountAddress, // DAO address
          basketDenom: values.basketDenom,
          batchDenom: credit.denom!,
          amount,
        });

        finalMsg = wrapRbamActions({
          walletAddress: wallet.address,
          rbamAddress: organizationRbamAddress,
          actions: [action],
        });
      } else {
        // Personal context: use standard message
        finalMsg = regen.ecocredit.basket.v1.MessageComposer.withTypeUrl.put({
          basketDenom: values.basketDenom,
          owner: accountAddress,
          credits: [
            {
              batchDenom: credit.denom,
              amount,
            },
          ],
        });
      }

      const onError = (err?: Error): void => {
        track<PutInBasketFailureEvent>('putInBasketFailure', {
          quantity: values.amount,
          basketName: basket?.name,
          batchDenom: credit.denom,
          creditClassId: credit.classId,
          projectId: credit.projectId,
          errorMessage: err?.message,
        });
        onErrorCallback && onErrorCallback(err);
      };
      const onSuccess = (): void => {
        track<PutInBasketSuccessEvent>('putInBasketSuccess', {
          quantity: values.amount,
          basketName: basket?.name,
          batchDenom: credit.denom,
          creditClassId: credit.classId,
          projectId: credit.projectId,
        });

        if (basket && amount) {
          const cardItems = [
            {
              label: _(msg`basket`),
              value: { name: basket.name },
            },
            {
              label: _(msg`project`),
              value: {
                name: credit.projectName || credit.projectId,
                url: `/project/${credit.projectId}`,
              },
            },
            {
              label: _(msg`credit batch id`),
              value: {
                name: credit.denom,
                url: `/credit-batches/${credit.denom}`,
              },
            },
            {
              label: _(msg`amount`),
              value: { name: amount },
            },
          ];

          onTxSuccessful({
            cardItems,
            title: _(PUT_HEADER),
            cardTitle: basketPutTitle,
          });
        }
      };
      await signAndBroadcast(
        { msgs: [finalMsg], fee: isOrganizationDashboard ? 'auto' : undefined }, // RBAM transactions need auto gas estimation
        () => onBroadcast(),
        {
          onError,
          onSuccess,
        },
      );
    },
    [
      baskets,
      track,
      credit.denom,
      credit.classId,
      credit.projectId,
      credit.projectName,
      accountAddress,
      isOrganizationDashboard,
      roleConfig,
      organizationRbamAddress,
      wallet?.address,
      signAndBroadcast,
      onErrorCallback,
      onTxSuccessful,
      _,
      basketPutTitle,
      onBroadcast,
    ],
  );

  return basketPutSubmit;
};

export default useBasketPutSubmit;
