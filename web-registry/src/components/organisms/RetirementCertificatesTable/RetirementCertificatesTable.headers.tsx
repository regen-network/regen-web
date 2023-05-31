import { Box } from '@mui/material';
import { ELLIPSIS_COLUMN_WIDTH } from 'styles/table';

import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';

import { BreakText } from 'components/atoms';

export const retirementCertificateHeaders = [
  <BreakText>{'Retirement date'}</BreakText>,
  <Box sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>{'Project'}</Box>,
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
    <BreakText sx={{ maxWidth: 76 }}>{'Ecocredit batch id'}</BreakText>
    <Box alignSelf="flex-end" ml={2}>
      <InfoTooltipWithIcon outlined title={'Helper text'} />
    </Box>
  </Box>,
  <Box>{'Credit Class'}</Box>,
  <BreakText>{'Amount Retired'}</BreakText>,
  <BreakText>{'Issuer'}</BreakText>,
  <BreakText>{'Batch Start Date'}</BreakText>,
  <BreakText>{'Batch End Date'}</BreakText>,
  <BreakText>{'Retirement location'}</BreakText>,
  <BreakText>{'Project Location'}</BreakText>,
];
