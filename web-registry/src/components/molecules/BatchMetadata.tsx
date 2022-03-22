import React from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Link } from '../atoms';

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
        {!!monitoringReport ? (
          <Link href={monitoringReport?.['schema:url']?.['@value']}>
            {monitoringReport?.['schema:name']}
          </Link>
        ) : (
          '-'
        )}
      </MetaDetail>
      <MetaDetail label="Batch verification report">
        {!!verificationReport ? (
          <Link href={verificationReport?.['schema:url']?.['@value']}>
            {verificationReport?.['schema:name']}
          </Link>
        ) : (
          '-'
        )}
      </MetaDetail>
    </Box>
  );
};

const MetaDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label} sx={{ label: { fontSize: { xs: 12 } } }}>
    <Typography sx={{ fontSize: 16 }}>{children}</Typography>
  </LabeledDetail>
);
