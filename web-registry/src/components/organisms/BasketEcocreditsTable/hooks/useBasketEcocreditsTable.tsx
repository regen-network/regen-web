import { useEffect, useState } from 'react';
import { QueryBasketBalancesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import {
  QueryBatchResponse,
  QueryProjectResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { CreditBatch } from '../../../../components/organisms';
import useQueryListBatchInfo from '../../../../hooks/useQueryListBatchInfo';
import useQueryListProjectInfo from '../../../../hooks/useQueryListProjectInfo';

type BatchWithProject = {
  batchDenom: string;
  projectHandle: string;
  projectName: string;
  classId: string;
  projectJurisdiction: string;
};

const useBasketEcocreditsTable = (
  basketBalances?: QueryBasketBalancesResponse,
): CreditBatch[] => {
  const [creditBatches, setCreditBatches] = useState<CreditBatch[]>([]);

  const [batches, setBatches] = useState<string[]>();
  const basketBatches = useQueryListBatchInfo(batches);

  const [projects, setProjects] = useState<string[]>();
  const basketProjects = useQueryListProjectInfo(projects);

  const [batchesProjects, setBatchesProjects] = useState<BatchWithProject[]>();

  // Batches string list query param for `useQueryListBatchInfo(batches)`
  useEffect(() => {
    if (!basketBalances?.balancesInfo) return;
    setBatches(basketBalances.balancesInfo.map(balance => balance.batchDenom));
  }, [basketBalances?.balancesInfo]);

  // prepare the list of unique project ids
  useEffect(() => {
    if (!basketBatches) return;

    const _projects = [
      ...new Set(
        basketBatches.map(basketBatch => basketBatch.batch?.projectId || ''),
      ),
    ];

    setProjects(_projects.filter(id => id !== ''));
  }, [basketBatches]);

  // TODO - projct handle and project name
  useEffect(() => {
    if (!basketBatches || !basketProjects) return;

    async function fetchData(
      basketBatches: QueryBatchResponse[],
      basketProjects: QueryProjectResponse[],
    ): Promise<void> {
      const _batchesProjects = basketBatches.map(basketBatch => {
        const { batch: batchInfo } = basketBatch;
        const basketProject = basketProjects.find(
          project => project.project?.id === batchInfo?.projectId,
        );

        return {
          batchDenom: batchInfo?.denom || '-',
          projectHandle: batchInfo?.projectId || '-', // TODO - project handle
          projectName: batchInfo?.projectId || '-', // TODO - project name
          classId: basketProject?.project?.classId || '-',
          projectJurisdiction: basketProject?.project?.jurisdiction || '-',
        };
      });

      setBatchesProjects(_batchesProjects);
    }

    fetchData(basketBatches, basketProjects);
  }, [basketBatches, basketProjects]);

  // finally, data preparation for <BasketEcocreditsTable />
  useEffect(() => {
    if (!basketBalances?.balancesInfo || !basketBatches || !batchesProjects)
      return;

    const _creditBatches = basketBalances.balancesInfo.map(basketBalance => {
      const _basketBatch = basketBatches.find(
        basketBatch => basketBatch.batch?.denom === basketBalance.batchDenom,
      );
      const _projectBatch = batchesProjects.find(
        projectBatch => projectBatch.batchDenom === basketBalance.batchDenom,
      );
      const totalAmount = basketBalance.balance;

      return {
        classId: _projectBatch?.classId || '-',
        batchDenom: _basketBatch?.batch?.denom || '-',
        issuer: _basketBatch?.batch?.issuer || '-',
        totalAmount: totalAmount || '-',
        startDate: _basketBatch?.batch?.startDate || '-',
        endDate: _basketBatch?.batch?.endDate || '-',
        projectJurisdiction: _projectBatch?.projectJurisdiction || '-',
        projectHandle: _projectBatch?.projectHandle || '-',
        projectName: _projectBatch?.projectName || '-',
      };
    });

    setCreditBatches(_creditBatches);
  }, [basketBalances, basketBatches, batchesProjects]);

  return creditBatches;
};

export default useBasketEcocreditsTable;
