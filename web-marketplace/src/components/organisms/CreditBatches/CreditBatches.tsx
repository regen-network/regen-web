import React, { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'clsx';
import { quantityFormatNumberOptions } from 'config/decimals';
import { tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/src/components/block-content';
import Section from 'web-components/src/components/section';
import {
  ActionsTable,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import { Theme } from 'web-components/src/theme/muiTheme';
import { formatDate, formatNumber } from 'web-components/src/utils/format';
import { truncateHash } from 'web-components/src/utils/truncate';

import type { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { getHashUrl } from 'lib/block-explorer';
import {
  ACTIONS_TABLE_ACTIONS_TEXT,
  getLabelDisplayedRows,
} from 'lib/constants/shared.constants';
import { LINK_PREFIX } from 'lib/env';

import { AccountLink, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

import {
  CreditBatchesHeadCell,
  getCreditBatchesHeadCells,
} from './CreditBatches.config';
import { useCreditBatchesStyles } from './CreditBatches.styles';

interface CreditBatchProps {
  creditClassId?: string | null;
  filteredColumns?: string[];
  withSection?: boolean;
  creditBatches?: BatchInfoWithSupply[];
  onTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
  isIgnoreOffset?: boolean;
  titleAlign?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
  sx?: {
    root?: SxProps<Theme>;
  };
}

const CreditBatches: React.FC<React.PropsWithChildren<CreditBatchProps>> = ({
  creditClassId,
  filteredColumns,
  withSection = false,
  creditBatches,
  titleAlign = 'center',
  onTableChange,
  isIgnoreOffset = false,
  initialPaginationParams,
  sx,
}) => {
  const { _ } = useLingui();
  const { classes } = useCreditBatchesStyles();
  const creditBatchesHeadCells = useMemo(
    () => getCreditBatchesHeadCells(_),
    [_],
  );

  let columnsToShow = [...creditBatchesHeadCells];

  // We hide the classId column if creditClassId provided (redundant)
  if (creditClassId) {
    columnsToShow = creditBatchesHeadCells.filter(
      (hc: CreditBatchesHeadCell) => hc.id !== 'classId',
    );
  }
  // Ditto for project location on project page
  if (filteredColumns) {
    columnsToShow = columnsToShow.filter(
      (hc: CreditBatchesHeadCell) => !filteredColumns.includes(hc.id),
    );
  }

  const someTx = creditBatches?.some(batch => batch.txhash);

  const labelDisplayedRows = useMemo(
    () =>
      getLabelDisplayedRows({
        _,
        isIgnoreOffset,
        rowsLength: creditBatches?.length ?? 0,
      }),
    [_, isIgnoreOffset, creditBatches?.length],
  );

  if (!someTx) {
    columnsToShow = columnsToShow.filter(column => column.id !== 'txhash');
  }

  const table = (
    <ActionsTable
      tableLabel={_(msg`credit batch table`)}
      actionButtonsText={_(ACTIONS_TABLE_ACTIONS_TEXT)}
      headerRows={columnsToShow.map(headCell => (
        <Box
          display="flex"
          className={cx(headCell.wrap && classes.wrap)}
          key={headCell.id}
        >
          {headCell.label}
          {headCell.tooltip && (
            <Box alignSelf="flex-end" ml={2}>
              <InfoTooltipWithIcon outlined title={headCell.tooltip} />
            </Box>
          )}
        </Box>
      ))}
      onTableChange={onTableChange}
      initialPaginationParams={initialPaginationParams}
      isIgnoreOffset={isIgnoreOffset}
      sx={sx}
      rows={
        creditBatches?.map(batch => {
          /* eslint-disable react/jsx-key */
          let result = [];
          if (someTx) {
            result.push(
              <Link href={getHashUrl(batch.txhash)}>
                {truncateHash(batch.txhash)}
              </Link>,
            );
          }

          result.push(
            <WithLoader isLoading={!batch.projectName} variant="skeleton">
              <Link
                href={`/project/${batch?.projectId}`}
                sx={tableStyles.ellipsisColumn}
              >
                {batch?.projectName}
              </Link>
            </WithLoader>,
            <WithLoader
              isLoading={!batch.classId}
              variant="skeleton"
              key="classId"
            >
              <Link
                href={`${LINK_PREFIX}/credit-classes/${batch.classId}`}
                sx={tableStyles.ellipsisContentColumn}
              >
                <BlockContent content={batch.className} />
              </Link>
            </WithLoader>,
            <Link
              className={classes.noWrap}
              href={`${LINK_PREFIX}/credit-batches/${batch.denom}`}
            >
              {batch.denom}
            </Link>,
            <AccountLink address={batch.issuer} />,
            <WithLoader isLoading={!batch.tradableAmount} variant="skeleton">
              <Box>
                {formatNumber({
                  num: batch.tradableAmount,
                  ...quantityFormatNumberOptions,
                })}
              </Box>
            </WithLoader>,
            <WithLoader isLoading={!batch.retiredAmount} variant="skeleton">
              <Box>
                {formatNumber({
                  num: batch.retiredAmount,
                  ...quantityFormatNumberOptions,
                })}
              </Box>
            </WithLoader>,
            <WithLoader isLoading={!batch.cancelledAmount} variant="skeleton">
              <Box>
                {formatNumber({
                  num: batch.cancelledAmount,
                  ...quantityFormatNumberOptions,
                })}
              </Box>
            </WithLoader>,
            <Box className={classes.noWrap}>
              {formatDate(batch.startDate as Date, undefined, true)}
            </Box>,
            <Box className={classes.noWrap}>
              {formatDate(batch.endDate as Date, undefined, true)}
            </Box>,
            <WithLoader
              key="projectLocation"
              isLoading={!batch.projectLocation}
              variant="skeleton"
            >
              <Box className={classes.noWrap}>{batch.projectLocation}</Box>
            </WithLoader>,
          );

          return result.filter(item => {
            return (
              !(creditClassId && item?.key === 'classId') &&
              !filteredColumns?.includes(String(item?.key))
            );
          });
        }) ?? []
      }
      labelDisplayedRows={labelDisplayedRows}
      /* eslint-enable react/jsx-key */
    />
  );

  return creditBatches && creditBatches.length > 0 ? (
    withSection ? (
      <Section
        classes={{ root: classes.section, title: classes.title }}
        title={_(msg`Credit Batches`)}
        titleVariant="h2"
        titleAlign={titleAlign}
      >
        {table}
      </Section>
    ) : (
      table
    )
  ) : null;
};

export { CreditBatches };
