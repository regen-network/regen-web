import { msg } from '@lingui/macro';
import { AllowedDenom } from '@regen-network/api/regen/ecocredit/marketplace/v1/state';
import { BatchBalanceInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import {
  GRAVITY_USDC_DENOM,
  UPPERCASE_DENOM,
  USD_DENOM,
} from 'config/allowedBaseDenoms';

import { Option } from 'web-components/src/components/inputs/SelectTextField';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { DenomTraceWithHash } from 'lib/ibc/transfer/api';

import { DenomIconWithCurrency } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency';

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
  credits
    .filter(credit => credit.denom)
    .reduce(
      (acc, credit) => ({
        ...acc,
        [credit.denom]: Number(credit.balance?.tradableAmount),
      }),
      {} as { [key: string]: number },
    );

type GetDenomAllowedOptionsParams = {
  allowedDenoms?: AllowedDenom[];
  _: TranslatorType;
  canCreateFiatOrder?: boolean;
  denomTracesData?: DenomTraceWithHash[] | void;
};

export const getDenomAllowedOptions = ({
  allowedDenoms,
  _,
  canCreateFiatOrder,
  denomTracesData,
}: GetDenomAllowedOptionsParams): Option[] => {
  const allowedDenomsOptions =
    (allowedDenoms
      ?.map(denom => {
        const denomTrace = denomTracesData?.find(denomTrace =>
          denom?.bankDenom?.includes(denomTrace.hash),
        );
        const baseDenom =
          (denomTrace ? denomTrace.baseDenom : denom?.bankDenom) ?? '';

        // Do not display USDC.grv
        if (baseDenom === GRAVITY_USDC_DENOM) return null;

        return {
          label: (
            <DenomIconWithCurrency
              baseDenom={baseDenom}
              bankDenom={denom.bankDenom}
              displayDenom={
                UPPERCASE_DENOM.includes(denom.bankDenom)
                  ? denom.displayDenom.toUpperCase()
                  : denom.displayDenom
              }
              // eslint-disable-next-line lingui/no-unlocalized-strings
              textClassName="text-sc-text-header text-base"
            />
          ),
          value: denom.bankDenom,
        };
      })
      .filter(Boolean) as Option[]) ?? [];

  if (canCreateFiatOrder) {
    allowedDenomsOptions.unshift({
      value: USD_DENOM,
      label: (
        <DenomIconWithCurrency
          baseDenom={USD_DENOM}
          bankDenom={USD_DENOM}
          displayDenom={USD_DENOM.toUpperCase()}
          // eslint-disable-next-line lingui/no-unlocalized-strings
          textClassName="text-sc-text-header text-base"
        />
      ),
    });
  }

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
