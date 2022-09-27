import React from 'react';
import { Box } from '@mui/material';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body } from 'web-components/lib/components/typography';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';
import { CFCBatchMetadataLD } from 'web-components/lib/types/rdf/C02-city-forest-credits-batch';

import { LinkWithArrow } from '../atoms';

export const BatchMetadata = ({
  data,
}: {
  data?: VCSBatchMetadataLD | CFCBatchMetadataLD;
}): JSX.Element => {
  const isVCS = data?.['@type'] === 'regen:C01-CreditBatch';
  const isCFC = data?.['@type'] === 'regen:C02-CreditBatch';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {isVCS && <VCSBatchMetadata data={data} />}
      {isCFC && <CFCBatchMetadata data={data} />}
    </Box>
  );
};

export const VCSBatchMetadata = ({
  data,
}: {
  data?: VCSBatchMetadataLD;
}): JSX.Element => {
  const additionalCertifications = data?.['regen:additionalCertifications'];
  return (
    <>
      <MetaDetail label="vcs retirement serial number">
        {data?.['regen:vcsRetirementSerialNumber'] || '-'}
      </MetaDetail>
      <MetaDetail label="additional certifications">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {additionalCertifications && additionalCertifications?.length > 0
            ? additionalCertifications?.map((cert, i) => (
                <LinkOrDash
                  key={i}
                  href={cert?.['schema:url']?.['@value']}
                  label={cert?.['schema:name']}
                />
              ))
            : '-'}
        </Box>
      </MetaDetail>
    </>
  );
};

export const CFCBatchMetadata = ({
  data,
}: {
  data?: CFCBatchMetadataLD;
}): JSX.Element => {
  console.log('CFCBatchMetadata', data);
  const reports = data?.['regen:verificationReports'];
  const serialNumbers = data?.['regen:cfcCreditSerialNumbers'];
  return (
    <>
      <MetaDetail label="cfc retirement serial numbers">
        {serialNumbers?.join(', ') || '-'}
      </MetaDetail>
      <MetaDetail label="cfc vintage year">
        {data?.['regen:cfcVintageYear']?.['@value'] || '-'}
      </MetaDetail>
      <MetaDetail label="verification reports">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {reports && reports?.length > 0
            ? reports?.map((report, i) => (
                <LinkOrDash
                  key={i}
                  href={report?.['schema:url']?.['@value']}
                  label="Verification report"
                />
              ))
            : '-'}
        </Box>
      </MetaDetail>
    </>
  );
};

const LinkOrDash = ({
  href,
  label,
}: {
  href?: string;
  label?: string;
}): JSX.Element => {
  if (!href) return <>-</>;
  return <LinkWithArrow href={href} label={label || ''} />;
};

const MetaDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label} labelSize="xs">
    <Body mobileSize="md" styleLinks={false}>
      {children}
    </Body>
  </LabeledDetail>
);
