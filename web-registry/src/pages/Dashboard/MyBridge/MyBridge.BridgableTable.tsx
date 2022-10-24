import { Box, styled } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { ELLIPSIS_COLUMN_WIDTH, tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/lib/components/block-content';
import {
  ActionsTable,
  RenderActionButtonsFunc,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import { formatDate, formatNumber } from 'web-components/lib/utils/format';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';

import { AccountLink, Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

// TODO: mocked data
import { MOCK_BRIDGE_DATA } from './mocked_data';

const GreyText = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

const BreakText = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

const BreakTextEnd = styled('div')({
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  textAlign: 'end',
});

type BridgableTableProps = {
  credits?: BatchInfoWithBalance[];
  renderActionButtons?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
};

export const BridgableTable = ({
  // credits, // TODO: mocked data
  renderActionButtons,
  onTableChange,
}: BridgableTableProps): JSX.Element => {
  // TODO: mocked data
  const credits = MOCK_BRIDGE_DATA;

  if (!credits?.length) {
    return <NoCredits title="No bridgable ecocredits to display" />;
  }

  return (
    <ActionsTable
      tableLabel="bridgable ecocredits table"
      sx={{ root: { borderRadius: 0 } }}
      renderActionButtons={renderActionButtons}
      onTableChange={onTableChange}
      headerRows={[
        <Box sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>{'Project'}</Box>,
        <Box
          display="flex"
          sx={{
            width: {
              xs: '8rem',
              lg: '10rem',
            },
          }}
        >
          <Box sx={{ width: '4.2rem' }}>
            <BreakText>Credit Batch Id</BreakText>
          </Box>
          <Box alignSelf="flex-end" ml={2}>
            <InfoTooltipWithIcon outlined title={'...'} />
          </Box>
        </Box>,
        'Issuer',
        'Credit Class',
        <Box display="flex">
          <BreakTextEnd>Amount Bridgable</BreakTextEnd>
          <Box alignSelf="flex-end" ml={2}>
            <InfoTooltipWithIcon outlined title={'...'} />
          </Box>
        </Box>,
        <Box sx={{ width: '6.25rem' }}>
          <BreakText>Batch Start Date</BreakText>
        </Box>,
        <Box sx={{ width: '6.25rem' }}>
          <BreakText>Batch End Date</BreakText>
        </Box>,
        'Project Location',
      ]}
      rows={credits.map((row, i) => {
        return [
          <WithLoader isLoading={!row.projectName} variant="skeleton">
            <Link
              href={`/projects/${row?.projectId}`}
              sx={tableStyles.ellipsisColumn}
            >
              {row?.projectName}
            </Link>
          </WithLoader>,
          <Link href={`/credit-batches/${row.denom}`}>{row.denom}</Link>,
          <AccountLink address={row.issuer} />,
          <WithLoader isLoading={!row.classId} variant="skeleton">
            <Link
              key="class_id"
              href={`/credit-classes/${row.classId}`}
              sx={tableStyles.ellipsisContentColumn}
            >
              {row?.className && <BlockContent content={row?.className} />}
            </Link>
          </WithLoader>,
          formatNumber({
            num: row.balance?.tradableAmount,
            ...quantityFormatNumberOptions,
          }),
          <GreyText>{formatDate(row.startDate, 'MMM D, YYYY')}</GreyText>,
          <GreyText>{formatDate(row.endDate, 'MMM D, YYYY')}</GreyText>,
          <WithLoader isLoading={!row.projectLocation} variant="skeleton">
            <Box>{row.projectLocation}</Box>
          </WithLoader>,
        ];
      })}
    />
  );
};
