import React from 'react';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/src/components/block-content';
import {
  ActionsTable,
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/src/components/table/ActionsTable';
import { formatDate, formatNumber } from 'web-components/src/utils/format';

import { UseStateSetter } from 'types/react/use-state';

import { BasketBatchInfoWithBalance } from 'pages/BasketDetails/utils/normalizeBasketEcocredits';
import { BreakText, GreyText, Link } from 'components/atoms';
import { AccountLink } from 'components/atoms/AccountLink';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

type BasketEcocreditsTableProps = {
  basketCredits: BasketBatchInfoWithBalance[];
  renderActionButtons?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
  initialPaginationParams?: TablePaginationParams;
  isIgnoreOffset?: boolean;
};

export const BasketEcocreditsTable: React.FC<
  React.PropsWithChildren<BasketEcocreditsTableProps>
> = ({
  basketCredits,
  renderActionButtons,
  initialPaginationParams,
  isIgnoreOffset,
  onTableChange,
}) => {
  if (!basketCredits?.length) {
    return <NoCredits title="No ecocredits to display" />;
  }

  return (
    <ActionsTable
      tableLabel="basket ecocredits table"
      renderActionButtons={renderActionButtons}
      onTableChange={onTableChange}
      initialPaginationParams={initialPaginationParams}
      isIgnoreOffset={isIgnoreOffset}
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
      rows={basketCredits.map(credit => [
        <WithLoader isLoading={credit.projectName === ''} variant="skeleton">
          <Link
            href={`/project/${credit.projectId}`}
            target="_blank"
            sx={tableStyles.ellipsisColumn}
          >
            {credit.projectName}
          </Link>
        </WithLoader>,
        <WithLoader isLoading={!credit.denom} variant="skeleton">
          <Link href={`/credit-batches/${credit.denom}`}>{credit.denom}</Link>
        </WithLoader>,
        <AccountLink address={credit.issuer} />,
        formatNumber({
          num: credit.balance,
          ...quantityFormatNumberOptions,
        }),
        <WithLoader isLoading={credit.classId === ''} variant="skeleton">
          <Link
            href={`/credit-classes/${credit.classId}`}
            sx={tableStyles.ellipsisContentColumn}
          >
            {credit?.className && <BlockContent content={credit?.className} />}
          </Link>
        </WithLoader>,
        <GreyText>{formatDate(credit.startDate)}</GreyText>,
        <GreyText>{formatDate(credit.endDate)}</GreyText>,
        <WithLoader
          isLoading={credit.projectLocation === ''}
          variant="skeleton"
        >
          <Box>{credit.projectLocation}</Box>
        </WithLoader>,
      ])}
    />
  );
};
