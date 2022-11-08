import { useState } from 'react';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { loaderStyles } from 'styles/loader';
import { ELLIPSIS_COLUMN_WIDTH, tableStyles } from 'styles/table';
import { useTrack } from 'use-analytics';

import { BlockContent } from 'web-components/lib/components/block-content';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import EmptyCartIcon from 'web-components/lib/components/icons/EmptyCartIcon';
import {
  ActionsTable,
  DEFAULT_ROWS_PER_PAGE,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import {
  DATE_FORMAT_SECONDARY,
  formatDate,
  formatNumber,
} from 'web-components/lib/utils/format';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

import { BridgeFlow } from 'features/marketplace/BridgeFlow/BridgeFlow';
import {
  AccountLink,
  BreakText,
  BreakTextEnd,
  GreyText,
  Link,
} from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';
import { useBridgable } from 'hooks/bridge/useBridgable';

import {
  AMOUNT_BRIDGABLE_TOOLTIP,
  BRIDGE_ACTION,
  CREDIT_BATCH_TOOLTIP,
  NO_BRIDGABLE_CREDITS,
} from './BridgableEcocreditsTable.constants';

interface Props {
  accountAddress: string | undefined;
}

export const BridgableEcocreditsTable = ({
  accountAddress,
}: Props): JSX.Element => {
  const track = useTrack();

  const [batchToBridge, setBatchToBridge] = useState<
    BatchInfoWithBalance | undefined
  >();

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });

  const { bridgableCredits, isLoadingCredits } = useBridgable({
    address: accountAddress,
    paginationParams,
  });

  if (!bridgableCredits?.length && !isLoadingCredits) {
    return (
      <NoCredits
        title={NO_BRIDGABLE_CREDITS}
        icon={
          <EmptyCartIcon
            sx={{ width: '100px', height: '100px', color: 'info.main' }}
          />
        }
      />
    );
  }

  return (
    <>
      <WithLoader
        isLoading={isLoadingCredits}
        sx={loaderStyles.withLoaderBlock}
      >
        <ActionsTable
          tableLabel="bridgable ecocredits table"
          sx={tableStyles.rootOnlyTopBorder}
          renderActionButtons={(i: number) => (
            <OutlinedButton
              startIcon={<BridgeIcon sx={{ width: '24px', height: '24px' }} />}
              size="small"
              onClick={async () => {
                setBatchToBridge(bridgableCredits[i]);
                track('bridge1');
              }}
            >
              {BRIDGE_ACTION}
            </OutlinedButton>
          )}
          onTableChange={setPaginationParams}
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
                <InfoTooltipWithIcon outlined title={CREDIT_BATCH_TOOLTIP} />
              </Box>
            </Box>,
            'Issuer',
            'Credit Class',
            <Box display="flex">
              <BreakTextEnd>Amount Bridgable</BreakTextEnd>
              <Box alignSelf="flex-end" ml={2}>
                <InfoTooltipWithIcon
                  outlined
                  title={AMOUNT_BRIDGABLE_TOOLTIP}
                />
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
          rows={bridgableCredits.map((row, i) => {
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
              <GreyText>
                {formatDate(row.startDate, DATE_FORMAT_SECONDARY)}
              </GreyText>,
              <GreyText>
                {formatDate(row.endDate, DATE_FORMAT_SECONDARY)}
              </GreyText>,
              <WithLoader isLoading={!row.projectLocation} variant="skeleton">
                <Box>{row.projectLocation}</Box>
              </WithLoader>,
            ];
          })}
        />
      </WithLoader>
      <BridgeFlow
        isFlowStarted={!!batchToBridge}
        setBatchToBridge={setBatchToBridge}
        selectedBatch={batchToBridge}
      />
    </>
  );
};
