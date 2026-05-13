import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import BufferPoolCreditsIcon from 'web-components/src/components/icons/BufferPoolCredits';
import CreditsForSaleIcon from 'web-components/src/components/icons/CreditsForSale';
import CreditsIssuedIcon from 'web-components/src/components/icons/CreditsIssued';
import CreditsRetiredIcon from 'web-components/src/components/icons/CreditsRetired';
import CreditsTradeableIcon from 'web-components/src/components/icons/CreditsTradeable';
import { LabeledValue } from 'web-components/src/components/text-layouts';

import {
  BUFFER_POOL_CREDITS_TOOLTIP,
  FOR_SALE_CREDITS_TOOLTIP,
  formatNumberOptions,
  ISSUED_CREDITS_TOOLTIP,
  RETIRED_CREDITS_TOOLTIP,
  TRADEABLE_CREDITS_TOOLTIP,
} from './ProjectBatchTotals.constants';

type BaseProps = {
  number?: number;
  tooltipClassName?: string;
};

type IssuedProps = BaseProps & {
  tooltipLabel?: string;
};

export function IssuedCreditsValue({
  number,
  tooltipLabel,
  tooltipClassName,
}: IssuedProps) {
  const { _ } = useLingui();
  return (
    <LabeledValue
      label={_(msg`Issued`)}
      tooltipLabel={tooltipLabel ?? _(ISSUED_CREDITS_TOOLTIP)}
      number={number}
      formatNumberOptions={formatNumberOptions}
      icon={<CreditsIssuedIcon />}
      tooltipClassName={tooltipClassName}
    />
  );
}

type ForSaleProps = BaseProps & {
  tooltipNumber?: string;
  badgeLabel?: string;
};

export function ForSaleCreditsValue({
  number,
  tooltipNumber,
  badgeLabel,
  tooltipClassName,
}: ForSaleProps) {
  const { _ } = useLingui();
  return (
    <LabeledValue
      label={_(msg`For sale`)}
      tooltipLabel={_(FOR_SALE_CREDITS_TOOLTIP)}
      tooltipNumber={tooltipNumber}
      number={number}
      badgeLabel={badgeLabel}
      formatNumberOptions={formatNumberOptions}
      icon={<CreditsForSaleIcon />}
      tooltipClassName={tooltipClassName}
    />
  );
}

type TradableProps = BaseProps & {
  tooltipLabel?: string;
  tooltipNumber?: string;
};

export function TradableCreditsValue({
  number,
  tooltipLabel,
  tooltipNumber,
  tooltipClassName,
}: TradableProps) {
  const { _ } = useLingui();
  return (
    <LabeledValue
      label={_(msg`Tradable`)}
      tooltipLabel={tooltipLabel ?? _(TRADEABLE_CREDITS_TOOLTIP)}
      tooltipNumber={tooltipNumber}
      number={number}
      formatNumberOptions={formatNumberOptions}
      icon={<CreditsTradeableIcon />}
      tooltipClassName={tooltipClassName}
    />
  );
}

export function BufferPoolCreditsValue({
  number,
  tooltipClassName,
}: BaseProps) {
  const { _ } = useLingui();
  return (
    <LabeledValue
      label={_(msg`Buffer Pool`)}
      tooltipLabel={_(BUFFER_POOL_CREDITS_TOOLTIP)}
      number={number}
      formatNumberOptions={formatNumberOptions}
      icon={<BufferPoolCreditsIcon />}
      tooltipClassName={tooltipClassName}
    />
  );
}

export function RetiredCreditsValue({ number, tooltipClassName }: BaseProps) {
  const { _ } = useLingui();
  return (
    <LabeledValue
      label={_(msg`Retired`)}
      tooltipLabel={_(RETIRED_CREDITS_TOOLTIP)}
      number={number}
      formatNumberOptions={formatNumberOptions}
      icon={<CreditsRetiredIcon />}
      tooltipClassName={tooltipClassName}
    />
  );
}
