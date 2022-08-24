import { useTheme } from '@mui/styles';
import { Box } from '@mui/system';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import EmptyState from 'web-components/lib/components/empty-state';
import { CreditBatchLightIcon } from 'web-components/lib/components/icons/CreditBatchLightIcon';
import PlusIcon from 'web-components/lib/components/icons/PlusIcon';

import { NO_CREDIT_BATCHES_MESSAGE } from './MyCreditBatches.constants';

export const MyCreditBatches = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <EmptyState
        message={NO_CREDIT_BATCHES_MESSAGE}
        icon={
          <CreditBatchLightIcon sx={{ color: 'info.main', fontSize: 84 }} />
        }
        sx={{ backgroundColor: 'info.light' }}
      >
        <OutlinedButton
          startIcon={<PlusIcon color={theme.palette.secondary.main} />}
        >
          create credit batch
        </OutlinedButton>
      </EmptyState>
    </Box>
  );
};
