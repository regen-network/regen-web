import React from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import {
  ActionsTable,
  renderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { truncate } from '../../lib/wallet';
import { getAccountUrl } from '../../lib/block-explorer';
import { NoEcocredits } from '../molecules';
import type { TableCredits } from '../../types/ledger/ecocredit';

const useStyles = makeStyles((theme: Theme) => ({
  greyText: {
    color: theme.palette.info.main,
  },
}));

export const EcocreditsTable: React.FC<{
  credits: TableCredits[];
  renderActionButtons?: renderActionButtonsFunc;
}> = ({ credits, renderActionButtons }) => {
  const styles = useStyles();
  if (!credits?.length) {
    return <NoEcocredits title="No ecocredits to display" />;
  }

  return (
    <ActionsTable
      tableLabel="ecocredits table"
      renderActionButtons={renderActionButtons}
      headerRows={[
        <Box
          sx={{
            minWidth: {
              xs: 'auto',
              sm: '11rem',
              lg: '13rem',
            },
          }}
        >
          Batch Denom
        </Box>,
        'Issuer',
        'Credit Class',
        'Amount Tradable',
        'Amount Retired',
        'Batch Start Date',
        'Batch End Date',
        'Project Location',
      ]}
      rows={credits.map((row, i) => {
        return [
          row.batch_denom,
          <a
            href={getAccountUrl(row.issuer as string)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncate(row.issuer as string)}
          </a>,
          row.class_id,
          formatNumber(row.tradable_amount),
          formatNumber(row.retired_amount),
          <span className={styles.greyText}>{formatDate(row.start_date)}</span>,
          <span className={styles.greyText}>{formatDate(row.end_date)}</span>,
          row.project_location,
        ];
      })}
    />
  );
};

const formatDate = (date: string | number | Date): string =>
  dayjs(date).format('MMMM D, YYYY');

const formatNumber = (num: string | number | Date): string => {
  return +num > 0 ? Math.floor(+num).toLocaleString() : '-';
};
