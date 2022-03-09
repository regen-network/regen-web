import React from 'react';
import { Grid, SxProps, Theme } from '@mui/material';
import { LabeledNumber } from 'web-components/lib/components/text-layouts';

import type { BatchTotalsForProject } from '../../types/ledger/ecocredit';

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
      rowGap={4}
      sx={[
        {
          justifyContent: 'space-between',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Grid item xs={6} sm={4}>
        <LabeledNumber
          label="Credits Tradable"
          number={totals.tradable_supply}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <LabeledNumber label="Credits Retired" number={totals.retired_supply} />
      </Grid>
      <Grid item xs={6} sm={4}>
        <LabeledNumber
          label="Credits Cancelled"
          number={totals.amount_cancelled}
        />
      </Grid>
    </Grid>
  );
}
