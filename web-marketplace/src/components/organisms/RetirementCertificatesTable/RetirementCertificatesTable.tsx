import React, { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/src/components/block-content';
import NoRetirementCertificatesIcon from 'web-components/src/components/icons/NoRetirementCertificatesIcon';
import {
  ActionsTable,
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/src/utils/format';

import { UseStateSetter } from 'types/react/use-state';
import {
  ACTIONS_TABLE_ACTIONS_TEXT,
  getLabelDisplayedRows,
} from 'lib/constants/shared.constants';
import { NormalizedRetirement } from 'lib/normalizers/retirements/normalizeRetirement';

import { GreyText, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

import { getRetirementCertificateHeaders } from './RetirementCertificatesTable.headers';
import { SeeMore } from './RetirementCertificatesTable.SeeMore';

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
  const { _ } = useLingui();
  const retirementCertificateHeaders = useMemo(
    () => getRetirementCertificateHeaders(_),
    [_],
  );

  const labelDisplayedRows = useMemo(
    () =>
      getLabelDisplayedRows({
        _,
        isIgnoreOffset,
        rowsLength: retirements?.length ?? 0,
      }),
    [_, isIgnoreOffset, retirements?.length],
  );

  const getBatchIds = (batchIds: string[]) => {
    return batchIds.map((batchId: string, index: number) => (
      <WithLoader isLoading={!batchId} variant="skeleton" key={index}>
        <Link href={`/credit-batches/${batchId}`}>{batchId}</Link>
      </WithLoader>
    ));
  };

  const getBatchDate = (dates: string[]) => {
    return dates.map(date => (
      <GreyText className="whitespace-nowrap">{formatDate(date)}</GreyText>
    ));
  };

  if (!retirements?.length) {
    return (
      <NoCredits
        title={_(msg`No retirements to display`)}
        icon={<NoRetirementCertificatesIcon sx={{ height: 100, width: 105 }} />}
      />
    );
  }

  return (
    <ActionsTable
      tableLabel={_(msg`Ecocredits table`)}
      actionButtonsText={_(ACTIONS_TABLE_ACTIONS_TEXT)}
      labelDisplayedRows={labelDisplayedRows}
      renderActionButtons={renderActionButtons}
      onTableChange={onTableChange}
      initialPaginationParams={initialPaginationParams}
      isIgnoreOffset={isIgnoreOffset}
      /* eslint-disable react/jsx-key */
      headerRows={retirementCertificateHeaders}
      rows={retirements.map(row => {
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
          <SeeMore items={getBatchIds(row.batchIds)} />,
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
          <SeeMore items={getBatchDate(row.batchStartDates || [])} />,
          <SeeMore items={getBatchDate(row.batchEndDates || [])} />,
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
