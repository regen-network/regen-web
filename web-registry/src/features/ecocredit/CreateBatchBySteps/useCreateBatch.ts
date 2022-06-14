/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MsgCreateBatch,
  MsgCreateBatchResponse,
  MsgCreateBatch_BatchIssuance,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/tx';
import React from 'react';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';
import getApiUri from '../../../lib/apiUri';
import { useWallet } from '../../../lib/wallet';
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
    // TODO - additionalCertifications
    'regen:additionalCertifications': [],
  };
  // TODO - additionalCertifications
  // {
  //   'schema:name': '',
  //   'schema:url': {
  //     '@type': 'schema:URL',
  //     '@value': '',
  //   },
  // }

  return metadata;
}

type IriSuccessProp = {
  iri: string;
};

// type IriErrorProp = {
//   error: string;
// };

type MetadataProp<T> = {
  metadata: T;
};

type IriFromMetadataSuccess<T> = IriSuccessProp & MetadataProp<T>;
// type IriFromMetadataError = IriErrorProp;
type IriFromMetadata<T> = IriFromMetadataSuccess<T>;
// type IriFromMetadata<T> = IriFromMetadataSuccess<T> | IriFromMetadataError;

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
    // eslint-disable-next-line no-console
    console.error('Error:', err);
    throw new Error(`Error in iri generation service: ${err}`);
  }
}

// TODO - facked >>> useMsgClient()
async function submitMessage(
  message: MsgCreateBatch,
): Promise<MsgCreateBatchResponse> {
  function _sleep(ms: number): Promise<MsgCreateBatchResponse> {
    return new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            $type: 'regen.ecocredit.v1alpha1.MsgCreateBatchResponse',
            batchDenom: 'batch-denom-foo-bar',
          }),
        ms,
      ),
    );
  }
  alert(JSON.stringify(message, null, 2));
  return await _sleep(1000);
}

type SubmissionStatus =
  | 'idle'
  // | 'validation-metadata-processing'
  // | 'validation-metadata-success'
  // | 'validation-metadata-error'
  // | 'generation-iri-processing'
  // | 'generation-iri-success'
  // | 'generation-iri-error'
  // // | 'preparation-msg'
  | 'processing' // | 'sending-msg'
  | 'finished';

type CreateBatchFn = (data: CreateBatchFormValues) => Promise<void>;

// type ReturnType = [SubmissionStatus, CreateBatchFn];
type ReturnType = {
  status: SubmissionStatus;
  createBatch: CreateBatchFn;
  msgResponse: MsgCreateBatchResponse | undefined;
  error: Error | undefined;
};

export default function useCreateBatch(): ReturnType {
  const { wallet } = useWallet();

  const [status, setStatus] = React.useState<SubmissionStatus>('idle');
  const [msgResponse, setMsgResponse] =
    React.useState<MsgCreateBatchResponse>();
  const [error, setError] = React.useState<Error>();

  const createBatch = async (data: CreateBatchFormValues): Promise<void> => {
    if (!wallet?.address) return;
    if (!data.startDate || !data.endDate) return;

    // TODO: first, check if iri already exists in data input ?
    // if already exist, then check prepared data

    // Checks and set initial state
    setStatus('processing');

    const metadata: VCSBatchMetadataLD | undefined = prepareMetadata(
      data.metadata as Partial<VCSBatchMetadataLD>,
    );

    if (!metadata) return;

    const iriResponse: IriFromMetadataSuccess<VCSBatchMetadataLD> | undefined =
      await generateIri(metadata);

    if (!iriResponse) return;

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

    try {
      const message: MsgCreateBatch = {
        $type: 'regen.ecocredit.v1alpha1.MsgCreateBatch',
        issuer: wallet.address,
        classId: data.classId,
        issuance: issuance,
        metadata: stringToUint8Array(iriResponse.iri),
        startDate: data.startDate,
        endDate: data.endDate,
        projectLocation: '', // TODO - Missing
      };

      const tx = await submitMessage(message);

      // TODO: success / error
      if (tx) {
        // eslint-disable-next-line no-console
        console.log('finally por try', tx);
        // setStatus('finished');
        setMsgResponse(tx);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError(err as Error);
    } finally {
      setStatus('finished');
    }
  };

  return { status, createBatch, msgResponse, error };
}
