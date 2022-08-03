import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import cx from 'clsx';

import Section from 'web-components/lib/components/section';
import { ActionsTable } from 'web-components/lib/components/table/ActionsTable';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncateHash } from 'web-components/lib/utils/truncate';

import type { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { getHashUrl } from 'lib/block-explorer';
import { getBatchesWithSupply } from 'lib/ecocredit/api';
import { ledgerRESTUri } from 'lib/ledger';

import { AccountLink, Link } from 'components/atoms';

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
    columnsToShow = headCells.filter((hc: HeadCell) => hc.id !== 'classId');
  }
  // Ditto for project location on project page
  if (projectPage) {
    columnsToShow = columnsToShow.filter(
      (hc: HeadCell) => hc.id !== 'projectLocation',
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
          <Link key="classId" href={`/credit-classes/${batch.classId}`}>
            {batch.classId}
          </Link>,
          <Link
            className={styles.noWrap}
            href={`/credit-batches/${batch.denom}`}
          >
            {batch.denom}
          </Link>,
          <AccountLink address={batch.issuer} />,
          <>{formatNumber(batch.tradableSupply)}</>,
          <>{formatNumber(batch.retiredSupply)}</>,
          <>{formatNumber(batch.cancelledAmount)}</>,
          <Box className={styles.noWrap}>
            {formatDate(batch.startDate as Date, undefined, true)}
          </Box>,
          <Box className={styles.noWrap}>
            {formatDate(batch.endDate as Date, undefined, true)}
          </Box>,
          <Box key="projectLocation" className={styles.noWrap}>
            {batch.projectLocation}
          </Box>,
        ].filter(item => {
          return (
            !(creditClassId && item?.key === 'classId') &&
            !(projectPage && item?.key === 'projectLocation')
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
