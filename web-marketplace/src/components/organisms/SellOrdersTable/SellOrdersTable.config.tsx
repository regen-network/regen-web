import { Box } from '@mui/material';
import { ELLIPSIS_COLUMN_WIDTH } from 'styles/table';

import QuestionIconOutlined from 'web-components/src/components/icons/QuestionIconOutlined';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  PURCHASE_OPTION_TOOLTIP,
  SELL_ORDERS_MAPPING,
} from './SellOrdersTable.constants';
import { SELL_ORDERS_HEADERS } from './SellOrdersTable.types';

export const getSellOrdersRow = (_: TranslatorType) => [
  <Box sx={{ width: '64px', whiteSpace: 'normal' }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.ID].name)}
  </Box>,
  <Box sx={{ width: ELLIPSIS_COLUMN_WIDTH }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.PROJECT].name)}
  </Box>,
  <Box sx={{ width: '86px', whiteSpace: 'normal' }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.PRICE].name)}
  </Box>,
  <Box sx={{ width: '86px', whiteSpace: 'normal' }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.CURRENCY_DENOM].name)}
  </Box>,
  <Box sx={{ width: '70px', whiteSpace: 'normal' }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.AMOUNT].name)}
  </Box>,
  <Box sx={{ width: '70px', whiteSpace: 'normal' }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.CREDIT_CLASS].name)}
  </Box>,
  <Box sx={{ width: '74px', whiteSpace: 'normal' }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.BATCH_DENOM].name)}
  </Box>,
  <Box
    sx={{
      display: 'flex',
      width: '74px',
      whiteSpace: 'normal',
    }}
  >
    <Box sx={{ mr: 1 }}>
      {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.PURCHASE_OPTIONS].name)}
    </Box>
    <InfoTooltip title={_(PURCHASE_OPTION_TOOLTIP)} arrow placement="top">
      <Box sx={{ display: 'flex', alignItems: 'bottom' }}>
        <QuestionIconOutlined sx={{ color: 'secondary.main' }} />
      </Box>
    </InfoTooltip>
  </Box>,
  <Box sx={{ width: '84px', whiteSpace: 'normal' }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.BATCH_START_DATE].name)}
  </Box>,
  <Box sx={{ width: '72px', whiteSpace: 'normal' }}>
    {_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.BATCH_END_DATE].name)}
  </Box>,
  <Box>{_(SELL_ORDERS_MAPPING[SELL_ORDERS_HEADERS.SELLER].name)}</Box>,
];
