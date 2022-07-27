import React from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import {
  MsgCreateBatch,
  MsgCreateBatch_BatchIssuance,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/tx';

import type { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

import { useLedger } from 'ledger';
import {
  generateIri,
  IriFromMetadataSuccess,
  stringToUint8Array,
} from 'lib/metadata-graph';

import { useMsgClient } from 'hooks';

import { CreateBatchFormValues } from './CreateBatchMultiStepForm/CreateBatchMultiStepForm';

// TODO - Deprecated
// `projectLocation` won't be needed anymore starting from v4.0
// https://github.com/regen-network/regen-registry/issues/968
// right now `projectLocation` is hardcoded to 'US' in MsgCreateBatch.fromPartial
// This case has not been implemented because the data source changes with the update to
// ecocredits v1, where the information is already part of the project entity in the ledger.

// TODO
// Right now, just case "C01" (aka. VCS)

function prepareMetadata(
  partialMetadata: Partial<VCSBatchMetadataLD>,
): VCSBatchMetadataLD | undefined {
  const projectIdRaw = partialMetadata['regen:vcsProjectId'];
  const retirementSerialNumber =
    partialMetadata['regen:vcsRetirementSerialNumber'];

  const additionalCertifications =
    partialMetadata['regen:additionalCertifications'];

  if (!projectIdRaw || !retirementSerialNumber) return;

  const projectId =
    typeof projectIdRaw === 'number' ? projectIdRaw : parseInt(projectIdRaw);

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

  // finally, build de Msg DTO
  const issuance: MsgCreateBatch_BatchIssuance[] = data.recipients.map(
    recipient => {
      const issuanceRecipient: Partial<MsgCreateBatch_BatchIssuance> = {
        recipient: recipient.recipient,
        tradableAmount: recipient.tradableAmount.toString(),
        retiredAmount: '0',
      };
      if (recipient.withRetire && recipient.retiredAmount > 0) {
        issuanceRecipient.retiredAmount = recipient.retiredAmount.toString();
        issuanceRecipient.retirementLocation = recipient.retirementLocation;
      }
      return issuanceRecipient as MsgCreateBatch_BatchIssuance;
    },
  );

  return MsgCreateBatch.fromPartial({
    issuer,
    classId: data.classId,
    issuance: issuance,
    metadata: stringToUint8Array(iriResponse.iri),
    startDate: new Date(data.startDate as Date),
    endDate: new Date(data.endDate as Date),
    // TODO - Deprecated - Hardcoded projectLocation (see comment above)
    // projectLocation won't be needed anymore starting from v4.0
    projectLocation: 'US',
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

export default function useCreateBatch(): ReturnType {
  const { api } = useLedger();
  const { wallet, signAndBroadcast, deliverTxResponse, error, setError } =
    useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const accountAddress = wallet?.address;

  const [status, setStatus] = React.useState<SubmissionStatus>('idle');
  const [isSubmitModalOpen, setIsSubmitModalOpen] =
    React.useState<boolean>(false);

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
