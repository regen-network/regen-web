import { Box } from '@mui/material';

import { CFCBatchMetadataLD } from 'web-components/lib/types/rdf/C02-city-forest-credits-batch';

import { LinkOrDash } from './BatchMetadata.LinkOrDash';
import { MetaDetail } from './BatchMetadata.MetaDetail';

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
        {/* TODO */}
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
