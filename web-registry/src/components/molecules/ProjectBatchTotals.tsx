import React from 'react';
import { Grid, SxProps, Theme } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import { LabeledNumber } from 'web-components/lib/components/text-layouts';

import type { BatchTotalsForProject } from '../../types/ledger/ecocredit';

const GridItem: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Grid item xs={5} sm={3}>
    {children}
  </Grid>
);

export function ProjectBatchTotals({
  totals,
  sx = [],
}: {
  totals: BatchTotalsForProject;
  sx?: SxProps<Theme>;
}): JSX.Element {
  return (
    <Grid
      container
      rowGap={8}
      columnGap={2}
      sx={[
        {
          justifyContent: 'space-between',
          alignItems: 'stretch',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <GridItem>
        <LabeledNumber
          label="Credits Tradable"
          number={totals.tradableAmount}
          formatNumberOptions={quantityFormatNumberOptions}
        />
      </GridItem>
      <GridItem>
        <LabeledNumber
          label="Credits Retired"
          number={totals.retiredAmount}
          formatNumberOptions={quantityFormatNumberOptions}
        />
      </GridItem>
      <GridItem>
        <LabeledNumber
          label="Credits Cancelled"
          number={totals.cancelledAmount}
          formatNumberOptions={quantityFormatNumberOptions}
        />
      </GridItem>
    </Grid>
  );
}
