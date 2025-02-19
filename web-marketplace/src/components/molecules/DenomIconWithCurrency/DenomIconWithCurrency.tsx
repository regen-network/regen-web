import { DenomIcon } from 'web-marketplace/src/components/molecules/DenomIcon/DenomIcon';

import QuestionMarkTooltip from 'web-components/src/components/tooltip/QuestionMarkTooltip';
import { Body } from 'web-components/src/components/typography/Body';
import { cn } from 'web-components/src/utils/styles/cn';

export function DenomIconWithCurrency({
  baseDenom,
  bankDenom,
  displayDenom,
  className,
  tooltipText,
}: {
  baseDenom: string | undefined;
  bankDenom: string | undefined;
  displayDenom: string;
  className?: string;
  tooltipText?: string;
}) {
  return baseDenom ? (
    <Body size="sm" className={cn('flex gap-5', className)}>
      <DenomIcon
        baseDenom={baseDenom}
        bankDenom={bankDenom}
        className="h-[24px] inline-block denom-icon"
      />
      <span className="pb-5 pt-3 text-sm">{displayDenom}</span>
      {tooltipText && (
        <QuestionMarkTooltip
          placement="bottom"
          title={tooltipText}
          className="mt-[4px]"
        />
      )}
    </Body>
  ) : null;
}
