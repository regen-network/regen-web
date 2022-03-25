import React from 'react';
import { Box, styled } from '@mui/material';

import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import { Link } from '../atoms';
import { NoCredits } from '../molecules';
import { truncate } from '../../lib/wallet';
import { useEcocredits } from '../../hooks';
import { getAccountUrl } from '../../lib/block-explorer';

const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const BreakText = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

type EcocreditsTableProps = {
  address?: string;
  renderActionButtons?: RenderActionButtonsFunc;
};

export const EcocreditsTable: React.FC<EcocreditsTableProps> = ({
  address,
  renderActionButtons,
}) => {
  const credits = useEcocredits(address);

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
          <Link href={getAccountUrl(row.issuer as string)} target="_blank">
            {truncate(row.issuer as string)}
          </Link>,
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
