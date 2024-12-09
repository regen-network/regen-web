import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Grid, SxProps, Theme } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import CreditsIssuedIcon from 'web-components/src/components/icons/CreditsIssued';
import CreditsRetiredIcon from 'web-components/src/components/icons/CreditsRetired';
import CreditsTradeableIcon from 'web-components/src/components/icons/CreditsTradeable';
import CreditsTradeableAltIcon from 'web-components/src/components/icons/CreditsTradeableAlt';
import { LabeledValue } from 'web-components/src/components/text-layouts';

import { IS_TERRASOS } from 'lib/env';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { getCreditsTooltip } from 'pages/Projects/AllProjects/utils/getCreditsTooltip';
import { getIsSoldOut } from 'pages/Projects/AllProjects/utils/getIsSoldOut';

import type { BatchTotalsForProject } from '../../../types/ledger/ecocredit';
import {
  ISSUED_CREDITS_TOOLTIP,
  MAX_FRACTION_DIGITS_PROJECT_CREDITS,
  REGISTERED_CREDITS_TOOLTIP,
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
  className,
}: {
  totals: BatchTotalsForProject & { registeredAmount?: number };
  projectWithOrderData?: NormalizeProject;
  soldOutProjectsIds: string[];
  sx?: SxProps<Theme>;
  className?: string;
}): JSX.Element {
  const { _ } = useLingui();
  const isSoldOut = getIsSoldOut({
    project: projectWithOrderData,
    soldOutProjectsIds,
  });
  const hasSoldOutProject = soldOutProjectsIds.length > 0;
  const hasAvailableCredits = totals.tradableAmount > 0;
  const isComplianceProject = !hasSoldOutProject && IS_TERRASOS;
  const terrasosIsSoldOut = hasSoldOutProject
    ? isSoldOut
    : !hasAvailableCredits;

  const tooltipClassName = IS_TERRASOS ? 'w-[17px] h-[17px]' : '';
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
      className={className}
    >
      <GridItem>
        <LabeledValue
          label={
            isComplianceProject
              ? _(msg`Credits Registered`)
              : _(msg`Credits issued`)
          }
          tooltipLabel={
            isComplianceProject
              ? _(REGISTERED_CREDITS_TOOLTIP)
              : _(ISSUED_CREDITS_TOOLTIP)
          }
          number={
            isComplianceProject
              ? totals.registeredAmount
              : totals.tradableAmount + totals.retiredAmount
          }
          formatNumberOptions={{
            ...quantityFormatNumberOptions,
            maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
          }}
          icon={<CreditsIssuedIcon />}
          tooltipClassName={tooltipClassName}
        />
      </GridItem>
      <GridItem>
        <LabeledValue
          label={
            IS_TERRASOS ? _(msg`Credits Available`) : _(msg`Credits Tradable`)
          }
          tooltipLabel={_(TRADEABLE_CREDITS_TOOLTIP)}
          tooltipNumber={getCreditsTooltip({
            isSoldOut: IS_TERRASOS ? terrasosIsSoldOut : isSoldOut,
            project: projectWithOrderData,
            _,
          })}
          number={isSoldOut ? undefined : totals.tradableAmount}
          badgeLabel={isSoldOut ? _(SOLD_OUT) : undefined}
          formatNumberOptions={{
            ...quantityFormatNumberOptions,
            maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
          }}
          icon={
            IS_TERRASOS ? <CreditsTradeableAltIcon /> : <CreditsTradeableIcon />
          }
          tooltipClassName={tooltipClassName}
        />
      </GridItem>
      <GridItem>
        <LabeledValue
          label={_(msg`Credits Retired`)}
          tooltipLabel={_(RETIRED_CREDITS_TOOLTIP)}
          number={totals.retiredAmount}
          formatNumberOptions={{
            ...quantityFormatNumberOptions,
            maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
          }}
          icon={<CreditsRetiredIcon />}
          tooltipClassName={tooltipClassName}
        />
      </GridItem>
    </Grid>
  );
}
