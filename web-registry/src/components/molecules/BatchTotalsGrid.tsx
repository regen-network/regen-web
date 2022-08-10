import React from 'react';
import { Grid, SxProps, Theme } from '@mui/material';

import { LabeledNumber } from 'web-components/lib/components/text-layouts';

import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';

export const BatchTotalsGrid: React.FC<{
  batch: BatchInfoWithSupply;
  sx?: SxProps<Theme>;
}> = ({ batch, sx }) => (
  <Grid
    container
    rowGap={6}
    columnGap={2}
    sx={{ justifyContent: 'space-between', ...sx }}
  >
    <GridItem>
      <LabeledNumber
        label="Total Credits Issued"
        number={
          +batch.tradableSupply + +batch.retiredSupply + +batch.cancelledAmount
        }
      />
    </GridItem>
    <GridItem>
      <LabeledNumber label="Credits Tradable" number={batch.tradableSupply} />
    </GridItem>
    <GridItem>
      <LabeledNumber label="Credits Retired" number={batch.retiredSupply} />
    </GridItem>
    <GridItem>
      <LabeledNumber label="Credits Cancelled" number={batch.cancelledAmount} />
    </GridItem>
  </Grid>
);

const GridItem: React.FC = ({ children }) => (
  <Grid item xs={12} sm={5}>
    {children}
  </Grid>
);
