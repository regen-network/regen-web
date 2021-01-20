import React, { useState } from 'react';
import { GetTxResponse } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import LedgerModal from './LedgerModal';
import { RegenModalProps } from './';
import PartyAddress, { Party } from '../party/PartyAddress';
import Document, { DocumentInfo } from '../document';
import { getFormattedDate, getFormattedNumber } from '../../utils/format';

interface DocumentVersion {
  name: string;
  version: string;
}

interface IssuanceModalProps extends RegenModalProps {
  txRes: GetTxResponse;
  link: string;
  issuer: Party;
  issuees: Party[];
  timestamp: string | Date;
  numberOfCredits: number;
  creditUnit: string;
  vintageId: DocumentInfo;
  vintagePeriod: string;
  monitoringPeriods: DocumentInfo[];
  projectName: string;
  standardId: DocumentVersion;
  creditClass: DocumentVersion;
  creditClassHandle: string;
  methodology: DocumentVersion;
  methodologyHandle: string;
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
  txRes,
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
  creditClassHandle,
  methodology,
  methodologyHandle,
  ...props
}: IssuanceModalProps): JSX.Element {
  const [party, setParty] = useState<Party | null>(null);

  return (
    <LedgerModal
      txRes={txRes}
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
          value: getFormattedDate(timestamp, options),
        },
        {
          label: '# of credits',
          value: getFormattedNumber(numberOfCredits),
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
          value: creditClassHandle,
        },
        {
          label: 'methodology',
          value: getDocumentVersion(methodology),
        },
        {
          label: 'methodology id',
          value: methodologyHandle,
        },
      ]}
      {...props}
    />
  );
}
