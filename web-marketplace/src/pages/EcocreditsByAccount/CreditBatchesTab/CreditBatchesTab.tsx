import { Box } from '@mui/system';

import { MyCreditBatchesTable } from 'pages/Dashboard/MyCreditBatches/MyCreditBatches.Table';
import { usePaginatedBatchesByIssuer } from 'hooks/batches/usePaginatedBatchesByIssuer';

import { useProfileData } from '../hooks/useProfileData';

export const CreditBatchesTab = () => {
  const { address } = useProfileData();
  const { batchesWithSupply, setPaginationParams } =
    usePaginatedBatchesByIssuer({ address });

  const hasNoBatches = batchesWithSupply && batchesWithSupply?.length === 0;

  return (
    <Box sx={{ width: '100%' }}>
      <MyCreditBatchesTable
        hasNoBatches={hasNoBatches}
        setPaginationParams={setPaginationParams}
        batchesWithSupply={batchesWithSupply}
      />
    </Box>
  );
};
