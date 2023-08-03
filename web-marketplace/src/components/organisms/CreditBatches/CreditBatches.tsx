import React, { useEffect, useState } from 'react';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'clsx';
import { quantityFormatNumberOptions } from 'config/decimals';
import { tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/lib/components/block-content';
import Section from 'web-components/lib/components/section';
import {
  ActionsTable,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncateHash } from 'web-components/lib/utils/truncate';

import type { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { getHashUrl } from 'lib/block-explorer';
import { getBatchesWithSupply } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';

import { AccountLink, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';

import { useLedger } from '../../../ledger';
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

interface HeadCell {
  id: keyof BatchInfoWithSupply;
  label: string;
  numeric: boolean;
  wrap?: boolean;
  tooltip?: string; // the content for the info tooltip
}

const headCells: HeadCell[] = [
  { id: 'txhash', numeric: false, label: 'tx hash' },
  { id: 'projectName', numeric: false, label: 'project' },
  { id: 'classId', numeric: false, label: 'credit class' },
  { id: 'denom', numeric: false, label: 'batch denom' },
  { id: 'issuer', numeric: false, label: 'issuer' },
  {
    id: 'tradableAmount',
    numeric: true,
    label: 'total amount tradable',
    wrap: true,
  },
  {
    id: 'retiredAmount',
    numeric: true,
    label: 'total amount retired',
    wrap: true,
  },
  {
    id: 'cancelledAmount',
    numeric: true,
    label: 'total amount cancelled',
    wrap: true,
    tooltip:
      "Cancelled credits have been removed from from the credit batch's tradable supply. Cancelling credits is permanent and implies the credits have been moved to another chain or registry.",
  },
  { id: 'startDate', numeric: true, label: 'start date' },
  { id: 'endDate', numeric: true, label: 'end date' },
  { id: 'projectLocation', numeric: false, label: 'project location' },
];

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
  const { classes } = useCreditBatchesStyles();
  const [batches, setBatches] = useState<BatchInfoWithSupply[]>([]);
  let columnsToShow = [...headCells];
  const { dataClient, ecocreditClient } = useLedger();

  useEffect(() => {
    if (!ledgerRESTUri) return;
    if (creditBatches) {
      setBatches(creditBatches);
    } else if (creditClassId) {
      getBatchesWithSupply({ creditClassId, dataClient, ecocreditClient })
        .then(sortableBatches => {
          setBatches(sortableBatches.data);
        })
        .catch(console.error); // eslint-disable-line no-console
    }
  }, [creditClassId, creditBatches, dataClient, ecocreditClient]);

  // We hide the classId column if creditClassId provided (redundant)
  if (creditClassId) {
    columnsToShow = headCells.filter((hc: HeadCell) => hc.id !== 'classId');
  }
  // Ditto for project location on project page
  if (filteredColumns) {
    columnsToShow = columnsToShow.filter(
      (hc: HeadCell) => !filteredColumns.includes(hc.id),
    );
  }

  const someTx = batches.some(batch => batch.txhash);

  if (!someTx) {
    columnsToShow = columnsToShow.filter(column => column.id !== 'txhash');
  }

  const table = (
    <ActionsTable
      tableLabel="credit batch table"
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
      rows={batches.map(batch => {
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
              href={`/credit-classes/${batch.classId}`}
              sx={tableStyles.ellipsisContentColumn}
            >
              <BlockContent content={batch.className} />
            </Link>
          </WithLoader>,
          <Link
            className={classes.noWrap}
            href={`/credit-batches/${batch.denom}`}
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
      })}
      /* eslint-enable react/jsx-key */
    />
  );

  return ledgerRESTUri && batches.length > 0 ? (
    withSection ? (
      <Section
        classes={{ root: classes.section, title: classes.title }}
        title="Credit Batches"
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
