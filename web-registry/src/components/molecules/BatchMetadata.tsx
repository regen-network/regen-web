import React from 'react';
import { Box } from '@mui/material';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body } from 'web-components/lib/components/typography';
import { LinkWithArrow } from '../atoms';

import type { BatchMetadataLD } from '../../generated/json-ld';

export const BatchMetadata = ({
  data,
}: {
  data?: BatchMetadataLD;
}): JSX.Element => {
  const additionalCertifications = data?.['regen:additionalCertifications'];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MetaDetail label="vcs retirement serial number">
        {data?.['regen:vcsRetirementSerialNumber'] || '-'}
      </MetaDetail>
      <MetaDetail label="additional certifications">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {additionalCertifications && additionalCertifications?.length > 0
            ? additionalCertifications?.map(cert => (
                <LinkOrDash
                  href={cert?.['schema:url']?.['@value']}
                  label={cert?.['schema:name']}
                />
              ))
            : '-'}
        </Box>
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
    <Body mobileSize="md" styleLinks={false}>
      {children}
    </Body>
  </LabeledDetail>
);
