import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Grid, SxProps, Theme } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import CreditsIssuedIcon from 'web-components/src/components/icons/CreditsIssued';
import CreditsRetiredIcon from 'web-components/src/components/icons/CreditsRetired';
import CreditsTradeableIcon from 'web-components/src/components/icons/CreditsTradeable';
import { LabeledValue } from 'web-components/src/components/text-layouts';

import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import { getCreditsTooltip } from 'pages/Projects/AllProjects/utils/getCreditsTooltip';
import { getIsSoldOut } from 'pages/Projects/AllProjects/utils/getIsSoldOut';

import type { BatchTotalsForProject } from '../../../types/ledger/ecocredit';
import {
  ISSUED_CREDITS_TOOLTIP,
  MAX_FRACTION_DIGITS_PROJECT_CREDITS,
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
  const { _ } = useLingui();
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
          maxWidth: 650,
          flexDirection: { xs: 'column', sm: 'row' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <GridItem>
        <LabeledValue
          label={_(msg`Credits issued`)}
          tooltipLabel={ISSUED_CREDITS_TOOLTIP}
          number={totals.tradableAmount + totals.retiredAmount}
          formatNumberOptions={{
            ...quantityFormatNumberOptions,
            maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
          }}
          icon={<CreditsIssuedIcon />}
        />
      </GridItem>
      <GridItem>
        <LabeledValue
          label={_(msg`Credits Tradable`)}
          tooltipLabel={TRADEABLE_CREDITS_TOOLTIP}
          tooltipNumber={getCreditsTooltip({
            isSoldOut,
            project: projectWithOrderData,
            _,
          })}
          number={isSoldOut ? undefined : totals.tradableAmount}
          badgeLabel={isSoldOut ? SOLD_OUT : undefined}
          formatNumberOptions={{
            ...quantityFormatNumberOptions,
            maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
          }}
          icon={<CreditsTradeableIcon />}
        />
      </GridItem>
      <GridItem>
        <LabeledValue
          label={_(msg`Credits Retired`)}
          tooltipLabel={RETIRED_CREDITS_TOOLTIP}
          number={totals.retiredAmount}
          formatNumberOptions={{
            ...quantityFormatNumberOptions,
            maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
          }}
          icon={<CreditsRetiredIcon />}
        />
      </GridItem>
    </Grid>
  );
}
