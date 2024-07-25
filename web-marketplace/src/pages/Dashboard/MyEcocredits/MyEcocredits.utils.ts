import { msg } from '@lingui/macro';
import { AllowedDenom } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/state';
import { BatchBalanceInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { Option } from 'web-components/src/components/inputs/SelectTextField';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { TranslatorType } from 'lib/i18n/i18n.types';

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
    .filter(
      credit =>
        credit.denom !== credits[sellOrderCreateOpen].denom &&
        Number(credit.balance?.tradableAmount) > 0,
    )
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
  _: TranslatorType;
};

export const getDenomAllowedOptions = ({
  allowedDenoms,
  _,
}: GetDenomAllowedOptionsParams): Option[] => {
  const allowedDenomsOptions: Option[] =
    allowedDenoms?.map(denom => ({
      label: denom.displayDenom,
      value: denom.bankDenom,
    })) ?? [];
  allowedDenomsOptions.unshift({
    label: _(msg`Choose denom`),
    value: '',
    disabled: true,
    selected: true,
  });

  return allowedDenomsOptions;
};

export const isOfCreditClass =
  (creditClassId?: string) =>
  (balance: BatchBalanceInfo): boolean => {
    if (!creditClassId) return true;
    return balance.batchDenom.startsWith(`${creditClassId}-`);
  };

/* Extract data from batch denom id */

export const getDataFromBatchDenomId = (batchDenomId?: string) => {
  const regex = /^([A-Z]+\d+(?:-\d+)?)-(\d{8})-(\d{8})/;
  const [, projectId, startDate, endDate] = batchDenomId?.match(regex) ?? [];
  return {
    classId: projectId?.split('-')[0],
    projectId: projectId,
    batchStartDate: startDate,
    batchEndDate: endDate,
  };
};
