import { Box } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import { Title } from 'web-components/lib/components/typography';
import { CreditBatchMetadataIntersectionLD } from 'web-components/lib/types/rdf/credit-batch-intersection-ld';

import { BatchMetadataAdditionalInfo } from './BatchMetadata.AdditionalInfo';

export const BatchMetadata = ({
  data,
}: {
  data?: Partial<CreditBatchMetadataIntersectionLD>;
}): JSX.Element => {
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
        <BatchMetadataAdditionalInfo data={data} />
      </Flex>
    </Box>
  );
};
