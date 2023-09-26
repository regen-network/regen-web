import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EmptyState from 'web-components/lib/components/empty-state';
import NoEcocreditsIcon from 'web-components/lib/components/icons/NoEcocreditsIcon';
import PlusIcon from 'web-components/lib/components/icons/PlusIcon';
import { Label, Subtitle } from 'web-components/lib/components/typography';
import { CreditBatches } from 'components/organisms';

import WithLoader from 'components/atoms/WithLoader';
import { useProfileData } from '../hooks/useProfileData';
import { usePaginatedBatchesByIssuer } from 'hooks/batches/usePaginatedBatchesByIssuer';
import { useTheme } from '@mui/material';
import { PROFILE_NO_CREDIT_BATCHES_MESSAGE } from './CreditBatchesTab.constants';

export const CreditBatchesTab = () => {
  const { address, party, isLoading: isLoadingProfileData } = useProfileData();
  const { batchesWithSupply, setPaginationParams } =
    usePaginatedBatchesByIssuer({ address });
  const theme = useTheme();

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
              backgroundColor: 'primary.main',
              px: 6.25,
              py: 6.25,
              border: theme => `1px solid ${theme.palette.info.light}`,
              borderRadius: '8px 8px 0 0',
            }}
          >
            <Subtitle
              sx={{
                color: 'primary.contrastText',
              }}
              size="xl"
            >
              Successfully issued credit batches
            </Subtitle>
          </Box>
          <CreditBatches
            creditBatches={batchesWithSupply}
            onTableChange={setPaginationParams}
            sx={{ root: { borderTop: 0 } }}
          />
        </>
      </WithLoader>
      {hasNoBatches && (
        <EmptyState
          message={PROFILE_NO_CREDIT_BATCHES_MESSAGE}
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
