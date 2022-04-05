import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';

// import { BatchInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/types';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import { Link } from '../atoms';
import { NoCredits } from '../molecules';
import { truncate } from '../../lib/wallet';
import { getAccountUrl } from '../../lib/block-explorer';
import { BasketEcocredit } from '../../types/ledger';

const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const BreakText = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

type BasketEcocreditsTableProps = {
  batches: BasketEcocredit[];
  renderActionButtons?: RenderActionButtonsFunc;
};

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
        <Box sx={{ minWidth: '8rem' }}>Project</Box>,
        <Box sx={{ minWidth: { xs: '8rem', sm: '11rem', md: 'auto' } }}>
          Batch Denom
        </Box>,
        'Issuer',
        'Amount',
        <BreakText>Credit Class</BreakText>,
        <BreakText>Batch Start Date</BreakText>,
        <BreakText>Batch End Date</BreakText>,
        'Project Location',
      ]}
      rows={batches.map(item => {
        return [
          <Link href={`/projects/${item.projectName}`} target="_blank">
            {item.projectDisplay}
          </Link>,
          <Box
            component="span"
            sx={{
              whiteSpace: {
                xs: 'wrap-word',
                md: 'nowrap',
              },
            }}
          >
            {item.batchInfo.batchDenom}
          </Box>,
          <Link
            href={getAccountUrl(item.batchInfo.issuer as string)}
            target="_blank"
          >
            {truncate(item.batchInfo.issuer as string)}
          </Link>,
          formatNumber(item.batchInfo.totalAmount),
          item.batchInfo.classId,
          <GreyText>{formatDate(item.batchInfo.startDate)}</GreyText>,
          <GreyText>{formatDate(item.batchInfo.endDate)}</GreyText>,
          item.batchInfo.projectLocation,
        ];
      })}
    />
  );
};

export default BasketEcocreditsTable;
