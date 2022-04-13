import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import {
  QueryBasketResponse,
  QueryBasketBalancesResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryClassInfoResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { QueryDenomMetadataResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import {
  queryBasket,
  queryBasketBalances,
  queryDenomMetadata,
  // QueryBasketProps,
} from '../lib/ecocredit';

// hooks
import useQueryLedger from './useQueryLedger';
import useQueryListClassInfo from './useQueryListClassInfo';
import useQueryListBatchInfo from './useQueryListBatchInfo';
import { useProjectByBatchDenomLazyQuery } from '../generated/graphql';

// ui types
import { BasketOverviewProps, CreditBatch } from '../components/organisms';

// import { getMetadata } from '../lib/metadata-graph';

dayjs.extend(duration);

function formatDuration(seconds: number): string {
  const _duration = dayjs.duration(seconds, 'seconds');
  return _duration.humanize();
}

type BasketDetails = {
  overview: BasketOverviewProps;
  creditBatches: CreditBatch[];
};

type ClassInfo = {
  id: string;
  name: string;
};

type BatchWithProject = {
  batchDenom: string;
  projectName: string;
  projectDisplay: string;
};

const overviewInitial = {
  name: '-',
  displayDenom: '-',
  description: '-',
  totalAmount: 0,
  curator: '-',
  allowedCreditClasses: [{ id: '-', name: '-' }],
};

const useBasketDetails = (basketDenom?: string): BasketDetails => {
  // local state (overview and credit batchs)
  // custom basket overview data for <BasketOverview />
  const [overview, setOverview] =
    useState<BasketOverviewProps>(overviewInitial);
  // custom ecocredit batches data for <BasketEcocreditsTable />
  const [creditBatches, setCreditBatches] = useState<CreditBatch[]>([]);

  // fetching necessary data
  const { data: basket } = useQueryLedger<QueryBasketResponse>({
    queryType: 'basket',
    queryCallback: queryBasket,
    queryParams: { basketDenom },
  });

  const { data: basketBalances } = useQueryLedger<QueryBasketBalancesResponse>({
    queryType: 'basket',
    queryCallback: queryBasketBalances,
    queryParams: { basketDenom },
  });

  const { data: basketMetadata } = useQueryLedger<QueryDenomMetadataResponse>({
    queryType: 'bank',
    queryCallback: queryDenomMetadata,
    queryParams: { denom: basketDenom },
  });

  const basketClassesInfo = useQueryListClassInfo(basket?.classes);
  const [basketClasses, setBasketClasses] = useState<ClassInfo[]>();

  const [batches, setBatches] = useState<string[]>();
  const basketBatches = useQueryListBatchInfo(batches);

  const [fetchProjectByBatchDenom] = useProjectByBatchDenomLazyQuery();
  const [batchesProjects, setBatchesProjects] = useState<BatchWithProject[]>();

  // Batches string list query param for `useQueryListBatchInfo(batches)`
  useEffect(() => {
    if (!basketBalances?.balances) return;
    setBatches(basketBalances.balances.map(balance => balance.batchDenom));
  }, [basketBalances?.balances]);

  // TODO ? overview data: extract into its own hook / function ?
  // fetch credit classes metadata
  useEffect(() => {
    if (!basketClassesInfo || basketClassesInfo.length === 0) return;

    async function fetchData(
      basketClassesInfo: QueryClassInfoResponse[],
    ): Promise<void> {
      try {
        const _basketClasses = await Promise.all(
          basketClassesInfo.map(async basketClass => {
            // const metadata = await getMetadata(basketClass.info!.metadata);
            return {
              id: basketClass.info!.classId,
              name: basketClass.info!.classId,
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

  // TODO ? creditaBatches data >> extract into its own hook / function ?
  // fetch project data related to credit batch using graphql lazy hook
  useEffect(() => {
    if (!batches) return;

    async function fetchData(batches: string[]): Promise<void> {
      try {
        const _batchesProjects = await Promise.all(
          batches.map(async batchDenom => {
            const batchProject = await fetchProjectByBatchDenom({
              variables: { batchDenom },
            });
            return {
              batchDenom,
              projectName:
                batchProject.data!.creditVintageByBatchDenom!
                  .projectByProjectId!.handle || '-', // TODO
              projectDisplay:
                batchProject.data!.creditVintageByBatchDenom!
                  .projectByProjectId!.metadata['http://schema.org/name'],
            };
          }),
        );

        setBatchesProjects(_batchesProjects);
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    }

    fetchData(batches);
  }, [batches, fetchProjectByBatchDenom]);

  // finally, data preparation for <BasketEcocreditsTable />
  useEffect(() => {
    if (!batches || !basketBatches || !batchesProjects) return;

    const _creditBatches = batches.map(batch => {
      const _basketBatch = basketBatches.find(
        basketBatch => basketBatch.info!.batchDenom === batch,
      );
      const _projectBatch = batchesProjects.find(
        projectBatch => projectBatch.batchDenom === batch,
      );
      return {
        classId: _basketBatch!.info!.classId,
        batchDenom: _basketBatch!.info!.batchDenom,
        issuer: _basketBatch!.info!.issuer,
        totalAmount: _basketBatch!.info!.totalAmount,
        startDate: _basketBatch!.info!.startDate || '-', // TODO
        endDate: _basketBatch!.info!.endDate || '-', // TODO
        projectLocation: _basketBatch!.info!.projectLocation,
        projectName: _projectBatch!.projectName,
        projectDisplay: _projectBatch!.projectDisplay,
      };
    });

    setCreditBatches(_creditBatches);
  }, [batches, basketBatches, batchesProjects]);

  // finally, data preparation for <BasketOverview />
  // TODO ? split state update into different useEffect based on data source ?
  useEffect(() => {
    if (!basket || !basketMetadata || !basketBalances || !basketClasses) return;

    const totalAmount = basketBalances?.balances.reduce(
      (acc, obj) => acc + parseFloat(obj.balance),
      0,
    );

    const _overview: BasketOverviewProps = {
      name: basket?.basket?.name || '-',
      displayDenom: basketMetadata?.metadata?.display || '-',
      description: basketMetadata?.metadata?.description || '-',
      totalAmount: totalAmount || 0,
      curator: basketMetadata ? 'Regen Network Development, Inc.' : '-', // TODO: hardcoded curator
      allowedCreditClasses: basketClasses,
    };

    const minStartDate = basket.basket?.dateCriteria?.minStartDate;
    if (minStartDate) {
      _overview.minStartDate = minStartDate.toISOString();
    }

    const startDateWindow = basket.basket?.dateCriteria?.startDateWindow;
    if (startDateWindow) {
      _overview.startDateWindow = formatDuration(
        startDateWindow.seconds.toNumber(),
      );
    }

    setOverview(_overview);
  }, [basket, basketMetadata, basketBalances, basketClasses]);

  return { overview, creditBatches };
};

export default useBasketDetails;
