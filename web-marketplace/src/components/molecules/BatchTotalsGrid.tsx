import React from 'react';
import { msg, useLingui } from '@lingui/react';
import { Grid, SxProps, Theme } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import { LabeledValue } from 'web-components/src/components/text-layouts';

import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';

export const BatchTotalsGrid: React.FC<
  React.PropsWithChildren<{
    batch: BatchInfoWithSupply;
    sx?: SxProps<Theme>;
  }>
> = ({ batch, sx }) => {
  const { _ } = useLingui();

  return (
    <Grid
      container
      rowGap={6}
      columnGap={2}
      sx={{ justifyContent: 'space-between', ...sx }}
    >
      <GridItem>
        <LabeledValue
          label={_(msg`Total Credits Issued`)}
          number={
            +batch.tradableAmount +
            +batch.retiredAmount +
            +batch.cancelledAmount
          }
          formatNumberOptions={quantityFormatNumberOptions}
        />
      </GridItem>
      <GridItem>
        <LabeledValue
          label={_(msg`Credits Tradable`)}
          number={batch.tradableAmount}
          formatNumberOptions={quantityFormatNumberOptions}
        />
      </GridItem>
      <GridItem>
        <LabeledValue
          label={_(msg`Credits Retired`)}
          number={batch.retiredAmount}
          formatNumberOptions={quantityFormatNumberOptions}
        />
      </GridItem>
      <GridItem>
        <LabeledValue
          label={_(msg`Credits Cancelled`)}
          number={batch.cancelledAmount}
          formatNumberOptions={quantityFormatNumberOptions}
        />
      </GridItem>
    </Grid>
  );
};

const GridItem: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Grid item xs={12} sm={5}>
    {children}
  </Grid>
);
