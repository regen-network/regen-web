import { Box } from '@mui/material';

import { Title } from 'web-components/lib/components/typography';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';
import { CFCBatchMetadataLD } from 'web-components/lib/types/rdf/C02-city-forest-credits-batch';

import { CFCBatchMetadata } from './BatchMetadata.CFC';
import { VCSBatchMetadata } from './BatchMetadata.VCS';

export const BatchMetadata = ({
  data,
}: {
  data?: VCSBatchMetadataLD | CFCBatchMetadataLD;
}): JSX.Element => {
  const isVCS = data?.['@type'] === 'regen:C01-CreditBatch';
  const isCFC = data?.['@type'] === 'regen:C02-CreditBatch';
  return (
    <Box
      sx={{
        py: 7,
        px: 5,
        backgroundColor: 'primary.main',
        border: 1,
        borderColor: 'info.light',
      }}
    >
      <Title variant="h5" sx={{ mb: 4 }}>
        Additional Info
      </Title>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {isVCS && <VCSBatchMetadata data={data} />}
        {isCFC && <CFCBatchMetadata data={data} />}
      </Box>
    </Box>
  );
};
