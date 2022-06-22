import React from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';

import {
  MsgCreateBatch,
  MsgCreateBatch_BatchIssuance,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/tx';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

import { useLedger } from '../../../ledger';
import getApiUri from '../../../lib/apiUri';
import useMsgClient from '../../../hooks/useMsgClient';
import { CreateBatchFormValues } from './CreateBatchMultiStepForm/CreateBatchMultiStepForm';

// Disclaimer - Right now, just case "C01"

const iriUrl = '/iri-gen';

function stringToUint8Array(metadata: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(metadata);
}

function prepareMetadata(
  partialMetadata: Partial<VCSBatchMetadataLD>,
): VCSBatchMetadataLD | undefined {
  const projectId = partialMetadata['regen:vcsProjectId'];
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

type IriSuccessProp = {
  iri: string;
};

type MetadataProp<T> = {
  metadata: T;
};

type IriFromMetadataSuccess<T> = IriSuccessProp & MetadataProp<T>;
type IriFromMetadata<T> = IriFromMetadataSuccess<T>;

async function generateIri<T>(
  metadata: T,
): Promise<IriFromMetadata<T> | undefined> {
  try {
    const response = await fetch(getApiUri() + iriUrl, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      body: JSON.stringify(metadata),
    });
    const data = await response.json();
    if (!data || data.error) return;
    return data;
  } catch (err) {
    throw new Error(`Error in iri generation service: ${err}`);
  }
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
      let issuanceRecipient: Partial<MsgCreateBatch_BatchIssuance> = {
        recipient: recipient.recipient,
        tradableAmount: recipient.tradableAmount.toString(),
        retiredAmount: '0',
      };
      if (recipient.withRetire && recipient.retiredAmount > 0) {
        issuanceRecipient.retiredAmount = recipient.retiredAmount.toString();
        issuanceRecipient.retirementLocation = recipient.retirementLocation;
        // TODO - check optional fields (notes)
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
    projectLocation: 'US', // TODO - Missing
  });
}

type SubmissionStatus = 'idle' | 'message' | 'sign' | 'broadcast' | 'finished';

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
    setStatus('finished');
    setIsSubmitModalOpen(false);
  }

  function handleError(): void {
    setIsSubmitModalOpen(false);
    setStatus('finished');
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
      await signAndBroadcast({ msgs: [message] });
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
