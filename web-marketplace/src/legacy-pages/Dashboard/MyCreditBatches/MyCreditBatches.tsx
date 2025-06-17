import { Link } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EmptyState from 'web-components/src/components/empty-state';
import NoEcocreditsIcon from 'web-components/src/components/icons/NoEcocreditsIcon';
import PlusIcon from 'web-components/src/components/icons/PlusIcon';

import { useWallet } from 'lib/wallet/wallet';

import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';

import { NO_CREDIT_BATCHES_MESSAGE } from './MyCreditBatches.constants';
import { MyCreditBatchesTable } from './MyCreditBatches.Table';

export const MyCreditBatches = (): JSX.Element => {
  const { _ } = useLingui();
  const theme = useTheme();
  const { wallet } = useWallet();
  const { batchesWithSupply, setPaginationParams, paginationParams } =
    useFetchPaginatedBatches({
      address: wallet?.address,
    });
  const hasNoBatches = batchesWithSupply && batchesWithSupply?.length === 0;

  return (
    <Box className="shadow-[0_2px_5px_0.5px_rgba(0,0,0,0.05)] w-[100%]">
      <MyCreditBatchesTable
        hasNoBatches={hasNoBatches}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        batchesWithSupply={batchesWithSupply}
        useCreate
      />
      {hasNoBatches && (
        <EmptyState
          message={_(NO_CREDIT_BATCHES_MESSAGE)}
          icon={<NoEcocreditsIcon sx={{ width: 100, height: 100 }} />}
          sx={{ backgroundColor: 'info.light' }}
        >
          <OutlinedButton
            startIcon={<PlusIcon color={theme.palette.secondary.main} />}
            component={Link}
            to="/ecocredits/create-batch"
          >
            <Trans>create credit batch</Trans>
          </OutlinedButton>
        </EmptyState>
      )}
    </Box>
  );
};
