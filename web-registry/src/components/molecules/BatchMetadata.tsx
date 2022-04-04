import React from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { LinkWithArrow } from '../atoms';

import type { BatchMetadataLD } from '../../generated/json-ld';

export const BatchMetadata: React.FC<{
  data?: BatchMetadataLD;
  sx?: SxProps<Theme>;
}> = ({ sx, data }) => {
  const monitoringReport = data?.['regen:batchMonitoringReport'];
  const verificationReport = data?.['regen:batchVerificationReport'];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8, ...sx }}>
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

const LinkOrDash: React.FC<{ href?: string; label?: string }> = ({
  href,
  label,
}) => {
  if (!href) return <>-</>;
  return <LinkWithArrow href={href} label={label || ''} />;
};

const MetaDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label} sx={{ label: { fontSize: { xs: 12 } } }}>
    <Typography sx={{ fontSize: 16 }}>{children}</Typography>
  </LabeledDetail>
);
