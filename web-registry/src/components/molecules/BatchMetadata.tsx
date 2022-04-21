import React from 'react';
import { Box } from '@mui/material';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body } from 'web-components/lib/components/typography';
import { LinkWithArrow } from '../atoms';

import type { BatchMetadataLD } from '../../generated/json-ld';

export const BatchMetadata: React.FC<{ data?: BatchMetadataLD }> = ({
  data,
}) => {
  const monitoringReport = data?.['regen:batchMonitoringReport'];
  const verificationReport = data?.['regen:batchVerificationReport'];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MetaDetail label="vcs retirement serial number">
        {data?.['regen:vcsRetirementSerialNumber'] || '-'}
      </MetaDetail>
      <MetaDetail label="batch monitoring report">
        <LinkOrDash
          href={monitoringReport?.['schema:url']?.['@value']}
          label={monitoringReport?.['schema:name']}
        />
      </MetaDetail>
      <MetaDetail label="Batch verification report">
        <LinkOrDash
          href={verificationReport?.['schema:url']?.['@value']}
          label={verificationReport?.['schema:name']}
        />
      </MetaDetail>
    </Box>
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
    <Body mobileSize="md">{children}</Body>
  </LabeledDetail>
);
