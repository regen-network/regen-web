import React from 'react';
import { Grid, SxProps, Theme } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import CreditsIssuedIcon from 'web-components/lib/components/icons/CreditsIssued';
import CreditsRetiredIcon from 'web-components/lib/components/icons/CreditsRetired';
import CreditsTradeableIcon from 'web-components/lib/components/icons/CreditsTradeable';
import { LabeledNumber } from 'web-components/lib/components/text-layouts';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { getCreditsTooltip } from 'pages/Projects/utils/getCreditsTooltip';
import { getIsSoldOut } from 'pages/Projects/utils/getIsSoldOut';

import type { BatchTotalsForProject } from '../../../types/ledger/ecocredit';
import {
  ISSUED_CREDITS_TOOLTIP,
  RETIRED_CREDITS_TOOLTIP,
  SOLD_OUT,
  TRADEABLE_CREDITS_TOOLTIP,
} from './ProjectBatchTotals.constants';

const GridItem: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Grid item xs={5} xl={3}>
    {children}
  </Grid>
);

export function ProjectBatchTotals({
  totals,
  projectWithOrderData,
  soldOutProjectsIds,
  sx = [],
}: {
  totals: BatchTotalsForProject;
  projectWithOrderData?: ProjectWithOrderData;
  soldOutProjectsIds: string[];
  sx?: SxProps<Theme>;
}): JSX.Element {
  const isSoldOut = getIsSoldOut({
    project: projectWithOrderData,
    soldOutProjectsIds,
  });
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
          label="Credits issued"
          tooltipLabel={ISSUED_CREDITS_TOOLTIP}
          number={totals.tradableAmount + totals.retiredAmount}
          formatNumberOptions={quantityFormatNumberOptions}
          icon={<CreditsIssuedIcon />}
        />
      </GridItem>
      <GridItem>
        <LabeledNumber
          label="Credits Tradable"
          tooltipLabel={TRADEABLE_CREDITS_TOOLTIP}
          tooltipNumber={getCreditsTooltip({
            isSoldOut,
            project: projectWithOrderData,
          })}
          number={isSoldOut ? undefined : totals.tradableAmount}
          badgeLabel={isSoldOut ? SOLD_OUT : undefined}
          formatNumberOptions={quantityFormatNumberOptions}
          icon={<CreditsTradeableIcon />}
        />
      </GridItem>
      <GridItem>
        <LabeledNumber
          label="Credits Retired"
          tooltipLabel={RETIRED_CREDITS_TOOLTIP}
          number={totals.retiredAmount}
          formatNumberOptions={quantityFormatNumberOptions}
          icon={<CreditsRetiredIcon />}
        />
      </GridItem>
    </Grid>
  );
}
