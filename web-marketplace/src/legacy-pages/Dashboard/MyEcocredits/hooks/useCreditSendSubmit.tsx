import { useCallback } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import {
  creditSendAction,
  getAuthorizationId,
  wrapRbamActions,
} from 'web-marketplace/src/utils/rbam.utils';

import type { Item } from 'web-components/src/components/modal/TxModal';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import type { UseStateSetter } from 'types/react/use-state';
import { getAccountUrl } from 'lib/block-explorer';
import { getCreditBatchPath, getProjectPath } from 'lib/bridge';
import {
  Send2Event,
  SendFailureEvent,
  SendSuccessEvent,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
import { useWallet } from 'lib/wallet/wallet';

import type { CreditSendFormSchemaType } from 'components/organisms/CreditSendForm/CreditSendForm.schema';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import { useDashboardContext } from '../../Dashboard.context';
import { SEND_HEADER } from '../MyEcocredits.constants';

type Props = {
  accountAddress?: string;
  credits: BatchInfoWithBalance[];
  creditSendOpen: number;
  creditSendTitle: string;
  signAndBroadcast: SignAndBroadcastType;
  setCreditSendOpen: UseStateSetter<number>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalHeader: UseStateSetter<string | undefined>;
  setTxModalTitle: UseStateSetter<string | undefined>;
};

type Return = (values: CreditSendFormSchemaType) => Promise<void>;

const useCreditSendSubmit = ({
  accountAddress,
  credits,
  creditSendOpen,
  creditSendTitle,
  signAndBroadcast,
  setCreditSendOpen,
  setCardItems,
  setTxModalHeader,
  setTxModalTitle,
}: Props): Return => {
  const { _ } = useLingui();
  const { track } = useTracker();
  const { wallet } = useWallet();
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

  const creditSendSubmit = useCallback(
    async (values: CreditSendFormSchemaType): Promise<void> => {
      const batchDenom = credits[creditSendOpen].denom;
      track<Send2Event>('send2', {
        batchDenom,
        quantity: values.amount,
        enableAutoRetire: values.withRetire,
        creditClassId: credits[creditSendOpen].classId,
        projectId: credits[creditSendOpen].projectId,
        projectName: credits[creditSendOpen].projectName,
      });
      if (!accountAddress) return Promise.reject();

      const { withRetire, recipient, amount, retireFields } = values;
      const { retirementJurisdiction, note } = retireFields?.[0] || {};

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
        const action = creditSendAction({
          authorizationId: manageCreditsAuthId,
          sender: accountAddress, // DAO address
          recipient,
          credits: [
            {
              batchDenom: batchDenom!,
              tradableAmount: withRetire ? '' : amount.toString(),
              retiredAmount: withRetire ? amount.toString() : '',
              retirementJurisdiction: retirementJurisdiction || '',
              retirementReason: note || '',
            },
          ],
        });

        finalMsg = wrapRbamActions({
          walletAddress: wallet.address,
          rbamAddress: organizationRbamAddress,
          actions: [action],
        });
      } else {
        // Personal context: use standard message
        const { send } = regen.ecocredit.v1.MessageComposer.withTypeUrl;
        finalMsg = send({
          sender: accountAddress,
          recipient,
          credits: [
            {
              batchDenom,
              tradableAmount: withRetire ? '' : amount.toString(),
              retiredAmount: withRetire ? amount.toString() : '',
              retirementJurisdiction: retirementJurisdiction || '',
              retirementReason: note || '',
            },
          ],
        });
      }

      const tx = {
        msgs: [finalMsg],
        fee: isOrganizationDashboard ? ('auto' as const) : undefined, // RBAM transactions need auto gas estimation
        feeGranter,
      };

      const batchInfo = credits[creditSendOpen];
      const onError = (err?: Error): void => {
        track<SendFailureEvent>('sendFailure', {
          batchDenom,
          projectId: batchInfo?.projectId,
          projectName: !!batchInfo?.projectName
            ? batchInfo.projectName
            : undefined,
          creditClassId: batchInfo?.projectId.split('-')[0],
          enableAutoRetire: withRetire,
          quantity: amount,
          errorMessage: err?.message,
        });
      };
      const onSuccess = (): void => {
        track<SendSuccessEvent>('sendSuccess', {
          batchDenom,
          projectId: batchInfo?.projectId,
          projectName: !!batchInfo?.projectName
            ? batchInfo.projectName
            : undefined,
          creditClassId: batchInfo?.projectId.split('-')[0],
          enableAutoRetire: withRetire,
          quantity: amount,
        });
      };
      await signAndBroadcast(tx, () => setCreditSendOpen(-1), {
        onError,
        onSuccess,
      });
      if (batchDenom && recipient) {
        setCardItems(
          [
            {
              label: _(msg`project`),
              value: {
                name:
                  credits[creditSendOpen].projectName ||
                  credits[creditSendOpen].projectId,
                url: getProjectPath(credits[creditSendOpen].projectId),
              },
            },
            {
              label: _(msg`credit batch id`),
              value: { name: batchDenom, url: getCreditBatchPath(batchDenom) },
            },
            {
              label: _(msg`amount sent`),
              value: { name: amount.toString() },
            },
            {
              label: 'recipient',
              value: { name: recipient, url: getAccountUrl(recipient) },
            },
          ].filter(item => Number(item.value.name) !== 0),
        );
        setTxModalHeader(_(SEND_HEADER));
        setTxModalTitle(creditSendTitle);
      }
    },
    [
      credits,
      creditSendOpen,
      track,
      accountAddress,
      isOrganizationDashboard,
      feeGranter,
      signAndBroadcast,
      organizationRbamAddress,
      wallet?.address,
      manageCreditsAuthId,
      _,
      setCreditSendOpen,
      setCardItems,
      setTxModalHeader,
      setTxModalTitle,
      creditSendTitle,
    ],
  );

  return creditSendSubmit;
};

export default useCreditSendSubmit;
