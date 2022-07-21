import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import cx from 'clsx';

import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { ActionsTable } from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncate, truncateHash } from 'web-components/lib/utils/truncate';

import { Link } from '../atoms';
import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';
import { ledgerRESTUri } from '../../lib/ledger';
import { getBatchesWithSupply } from '../../lib/ecocredit/api';
import { getAccountUrl, getHashUrl } from '../../lib/block-explorer';

interface CreditBatchProps {
  creditClassId?: string | null;
  projectPage?: boolean;
  creditBatches?: BatchInfoWithSupply[];
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
  { id: 'class_id', numeric: false, label: 'credit class' },
  { id: 'batch_denom', numeric: false, label: 'batch denom' },
  { id: 'issuer', numeric: false, label: 'issuer' },
  {
    id: 'tradable_supply',
    numeric: true,
    label: 'total amount tradable',
    wrap: true,
  },
  {
    id: 'retired_supply',
    numeric: true,
    label: 'total amount retired',
    wrap: true,
  },
  {
    id: 'amount_cancelled',
    numeric: true,
    label: 'total amount cancelled',
    wrap: true,
  },
  { id: 'start_date', numeric: true, label: 'start date' },
  { id: 'end_date', numeric: true, label: 'end date' },
  { id: 'project_location', numeric: false, label: 'project location' },
];

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(17.5),
      paddingBottom: theme.spacing(17.5),
    },
  },
  title: {
    paddingBottom: theme.spacing(7.5),
  },
  tableBorder: {
    border: `1px solid ${theme.palette.info.light}`,
    borderRadius: 8,
  },
  wrap: {
    whiteSpace: 'normal',
    '& span': {
      width: 138,
    },
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  grey: {
    color: theme.palette.info.main,
  },
  tableBody: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const CreditBatches: React.FC<CreditBatchProps> = ({
  creditClassId,
  projectPage = false,
  creditBatches,
  titleAlign = 'center',
}) => {
  const styles = useStyles();
  const [batches, setBatches] = useState<BatchInfoWithSupply[]>([]);
  let columnsToShow = [...headCells];

  useEffect(() => {
    if (!ledgerRESTUri) return;
    if (!projectPage) {
      getBatchesWithSupply(creditClassId)
        .then(sortableBatches => {
          setBatches(sortableBatches.data);
        })
        .catch(console.error); // eslint-disable-line no-console
    } else if (creditBatches) {
      setBatches(creditBatches);
    }
  }, [projectPage, creditClassId, creditBatches]);

  // We hide the classId column if creditClassId provided (redundant)
  if (creditClassId) {
    columnsToShow = headCells.filter((hc: HeadCell) => hc.id !== 'class_id');
  }
  // Ditto for project location on project page
  if (projectPage) {
    columnsToShow = columnsToShow.filter(
      (hc: HeadCell) => hc.id !== 'project_location',
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
          <Link key="class_id" href={`/credit-classes/${batch.class_id}`}>
            {batch.class_id}
          </Link>,
          <Link
            className={styles.noWrap}
            href={`/credit-batches/${batch.batch_denom}`}
          >
            {batch.batch_denom}
          </Link>,
          <a
            href={getAccountUrl(batch.issuer)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncate(batch.issuer)}
          </a>,
          <>{formatNumber(batch.tradable_supply)}</>,
          <>{formatNumber(batch.retired_supply)}</>,
          <>{formatNumber(batch.amount_cancelled)}</>,
          <Box className={styles.noWrap}>
            {formatDate(batch.start_date as Date, undefined, true)}
          </Box>,
          <Box className={styles.noWrap}>
            {formatDate(batch.end_date as Date, undefined, true)}
          </Box>,
          <Box key="project_location" className={styles.noWrap}>
            {batch.project_location}
          </Box>,
        ].filter(item => {
          return (
            !(creditClassId && item?.key === 'class_id') &&
            !(projectPage && item?.key === 'project_location')
          );
        }),
      )}
      /* eslint-enable react/jsx-key */
    />
  );

  return ledgerRESTUri && batches.length > 0 ? (
    projectPage ? (
      table
    ) : (
      <Section
        classes={{ root: styles.section, title: styles.title }}
        title="Credit Batches"
        titleVariant="h2"
        titleAlign={titleAlign}
      >
        {table}
      </Section>
    )
  ) : null;
};

export { CreditBatches };
