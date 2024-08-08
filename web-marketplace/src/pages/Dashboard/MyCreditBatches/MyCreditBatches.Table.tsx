import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import PlusIcon from 'web-components/src/components/icons/PlusIcon';
import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';
import { Subtitle } from 'web-components/src/components/typography';

import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import WithLoader from 'components/atoms/WithLoader';
import { CreditBatches } from 'components/organisms';

type Props = {
  hasNoBatches?: boolean;
  batchesWithSupply?: BatchInfoWithSupply[];
  paginationParams: TablePaginationParams;
  setPaginationParams: UseStateSetter<TablePaginationParams>;
  useCreate?: boolean;
};

export const MyCreditBatchesTable = ({
  hasNoBatches,
  batchesWithSupply,
  paginationParams,
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
            <Trans>Successfully issued credit batches</Trans>
          </Subtitle>
          {useCreate && (
            <OutlinedButton
              startIcon={<PlusIcon color={theme.palette.secondary.main} />}
              component={Link}
              to="/ecocredits/create-batch"
            >
              <Trans>create credit batch</Trans>
            </OutlinedButton>
          )}
        </Box>
        <CreditBatches
          creditBatches={batchesWithSupply}
          onTableChange={setPaginationParams}
          initialPaginationParams={paginationParams}
          isIgnoreOffset
          sx={{ root: { borderTop: 0 } }}
        />
      </>
    </WithLoader>
  );
};
