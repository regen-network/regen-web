import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import cx from 'clsx';

import { formatNumber } from 'web-components/lib/components/table';
import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { ActionsTable } from 'web-components/lib/components/table/ActionsTable';

import { truncate } from '../../lib/wallet';
import type { BatchRowData } from '../../types/ledger/ecocredit';
import { ledgerRESTUri } from '../../lib/ledger';
import { getBatchesWithSupply } from '../../lib/ecocredit';
import { getAccountUrl } from '../../lib/block-explorer';

interface HeadCell {
  id: keyof BatchRowData;
  label: string;
  numeric: boolean;
  wrap?: boolean;
}

const headCells: HeadCell[] = [
  { id: 'issuer', numeric: false, label: 'issuer' },
  { id: 'batch_denom', numeric: false, label: 'batch denom' },
  { id: 'class_id', numeric: false, label: 'credit class' },
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

const CreditBatches: React.FC = () => {
  const styles = useStyles();
  const [batches, setBatches] = useState<any[]>([]);

  const fetchData = (): void => {
    getBatchesWithSupply().then(sortableBatches => {
      setBatches(sortableBatches.data);
    });
  };

  useEffect(() => {
    if (!ledgerRESTUri) return;
    fetchData();
  });

  return ledgerRESTUri && batches.length > 0 ? (
    <Section
      classes={{ root: styles.section, title: styles.title }}
      title="Credit Batches"
      titleVariant="h2"
    >
      <ActionsTable
        tableLabel="credit batch table"
        headerRows={headCells.map(headCell => (
          <Box className={cx(headCell.wrap && styles.wrap)} key={headCell.id}>
            {headCell.label}
          </Box>
        ))}
        rows={batches.map(batch => [
          <a
            href={getAccountUrl(batch.issuer)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncate(batch.issuer)}
          </a>,
          <Box className={styles.noWrap}>{batch.batch_denom}</Box>,
          batch.class_id,
          formatNumber(batch.tradable_supply),
          formatNumber(batch.retired_supply),
          formatNumber(batch.amount_cancelled),
          <Box className={styles.noWrap}>
            {formatDate(batch.start_date as Date)}
          </Box>,
          <Box className={styles.noWrap}>
            {formatDate(batch.end_date as Date)}
          </Box>,
          <Box className={styles.noWrap}>{batch.project_location}</Box>,
        ])}
      />
    </Section>
  ) : null;
};

const formatDate = (date: Date): string => dayjs(date).format('MMMM D, YYYY');

export { CreditBatches };
