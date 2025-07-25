import { useMemo } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

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
  ESCROWED_CREDITS_TOOLTIP,
  FOR_SALE_CREDITS_TOOLTIP,
  formatNumberOptions,
  ISSUED_CREDITS_TOOLTIP,
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
  return (
    <div
      className={cn(
        `grid grid-cols-1 ${
          complianceCredits ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
        } gap-20 max-w-[650px]`,
        className,
      )}
    >
      <LabeledValue
        label={complianceCredits ? _(msg`Credits Registered`) : _(msg`Issued`)}
        tooltipLabel={
          complianceCredits
            ? _(REGISTERED_CREDITS_TOOLTIP)
            : _(ISSUED_CREDITS_TOOLTIP)
        }
        number={
          complianceCredits
            ? totals.registeredAmount
            : totals.tradableAmount + totals.retiredAmount
        }
        formatNumberOptions={formatNumberOptions}
        icon={<CreditsIssuedIcon />}
        tooltipClassName={tooltipClassName}
      />
      {!complianceCredits && (
        <LabeledValue
          label={_(msg`For sale`)}
          tooltipLabel={_(FOR_SALE_CREDITS_TOOLTIP)}
          tooltipNumber={getCreditsTooltip({
            isSoldOut: tooltipIsSoldOut,
            project: projectWithOrderData,
            _,
          })}
          number={isSoldOut ? undefined : totals.forSaleAmount}
          badgeLabel={isSoldOut ? _(SOLD_OUT) : undefined}
          formatNumberOptions={formatNumberOptions}
          icon={<CreditsIssuedIcon />}
          tooltipClassName={tooltipClassName}
        />
      )}
      <LabeledValue
        label={IS_TERRASOS ? _(msg`Credits Available`) : _(msg`Tradable`)}
        tooltipLabel={
          complianceCredits
            ? _(TRADEABLE_CREDITS_TOOLTIP)
            : `${_(TRADEABLE_CREDITS_TOOLTIP)} ${_(ESCROWED_CREDITS_TOOLTIP)}`
        }
        tooltipNumber={
          !complianceCredits
            ? getCreditsTooltip({
                isSoldOut: tooltipIsSoldOut,
                project: projectWithOrderData,
                _,
              })
            : undefined
        }
        number={totals.tradableAmount}
        formatNumberOptions={formatNumberOptions}
        icon={
          IS_TERRASOS ? <CreditsTradeableAltIcon /> : <CreditsTradeableIcon />
        }
        tooltipClassName={tooltipClassName}
      />
      <LabeledValue
        label={_(msg`Retired`)}
        tooltipLabel={_(RETIRED_CREDITS_TOOLTIP)}
        number={totals.retiredAmount}
        formatNumberOptions={formatNumberOptions}
        icon={<CreditsRetiredIcon />}
        tooltipClassName={tooltipClassName}
      />
    </div>
  );
}
