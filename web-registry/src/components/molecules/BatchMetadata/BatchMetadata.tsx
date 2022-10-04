import { Box } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import { Title } from 'web-components/lib/components/typography';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';
import { CFCBatchMetadataLD } from 'web-components/lib/types/rdf/C02-city-forest-credits-batch';
import { CreditBatchMetadataUnionLD } from 'web-components/lib/types/rdf/credit-batch-union-ld';

import { BatchMetadataCFC } from './BatchMetadata.CFC';
import { BatchMetadataVCS } from './BatchMetadata.VCS';

export const BatchMetadata = ({
  data,
}: {
  data?: Partial<CreditBatchMetadataUnionLD>;
}): JSX.Element => {
  const isVCS =
    (data as Partial<VCSBatchMetadataLD>)?.['@type'] ===
    'regen:C01-CreditBatch';
  const isCFC =
    (data as Partial<CFCBatchMetadataLD>)?.['@type'] ===
    'regen:C02-CreditBatch';
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
      <Flex col sx={{ gap: 8 }}>
        {isVCS && (
          <BatchMetadataVCS data={data as Partial<VCSBatchMetadataLD>} />
        )}
        {isCFC && (
          <BatchMetadataCFC data={data as Partial<CFCBatchMetadataLD>} />
        )}
      </Flex>
    </Box>
  );
};
