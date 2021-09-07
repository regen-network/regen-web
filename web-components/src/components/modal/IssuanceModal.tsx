import React, { useState } from 'react';
import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import LedgerModal from './LedgerModal';
import { RegenModalProps } from './';
import PartyAddress, { Party } from '../party/PartyAddress';
import Document, { DocumentInfo } from '../document';
import { getFormattedDate, getFormattedNumber } from '../../utils/format';
import { pluralize } from '../../utils/pluralize';

interface DocumentVersion {
  name: string;
  version: string;
}

export interface IssuanceModalData {
  link?: string;
  issuer: Party;
  issuees: Party[];
  timestamp: string | Date;
  numberOfCredits: number; // net amount, ie total minus (bufferPool + permanenceReversalBuffer)
  bufferPool?: number;
  permanenceReversalBuffer?: number;
  creditUnit: string;
  vintageId: DocumentInfo;
  vintagePeriod: string;
  monitoringPeriods: DocumentInfo[];
  projectName: string;
  standardId: DocumentVersion;
  creditClass: DocumentVersion;
  creditClassDocumentId: string;
  methodology: DocumentVersion;
  methodologyDocumentId: string;
  txHash?: string;
}

interface IssuanceModalProps extends RegenModalProps, IssuanceModalData {
  txClient?: ServiceClientImpl;
  txHash?: string;
}

const options = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

function getDocumentVersion(doc: DocumentVersion): string {
  return `${doc.name}, ${doc.version}`;
}

export default function IssuanceModal({
  link,
  issuer,
  issuees,
  timestamp,
  numberOfCredits,
  creditUnit,
  vintageId,
  vintagePeriod,
  monitoringPeriods,
  projectName,
  standardId,
  creditClass,
  creditClassDocumentId,
  methodology,
  methodologyDocumentId,
  txClient,
  txHash,
  bufferPool,
  permanenceReversalBuffer,
  ...props
}: IssuanceModalProps): JSX.Element {
  const [party, setParty] = useState<Party | null>(null);

  return (
    <LedgerModal
      txClient={txClient}
      txHash={txHash}
      link={link}
      party={party}
      handleBack={() => setParty(null)}
      summary={[
        {
          label: 'issued by',
          value: (
            <PartyAddress name={issuer.name} address={issuer.address} onClick={() => setParty(issuer)} />
          ),
        },
        {
          label: 'issued to',
          value: (
            <>
              {issuees.map((issuee: Party, index: number) => (
                <PartyAddress
                  key={index}
                  name={issuee.name}
                  address={issuee.address}
                  onClick={() => setParty(issuee)}
                />
              ))}
            </>
          ),
        },
        {
          label: 'timestamp',
          value: getFormattedDate(new Date(timestamp), options),
        },
        {
          label: '# of credits',
          value: getFormattedNumber(Math.floor(numberOfCredits)),
        },
        {
          label: 'buffer pool',
          value: bufferPool
            ? `${getFormattedNumber(Math.floor(bufferPool))} ${pluralize(bufferPool, 'credit')}`
            : undefined,
        },
        {
          label: 'permanence reversal buffer',
          value: permanenceReversalBuffer
            ? `${getFormattedNumber(Math.floor(permanenceReversalBuffer))} ${pluralize(
                permanenceReversalBuffer,
                'credit',
              )}`
            : undefined,
        },
        {
          label: 'credit unit',
          value: creditUnit,
        },
        {
          label: 'vintage id',
          value: <Document name={vintageId.name} info={vintageId.info} link={vintageId.link} />,
        },
        {
          label: 'vintage period',
          value: vintagePeriod,
        },
        {
          label: 'monitoring periods',
          value: (
            <>
              {monitoringPeriods.map((p: DocumentInfo, index: number) => (
                <Document key={index} name={p.name} info={p.info} link={p.link} />
              ))}
            </>
          ),
        },
        {
          label: 'project name',
          value: projectName,
        },
        {
          label: 'standard id',
          value: getDocumentVersion(standardId),
        },
        {
          label: 'credit class',
          value: getDocumentVersion(creditClass),
        },
        {
          label: 'credit class id',
          value: creditClassDocumentId,
        },
        {
          label: 'methodology',
          value: getDocumentVersion(methodology),
        },
        {
          label: 'methodology id',
          value: methodologyDocumentId,
        },
      ]}
      {...props}
    />
  );
}
