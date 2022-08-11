import { useEffect, useState } from 'react';
import { QueryDenomMetadataResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import {
  QueryBasketBalancesResponse,
  QueryBasketResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryClassResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { formatDuration } from 'web-components/lib/utils/format';

import { BasketOverviewProps } from '../../../../components/organisms';
import useBankQuery from '../../../../hooks/useBankQuery';
import useBasketQuery from '../../../../hooks/useBasketQuery';
import useQueryListClassInfo from '../../../../hooks/useQueryListClassInfo';
import { getMetadata } from '../../../../lib/metadata-graph';

type BasketClassInfo = {
  id: string;
  name: string;
};

const useBasketOverview = (
  basketDenom?: string,
  basketBalances?: QueryBasketBalancesResponse,
): BasketOverviewProps | undefined => {
  const [overview, setOverview] = useState<BasketOverviewProps>();

  const { data: basket } = useBasketQuery<QueryBasketResponse>({
    query: 'basket',
    params: { basketDenom },
  });

  const { data: basketMetadata } = useBankQuery<QueryDenomMetadataResponse>({
    query: 'denomMetadata',
    params: { denom: basketDenom },
  });

  const basketClassesInfo = useQueryListClassInfo(basket?.classes);
  const [basketClasses, setBasketClasses] = useState<BasketClassInfo[]>();

  useEffect(() => {
    if (!basketClassesInfo || basketClassesInfo.length === 0) return;

    async function fetchData(
      basketClassesInfo: QueryClassResponse[],
    ): Promise<void> {
      try {
        const _basketClasses = await Promise.all(
          basketClassesInfo.map(async basketClass => {
            const { class: classInfo } = basketClass;
            let metadata;
            if (classInfo?.metadata.length) {
              try {
                metadata = await getMetadata(classInfo.metadata);
              } catch (err) {}
            }

            let basketClassName;
            if (classInfo?.id) {
              basketClassName = metadata
                ? `${metadata['schema:name']} (${classInfo?.id})`
                : classInfo?.id;
            }

            return {
              id: classInfo?.id || '-',
              name: basketClassName || '-',
            };
          }),
        );
        setBasketClasses(_basketClasses);
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    }

    fetchData(basketClassesInfo);
  }, [basketClassesInfo]);

  // finally, data preparation for <BasketOverview />
  useEffect(() => {
    if (!basket || !basketMetadata || !basketBalances || !basketClasses) return;

    const totalAmount = basketBalances?.balancesInfo.reduce(
      (acc: number, obj: any) => acc + parseFloat(obj.balance),
      0,
    );

    const _overview: BasketOverviewProps = {
      name: basket.basketInfo?.name || '-',
      displayDenom: basketMetadata?.metadata?.display || '-',
      description: basketMetadata?.metadata?.description || '-',
      totalAmount: totalAmount || 0,
      curator: basket.basketInfo?.curator
        ? {
            name: basket.basketInfo?.curator,
            address: basket.basketInfo?.curator,
          }
        : {
            name: '-',
            address: '-',
          },
      allowedCreditClasses: basketClasses,
    };

    const minStartDate = basket.basketInfo?.dateCriteria?.minStartDate;
    if (minStartDate) {
      _overview.minStartDate = minStartDate.toISOString();
    }

    const startDateWindow = basket.basketInfo?.dateCriteria?.startDateWindow;
    if (startDateWindow) {
      _overview.startDateWindow = formatDuration(
        startDateWindow?.seconds?.toNumber(),
      );
    }

    setOverview(_overview);
  }, [basket, basketMetadata, basketBalances, basketClasses]);

  return overview;
};

export default useBasketOverview;
