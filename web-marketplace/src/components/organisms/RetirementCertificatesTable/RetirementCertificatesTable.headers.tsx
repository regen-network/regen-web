import { Trans } from '@lingui/react/macro';
import { Box } from '@mui/material';
import { ELLIPSIS_COLUMN_WIDTH } from 'styles/table';

import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { BreakText } from 'components/atoms';

import { ECOCREDIT_BATCH_ID_TOOLTIP } from './RetirementCertificatesTable.constants';

export const getRetirementCertificateHeaders = (_: TranslatorType) => [
  <BreakText>
    <Trans>Retirement date</Trans>
  </BreakText>,
  <Box sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>
    <Trans>Project</Trans>
  </Box>,
  <Box
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
    <BreakText sx={{ maxWidth: 76 }}>
      <Trans>Ecocredit batch ID</Trans>
    </BreakText>
    <Box alignSelf="flex-end" ml={2}>
      <InfoTooltipWithIcon outlined title={_(ECOCREDIT_BATCH_ID_TOOLTIP)} />
    </Box>
  </Box>,
  <Box>
    <Trans>Credit Class</Trans>
  </Box>,
  <BreakText>
    <Trans>Amount Retired</Trans>
  </BreakText>,
  <BreakText>
    <Trans>Issuer</Trans>
  </BreakText>,
  <BreakText>
    <Trans>Batch Start Date</Trans>
  </BreakText>,
  <BreakText>
    <Trans>Batch End Date</Trans>
  </BreakText>,
  <BreakText>
    <Trans>Retirement location</Trans>
  </BreakText>,
  <BreakText>
    <Trans>Project Location</Trans>
  </BreakText>,
];
