import React from 'react';
import { Box, styled } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';
import { truncate } from 'web-components/lib/utils/truncate';

import { Link } from '../atoms';
import { NoCredits } from '../molecules';
import { getAccountUrl } from '../../lib/block-explorer';
import type {
  IBatchInfoWithBalance,
  IBatchInfoWithSupply,
} from '../../types/ledger/ecocredit';

const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const BreakText = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

type EcocreditsTableProps = {
  credits?: IBatchInfoWithSupply[] | IBatchInfoWithBalance[];
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
        // 'Credit Class',
        <BreakText>Amount Tradable</BreakText>,
        <BreakText>Amount Retired</BreakText>,
        <BreakText>Balance</BreakText>,
        'Batch Start Date',
        'Batch End Date',
      ]}
      rows={credits.map((row, i) => {
        return [
          <Link href={`/credit-batches/${row.denom}`}>{row.denom}</Link>,
          <Link href={getAccountUrl(row.issuer as string)} target="_blank">
            {truncate(row.issuer as string)}
          </Link>,
          // <Link key="class_id" href={`/credit-classes/${row.classId}`}>
          //   {row.classId}
          // </Link>,
          formatNumber(
            (row as IBatchInfoWithSupply)?.tradableSupply ||
              (row as IBatchInfoWithBalance)?.balance?.tradableAmount,
          ),
          formatNumber(
            (row as IBatchInfoWithSupply)?.retiredSupply ||
              (row as IBatchInfoWithBalance)?.balance?.retiredAmount,
          ),
          <GreyText>{formatDate(row.startDate)}</GreyText>,
          <GreyText>{formatDate(row.endDate)}</GreyText>,
        ];
      })}
    />
  );
};
