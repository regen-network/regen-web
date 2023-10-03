import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import PlusIcon from 'web-components/lib/components/icons/PlusIcon';
import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { Subtitle } from 'web-components/lib/components/typography';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import WithLoader from 'components/atoms/WithLoader';
import { CreditBatches } from 'components/organisms';

type Props = {
  hasNoBatches?: boolean;
  batchesWithSupply?: BatchInfoWithSupply[];
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  useCreate?: boolean;
};

export const MyCreditBatchesTable = ({
  hasNoBatches,
  batchesWithSupply,
  setPaginationParams,
  useCreate,
}: Props) => {
  const theme = useTheme();

  return (
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
          {useCreate && (
            <OutlinedButton
              startIcon={<PlusIcon color={theme.palette.secondary.main} />}
              component={Link}
              to="/ecocredits/create-batch"
            >
              create credit batch
            </OutlinedButton>
          )}
        </Box>
        <CreditBatches
          creditBatches={batchesWithSupply}
          onTableChange={setPaginationParams}
          sx={{ root: { borderTop: 0 } }}
        />
      </>
    </WithLoader>
  );
};
