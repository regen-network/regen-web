import { useState } from 'react';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { loaderStyles } from 'styles/loader';
import { ELLIPSIS_COLUMN_WIDTH, tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/lib/components/block-content';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import BridgeIcon from 'web-components/lib/components/icons/BridgeIcon';
import EmptyCartIcon from 'web-components/lib/components/icons/EmptyCartIcon';
import { ActionsTable } from 'web-components/lib/components/table/ActionsTable';
import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import {
  DATE_FORMAT_SECONDARY,
  formatDate,
  formatNumber,
} from 'web-components/lib/utils/format';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { Bridge1Event } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { BridgeFlow } from 'features/marketplace/BridgeFlow/BridgeFlow';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import {
  AccountLink,
  BreakText,
  BreakTextEnd,
  GreyText,
  Link,
} from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

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
  const { track } = useTracker();

  const [batchToBridge, setBatchToBridge] = useState<
    BatchInfoWithBalance | undefined
  >();

  const { credits: bridgableCredits, isLoadingCredits } = useFetchEcocredits({
    address: accountAddress,
    creditClassId: import.meta.env.VITE_BRIDGE_CREDIT_CLASS_ID,
    isPaginatedQuery: false,
  });

  if (!bridgableCredits?.length && !isLoadingCredits) {
    return (
      <NoCredits
        title={NO_BRIDGABLE_CREDITS}
        icon={<EmptyCartIcon sx={{ width: '100px', height: '100px' }} />}
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
                track<'bridge1', Bridge1Event>('bridge1', {
                  batchDenom: bridgableCredits[i].denom,
                  projectId: bridgableCredits[i].projectId,
                  creditClassId: bridgableCredits[i].classId,
                });
              }}
            >
              {BRIDGE_ACTION}
            </OutlinedButton>
          )}
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
            'Issuer',
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
                  href={`/project/${row?.projectId}`}
                  sx={tableStyles.ellipsisColumn}
                >
                  {row?.projectName}
                </Link>
              </WithLoader>,
              <Link href={`/credit-batches/${row.denom}`}>{row.denom}</Link>,
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
              <AccountLink address={row.issuer} />,
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
        resetIsFlowStarted={() => setBatchToBridge(undefined)}
        setBatchToBridge={setBatchToBridge}
        selectedBatch={batchToBridge}
      />
    </>
  );
};
