import { useCallback } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { useQueryClient } from '@tanstack/react-query';
import {
  creditRetireAction,
  getAuthorizationId,
  wrapRbamActions,
} from 'web-marketplace/src/utils/rbam.utils';

import type { Item } from 'web-components/src/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
import { getCreditBatchPath, getProjectPath } from 'lib/bridge';
import { getAllRetirementsByOwnerQueryKey } from 'lib/queries/react-query/registry-server/graphql/indexer/getAllRetirementsByOwner/getAllRetirementsByOwner.constants';
import {
  Retire2Event,
  RetireFailureEvent,
  RetireSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import { CreditRetireFormSchemaType } from 'components/organisms/CreditRetireForm/CreditRetireForm.schema';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { useDashboardContext } from '../../Dashboard.context';
import {
  RETIRE_HEADER,
  RETIRE_SUCCESS_BUTTON,
} from '../MyEcocredits.constants';

type Props = {
  accountAddress?: string;
  credits: BatchInfoWithBalance[];
  creditRetireOpen: number;
  creditRetireTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setCreditRetireOpen: UseStateSetter<number>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxModalTitle: UseStateSetter<string | undefined>;
  setTxButtonTitle: UseStateSetter<string | undefined>;
};

type Params = (values: CreditRetireFormSchemaType) => Promise<void>;

const useCreditRetireSubmit = ({
  accountAddress,
  credits,
  creditRetireOpen,
  creditRetireTitle,
  signAndBroadcast,
  setCreditRetireOpen,
  setCardItems,
  setTxModalHeader,
  setTxModalTitle,
  setTxButtonTitle,
}: Props): Params => {
  const { _ } = useLingui();
  const { track } = useTracker();
  const { wallet } = useWallet();
  const reactQueryClient = useQueryClient();
  const {
    isOrganizationDashboard,
    organizationRole,
    organizationRbamAddress,
    organizationDaoAddress,
    feeGranter,
  } = useDashboardContext();

  const { authorizationId: manageCreditsAuthId } = getAuthorizationId({
    type: 'organization',
    currentUserRole: organizationRole,
    authorizationName: 'can_manage_credits',
  });

  const creditRetireSubmit = useCallback(
    async (values: CreditRetireFormSchemaType): Promise<void> => {
      const batchDenom = credits[creditRetireOpen].denom;
      track<Retire2Event>('retire2', {
        batchDenom,
        creditClassId: credits[creditRetireOpen].classId,
        projectId: credits[creditRetireOpen].projectId,
        projectName: credits[creditRetireOpen].projectName,
        quantity: values.amount,
      });

      if (!accountAddress) return Promise.reject();

      const { amount: amountValue, retireFields } = values;
      const { retirementJurisdiction, note } = retireFields?.[0] || {};
      const amount = values.amount.toString();

      // Build the message based on context (organization vs personal)
      let finalMsg;

      if (isOrganizationDashboard) {
        if (
          !organizationRbamAddress ||
          !wallet?.address ||
          !manageCreditsAuthId
        ) {
          throw new Error(
            _(msg`You do not have permission to manage credits.`),
          );
        }
        // Organization context: wrap in RBAM execute_actions
        const action = creditRetireAction({
          authorizationId: manageCreditsAuthId,
          owner: accountAddress, // DAO address
          credits: [
            {
              batchDenom: batchDenom!,
              amount,
            },
          ],
          jurisdiction: retirementJurisdiction || '',
          reason: note || '',
        });

        finalMsg = wrapRbamActions({
          walletAddress: wallet.address,
          rbamAddress: organizationRbamAddress,
          actions: [action],
        });
      } else {
        // Personal context: use standard message
        finalMsg = regen.ecocredit.v1.MessageComposer.withTypeUrl.retire({
          owner: accountAddress,
          jurisdiction: retirementJurisdiction || '',
          credits: [
            {
              batchDenom,
              amount,
            },
          ],
          reason: note || '',
        });
      }

      const tx = {
        msgs: [finalMsg],
        fee: isOrganizationDashboard ? ('auto' as const) : undefined, // RBAM transactions need auto gas estimation
        feeGranter,
      };

      const onError = (err?: Error): void => {
        track<RetireFailureEvent>('retireFailure', {
          batchDenom,
          creditClassId: credits[creditRetireOpen].classId,
          projectId: credits[creditRetireOpen].projectId,
          projectName: credits[creditRetireOpen].projectName,
          quantity: amountValue,
          errorMessage: err?.message,
        });
      };
      const onSuccess = (): void => {
        track<RetireSuccessEvent>('retireSuccess', {
          batchDenom,
          creditClassId: credits[creditRetireOpen].classId,
          projectId: credits[creditRetireOpen].projectId,
          projectName: credits[creditRetireOpen].projectName,
          quantity: amountValue,
        });

        // Invalidate retirements query to show new retirement certificate
        reactQueryClient.invalidateQueries({
          queryKey: getAllRetirementsByOwnerQueryKey(accountAddress!),
        });
      };
      await signAndBroadcast(tx, () => setCreditRetireOpen(-1), {
        onError,
        onSuccess,
      });
      if (batchDenom && amount) {
        setCardItems([
          {
            label: _(msg`project`),
            value: {
              name:
                credits[creditRetireOpen].projectName ||
                credits[creditRetireOpen].projectId,
              url: getProjectPath(credits[creditRetireOpen].projectId),
            },
          },
          {
            label: _(msg`credit batch id`),
            value: { name: batchDenom, url: getCreditBatchPath(batchDenom) },
          },
          {
            label: _(msg`amount retired`),
            value: { name: amount },
          },
        ]);
        setTxModalHeader(_(RETIRE_HEADER));
        setTxModalTitle(creditRetireTitle);
        setTxButtonTitle(_(RETIRE_SUCCESS_BUTTON));
      }
    },
    [
      credits,
      creditRetireOpen,
      track,
      accountAddress,
      isOrganizationDashboard,
      feeGranter,
      signAndBroadcast,
      organizationRbamAddress,
      wallet?.address,
      manageCreditsAuthId,
      _,
      reactQueryClient,
      setCreditRetireOpen,
      setCardItems,
      setTxModalHeader,
      setTxModalTitle,
      creditRetireTitle,
      setTxButtonTitle,
    ],
  );

  return creditRetireSubmit;
};

export default useCreditRetireSubmit;
