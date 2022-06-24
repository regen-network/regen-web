import React from 'react';
import { Box } from '@mui/material';

export const SELL_ORDERS_ROW = [
  <Box sx={{ width: '64px', whiteSpace: 'normal' }}>{'SELL ORDER ID'}</Box>, // ok
  <Box sx={{ width: '70px', whiteSpace: 'normal' }}>{'EXPIRY DATE'}</Box>, // ok
  'PROJECT', // fatch batch + metadata batch + useProjectsByMetadataQuery
  <Box sx={{ width: '86px', whiteSpace: 'normal' }}>
    {'ASK PRICE PER CREDIT'}
  </Box>,
  <Box sx={{ width: '70px', whiteSpace: 'normal' }}>{'AMOUNT AVAILABLE'}</Box>, // ok
  <Box sx={{ width: '70px', whiteSpace: 'normal' }}>{'CREDIT CLASS'}</Box>, // fetch batch
  <Box sx={{ width: '74px', whiteSpace: 'normal' }}>{'BATCH DENOM'}</Box>, // ok
  <Box sx={{ width: '84px', whiteSpace: 'normal' }}>{'BATCH START DATE'}</Box>, // fetch batch
  <Box sx={{ width: '72px', whiteSpace: 'normal' }}>{'BATCH END DATE'}</Box>, // fetch batch
  'SELLER', // ok
];
