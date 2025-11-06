import { useMemo, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import { useFetchEcocredits } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { loaderStyles } from 'styles/loader';
import { ELLIPSIS_COLUMN_WIDTH, tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/src/components/block-content';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import BridgeIcon from 'web-components/src/components/icons/BridgeIcon';
import EmptyCartIcon from 'web-components/src/components/icons/EmptyCartIcon';
import { ActionsTable } from 'web-components/src/components/table/ActionsTable';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import {
  DATE_FORMAT_SECONDARY,
  formatDate,
  formatNumber,
} from 'web-components/src/utils/format';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import {
  ACTIONS_TABLE_ACTIONS_TEXT,
  getLabelDisplayedRows,
} from 'lib/constants/shared.constants';
import { Bridge1Event } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { BridgeFlow } from 'features/ecocredit/BridgeFlow/BridgeFlow';
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
  const { _ } = useLingui();
  const { track } = useTracker();

  const [batchToBridge, setBatchToBridge] = useState<
    BatchInfoWithBalance | undefined
  >();

  const { credits: bridgableCredits, isLoadingCredits } = useFetchEcocredits({
    address: accountAddress,
    creditClassId: process.env.NEXT_PUBLIC_BRIDGE_CREDIT_CLASS_ID,
    isPaginatedQuery: false,
  });

  const labelDisplayedRows = useMemo(
    () =>
      getLabelDisplayedRows({
        _,
        rowsLength: bridgableCredits.length,
      }),
    [_, bridgableCredits],
  );

  if (!bridgableCredits?.length && !isLoadingCredits) {
    return (
      <NoCredits
        title={_(NO_BRIDGABLE_CREDITS)}
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
          tableLabel={_(msg`bridgable ecocredits table`)}
          actionButtonsText={_(ACTIONS_TABLE_ACTIONS_TEXT)}
          labelDisplayedRows={labelDisplayedRows}
          sx={tableStyles.rootOnlyTopBorder}
          renderActionButtons={(i: number) => (
            <OutlinedButton
              startIcon={<BridgeIcon sx={{ width: '24px', height: '24px' }} />}
              size="small"
              onClick={async () => {
                setBatchToBridge(bridgableCredits[i]);
                track<Bridge1Event>('bridge1', {
                  batchDenom: bridgableCredits[i].denom,
                  projectId: bridgableCredits[i].projectId,
                  creditClassId: bridgableCredits[i].classId,
                });
              }}
            >
              {_(BRIDGE_ACTION)}
            </OutlinedButton>
          )}
          headerRows={[
            <Box key="project" sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>
              <Trans>Project</Trans>
            </Box>,
            <Box
              key="batch-denom"
              display="flex"
              sx={{
                width: {
                  xs: '8rem',
                  lg: '10rem',
                },
              }}
            >
              <Box sx={{ width: '4.2rem' }}>
                <BreakText>
                  <Trans>Credit Batch Id</Trans>
                </BreakText>
              </Box>
              <Box alignSelf="flex-end" ml={2}>
                <InfoTooltipWithIcon outlined title={_(CREDIT_BATCH_TOOLTIP)} />
              </Box>
            </Box>,
            <Trans key="credit-class">Credit Class</Trans>,
            <Box key="amount" display="flex">
              <BreakTextEnd>
                <Trans>Amount Bridgable</Trans>
              </BreakTextEnd>
              <Box alignSelf="flex-end" ml={2}>
                <InfoTooltipWithIcon
                  outlined
                  title={_(AMOUNT_BRIDGABLE_TOOLTIP)}
                />
              </Box>
            </Box>,
            <Trans key="issuer">Issuer</Trans>,
            <Box key="start-date" sx={{ width: '6.25rem' }}>
              <BreakText>
                <Trans>Batch Start Date</Trans>
              </BreakText>
            </Box>,
            <Box key="end-date" sx={{ width: '6.25rem' }}>
              <BreakText>
                <Trans>Batch End Date</Trans>
              </BreakText>
            </Box>,
            <Trans key="project-location">Project Location</Trans>,
          ]}
          rows={bridgableCredits.map((row, i) => {
            return [
              <WithLoader
                key={`project-${row.projectId}`}
                isLoading={!row.projectName}
                variant="skeleton"
              >
                <Link
                  href={`/project/${row?.projectId}`}
                  sx={tableStyles.ellipsisColumn}
                >
                  {row?.projectName}
                </Link>
              </WithLoader>,
              <Link
                key={`denom-${row.denom}`}
                href={`/credit-batches/${row.denom}`}
              >
                {row.denom}
              </Link>,
              <WithLoader
                key={`class-${row.classId}`}
                isLoading={!row.classId}
                variant="skeleton"
              >
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
              <AccountLink key={`issuer-${row.issuer}`} address={row.issuer} />,
              <GreyText key={`start-${row.startDate}`}>
                {formatDate(row.startDate, DATE_FORMAT_SECONDARY)}
              </GreyText>,
              <GreyText key={`end-${row.endDate}`}>
                {formatDate(row.endDate, DATE_FORMAT_SECONDARY)}
              </GreyText>,
              <WithLoader
                key={`location-${row.projectLocation}`}
                isLoading={!row.projectLocation}
                variant="skeleton"
              >
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
