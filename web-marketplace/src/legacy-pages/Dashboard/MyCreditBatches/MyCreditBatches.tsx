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
import { orgRoles } from 'hooks/org-members/constants';

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
    isIssuer,
    organizationDaoAddress,
    organizationRbamAddress,
    organizationRole,
  } = useDashboardContext();
  const accountAddress = selectedAccountAddress ?? wallet?.address;
  const { batchesWithSupply, setPaginationParams, paginationParams } =
    useFetchPaginatedBatches({
      address: accountAddress,
    });
  const hasNoBatches = batchesWithSupply && batchesWithSupply?.length === 0;
  const canManageCreditBatches = isOrganizationDashboard
    ? isOrganizationOwner || isOrganizationAdmin
    : isIssuer;

  const normalizedRole = organizationRole?.toLowerCase();
  const roleConfig =
    normalizedRole === 'owner'
      ? orgRoles.owner
      : normalizedRole === 'admin'
      ? orgRoles.admin
      : undefined;
  const authorizationId = roleConfig?.authorizations.can_manage_credit_issuance;
  const roleId = roleConfig?.roleId;
  const hasOrgExecutionContext = Boolean(
    isOrganizationDashboard &&
      organizationDaoAddress &&
      organizationRbamAddress &&
      authorizationId &&
      roleId,
  );

  const createBatchState = hasOrgExecutionContext
    ? {
        issuerAddress: accountAddress ?? undefined,
        organizationDaoAddress,
        organizationRbamAddress,
        authorizationId,
        roleId,
      }
    : accountAddress
    ? { issuerAddress: accountAddress }
    : undefined;

  return (
    <div className="w-[100%]">
      <MyCreditBatchesTable
        hasNoBatches={hasNoBatches}
        paginationParams={paginationParams}
        setPaginationParams={setPaginationParams}
        batchesWithSupply={batchesWithSupply}
        useCreate={canManageCreditBatches}
        createBatchState={createBatchState}
      />
      {hasNoBatches &&
        (canManageCreditBatches ? (
          <EmptyState
            message={_(NO_CREDIT_BATCHES_MESSAGE)}
            icon={<NoEcocreditsIcon sx={{ width: 100, height: 100 }} />}
            sx={{ backgroundColor: 'info.light' }}
          >
            <OutlinedButton
              startIcon={<PlusIcon color={theme.palette.secondary.main} />}
              component={Link}
              to="/ecocredits/create-batch"
              state={createBatchState}
            >
              <Trans>create credit batch</Trans>
            </OutlinedButton>
          </EmptyState>
        ) : (
          <EmptyState
            message={_(NO_CREDIT_BATCHES_MESSAGE)}
            icon={<NoEcocreditsIcon sx={{ width: 100, height: 100 }} />}
            sx={{ backgroundColor: 'info.light' }}
          />
        ))}
    </div>
  );
};
