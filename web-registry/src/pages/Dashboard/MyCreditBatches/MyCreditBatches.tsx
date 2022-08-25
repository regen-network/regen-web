import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { Box } from '@mui/system';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EmptyState from 'web-components/lib/components/empty-state';
import { CreditBatchLightIcon } from 'web-components/lib/components/icons/CreditBatchLightIcon';
import PlusIcon from 'web-components/lib/components/icons/PlusIcon';
import { Title } from 'web-components/lib/components/typography';

import WithLoader from 'components/atoms/WithLoader';
import { CreditBatches } from 'components/organisms';
import { usePaginatedBatchesByIssuer } from 'hooks/batches/usePaginatedBatchesByIssuer';

import { NO_CREDIT_BATCHES_MESSAGE } from './MyCreditBatches.constants';

type MyCreditBatchesProps = {
  address?: string;
};

export const MyCreditBatches = ({
  address,
}: MyCreditBatchesProps): JSX.Element => {
  const theme = useTheme();
  const { batchesWithSupply, setPaginationParams } =
    usePaginatedBatchesByIssuer({ address });
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
              display: 'flex',
              flexDirection: ['column', 'row'],
              justifyContent: 'space-between',
              alignItems: ['flex-start', 'center'],
              mb: 10.5,
            }}
          >
            <Title
              variant="h6"
              sx={{
                textTransform: 'uppercase',
                color: 'info.dark',
                mb: [3.5, 0],
              }}
            >
              Successfully issues credit batches
            </Title>
            <Link to="/ecocredits/create-batch">
              <OutlinedButton
                startIcon={<PlusIcon color={theme.palette.secondary.main} />}
              >
                create credit batch
              </OutlinedButton>
            </Link>
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
          icon={
            <CreditBatchLightIcon sx={{ color: 'info.main', fontSize: 84 }} />
          }
          sx={{ backgroundColor: 'info.light' }}
        >
          <Link to="/ecocredits/create-batch">
            <OutlinedButton
              startIcon={<PlusIcon color={theme.palette.secondary.main} />}
            >
              create credit batch
            </OutlinedButton>
          </Link>
        </EmptyState>
      )}
    </Box>
  );
};
