import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { quantityFormatNumberOptions } from 'config/decimals';

import CreditsIssuedIcon from 'web-components/src/components/icons/CreditsIssued';
import CreditsRetiredIcon from 'web-components/src/components/icons/CreditsRetired';
import CreditsTradeableIcon from 'web-components/src/components/icons/CreditsTradeable';
import CreditsTradeableAltIcon from 'web-components/src/components/icons/CreditsTradeableAlt';
import { LabeledValue } from 'web-components/src/components/text-layouts';
import { cn } from 'web-components/src/utils/styles/cn';

import { IS_TERRASOS } from 'lib/env';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { getCreditsTooltip } from 'pages/Projects/AllProjects/utils/getCreditsTooltip';
import { getIsSoldOut } from 'pages/Projects/AllProjects/utils/getIsSoldOut';

import type { BatchTotalsForProject } from '../../../types/ledger/ecocredit';
import {
  FOR_SALE_CREDITS_TOOLTIP,
  ISSUED_CREDITS_TOOLTIP,
  MAX_FRACTION_DIGITS_PROJECT_CREDITS,
  REGISTERED_CREDITS_TOOLTIP,
  RETIRED_CREDITS_TOOLTIP,
  SOLD_OUT,
  TRADEABLE_CREDITS_TOOLTIP,
} from './ProjectBatchTotals.constants';

export type ProjectBatchTotalsProps = {
  totals: BatchTotalsForProject & { registeredAmount?: number };
  projectWithOrderData?: NormalizeProject;
  soldOutProjectsIds: string[];
  className?: string;
};

export function ProjectBatchTotals({
  totals,
  projectWithOrderData,
  soldOutProjectsIds,
  className,
}: ProjectBatchTotalsProps): JSX.Element {
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
    <div
      className={cn(
        `grid grid-cols-1 ${
          isComplianceProject ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
        } gap-20 max-w-[650px]`,
        className,
      )}
    >
      <div className="">
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
              : totals.tradableAmount +
                totals.retiredAmount +
                totals.forSaleAmount
          }
          formatNumberOptions={{
            ...quantityFormatNumberOptions,
            maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
          }}
          icon={<CreditsIssuedIcon />}
          tooltipClassName={tooltipClassName}
        />
      </div>
      {!isComplianceProject && (
        <div>
          <LabeledValue
            label={_(msg`For sale`)}
            tooltipLabel={_(FOR_SALE_CREDITS_TOOLTIP)}
            tooltipNumber={getCreditsTooltip({
              isSoldOut: IS_TERRASOS ? terrasosIsSoldOut : isSoldOut,
              project: projectWithOrderData,
              _,
            })}
            number={isSoldOut ? undefined : totals.forSaleAmount}
            badgeLabel={isSoldOut ? _(SOLD_OUT) : undefined}
            formatNumberOptions={{
              ...quantityFormatNumberOptions,
              maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
            }}
            icon={<CreditsIssuedIcon />}
            tooltipClassName={tooltipClassName}
          />
        </div>
      )}
      <div>
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
          number={totals.tradableAmount}
          formatNumberOptions={{
            ...quantityFormatNumberOptions,
            maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
          }}
          icon={
            IS_TERRASOS ? <CreditsTradeableAltIcon /> : <CreditsTradeableIcon />
          }
          tooltipClassName={tooltipClassName}
        />
      </div>
      <div>
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
      </div>
    </div>
  );
}
