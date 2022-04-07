import { useState, useEffect } from 'react';

// hooks
import useQueryBasket from './useQueryBasket';
import useQueryBasketBalances from './useQueryBasketBalances';
import useQueryDenomMetadata from './useQueryDenomMetadata';
import useQueryListClassInfo from './useQueryListClassInfo';
import useQueryListBatchInfo from './useQueryListBatchInfo';
import { useProjectByBatchDenomLazyQuery } from '../generated/graphql';
// ui types
import { BasketOverviewProps, CreditBatch } from '../components/organisms';

type BasketDetails = {
  overview: BasketOverviewProps;
  creditBatches: CreditBatch[];
};

type BatchWithProject = {
  batchDenom: string;
  projectName: string;
  projectDisplay: string;
};

const useBasketDetails = (basketDenom?: string): BasketDetails => {
  const basket = useQueryBasket(basketDenom);
  const basketBalances = useQueryBasketBalances(basketDenom);
  const basketMetadata = useQueryDenomMetadata(basketDenom);

  const basketClasses = useQueryListClassInfo(basket?.classes);

  const [batches, setBatches] = useState<string[]>();
  const basketBatches = useQueryListBatchInfo(batches);

  const [fetchProjectByBatchDenom] = useProjectByBatchDenomLazyQuery();
  const [batchesProjects, setBatchesProjects] = useState<BatchWithProject[]>();

  // custom basket overview data for <BasketOverview />
  const [overview, setOverview] = useState<BasketOverviewProps>({
    name: '-',
    displayDenom: '-',
    description: '-',
    totalAmount: 0,
    curator: '-',
    allowedCreditClasses: [{ id: '-', name: '-' }],
    minStartDate: '-',
    // startDateWindow?: Long;
    // startDateWindow?: string;
  });
  // custom ecocredit batches data for <BasketEcocreditsTable />
  const [creditBatches, setCreditBatches] = useState<CreditBatch[]>([]);

  // Batches string list query param for `useQueryListBatchInfo(batches)`
  useEffect(() => {
    if (!basketBalances?.balances) return;
    setBatches(basketBalances.balances.map(balance => balance.batchDenom));
  }, [basketBalances?.balances]);

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
        // TODO
        // eslint-disable-next-line no-console
        console.error(error);
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
  useEffect(() => {
    if (!basket || !basketMetadata || !basketBalances || !basketClasses) return;

    const totalAmount = basketBalances?.balances.reduce(
      (acc, obj) => acc + parseFloat(obj.balance),
      0,
    );
    const allowedCreditClasses = basketClasses?.map(basketClass => ({
      id: basketClass.info?.classId || '-',
      name: basketClass?.info?.classId || '-',
    }));

    setOverview({
      name: basket?.basket?.name || '-',
      displayDenom: basketMetadata?.metadata?.display || '-',
      description: basketMetadata?.metadata?.description || '-',
      totalAmount: totalAmount || 0,
      curator: 'Regen Network Development, Inc.' || '-', // TODO
      allowedCreditClasses: allowedCreditClasses || [{ id: '-', name: '-' }],
      minStartDate: '-',
      // startDateWindow: '-',
    });
  }, [basket, basketMetadata, basketBalances, basketClasses]);

  return { overview, creditBatches };
};

export default useBasketDetails;
