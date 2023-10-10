import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EmptyState from 'web-components/lib/components/empty-state';
import NoEcocreditsIcon from 'web-components/lib/components/icons/NoEcocreditsIcon';
import PlusIcon from 'web-components/lib/components/icons/PlusIcon';

import { useWallet } from 'lib/wallet/wallet';

import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';

import { NO_CREDIT_BATCHES_MESSAGE } from './MyCreditBatches.constants';
import { MyCreditBatchesTable } from './MyCreditBatches.Table';

export const MyCreditBatches = (): JSX.Element => {
  const theme = useTheme();
  const { wallet } = useWallet();
  const { batchesWithSupply, setPaginationParams, paginationParams } =
    useFetchPaginatedBatches({
      address: wallet?.address,
    });
  const hasNoBatches = batchesWithSupply && batchesWithSupply?.length === 0;

  return (
    <Box sx={{ width: '100%' }}>
      <MyCreditBatchesTable
        hasNoBatches={hasNoBatches}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        batchesWithSupply={batchesWithSupply}
        useCreate
      />
      {hasNoBatches && (
        <EmptyState
          message={NO_CREDIT_BATCHES_MESSAGE}
          icon={<NoEcocreditsIcon sx={{ width: 100, height: 100 }} />}
          sx={{ backgroundColor: 'info.light' }}
        >
          <OutlinedButton
            startIcon={<PlusIcon color={theme.palette.secondary.main} />}
            component={Link}
            to="/ecocredits/create-batch"
          >
            create credit batch
          </OutlinedButton>
        </EmptyState>
      )}
    </Box>
  );
};
