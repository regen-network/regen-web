import { Trans } from '@lingui/react/macro';
import { Box } from '@mui/material';
import { ELLIPSIS_COLUMN_WIDTH } from 'styles/table';

import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { BreakText } from 'components/atoms';

import { ECOCREDIT_BATCH_ID_TOOLTIP } from './RetirementCertificatesTable.constants';

export const getRetirementCertificateHeaders = (_: TranslatorType) => [
  <BreakText key="retirement-date">
    <Trans>Retirement date</Trans>
  </BreakText>,
  <Box key="project" sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>
    <Trans>Project</Trans>
  </Box>,
  <Box
    key="ecocredit-batch-id"
    sx={{
      display: 'flex',
      alignItems: 'center',
      minWidth: {
        xs: 'auto',
        sm: '11rem',
        lg: '13rem',
      },
    }}
  >
    <BreakText key="ecocredit-batch-id-text" sx={{ maxWidth: 76 }}>
      <Trans>Ecocredit batch ID</Trans>
    </BreakText>
    <Box key="ecocredit-batch-id-tooltip" alignSelf="flex-end" ml={2}>
      <InfoTooltipWithIcon outlined title={_(ECOCREDIT_BATCH_ID_TOOLTIP)} />
    </Box>
  </Box>,
  <Box key="credit-class">
    <Trans>Credit Class</Trans>
  </Box>,
  <BreakText key="amount-retired">
    <Trans>Amount Retired</Trans>
  </BreakText>,
  <BreakText key="issuer">
    <Trans>Issuer</Trans>
  </BreakText>,
  <BreakText key="batch-start-date">
    <Trans>Batch Start Date</Trans>
  </BreakText>,
  <BreakText key="batch-end-date">
    <Trans>Batch End Date</Trans>
  </BreakText>,
  <BreakText key="retirement-location">
    <Trans>Retirement location</Trans>
  </BreakText>,
  <BreakText key="project-location">
    <Trans>Project Location</Trans>
  </BreakText>,
];
