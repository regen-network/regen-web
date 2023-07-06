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

import { UseStateSetter } from 'types/react/use-state';
import { NormalizedRetirement } from 'lib/normalizers/retirements/normalizeRetirement';

import { GreyText, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

import { retirementCertificateHeaders } from './RetirementCertificatesTable.headers';

type RetirementCertificatesTableProps = {
  retirements?: NormalizedRetirement[];
  renderActionButtons?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
  isIgnoreOffset?: boolean;
};

export const RetirementCertificatesTable: React.FC<
  React.PropsWithChildren<RetirementCertificatesTableProps>
> = ({
  retirements,
  renderActionButtons,
  onTableChange,
  initialPaginationParams,
  isIgnoreOffset = false,
}) => {
  if (!retirements?.length) {
    return <NoCredits title="No retirements to display" />;
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
      rows={retirements.map((row, i) => {
        return [
          <GreyText>{formatDate(row.retirementDate)}</GreyText>,
          <WithLoader isLoading={row.projectId === ''} variant="skeleton">
            <Link
              href={`/project/${row?.projectId}`}
              sx={tableStyles.ellipsisColumn}
            >
              {row?.projectName}
            </Link>
          </WithLoader>,
          <WithLoader isLoading={!row.batchId} variant="skeleton">
            <Link href={`/credit-batches/${row.batchId}`}>{row.batchId}</Link>
          </WithLoader>,
          <WithLoader isLoading={row.creditClassId === ''} variant="skeleton">
            <Link
              href={`/credit-classes/${row.creditClassId}`}
              sx={tableStyles.ellipsisContentColumn}
            >
              {row?.creditClassName && (
                <BlockContent content={row?.creditClassName} />
              )}
            </Link>
          </WithLoader>,
          formatNumber({
            num: row.amountRetired,
            ...quantityFormatNumberOptions,
          }),
          <WithLoader isLoading={!row.issuer} variant="skeleton">
            <Link href={row.issuer?.link ?? ''}>{row.issuer?.name}</Link>
          </WithLoader>,
          <GreyText>{formatDate(row.batchStartDate)}</GreyText>,
          <GreyText>{formatDate(row.batchEndDate)}</GreyText>,
          <WithLoader
            isLoading={row.retirementLocation === ''}
            variant="skeleton"
          >
            <Box>{row.retirementLocation}</Box>
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
