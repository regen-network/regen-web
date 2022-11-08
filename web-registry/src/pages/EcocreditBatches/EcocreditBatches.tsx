import { Box } from '@mui/material';

import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';

import { CreditBatches } from 'components/organisms';
import { usePaginatedBatches } from 'hooks/batches/usePaginatedBatches';

export const EcocreditBatches = (): JSX.Element => {
  const { batchesWithSupply, setPaginationParams } = usePaginatedBatches();

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section>
        <Title variant="h2" sx={{ mb: 8.5 }}>
          {'Ecocredit Batches'}
        </Title>
        <Box sx={{ paddingBottom: '150px' }}>
          <CreditBatches
            creditBatches={batchesWithSupply}
            onTableChange={setPaginationParams}
          />
        </Box>
      </Section>
    </Box>
  );
};
