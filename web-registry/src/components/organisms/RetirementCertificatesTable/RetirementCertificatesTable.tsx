import React from 'react';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/lib/components/block-content';
import {
  ActionsTable,
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import { AccountLink, GreyText, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

import { retirementCertificateHeaders } from './RetirementCertificatesTable.headers';

type RetirementCertificatesTableProps = {
  credits?: BatchInfoWithBalance[];
  renderActionButtons?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
  isIgnoreOffset?: boolean;
};

export const RetirementCertificatesTable: React.FC<
  React.PropsWithChildren<RetirementCertificatesTableProps>
> = ({
  credits,
  renderActionButtons,
  onTableChange,
  initialPaginationParams,
  isIgnoreOffset = false,
}) => {
  if (!credits?.length) {
    return <NoCredits title="No ecocredits to display" />;
  }

  return (
    <ActionsTable
      tableLabel="ecocredits table"
      renderActionButtons={renderActionButtons}
      onTableChange={onTableChange}
      initialPaginationParams={initialPaginationParams}
      isIgnoreOffset={isIgnoreOffset}
      /* eslint-disable react/jsx-key */
      headerRows={retirementCertificateHeaders}
      rows={credits.map((row, i) => {
        return [
          <GreyText>{formatDate(row.endDate)}</GreyText>,
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
            num: row.balance?.retiredAmount,
            ...quantityFormatNumberOptions,
          }),
          <WithLoader isLoading={!row.issuer} variant="skeleton">
            <AccountLink address={row.issuer} />
          </WithLoader>,
          <GreyText>{formatDate(row.startDate)}</GreyText>,
          <GreyText>{formatDate(row.endDate)}</GreyText>,
          <WithLoader isLoading={row.projectLocation === ''} variant="skeleton">
            <Box>{row.projectLocation}</Box>
          </WithLoader>,
          <WithLoader isLoading={row.projectLocation === ''} variant="skeleton">
            <Box>{row.projectLocation}</Box>
          </WithLoader>,
        ];
      })}
      /* eslint-enable react/jsx-key */
    />
  );
};
