import { AllowedDenom } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/state';

import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';

type GetOtherSellOrderBatchDenomOptionsProps = {
  credits: BatchInfoWithBalance[];
  sellOrderCreateOpen: number;
};

export const getOtherSellOrderBatchDenomOptions = ({
  credits,
  sellOrderCreateOpen,
}: GetOtherSellOrderBatchDenomOptionsProps): {
  label: string;
  value: string;
}[] =>
  credits
    .filter(credit => credit.denom !== credits[sellOrderCreateOpen].denom)
    .map(credit => ({
      label: credit.denom,
      value: credit.denom,
    }));

type getAvailableAmountByBatchProps = {
  credits: BatchInfoWithBalance[];
};

export const getAvailableAmountByBatch = ({
  credits,
}: getAvailableAmountByBatchProps): {
  [key: string]: number;
} =>
  credits.reduce(
    (acc, credit) => ({
      ...acc,
      [credit.denom]: Number(credit.balance?.tradableAmount),
    }),
    {} as { [key: string]: number },
  );

type GetDenomAllowedOptionsParams = {
  allowedDenoms?: AllowedDenom[];
};

export const getDenomAllowedOptions = ({
  allowedDenoms,
}: GetDenomAllowedOptionsParams): Option[] => {
  const allowedDenomsOptions: Option[] =
    allowedDenoms?.map(denom => ({
      label: denom.displayDenom.toUpperCase(),
      value: denom.bankDenom,
    })) ?? [];
  allowedDenomsOptions.unshift({
    label: 'Choose denom',
    value: '',
    disabled: true,
    selected: true,
  });

  return allowedDenomsOptions;
};
