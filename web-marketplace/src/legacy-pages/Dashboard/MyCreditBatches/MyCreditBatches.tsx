import { Link } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useTheme } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EmptyState from 'web-components/src/components/empty-state';
import NoEcocreditsIcon from 'web-components/src/components/icons/NoEcocreditsIcon';
import PlusIcon from 'web-components/src/components/icons/PlusIcon';

import { useWallet } from 'lib/wallet/wallet';

import { useFetchPaginatedBatches } from 'hooks/batches/useFetchPaginatedBatches';

import { useDashboardContext } from '../Dashboard.context';
import { NO_CREDIT_BATCHES_MESSAGE } from './MyCreditBatches.constants';
import { MyCreditBatchesTable } from './MyCreditBatches.Table';

export const MyCreditBatches = (): JSX.Element => {
  const { _ } = useLingui();
  const theme = useTheme();
  const { wallet } = useWallet();
  const {
    selectedAccountAddress,
    isOrganizationDashboard,
    isOrganizationOwner,
    isOrganizationAdmin,
  } = useDashboardContext();
  const accountAddress = selectedAccountAddress ?? wallet?.address;
  const { batchesWithSupply, setPaginationParams, paginationParams } =
    useFetchPaginatedBatches({
      address: accountAddress,
    });
  const hasNoBatches = batchesWithSupply && batchesWithSupply?.length === 0;
  const canManageCreditBatches =
    !isOrganizationDashboard || isOrganizationOwner || isOrganizationAdmin;

  return (
    <div className="w-[100%]">
      <MyCreditBatchesTable
        hasNoBatches={hasNoBatches}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        batchesWithSupply={batchesWithSupply}
        useCreate={canManageCreditBatches}
      />
      {hasNoBatches && canManageCreditBatches && (
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
    </div>
  );
};
