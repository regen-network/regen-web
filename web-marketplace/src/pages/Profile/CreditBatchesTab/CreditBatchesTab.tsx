import { Box } from '@mui/system';
import { MyCreditBatchesTable } from 'legacy-pages/Dashboard/MyCreditBatches/MyCreditBatches.Table';

import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';

import { useProfileData } from '../hooks/useProfileData';

export const CreditBatchesTab = () => {
  const { address } = useProfileData();
  const { batchesWithSupply, setPaginationParams, paginationParams } =
    useFetchPaginatedBatches({
      address,
    });

  const hasNoBatches = batchesWithSupply && batchesWithSupply?.length === 0;

  return (
    <Box sx={{ width: '100%' }}>
      <MyCreditBatchesTable
        hasNoBatches={hasNoBatches}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        batchesWithSupply={batchesWithSupply}
      />
    </Box>
  );
};
