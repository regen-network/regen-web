import React from 'react';
import { Box, styled } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { formatNumber } from 'web-components/lib/components/table';
import { formatDate } from 'web-components/lib/utils/format';

import { truncate } from '../../lib/wallet';
import { getAccountUrl } from '../../lib/block-explorer';
import { NoCredits } from '../molecules';
import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';

const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const Amount = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

export const ProjectCreditBatchesTable: React.FC<{
  batches: BatchInfoWithSupply[];
  renderActionButtons?: RenderActionButtonsFunc;
}> = ({ batches, renderActionButtons }) => {
  if (!batches?.length) {
    return <NoCredits title="No batches to display" />;
  }

  return (
    <ActionsTable
      tableLabel="ecocredits table"
      renderActionButtons={renderActionButtons}
      headerRows={[
        <Box sx={{ minWidth: { xs: '8rem', sm: '11rem', md: 'auto' } }}>
          Batch Denom
        </Box>,
        'Issuer',
        <Amount>Amount Tradable</Amount>,
        <Amount>Amount Retired</Amount>,
        <Amount>Amount Cancelled</Amount>,
        'Batch Start Date',
        'Batch End Date',
      ]}
      rows={batches.map((row, i) => {
        return [
          <Box
            component="span"
            sx={{
              whiteSpace: {
                xs: 'wrap-word',
                md: 'nowrap',
              },
            }}
          >
            {row.batch_denom}
          </Box>,
          <a
            href={getAccountUrl(row.issuer as string)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncate(row.issuer)}
          </a>,
          formatNumber(row.tradable_supply),
          formatNumber(row.retired_supply),
          formatNumber(row.amount_cancelled),
          <GreyText>{formatDate(row.start_date)}</GreyText>,
          <GreyText>{formatDate(row.end_date)}</GreyText>,
        ];
      })}
    />
  );
};
