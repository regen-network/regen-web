import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EmptyState from 'web-components/lib/components/empty-state';
import NoEcocreditsIcon from 'web-components/lib/components/icons/NoEcocreditsIcon';
import PlusIcon from 'web-components/lib/components/icons/PlusIcon';
import { Label } from 'web-components/lib/components/typography';

import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';
import { CreditBatches } from 'components/organisms';
import { usePaginatedBatchesByIssuer } from 'hooks/batches/usePaginatedBatchesByIssuer';

import { NO_CREDIT_BATCHES_MESSAGE } from './MyCreditBatches.constants';

export const MyCreditBatches = (): JSX.Element => {
  const theme = useTheme();
  const { wallet } = useWallet();
  const { batchesWithSupply, setPaginationParams } =
    usePaginatedBatchesByIssuer({ address: wallet?.address });
  const hasNoBatches = batchesWithSupply && batchesWithSupply?.length === 0;

  return (
    <Box sx={{ width: '100%' }}>
      <WithLoader
        isLoading={batchesWithSupply === undefined}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'col',
          alignItems: 'center',
        }}
      >
        <>
          <Box
            sx={{
              display: hasNoBatches ? 'none' : 'flex',
              flexDirection: ['column', 'row'],
              justifyContent: 'space-between',
              alignItems: ['flex-start', 'center'],
              mb: 10.5,
            }}
          >
            <Label
              sx={{
                color: 'info.dark',
                mb: [3.5, 0],
              }}
            >
              Successfully issued credit batches
            </Label>
            <OutlinedButton
              startIcon={<PlusIcon color={theme.palette.secondary.main} />}
              component={Link}
              to="/profile/create-batch"
            >
              create credit batch
            </OutlinedButton>
          </Box>
          <CreditBatches
            creditBatches={batchesWithSupply}
            onTableChange={setPaginationParams}
          />
        </>
      </WithLoader>
      {hasNoBatches && (
        <EmptyState
          message={NO_CREDIT_BATCHES_MESSAGE}
          icon={<NoEcocreditsIcon sx={{ width: 100, height: 100 }} />}
          sx={{ backgroundColor: 'info.light' }}
        >
          <OutlinedButton
            startIcon={<PlusIcon color={theme.palette.secondary.main} />}
            component={Link}
            to="/profile/create-batch"
          >
            create credit batch
          </OutlinedButton>
        </EmptyState>
      )}
    </Box>
  );
};
