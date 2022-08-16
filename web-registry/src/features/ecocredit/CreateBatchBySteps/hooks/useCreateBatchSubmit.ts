import { useState } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { MsgCreateBatch } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { BatchIssuance } from '@regen-network/api/lib/generated/regen/ecocredit/v1/types';

import type { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

import { useLedger } from 'ledger';
import { generateIri, IriFromMetadataSuccess } from 'lib/metadata-graph';

import { useMsgClient } from 'hooks';

import { CreateBatchFormValues } from '../CreateBatchMultiStepForm/CreateBatchMultiStepForm';

// TODO
// Right now, just case "C01" (aka. VCS)

function prepareMetadata(
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
      regen: 'http://regen.network/',
      'regen:additionalCertifications': { '@container': '@list' },
    },
    '@type': 'regen:C01-CreditBatch',
    'regen:vcsProjectId': projectId,
    'regen:vcsRetirementSerialNumber': retirementSerialNumber,
    'regen:additionalCertifications': additionalCertifications || [],
  };

  return metadata;
}

async function prepareMsg(
  issuer: string,
  data: CreateBatchFormValues,
): Promise<Partial<MsgCreateBatch> | undefined> {
  // First, complete the metadata
  const metadata: VCSBatchMetadataLD | undefined = prepareMetadata(
    data.projectId,
    data.metadata as Partial<VCSBatchMetadataLD>,
  );
  if (!metadata) return;

  // then, generate the offchain iri from the metadata
  let iriResponse: IriFromMetadataSuccess<VCSBatchMetadataLD> | undefined;

  try {
    iriResponse = await generateIri(metadata);
    if (!iriResponse) return;
  } catch (err) {
    throw new Error(err as string);
  }

  // finally, build de Msg for Tx
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
    return issuanceRecipient as BatchIssuance;
  });

  return MsgCreateBatch.fromPartial({
    issuer,
    projectId: data.projectId,
    issuance: issuance,
    metadata: iriResponse.iri,
    startDate: new Date(data.startDate as Date),
    endDate: new Date(data.endDate as Date),
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

type ReturnType = {
  status: SubmissionStatus;
  deliverTxResponse: DeliverTxResponse | undefined;
  error: string | undefined;
  isSubmitModalOpen: boolean;
  createBatch: CreateBatchFn;
  closeSubmitModal: () => void;
};

export default function useCreateBatchSubmit(): ReturnType {
  const { api } = useLedger();
  const { wallet, signAndBroadcast, deliverTxResponse, error, setError } =
    useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const accountAddress = wallet?.address;

  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

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
    if (!api?.msgClient?.broadcast || !accountAddress) return Promise.reject();
    if (!data.startDate || !data.endDate) return Promise.reject();

    let message: Partial<MsgCreateBatch> | undefined;

    // this check is to bypass if status is `sign` or `broadcast`
    if (status === 'idle' || status === 'message') {
      try {
        setStatus('message');
        message = await prepareMsg(accountAddress, data);
        if (!message) return;
      } catch (err) {
        setError(err as string);
      }
    }

    try {
      setStatus('sign');
      const recipientNote = data.recipients.find(recipient => recipient.note);
      await signAndBroadcast({
        msgs: [message],
        memo: recipientNote?.note,
      });
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
