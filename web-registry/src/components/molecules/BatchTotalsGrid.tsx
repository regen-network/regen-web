import React from 'react';
import { Grid, SxProps, Theme } from '@mui/material';

import { LabeledNumber } from 'web-components/lib/components/text-layouts';

import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';

const formatNumberOptions = {
  maximumFractionDigits: 2,
};

export const BatchTotalsGrid: React.FC<
  React.PropsWithChildren<{
    batch: BatchInfoWithSupply;
    sx?: SxProps<Theme>;
  }>
> = ({ batch, sx }) => (
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
          +batch.tradableAmount + +batch.retiredAmount + +batch.cancelledAmount
        }
      />
    </GridItem>
    <GridItem>
      <LabeledNumber
        label="Credits Tradable"
        number={batch.tradableAmount}
        formatNumberOptions={formatNumberOptions}
      />
    </GridItem>
    <GridItem>
      <LabeledNumber
        label="Credits Retired"
        number={batch.retiredAmount}
        formatNumberOptions={formatNumberOptions}
      />
    </GridItem>
    <GridItem>
      <LabeledNumber
        label="Credits Cancelled"
        number={batch.cancelledAmount}
        formatNumberOptions={formatNumberOptions}
      />
    </GridItem>
  </Grid>
);

const GridItem: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Grid item xs={12} sm={5}>
    {children}
  </Grid>
);
