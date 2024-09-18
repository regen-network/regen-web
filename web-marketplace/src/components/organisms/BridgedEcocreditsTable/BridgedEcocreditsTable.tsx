import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, CircularProgress } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';
import dayjs from 'dayjs';
import { loaderStyles } from 'styles/loader';
import { ELLIPSIS_COLUMN_WIDTH, tableStyles } from 'styles/table';

import { BlockContent } from 'web-components/src/components/block-content';
import { Flex } from 'web-components/src/components/box';
import EmptyCartIcon from 'web-components/src/components/icons/EmptyCartIcon';
import { InfoLabelVariant } from 'web-components/src/components/info-label/InfoLabel.types';
import { ActionsTable } from 'web-components/src/components/table/ActionsTable';
import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import {
  DATE_FORMAT_SECONDARY,
  formatDate,
  formatNumber,
} from 'web-components/src/utils/format';
import { truncateHash } from 'web-components/src/utils/truncate';

import { getHashUrl } from 'lib/block-explorer';
import { ACTIONS_TABLE_ACTIONS_TEXT } from 'lib/constants/shared.constants';

import {
  AccountLink,
  BreakText,
  BreakTextEnd,
  GreyText,
  Link,
  StatusLabel,
} from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { NoCredits } from 'components/molecules';

import {
  AMOUNT_BRIDGED_TOOLTIP,
  BRIDGED_STATUSES,
  CREDIT_BATCH_TOOLTIP,
  NO_BRIDGED_CREDITS,
  STATUS_TOOLTIP,
} from './BridgedEcocreditsTable.constants';
import { Note } from './BridgedEcocreditsTable.Note';
import { useFetchBridgedEcocredits } from './hooks/useFetchBridgedEcocredits';

interface Props {
  accountAddress: string | undefined | null;
  privateAccess?: boolean;
}

export const BridgedEcocreditsTable = ({
  accountAddress,
  privateAccess = false,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const {
    bridgedCredits,
    isLoadingBridgedCredits,
    isRefetchingTxsStatus,
    paginationParams,
    setPaginationParams,
  } = useFetchBridgedEcocredits({
    address: accountAddress,
  });

  if (!bridgedCredits?.length && !isLoadingBridgedCredits) {
    return (
      <NoCredits
        title={_(NO_BRIDGED_CREDITS)}
        icon={
          <EmptyCartIcon
            sx={{ width: '100px', height: '100px', color: 'info.main' }}
          />
        }
      />
    );
  }

  return (
    <WithLoader
      isLoading={isLoadingBridgedCredits}
      sx={loaderStyles.withLoaderBlock}
    >
      <ActionsTable
        tableLabel={_(msg`bridged ecocredits table`)}
        actionButtonsText={_(ACTIONS_TABLE_ACTIONS_TEXT)}
        sx={tableStyles.rootOnlyTopBorder}
        initialPaginationParams={paginationParams}
        onTableChange={setPaginationParams}
        headerRows={[
          <Trans>Tx Hash</Trans>,
          <Trans>Timestamp</Trans>,
          <Flex alignItems="flex-end" justifyContent="center">
            <Box sx={{ mr: 1 }}>
              <Trans>Status</Trans>
            </Box>
            <Box sx={{ mb: -1.5 }}>
              <InfoTooltipWithIcon outlined title={_(STATUS_TOOLTIP)} />
            </Box>

            <CircularProgress
              color="secondary"
              size={20}
              sx={{
                ml: 2,
                opacity: isRefetchingTxsStatus ? 1 : 0,
                transitionProperty: 'opacity',
                transitionDuration: isRefetchingTxsStatus ? '0s' : '3s',
              }}
            />
          </Flex>,
          privateAccess && (
            <Box display="flex" sx={{ width: { xs: '8rem', lg: '10rem' } }}>
              <Trans>Note / Link</Trans>
            </Box>
          ),
          <Box sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>
            <Trans>Project</Trans>
          </Box>,
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
              <BreakText>
                <Trans>Credit Batch Id</Trans>
              </BreakText>
            </Box>
            <Box alignSelf="flex-end" ml={2}>
              <InfoTooltipWithIcon outlined title={_(CREDIT_BATCH_TOOLTIP)} />
            </Box>
          </Box>,
          <Trans>Credit Class</Trans>,
          <Box display="flex">
            <BreakTextEnd>
              <Trans>Amount Bridged</Trans>
            </BreakTextEnd>
            <Box alignSelf="flex-end" ml={2}>
              <InfoTooltipWithIcon outlined title={_(AMOUNT_BRIDGED_TOOLTIP)} />
            </Box>
          </Box>,
          <Trans>Issuer</Trans>,
          <Box sx={{ width: '6.25rem' }}>
            <BreakText>
              <Trans>Batch Start Date</Trans>
            </BreakText>
          </Box>,
          <Box sx={{ width: '6.25rem' }}>
            <BreakText>
              <Trans>Batch End Date</Trans>
            </BreakText>
          </Box>,
          <Trans>Project Location</Trans>,
        ]}
        rows={bridgedCredits.map((row, i) => {
          return [
            <WithLoader isLoading={!row.projectName} variant="skeleton">
              <Link
                href={getHashUrl(row.txHash)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {truncateHash(row.txHash)}
              </Link>
            </WithLoader>,
            <WithLoader isLoading={!row.projectName} variant="skeleton">
              <GreyText>{dayjs(row.txTimestamp).fromNow()}</GreyText>
            </WithLoader>,
            <WithLoader isLoading={row.status === undefined} variant="skeleton">
              <GreyText>
                {row.status && (
                  <StatusLabel
                    status={BRIDGED_STATUSES[row.status] as InfoLabelVariant}
                  />
                )}
              </GreyText>
            </WithLoader>,
            privateAccess && row.status && (
              <GreyText>
                <Note status={row.status} txHash={row.destinationTxHash} />
              </GreyText>
            ),
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
              num: row.amount,
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
  );
};
