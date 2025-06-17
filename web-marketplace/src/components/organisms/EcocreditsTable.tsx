import React, { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { ELLIPSIS_COLUMN_WIDTH, tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/src/components/block-content';
import NoEcocreditsIcon from 'web-components/src/components/icons/NoEcocreditsIcon';
import {
  ActionsTable,
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import { formatDate, formatNumber } from 'web-components/src/utils/format';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import {
  ACTIONS_TABLE_ACTIONS_TEXT,
  getLabelDisplayedRows,
} from 'lib/constants/shared.constants';

import { AccountLink, BreakText, GreyText, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

type EcocreditsTableProps = {
  credits?: BatchInfoWithBalance[];
  renderActionButtons?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
  isIgnoreOffset?: boolean;
};

export const EcocreditsTable: React.FC<
  React.PropsWithChildren<EcocreditsTableProps>
> = ({
  credits,
  renderActionButtons,
  onTableChange,
  initialPaginationParams,
  isIgnoreOffset = false,
}) => {
  const { _ } = useLingui();

  const labelDisplayedRows = useMemo(
    () =>
      getLabelDisplayedRows({
        _,
        isIgnoreOffset,
        rowsLength: credits?.length ?? 0,
      }),
    [_, credits?.length, isIgnoreOffset],
  );

  const hasMorePages =
    (initialPaginationParams?.count ?? 0) >
    (initialPaginationParams?.rowsPerPage ?? 0);
  if (!credits || (!credits?.length && !hasMorePages)) {
    return (
      <NoCredits
        title={_(msg`No ecocredits to display`)}
        icon={<NoEcocreditsIcon sx={{ width: 100, height: 100 }} />}
      />
    );
  }

  return (
    <ActionsTable
      tableLabel={_(msg`ecocredits table`)}
      actionButtonsText={_(ACTIONS_TABLE_ACTIONS_TEXT)}
      renderActionButtons={renderActionButtons}
      labelDisplayedRows={labelDisplayedRows}
      onTableChange={onTableChange}
      initialPaginationParams={initialPaginationParams}
      isIgnoreOffset={isIgnoreOffset}
      /* eslint-disable react/jsx-key */
      headerRows={[
        <Box sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>
          <Trans>Project</Trans>
        </Box>,
        <Box
          sx={{
            minWidth: {
              xs: 'auto',
              sm: '11rem',
              lg: '13rem',
            },
          }}
        >
          <Trans>Batch Denom</Trans>
        </Box>,
        <Trans>Credit Class</Trans>,
        <BreakText>
          <Trans>Amount Tradable</Trans>
        </BreakText>,
        <BreakText>
          <Trans>Amount Retired</Trans>
        </BreakText>,
        <Box display="flex">
          <BreakText>
            <Trans>Amount Escrowed</Trans>
          </BreakText>
          <Box alignSelf="flex-end" ml={2}>
            <InfoTooltipWithIcon
              outlined
              title={_(
                msg`Credits are held in escrow when a sell order is created, and taken out of escrow when the sell order is either cancelled, updated with a reduced quantity, or processed.`,
              )}
            />
          </Box>
        </Box>,
        <Trans>Issuer</Trans>,
        <Trans>Batch Start Date</Trans>,
        <Trans>Batch End Date</Trans>,
        <Trans>Project Location</Trans>,
      ]}
      rows={credits.map((row, i) => {
        return [
          <WithLoader isLoading={row.projectName === ''} variant="skeleton">
            <Link
              href={`/project/${row?.projectId}`}
              sx={tableStyles.ellipsisColumn}
            >
              {row?.projectName}
            </Link>
          </WithLoader>,
          <WithLoader isLoading={!row.denom} variant="skeleton">
            <Link href={`/credit-batches/${row.denom}`}>{row.denom}</Link>
          </WithLoader>,
          <WithLoader isLoading={row.classId === ''} variant="skeleton">
            <Link
              href={`/credit-classes/${row.classId}`}
              sx={tableStyles.ellipsisContentColumn}
            >
              {row?.className && <BlockContent content={row?.className} />}
            </Link>
          </WithLoader>,
          formatNumber({
            num: row.balance?.tradableAmount,
            ...quantityFormatNumberOptions,
          }),
          formatNumber({
            num: row.balance?.retiredAmount,
            ...quantityFormatNumberOptions,
          }),
          formatNumber({
            num: row.balance?.escrowedAmount,
            ...quantityFormatNumberOptions,
          }),
          <WithLoader isLoading={!row.denom} variant="skeleton">
            <AccountLink address={row.issuer} />
          </WithLoader>,
          <GreyText>{formatDate(row.startDate, undefined, true)}</GreyText>,
          <GreyText>{formatDate(row.endDate, undefined, true)}</GreyText>,
          <WithLoader isLoading={row.projectLocation === ''} variant="skeleton">
            <Box>{row.projectLocation}</Box>
          </WithLoader>,
        ];
      })}
      /* eslint-enable react/jsx-key */
    />
  );
};
