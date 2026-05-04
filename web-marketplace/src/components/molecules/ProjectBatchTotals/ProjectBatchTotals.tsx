import { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { getCreditsTooltip } from 'legacy-pages/Projects/AllProjects/utils/getCreditsTooltip';
import { getIsSoldOut } from 'legacy-pages/Projects/AllProjects/utils/getIsSoldOut';

import CreditsIssuedIcon from 'web-components/src/components/icons/CreditsIssued';
import CreditsTradeableAltIcon from 'web-components/src/components/icons/CreditsTradeableAlt';
import { LabeledValue } from 'web-components/src/components/text-layouts';
import { cn } from 'web-components/src/utils/styles/cn';

import { IS_TERRASOS } from 'lib/env';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import type { BatchTotalsForProject } from '../../../types/ledger/ecocredit';
import {
  BufferPoolCreditsValue,
  ForSaleCreditsValue,
  IssuedCreditsValue,
  RetiredCreditsValue,
  TradableCreditsValue,
} from './BatchTotals.items';
import {
  ESCROWED_CREDITS_TOOLTIP,
  formatNumberOptions,
  REGISTERED_CREDITS_TOOLTIP,
  SOLD_OUT,
  TRADEABLE_CREDITS_TOOLTIP,
} from './ProjectBatchTotals.constants';

export type ProjectBatchTotalsProps = {
  totals: BatchTotalsForProject & { registeredAmount?: number };
  projectWithOrderData?: NormalizeProject;
  soldOutProjectsIds: string[];
  className?: string;
  isTerrasosProjectPage: boolean;
  complianceCredits?: boolean;
};

export function ProjectBatchTotals({
  totals,
  projectWithOrderData,
  soldOutProjectsIds,
  className,
  isTerrasosProjectPage,
  complianceCredits,
}: ProjectBatchTotalsProps): JSX.Element {
  const { _ } = useLingui();
  const isSoldOut = useMemo(
    () =>
      getIsSoldOut({
        project: projectWithOrderData,
        soldOutProjectsIds,
      }),
    [projectWithOrderData, soldOutProjectsIds],
  );
  const hasSoldOutProject = soldOutProjectsIds.length > 0;
  const hasAvailableCredits = totals.tradableAmount > 0;
  const terrasosIsSoldOut = hasSoldOutProject
    ? isSoldOut
    : !hasAvailableCredits;
  const tooltipIsSoldOut = isTerrasosProjectPage
    ? terrasosIsSoldOut
    : isSoldOut;

  // eslint-disable-next-line lingui/no-unlocalized-strings
  const tooltipClassName = IS_TERRASOS ? 'w-[17px] h-[17px]' : '';
  const creditsTooltip = getCreditsTooltip({
    isSoldOut: tooltipIsSoldOut,
    project: projectWithOrderData,
    _,
  });

  return (
    <div
      className={cn(
        `grid grid-cols-1 ${
          complianceCredits ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
        } gap-20 max-w-[650px]`,
        className,
      )}
    >
      {complianceCredits ? (
        <LabeledValue
          label={_(REGISTERED_CREDITS_TOOLTIP)}
          tooltipLabel={_(REGISTERED_CREDITS_TOOLTIP)}
          number={totals.registeredAmount}
          formatNumberOptions={formatNumberOptions}
          icon={<CreditsIssuedIcon />}
          tooltipClassName={tooltipClassName}
        />
      ) : (
        <IssuedCreditsValue
          number={
            totals.tradableAmount +
            totals.retiredAmount +
            totals.bufferPoolAmount
          }
          tooltipClassName={tooltipClassName}
        />
      )}
      {!complianceCredits && (
        <ForSaleCreditsValue
          tooltipNumber={creditsTooltip}
          number={isSoldOut ? undefined : totals.forSaleAmount}
          badgeLabel={isSoldOut ? _(SOLD_OUT) : undefined}
          tooltipClassName={tooltipClassName}
        />
      )}
      {IS_TERRASOS ? (
        <LabeledValue
          label={_(msg`Credits Available`)}
          tooltipLabel={
            complianceCredits
              ? _(TRADEABLE_CREDITS_TOOLTIP)
              : `${_(TRADEABLE_CREDITS_TOOLTIP)} ${_(ESCROWED_CREDITS_TOOLTIP)}`
          }
          tooltipNumber={!complianceCredits ? creditsTooltip : undefined}
          number={totals.tradableAmount}
          formatNumberOptions={formatNumberOptions}
          icon={<CreditsTradeableAltIcon />}
          tooltipClassName={tooltipClassName}
        />
      ) : (
        <TradableCreditsValue
          tooltipLabel={
            complianceCredits
              ? _(TRADEABLE_CREDITS_TOOLTIP)
              : `${_(TRADEABLE_CREDITS_TOOLTIP)} ${_(ESCROWED_CREDITS_TOOLTIP)}`
          }
          tooltipNumber={!complianceCredits ? creditsTooltip : undefined}
          number={totals.tradableAmount}
          tooltipClassName={tooltipClassName}
        />
      )}
      {totals.bufferPoolAmount > 0 && (
        <BufferPoolCreditsValue
          number={totals.bufferPoolAmount}
          tooltipClassName={tooltipClassName}
        />
      )}
      <RetiredCreditsValue
        number={totals.retiredAmount}
        tooltipClassName={tooltipClassName}
      />
    </div>
  );
}
