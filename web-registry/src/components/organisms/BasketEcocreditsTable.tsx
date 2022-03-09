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
import type { BatchInfo } from '../../types/ledger/ecocredit';

const formatDate = (date: string | Date | undefined): string =>
  dayjs(date).format('MMMM D, YYYY');

const formatNumber = (num: string): string => {
  return parseFloat(num) > 0 ? Math.floor(+num).toLocaleString() : '-';
};

const useStyles = makeStyles((theme: Theme) => ({
  greyText: {
    color: theme.palette.info.main,
  },
  break: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
}));

export interface BasketEcocreditsTableProps {
  batches: BatchInfo[];
  renderActionButtons?: renderActionButtonsFunc;
}

const BasketEcocreditsTable: React.FC<BasketEcocreditsTableProps> = ({
  batches,
  renderActionButtons,
}) => {
  const styles = useStyles();
  if (!batches?.length) {
    return <NoEcocredits title="No credits batches to display" />;
  }

  return (
    <ActionsTable
      tableLabel="basket ecocredits table"
      renderActionButtons={renderActionButtons}
      headerRows={[
        // TODO: Project
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
        'Amount',
        <Box className={styles.break}>Credit Class</Box>,
        <Box className={styles.break}>Batch Start Date</Box>,
        <Box className={styles.break}>Batch End Date</Box>,
        'Project Location',
      ]}
      rows={batches.map((item, i) => {
        return [
          item.batchDenom,
          <a
            href={getAccountUrl(item.issuer as string)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncate(item.issuer as string)}
          </a>,
          formatNumber(item.totalAmount),
          item.classId,
          <span className={styles.greyText}>{formatDate(item.startDate)}</span>,
          <span className={styles.greyText}>{formatDate(item.endDate)}</span>,
          item.projectLocation,
        ];
      })}
    />
  );
};

export default BasketEcocreditsTable;
