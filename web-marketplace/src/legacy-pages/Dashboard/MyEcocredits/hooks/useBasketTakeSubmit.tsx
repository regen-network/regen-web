import { useCallback } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { BasketInfo } from '@regen-network/api/regen/ecocredit/basket/v1/query';
import { MsgTake } from '@regen-network/api/regen/ecocredit/basket/v1/tx';
import {
  basketTakeAction,
  getRoleAuthorizationIds,
  wrapRbamActions,
} from 'utils/rbam.utils';

import type { MsgTakeValues } from 'web-components/src/components/form/BasketTakeForm';

import { takeEventToBatches } from 'lib/events/takeEventToBatches';
import {
  TakeFromBasket2,
  TakeFromBasketFailure,
  TakeFromBasketSuccess,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { useDashboardContext } from '../../Dashboard.context';
import { TAKE_HEADER } from '../MyEcocredits.constants';
import { OnTxSuccessfulProps } from '../MyEcocredits.types';

type Props = {
  accountAddress?: string;
  baskets?: BasketInfo[];
  basketTakeTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  onBroadcast: () => void;
  onErrorCallback?: (error?: Error) => void;
  onTxSuccessful: ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps) => void;
};

type Params = (values: MsgTakeValues) => Promise<void>;

const useBasketTakeSubmit = ({
  accountAddress,
  baskets,
  basketTakeTitle,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): Params => {
  const { _ } = useLingui();
  const { track } = useTracker();
  const { wallet } = useWallet();
  const {
    isOrganizationDashboard,
    organizationRole,
    organizationRbamAddress,
    organizationDaoAddress,
  } = useDashboardContext();

  const { roleId, authorizationId: manageCreditsAuthId } =
    getRoleAuthorizationIds({
      type: 'organization',
      currentUserRole: organizationRole,
      authorizationName: 'can_manage_credits',
    });

  const basketTakeSubmit = useCallback(
    async (values: MsgTakeValues): Promise<void> => {
      if (!accountAddress) return Promise.reject();

      const amount = values?.amount;
      const basket = baskets?.find(
        basketInfo => basketInfo.basketDenom === values.basketDenom,
      );

      track<TakeFromBasket2>('takeFromBasket2', {
        basketName: basket?.name,
        quantity: amount,
        retireOnTake: values.retireOnTake,
      });

      // Build the message based on context (organization vs personal)
      let finalMsg;

      if (isOrganizationDashboard) {
        if (
          !roleId ||
          !organizationRbamAddress ||
          !wallet?.address ||
          !manageCreditsAuthId
        ) {
          throw new Error(_(TAKE_HEADER));
        }
        // Organization context: wrap in RBAM execute_actions
        const action = basketTakeAction({
          roleId,
          authorizationId: manageCreditsAuthId,
          owner: accountAddress, // DAO address
          basketDenom: values.basketDenom,
          amount,
          retireOnTake: values.retireOnTake || false,
          retirementJurisdiction: values.retirementJurisdiction || '',
          retirementReason: values?.retirementReason || '',
          retirementLocation: '',
        });

        finalMsg = wrapRbamActions({
          walletAddress: wallet.address,
          rbamAddress: organizationRbamAddress,
          actions: [action],
        });
      } else {
        // Personal context: use standard message
        finalMsg = regen.ecocredit.basket.v1.MessageComposer.withTypeUrl.take({
          owner: accountAddress,
          basketDenom: values.basketDenom,
          amount,
          retireOnTake: values.retireOnTake || false,
          retirementJurisdiction: values.retirementJurisdiction || '',
          retirementReason: values?.retirementReason || '',
        } as MsgTake); // retirementLocation is set as required by MsgTake but deprecated (in favor of retirementJurisdiction)
      }

      const tx = {
        msgs: [finalMsg],
        fee: isOrganizationDashboard ? ('auto' as const) : undefined, // RBAM transactions need auto gas estimation
        feeGranter: isOrganizationDashboard
          ? organizationDaoAddress
          : undefined,
      };

      const onError = (err?: Error): void => {
        track<TakeFromBasketFailure>('takeFromBasketFailure', {
          basketName: basket?.name,
          quantity: amount,
          retireOnTake: values.retireOnTake,
          errorMessage: err?.message,
        });
        onErrorCallback && onErrorCallback(err);
      };
      const onSuccess = (deliverTxResponse?: DeliverTxResponse): void => {
        const batchesFromTake = takeEventToBatches(deliverTxResponse!);
        track<TakeFromBasketSuccess>('takeFromBasketSuccess', {
          basketName: basket?.name,
          quantity: amount,
          retireOnTake: values.retireOnTake,
          batchDenoms: batchesFromTake?.map(value => value.name),
        });

        if (basket && amount) {
          const cardItems = [
            {
              label: 'basket',
              value: { name: basket.name },
            },
            {
              label: 'amount',
              value: { name: parseInt(amount) / Math.pow(10, basket.exponent) },
            },
          ];

          onTxSuccessful({
            cardItems,
            title: _(TAKE_HEADER),
            cardTitle: basketTakeTitle,
          });
        }
      };
      await signAndBroadcast(tx, () => onBroadcast(), {
        onError,
        onSuccess,
      });
    },
    [
      accountAddress,
      baskets,
      track,
      isOrganizationDashboard,
      organizationDaoAddress,
      signAndBroadcast,
      roleId,
      organizationRbamAddress,
      wallet?.address,
      manageCreditsAuthId,
      _,
      onErrorCallback,
      onTxSuccessful,
      basketTakeTitle,
      onBroadcast,
    ],
  );

  return basketTakeSubmit;
};

export default useBasketTakeSubmit;
