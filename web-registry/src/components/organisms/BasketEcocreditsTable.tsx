import React from 'react';
import { Box } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';

import { truncate } from '../../lib/wallet';
import { getAccountUrl } from '../../lib/block-explorer';
import { GreyText } from '../atoms/GreyText';
import { BreakText } from '../atoms/BreakText';
import { NoCredits } from '../molecules';
import type { IBatchInfo } from '../../types/ledger/ecocredit';
import { formatNumber } from 'web-components/lib/components/table';
import { formatDate } from 'web-components/lib/utils/format';

export interface BasketEcocreditsTableProps {
  batches: IBatchInfo[];
  renderActionButtons?: RenderActionButtonsFunc;
}

const BasketEcocreditsTable: React.FC<BasketEcocreditsTableProps> = ({
  batches,
  renderActionButtons,
}) => {
  if (!batches?.length) {
    return <NoCredits title="No credit batches to display" />;
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
        <BreakText>Credit Class</BreakText>,
        <BreakText>Batch Start Date</BreakText>,
        <BreakText>Batch End Date</BreakText>,
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
          <GreyText>{formatDate(item.startDate)}</GreyText>,
          <GreyText>{formatDate(item.endDate)}</GreyText>,
          item.projectLocation,
        ];
      })}
    />
  );
};

export default BasketEcocreditsTable;
