import { Box } from '@mui/material';

import QuestionIconOutlined from 'web-components/lib/components/icons/QuestionIconOutlined';
import InfoTooltip from 'web-components/lib/components/tooltip/InfoTooltip';

import { PURCHASE_OPTION_TOOLTIP } from './SellOrdersTable.constants';

export const SELL_ORDERS_ROW = [
  <Box sx={{ width: '64px', whiteSpace: 'normal' }}>{'SELL ORDER ID'}</Box>,
  'PROJECT',
  <Box sx={{ width: '86px', whiteSpace: 'normal' }}>
    {'ASK PRICE PER CREDIT'}
  </Box>,
  <Box sx={{ width: '70px', whiteSpace: 'normal' }}>{'AMOUNT AVAILABLE'}</Box>,
  <Box sx={{ width: '70px', whiteSpace: 'normal' }}>{'CREDIT CLASS'}</Box>,
  <Box sx={{ width: '74px', whiteSpace: 'normal' }}>{'BATCH DENOM'}</Box>,
  <Box
    sx={{
      display: 'flex',
      width: '74px',
      whiteSpace: 'normal',
    }}
  >
    <Box sx={{ mr: 1 }}>{'PURCHASE OPTIONS'}</Box>
    <InfoTooltip title={PURCHASE_OPTION_TOOLTIP} arrow placement="top">
      <Box sx={{ display: 'flex', alignItems: 'bottom' }}>
        <QuestionIconOutlined sx={{ color: 'secondary.main' }} />
      </Box>
    </InfoTooltip>
  </Box>,
  <Box sx={{ width: '84px', whiteSpace: 'normal' }}>{'BATCH START DATE'}</Box>,
  <Box sx={{ width: '72px', whiteSpace: 'normal' }}>{'BATCH END DATE'}</Box>,
  'SELLER',
];
