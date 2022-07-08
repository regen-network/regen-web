import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { QueryDenomMetadataResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import { QueryClassResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import {
  QueryBasketBalancesResponse,
  QueryBasketResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import useBankQuery from '../../../../hooks/useBankQuery';
import useBasketQuery from '../../../../hooks/useBasketQuery';

import { BasketOverviewProps } from '../../../../components/organisms';

import { getMetadata } from '../../../../lib/metadata-graph';
import useQueryListClassInfo from '../../../../hooks/useQueryListClassInfo';

dayjs.extend(duration);

function formatDuration(seconds: number): string {
  const _duration = dayjs.duration(seconds, 'seconds');
  const durationArr = _duration.humanize().split(' ');
  const condition = durationArr[1].charAt(durationArr[1].length - 1) === 's';
  const textPart = condition ? durationArr[1].slice(0, -1) : durationArr[1];
  return `${durationArr[0]}-${textPart}`;
}

type BasketClassInfo = {
  id: string;
  name: string;
};

const useBasketOverview = (
  basketDenom?: string,
  basketBalances?: QueryBasketBalancesResponse,
): BasketOverviewProps | undefined => {
  // Data to prepare for the UI
  const [overview, setOverview] = useState<BasketOverviewProps>();

  // Data to fetch and process

  const { data: basket } = useBasketQuery<QueryBasketResponse>({
    query: 'basket',
    params: { basketDenom },
  });

  const { data: basketMetadata } = useBankQuery<QueryDenomMetadataResponse>({
    query: 'denomMetadata',
    params: { denom: basketDenom },
  });

  // TODO: useEcocreditQuery + batch queries
  const basketClassesInfo = useQueryListClassInfo(basket?.classes);
  const [basketClasses, setBasketClasses] = useState<BasketClassInfo[]>();

  // TODO ? overview data: extract into its own hook / function ?
  // fetch credit classes metadata
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

  // TODO ? creditBatches data >> extract into its own hook / function ?
  // fetch project data related to credit batch using graphql lazy hook

  // prepare the list of unique project ids
  // useEffect(() => {
  //   if (!basketBatches) return;
  //   let _projects = [
  //     ...new Map(
  //       basketBatches.map(basketBatch => [
  //         basketBatch.batch?.projectId || '',
  //         basketBatch.batch?.projectId || '',
  //       ]),
  //     ).values(),
  //   ];
  //   setProjects(_projects.filter(id => id !== ''));
  // }, [basketBatches]);

  // finally, data preparation for <BasketOverview />
  // TODO ? split state update into different useEffect based on data source ?
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
      // TODO: hardcoded curator
      curator: basketMetadata
        ? {
            name: 'Regen Network Development, Inc.',
            address: 'regen1sv6a7ry6nrls84z0w5lauae4mgmw3kh2mg97ht',
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
        startDateWindow.seconds.toNumber(),
      );
    }

    setOverview(_overview);
  }, [basket, basketMetadata, basketBalances, basketClasses]);

  return overview;
};

export default useBasketOverview;
