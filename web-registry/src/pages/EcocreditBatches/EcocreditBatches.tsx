import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';

import { CreditBatches } from 'components/organisms';
import { usePaginatedBatches } from 'hooks/batches/usePaginatedBatches';

export const EcocreditBatches = (): JSX.Element => {
  const navigate = useNavigate();
  const { page: routePage } = useParams();
  const { batchesWithSupply, setPaginationParams, paginationParams } =
    usePaginatedBatches();
  const { page } = paginationParams;

  useEffect(() => {
    // Page index starts at 1 for route
    // Page index starts at 0 for MUI Table
    if (routePage !== String(page + 1)) {
      navigate(`/ecocredit-batches/${page + 1}`);
    }
  }, [page, routePage, navigate]);

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
            initialPaginationParams={paginationParams}
            isRoutePagination
          />
        </Box>
      </Section>
    </Box>
  );
};
