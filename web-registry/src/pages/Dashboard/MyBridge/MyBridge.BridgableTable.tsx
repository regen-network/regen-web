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

const MOCK_BRIDGABLE = [
  {
    $type: 'regen.ecocredit.v1.BatchInfo',
    issuer: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    projectId: 'C01-001',
    denom: 'C01-001-18540707-19870212-001',
    metadata:
      'regen:13toVgLYkjxCmV8LHeZDuK3hVZLhRJ3xzkj4vdA3cretbTuFrakRjQY.rdf',
    startDate: '1854-07-07T06:59:56.000Z',
    endDate: '1987-02-12T07:00:00.000Z',
    issuanceDate: '2022-06-28T18:10:53.000Z',
    open: false,
    balance: {
      $type: 'regen.ecocredit.v1.BatchBalanceInfo',
      address: 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
      batchDenom: 'C01-001-18540707-19870212-001',
      tradableAmount: '0',
      retiredAmount: '2',
      escrowedAmount: '0',
    },
    classId: 'C01',
    className: [
      {
        _key: 'ed8c8e179db2',
        _type: 'block',
        children: [
          {
            _key: 'f534d59b71fe',
            _type: 'span',
            marks: [],
            text: 'Verified Carbon Standard',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    projectName: 'The Mai Ndombe REDD+ Project',
    projectLocation: 'US',
  },
];

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
  credits,
  renderActionButtons,
  onTableChange,
}: BridgableTableProps): JSX.Element => {
  credits = MOCK_BRIDGABLE;

  if (!credits?.length) {
    return <NoCredits title="No bridgable ecocredits to display" />;
  }

  return (
    <ActionsTable
      tableLabel="bridgable ecocredits table"
      renderActionButtons={renderActionButtons}
      onTableChange={onTableChange}
      /* eslint-disable react/jsx-key */
      headerRows={[
        <Box sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>{'Project'}</Box>,
        <Box
          display="flex"
          sx={{
            minWidth: {
              xs: 'auto',
              sm: '11rem',
              lg: '13rem',
            },
          }}
        >
          <BreakText>Credit Batch Id</BreakText>
          <Box alignSelf="flex-end" ml={2}>
            <InfoTooltipWithIcon outlined title={'...'} />
          </Box>
        </Box>,
        // <Box
        //   sx={{
        //     minWidth: {
        //       xs: 'auto',
        //       sm: '11rem',
        //       lg: '13rem',
        //     },
        //   }}
        // >
        //   Credit Batch Id
        // </Box>,
        'Issuer',
        'Credit Class',
        <Box display="flex">
          <BreakTextEnd>Amount Bridgable</BreakTextEnd>
          <Box alignSelf="flex-end" ml={2}>
            <InfoTooltipWithIcon outlined title={'...'} />
          </Box>
        </Box>,
        // <BreakText>Amount</BreakText>,
        // <BreakText>Amount</BreakText>,
        'Batch Start Date',
        'Batch End Date',
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
          // formatNumber({
          //   num: row.balance?.retiredAmount,
          //   ...quantityFormatNumberOptions,
          // }),
          // formatNumber({
          //   num: row.balance?.escrowedAmount,
          //   ...quantityFormatNumberOptions,
          // }),
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
