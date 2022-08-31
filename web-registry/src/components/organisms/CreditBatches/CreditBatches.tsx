import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import cx from 'clsx';

import Section from 'web-components/lib/components/section';
import {
  ActionsTable,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncateHash } from 'web-components/lib/utils/truncate';

import type { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { getHashUrl } from 'lib/block-explorer';
import { getBatchesWithSupply } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';

import { AccountLink, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';

import { useCreditBatchesStyles } from './CreditBatches.styles';

interface CreditBatchProps {
  creditClassId?: string | null;
  filteredColumns?: string[];
  withSection?: boolean;
  creditBatches?: BatchInfoWithSupply[];
  onTableChange?: UseStateSetter<TablePaginationParams>;
  titleAlign?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
}

interface HeadCell {
  id: keyof BatchInfoWithSupply;
  label: string;
  numeric: boolean;
  wrap?: boolean;
}

const headCells: HeadCell[] = [
  { id: 'txhash', numeric: false, label: 'tx hash' },
  { id: 'classId', numeric: false, label: 'credit class' },
  { id: 'denom', numeric: false, label: 'batch denom' },
  { id: 'issuer', numeric: false, label: 'issuer' },
  {
    id: 'tradableSupply',
    numeric: true,
    label: 'total amount tradable',
    wrap: true,
  },
  {
    id: 'retiredSupply',
    numeric: true,
    label: 'total amount retired',
    wrap: true,
  },
  {
    id: 'cancelledAmount',
    numeric: true,
    label: 'total amount cancelled',
    wrap: true,
  },
  { id: 'startDate', numeric: true, label: 'start date' },
  { id: 'endDate', numeric: true, label: 'end date' },
  { id: 'projectLocation', numeric: false, label: 'project location' },
];

const CreditBatches: React.FC<CreditBatchProps> = ({
  creditClassId,
  filteredColumns,
  withSection = false,
  creditBatches,
  titleAlign = 'center',
  onTableChange,
}) => {
  const styles = useCreditBatchesStyles();
  const [batches, setBatches] = useState<BatchInfoWithSupply[]>([]);
  let columnsToShow = [...headCells];

  useEffect(() => {
    if (!ledgerRESTUri) return;
    if (creditBatches) {
      setBatches(creditBatches);
    } else if (creditClassId) {
      getBatchesWithSupply(creditClassId)
        .then(sortableBatches => {
          setBatches(sortableBatches.data);
        })
        .catch(console.error); // eslint-disable-line no-console
    }
  }, [creditClassId, creditBatches]);

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

  const table = (
    <ActionsTable
      tableLabel="credit batch table"
      headerRows={columnsToShow.map(headCell => (
        <Box className={cx(headCell.wrap && styles.wrap)} key={headCell.id}>
          {headCell.label}
        </Box>
      ))}
      onTableChange={onTableChange}
      rows={batches.map(batch =>
        /* eslint-disable react/jsx-key */
        [
          <Link
            href={getHashUrl(batch.txhash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncateHash(batch.txhash)}
          </Link>,
          <WithLoader isLoading={!batch.classId} variant="skeleton">
            <Link key="classId" href={`/credit-classes/${batch.classId}`}>
              {batch.classId}
            </Link>
          </WithLoader>,
          <Link
            className={styles.noWrap}
            href={`/credit-batches/${batch.denom}`}
          >
            {batch.denom}
          </Link>,
          <AccountLink address={batch.issuer} />,
          <WithLoader isLoading={!batch.tradableSupply} variant="skeleton">
            <Box>{formatNumber(batch.tradableSupply)}</Box>
          </WithLoader>,
          <WithLoader isLoading={!batch.retiredSupply} variant="skeleton">
            <Box>{formatNumber(batch.retiredSupply)}</Box>
          </WithLoader>,
          <WithLoader isLoading={!batch.cancelledAmount} variant="skeleton">
            <Box>{formatNumber(batch.cancelledAmount)}</Box>
          </WithLoader>,
          <Box className={styles.noWrap}>
            {formatDate(batch.startDate as Date, undefined, true)}
          </Box>,
          <Box className={styles.noWrap}>
            {formatDate(batch.endDate as Date, undefined, true)}
          </Box>,
          <WithLoader isLoading={!batch.projectLocation} variant="skeleton">
            <Box key="projectLocation" className={styles.noWrap}>
              {batch.projectLocation}
            </Box>
          </WithLoader>,
        ].filter(item => {
          return (
            !(creditClassId && item?.key === 'classId') &&
            !filteredColumns?.includes(String(item?.key))
          );
        }),
      )}
      /* eslint-enable react/jsx-key */
    />
  );

  return ledgerRESTUri && batches.length > 0 ? (
    withSection ? (
      <Section
        classes={{ root: styles.section, title: styles.title }}
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
