import { Link } from 'react-router-dom';
import { Trans } from '@lingui/react/macro';
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
      <div className="border-solid border-bc-neutral-300 border-[1px] rounded-[10px] overflow-hidden">
        <Box
          sx={{
            display: hasNoBatches ? 'none' : 'flex',
            flexDirection: ['column', 'row'],
            justifyContent: 'space-between',
            alignItems: ['flex-start', 'center'],
            backgroundColor: 'primary.main',
            px: 6.25,
            py: 6.25,
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
        />
      </div>
    </WithLoader>
  );
};
