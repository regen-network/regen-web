import { QueryDenomMetadataResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import {
  QueryBasketBalancesResponse,
  QueryBasketResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryClassResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { UseQueryResult } from '@tanstack/react-query';

import { formatDuration } from 'web-components/lib/utils/format';

import { BasketOverviewProps } from 'components/organisms';

import { normalizeAllowedCreditClasses } from './normalizeAllowedCreditClasses';

type Params = {
  basketData?: QueryBasketResponse;
  basketDenomMetadata?: QueryDenomMetadataResponse | null;
  basketBalancesData?: QueryBasketBalancesResponse | null;
  basketClassResults?: UseQueryResult<QueryClassResponse | null>[];
  basketMetadatas?: UseQueryResult<any>[];
};

export const normalizeBasketOverview = ({
  basketBalancesData,
  basketClassResults,
  basketData,
  basketDenomMetadata,
  basketMetadatas,
}: Params): BasketOverviewProps => {
  const allowedCreditClasses = normalizeAllowedCreditClasses({
    basketClassResults,
    basketMetadatas,
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
    ? { startDateWindow: formatDuration(startDateWindow?.seconds?.toNumber()) }
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
