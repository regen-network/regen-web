import { QueryDenomMetadataResponse } from '@regen-network/api/cosmos/bank/v1beta1/query';
import {
  QueryBasketBalancesResponse,
  QueryBasketResponse,
} from '@regen-network/api/regen/ecocredit/basket/v1/query';
import { QueryClassResponse } from '@regen-network/api/regen/ecocredit/v1/query';
import { UseQueryResult } from '@tanstack/react-query';

import { formatDuration } from 'web-components/src/utils/format';

import { BasketOverviewProps } from 'components/organisms';

import { normalizeAllowedCreditClasses } from './normalizeAllowedCreditClasses';

type Params = {
  basketData?: QueryBasketResponse;
  basketDenomMetadata?: QueryDenomMetadataResponse | null;
  basketBalancesData?: QueryBasketBalancesResponse | null;
  basketClassResults?: UseQueryResult<QueryClassResponse | null>[];
  basketsMetadata?: UseQueryResult<any>[];
};

export const normalizeBasketOverview = ({
  basketBalancesData,
  basketClassResults,
  basketData,
  basketDenomMetadata,
  basketsMetadata,
}: Params): BasketOverviewProps => {
  const allowedCreditClasses = normalizeAllowedCreditClasses({
    basketClassResults,
    basketsMetadata,
  });

  const totalAmount = basketBalancesData?.balancesInfo.reduce(
    (acc: number, obj: any) => acc + parseFloat(obj.balance),
    0,
  );

  const minStartDate = basketData?.basketInfo?.dateCriteria?.minStartDate;
  const minStartDateField = minStartDate
    ? { minStartDate: minStartDate.toISOString() }
    : {};

  const startDateWindow = basketData?.basketInfo?.dateCriteria?.startDateWindow;
  const startDateWindowField = startDateWindow
    ? { startDateWindow: formatDuration(Number(startDateWindow?.seconds)) }
    : {};

  const overviewFields: BasketOverviewProps = {
    name: basketData?.basketInfo?.name || '-',
    displayDenom: basketDenomMetadata?.metadata?.display || '-',
    description: basketDenomMetadata?.metadata?.description || '-',
    totalAmount: totalAmount || 0,
    curator: basketData?.basketInfo?.curator
      ? {
          name: basketData?.basketInfo?.curator,
          address: basketData?.basketInfo?.curator,
        }
      : {
          name: '-',
          address: '-',
        },
    allowedCreditClasses,
    ...minStartDateField,
    ...startDateWindowField,
  };

  return overviewFields;
};
