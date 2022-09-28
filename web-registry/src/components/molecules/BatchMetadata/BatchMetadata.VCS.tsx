import { Box } from '@mui/material';

import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

import { LinkOrDash } from './BatchMetadata.LinkOrDash';
import { MetaDetail } from './BatchMetadata.MetaDetail';

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
