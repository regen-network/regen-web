import React from 'react';
import { Box } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { formatNumber } from 'web-components/lib/components/table';
import { formatDate } from 'web-components/lib/utils/format';

import { truncate } from '../../lib/wallet';
import { getAccountUrl } from '../../lib/block-explorer';
import { GreyText } from '../atoms/GreyText';
import { BreakText } from '../atoms/BreakText';
import { NoCredits } from '../molecules';
import type { BatchInfoWithBalance } from '../../types/ledger/ecocredit';

export const EcocreditsTable: React.FC<{
  credits: BatchInfoWithBalance[];
  renderActionButtons?: RenderActionButtonsFunc;
}> = ({ credits, renderActionButtons }) => {
  if (!credits?.length) {
    return <NoCredits title="No ecocredits to display" />;
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
        <BreakText>Amount Tradable</BreakText>,
        <BreakText>Amount Retired</BreakText>,
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
          <GreyText>{formatDate(row.start_date)}</GreyText>,
          <GreyText>{formatDate(row.end_date)}</GreyText>,
          row.project_location,
        ];
      })}
    />
  );
};
