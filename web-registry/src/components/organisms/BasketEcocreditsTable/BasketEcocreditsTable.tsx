import React from 'react';
import { Box, styled } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import { Link } from 'components/atoms';
import { AccountLink } from 'components/atoms/AccountLink';
import { NoCredits } from 'components/molecules';

const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const BreakText = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

export type CreditBatch = {
  //  BatchInfo
  classId: string;
  batchDenom: string;
  issuer: string;
  totalAmount: string;
  startDate: Date | string;
  endDate: Date | string;
  projectJurisdiction: string;
  // Project info
  projectHandle: string;
  projectName: string;
};

type BasketEcocreditsTableProps = {
  batches: CreditBatch[];
  renderActionButtons?: RenderActionButtonsFunc;
};

export const BasketEcocreditsTable: React.FC<BasketEcocreditsTableProps> = ({
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
        /* eslint-disable react/jsx-key */
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
        const projectCell =
          item.projectHandle === '-' ? (
            item.projectName
          ) : (
            <Link href={`/projects/${item.projectHandle}`} target="_blank">
              {item.projectName}
            </Link>
          );

        return [
          projectCell,
          <Box
            component="span"
            sx={{
              whiteSpace: {
                xs: 'wrap-word',
                md: 'nowrap',
              },
            }}
          >
            {item.batchDenom}
          </Box>,
          <AccountLink address={item.issuer} />,
          formatNumber({ num: item.totalAmount }),
          item.classId,
          <GreyText>{formatDate(item.startDate)}</GreyText>,
          <GreyText>{formatDate(item.endDate)}</GreyText>,
          item.projectJurisdiction,
        ];
        /* eslint-enable react/jsx-key */
      })}
    />
  );
};
