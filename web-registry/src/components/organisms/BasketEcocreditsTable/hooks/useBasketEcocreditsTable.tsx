import { useState, useEffect } from 'react';

import {
  QueryBatchResponse,
  QueryProjectResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryBasketBalancesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

// import useBasketQuery from '../../../../hooks/useBasketQuery';
import useQueryListBatchInfo from '../../../../hooks/useQueryListBatchInfo';

import { CreditBatch } from '../../../../components/organisms';

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
  // Data to prepare for the UI
  const [creditBatches, setCreditBatches] = useState<CreditBatch[]>([]);

  // Data to fetch and process

  // TODO: useEcocreditQuery + batch queries

  const [batches, setBatches] = useState<string[]>();

  // TODO: useEcocreditQuery + batch queries
  const basketBatches = useQueryListBatchInfo(batches);

  const [projects, setProjects] = useState<string[]>();
  const basketProjects = useQueryListProjectInfo(projects);

  // const [fetchProjects] = useProjectsByMetadataLazyQuery();
  const [batchesProjects, setBatchesProjects] = useState<BatchWithProject[]>();

  // Batches string list query param for `useQueryListBatchInfo(batches)`
  useEffect(() => {
    if (!basketBalances?.balancesInfo) return;
    setBatches(basketBalances.balancesInfo.map(balance => balance.batchDenom));
  }, [basketBalances?.balancesInfo]);

  // TODO ? creditBatches data >> extract into its own hook / function ?
  // fetch project data related to credit batch using graphql lazy hook

  // prepare the list of unique project ids
  useEffect(() => {
    if (!basketBatches) return;
    let _projects = [
      ...new Map(
        basketBatches.map(basketBatch => [
          basketBatch.batch?.projectId || '',
          basketBatch.batch?.projectId || '',
        ]),
      ).values(),
    ];
    setProjects(_projects.filter(id => id !== ''));
  }, [basketBatches]);

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

        // let batchMetadata;
        // if (batchInfo?.metadata) {
        //   // if (batchInfo?.metadata.length) {
        //   // 1. Get batch metadata
        //   batchMetadata = await getMetadata(batchInfo.metadata);
        // }

        // 2. Fetch projects by vcsProjectId
        // batchInfo?.projectId;

        // let projectData;
        // const vcsProjectId = batchMetadata?.['regen:vcsProjectId'];
        // if (vcsProjectId) {
        //   const { data } = await fetchProjects({
        //     variables: {
        //       metadata: {
        //         'regen:vcsProjectId': vcsProjectId,
        //       },
        //     },
        //   });
        //   projectData = data;
        // }
        // const batchProject = projectData?.allProjects?.nodes?.[0];

        return {
          batchDenom: batchInfo?.denom || '-',
          projectHandle: batchInfo?.projectId || '-', // TODO - project handle
          // projectHandle: (basketProject?.project?.metadata.handle as string) || '-',
          // projectHandle: (batchProject?.handle as string) || '-',
          projectName: batchInfo?.projectId || '-', // TODO - project name
          // (batchProject?.metadata?.['schema:name'] as string) || '-',
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
        classId: _projectBatch?.classId || '-', // TODO
        // classId: _basketBatch?.batch?.classId || '-', // TODO
        batchDenom: _basketBatch?.batch?.denom || '-',
        issuer: _basketBatch?.batch?.issuer || '-',
        totalAmount: totalAmount || '-',
        startDate: _basketBatch?.batch?.startDate || '-',
        endDate: _basketBatch?.batch?.endDate || '-',
        // projectLocation: _basketBatch?.batch?.projectLocation || '-', // TODO
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
