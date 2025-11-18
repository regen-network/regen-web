import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { regen } from '@regen-network/api';
import { MsgCreateBatch } from '@regen-network/api/regen/ecocredit/v1/tx';
import { BatchIssuance } from '@regen-network/api/regen/ecocredit/v1/types';
import {
  getExecuteActionsStargate,
  getMsgExecuteContract,
} from 'utils/cosmwasm';

import { CreateBatchOrganizationContext } from 'types/ledger/batch';
import { generateIri, IriFromMetadataSuccess } from 'lib/db/api/metadata-graph';
import type {
  CFCBatchMetadataLD,
  VCSBatchMetadataLD,
} from 'lib/db/types/json-ld';

import { useMsgClient } from 'hooks';

import { CreateBatchFormValues } from '../CreateBatchMultiStepForm/CreateBatchMultiStepForm';

// TODO: Right now, just cases C01 (VCS) and C02 (CFC)

function prepareVCSMetadata(
  projectId: string,
  partialMetadata: Partial<VCSBatchMetadataLD>,
): VCSBatchMetadataLD | undefined {
  const retirementSerialNumber =
    partialMetadata['regen:vcsRetirementSerialNumber'];

  const additionalCertifications =
    partialMetadata['regen:additionalCertifications'];

  if (!projectId || !retirementSerialNumber) return;

  const metadata: VCSBatchMetadataLD = {
    '@context': {
      schema: 'http://schema.org/',
      regen: 'https://schema.regen.network#',
      'regen:additionalCertifications': { '@container': '@list' },
    },
    '@type': 'regen:C01-CreditBatch',
    'regen:vcsProjectId': projectId,
    'regen:vcsRetirementSerialNumber': retirementSerialNumber,
    'regen:additionalCertifications': additionalCertifications || [],
  };

  return metadata;
}

async function prepareMsg(issuer: string, data: CreateBatchFormValues) {
  if (!data.metadata) return;

  // Complete the metadata for the batch creation
  let metadata:
    | Partial<VCSBatchMetadataLD>
    | Partial<CFCBatchMetadataLD>
    | undefined = prepareVCSMetadata(
    data.projectId,
    data.metadata as Partial<VCSBatchMetadataLD>,
  );

  if (!metadata) metadata = JSON.parse(data.metadata);
  if (!metadata) return;

  // Generate IRI for the metadata
  let iriResponse:
    | IriFromMetadataSuccess<
        Partial<VCSBatchMetadataLD> | Partial<CFCBatchMetadataLD>
      >
    | undefined;

  try {
    iriResponse = await generateIri(metadata);
    if (!iriResponse) return;
  } catch (err) {
    throw new Error(err as string);
  }

  // Build the message for the transaction
  const issuance: BatchIssuance[] = data.recipients.map(recipient => {
    let issuanceRecipient: Partial<BatchIssuance> = {
      recipient: recipient.recipient,
      tradableAmount: recipient.tradableAmount.toString(),
      retiredAmount: '0',
    };
    if (recipient.withRetire && recipient.retiredAmount > 0) {
      issuanceRecipient.retiredAmount = recipient.retiredAmount.toString();
      issuanceRecipient.retirementJurisdiction =
        recipient.retirementJurisdiction;
    }
    if (recipient.note) {
      issuanceRecipient.retirementReason = recipient.note;
    }
    return issuanceRecipient as BatchIssuance;
  });

  // TODO get class id from project data
  // once Regen Ledger upgrade includes https://github.com/regen-network/regen-ledger/pull/2167
  const classId = data.projectId.split('-')[0];

  return regen.ecocredit.v1.MessageComposer.withTypeUrl.createBatch({
    issuer,
    projectId: data.projectId,
    issuance: issuance,
    metadata: iriResponse.iri,
    startDate: new Date(data.startDate as Date),
    endDate: new Date(data.endDate as Date),
    open: false,
    classId,
  });
}

type SubmissionStatus =
  | 'idle'
  | 'message'
  | 'sign'
  | 'broadcast'
  | 'success'
  | 'error';

type CreateBatchFn = (data: CreateBatchFormValues) => Promise<void>;

type Return = {
  status: SubmissionStatus;
  deliverTxResponse: DeliverTxResponse | undefined;
  error: string | undefined;
  isSubmitModalOpen: boolean;
  createBatch: CreateBatchFn;
  closeSubmitModal: () => void;
};

/**
 * Manages the process of creating credit batches on the blockchain
 *
 * @returns Object containing:
 *   - status: The current status of the submission process
 *   - deliverTxResponse: The blockchain response after successful transaction
 *   - error: Any error that occurred during submission
 *   - isSubmitModalOpen: Whether the submission modal should be displayed
 *   - createBatch: Function to initiate the batch creation process
 *   - closeSubmitModal: Function to close the submission modal
 *
 * See {@link Return}
 *
 * @example
 * const {
 *   createBatch,
 *   status,
 *   isSubmitModalOpen,
 *   closeSubmitModal
 * } = useCreateBatchSubmit();
 *
 */
export default function useCreateBatchSubmit(): Return {
  const { wallet, signAndBroadcast, deliverTxResponse, error, setError } =
    useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const accountAddress = wallet?.address;
  const location = useLocation();

  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // Check if organization context was passed via router state
  const locationState = location.state as CreateBatchOrganizationContext | null;

  function handleTxQueued(): void {
    setStatus('broadcast');
    setIsSubmitModalOpen(true);
  }

  function handleTxDelivered(): void {
    setStatus('success');
    setIsSubmitModalOpen(false);
  }

  function handleError(): void {
    setIsSubmitModalOpen(false);
    setStatus('error');
  }

  function closeSubmitModal(): void {
    setIsSubmitModalOpen(false);
  }

  const createBatch = async (data: CreateBatchFormValues): Promise<void> => {
    if (!accountAddress) return Promise.reject();
    if (!data.startDate || !data.endDate) return Promise.reject();

    // Determine the actual issuer - use org address if provided, otherwise wallet
    const issuerAddress = locationState?.issuerAddress;
    const actualIssuer = issuerAddress ?? accountAddress;
    const organizationDaoAddress = locationState?.organizationDaoAddress;
    const organizationRbamAddress = locationState?.organizationRbamAddress;
    const organizationAuthorizationId = locationState?.authorizationId;
    const organizationRoleId = locationState?.roleId;

    let message:
      | {
          typeUrl: string;
          value: MsgCreateBatch;
        }
      | undefined;

    // This check is to bypass if status is `sign` or `broadcast`
    if (status === 'idle' || status === 'message') {
      try {
        setStatus('message');
        message = await prepareMsg(actualIssuer, data);
      } catch (err) {
        setError(err as string);
      }
    }
    if (!message) return;

    try {
      setStatus('sign');
      const recipientNote = data.recipients.find(recipient => recipient.note);

      // If creating batch from organization, wrap in RBAM execute
      if (
        organizationDaoAddress &&
        organizationRbamAddress &&
        organizationAuthorizationId &&
        organizationRoleId
      ) {
        // Ensure all issuance fields have default values for protobuf encoding
        const issuance = (message.value.issuance || []).map(item => ({
          recipient: item.recipient,
          tradableAmount: item.tradableAmount || '0',
          retiredAmount: item.retiredAmount || '0',
          retirementJurisdiction: item.retirementJurisdiction || '',
          retirementReason: item.retirementReason || '',
        }));

        // Encode the batch message with DAO as issuer
        const protoBytes = MsgCreateBatch.encode({
          issuer: organizationDaoAddress,
          projectId: message.value.projectId,
          issuance,
          metadata: message.value.metadata || '',
          startDate: message.value.startDate,
          endDate: message.value.endDate,
          open: message.value.open ?? false,
          classId: message.value.classId,
        }).finish();

        // Wrap in RBAM execute action
        const executeActionsMsg = getExecuteActionsStargate([
          {
            authorizationId: organizationAuthorizationId,
            roleId: organizationRoleId,
            typeUrl: message.typeUrl,
            value: protoBytes,
          },
        ]);

        const executeMsg = getMsgExecuteContract({
          walletAddress: accountAddress,
          contract: organizationRbamAddress,
          executeActionsMsg,
        });

        await signAndBroadcast({
          msgs: [executeMsg],
          memo: recipientNote?.note,
          fee: 'auto',
          feeGranter: organizationDaoAddress,
        });
      } else {
        // Regular batch creation from personal wallet
        await signAndBroadcast({
          msgs: [message],
          memo: recipientNote?.note,
        });
      }
    } catch (err) {
      setError(err as string);
    }
  };

  return {
    status,
    deliverTxResponse,
    isSubmitModalOpen,
    error,
    createBatch,
    closeSubmitModal,
  };
}
