import React from 'react';
import { Box, styled } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';

import { getAccountUrl } from '../../lib/block-explorer';
import type { BatchInfoWithBalance } from '../../types/ledger/ecocredit';
import { Link } from '../atoms';
import { NoCredits } from '../molecules';

const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const BreakText = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

type EcocreditsTableProps = {
  credits?: BatchInfoWithBalance[];
  renderActionButtons?: RenderActionButtonsFunc;
};

export const EcocreditsTable: React.FC<EcocreditsTableProps> = ({
  credits,
  renderActionButtons,
}) => {
  if (!credits?.length) {
    return <NoCredits title="No ecocredits to display" />;
  }

  return (
    <ActionsTable
      tableLabel="ecocredits table"
      renderActionButtons={renderActionButtons}
      /* eslint-disable react/jsx-key */
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
        <BreakText>Amount Escrowed</BreakText>,
        'Batch Start Date',
        'Batch End Date',
        'Project Location',
      ]}
      rows={credits.map((row, i) => {
        return [
          <Link href={`/credit-batches/${row.denom}`}>{row.denom}</Link>,
          <Link href={getAccountUrl(row.issuer as string)} target="_blank">
            {truncate(row.issuer as string)}
          </Link>,
          <Link key="class_id" href={`/credit-classes/${row.classId}`}>
            {row.classId}
          </Link>,
          formatNumber(row.balance?.tradableAmount),
          formatNumber(row.balance?.retiredAmount),
          formatNumber(row.balance?.escrowedAmount),
          <GreyText>{formatDate(row.startDate)}</GreyText>,
          <GreyText>{formatDate(row.endDate)}</GreyText>,
          row.projectLocation,
        ];
      })}
      /* eslint-enable react/jsx-key */
    />
  );
};
