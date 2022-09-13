import React from 'react';
import { Box, styled } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import type { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import { AccountLink, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

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
  onTableChange?: UseStateSetter<TablePaginationParams>;
};

export const EcocreditsTable: React.FC<EcocreditsTableProps> = ({
  credits,
  renderActionButtons,
  onTableChange,
}) => {
  if (!credits?.length) {
    return <NoCredits title="No ecocredits to display" />;
  }

  return (
    <ActionsTable
      tableLabel="ecocredits table"
      renderActionButtons={renderActionButtons}
      onTableChange={onTableChange}
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
          <AccountLink address={row.issuer} />,
          <WithLoader isLoading={!row.classId} variant="skeleton">
            <Link key="class_id" href={`/credit-classes/${row.classId}`}>
              {row.classId}
            </Link>
          </WithLoader>,
          formatNumber({ num: row.balance?.tradableAmount }),
          formatNumber({ num: row.balance?.retiredAmount }),
          formatNumber({ num: row.balance?.escrowedAmount }),
          <GreyText>{formatDate(row.startDate)}</GreyText>,
          <GreyText>{formatDate(row.endDate)}</GreyText>,
          <WithLoader isLoading={!row.projectLocation} variant="skeleton">
            <Box>{row.projectLocation}</Box>
          </WithLoader>,
        ];
      })}
      /* eslint-enable react/jsx-key */
    />
  );
};
