import React from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { LinkWithArrow } from '../atoms';

import type { BatchMetadataLD } from '../../generated/json-ld';

export const BatchMetadata: React.FC<{
  data?: BatchMetadataLD;
  sx?: SxProps<Theme>;
}> = ({ sx, data }) => {
  const additionalCertifications = data?.['regen:additionalCertifications'];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8, ...sx }}>
      <MetaDetail label="vcs retirement serial number">
        {data?.['regen:vcsRetirementSerialNumber'] || '-'}
      </MetaDetail>
      <MetaDetail label="additional certifications">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {additionalCertifications && additionalCertifications?.length > 0 ? (
            additionalCertifications?.map(cert => (
              <LinkOrDash
                href={cert?.['schema:url']?.['@value']}
                label={cert?.['schema:name']}
              />
            ))
          ) : (
            <Dash />
          )}
        </Box>
      </MetaDetail>
    </Box>
  );
};

const Dash: React.FC = () => <>-</>;

const LinkOrDash: React.FC<{ href?: string; label?: string }> = ({
  href,
  label,
}) => {
  if (!href) return <Dash />;
  return <LinkWithArrow href={href} label={label || ''} />;
};

const MetaDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label} sx={{ label: { fontSize: { xs: 12 } } }}>
    <Typography sx={{ fontSize: 16 }}>{children}</Typography>
  </LabeledDetail>
);
