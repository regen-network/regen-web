import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';

import { Flex } from 'web-components/src/components/box';
import { Title } from 'web-components/src/components/typography';

import { CreditBatchMetadataIntersectionLD } from 'lib/db/types/json-ld';

import { BatchMetadataAdditionalInfo } from './BatchMetadata.AdditionalInfo';

export const BatchMetadata = ({
  data,
}: {
  data?: CreditBatchMetadataIntersectionLD | null;
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
        <Trans>Additional Info</Trans>
      </Title>
      <Flex col sx={{ gap: 8 }}>
        <BatchMetadataAdditionalInfo data={data} />
      </Flex>
    </Box>
  );
};
