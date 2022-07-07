import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { QueryDenomMetadataResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import {
  QueryBatchResponse,
  QueryClassResponse,
  QueryProjectResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import {
  QueryBasketBalancesResponse,
  QueryBasketResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import useBankQuery from './useBankQuery';
import useBasketQuery from './useBasketQuery';
import useQueryListBatchInfo from './useQueryListBatchInfo';

import { BasketOverviewProps, CreditBatch } from '../components/organisms';

import { getMetadata } from '../lib/metadata-graph';
import useQueryListClassInfo from './useQueryListClassInfo';
import useQueryListProjectInfo from './useQueryListProjectInfo';

dayjs.extend(duration);

function formatDuration(seconds: number): string {
  const _duration = dayjs.duration(seconds, 'seconds');
  const durationArr = _duration.humanize().split(' ');
  const condition = durationArr[1].charAt(durationArr[1].length - 1) === 's';
  const textPart = condition ? durationArr[1].slice(0, -1) : durationArr[1];
  return `${durationArr[0]}-${textPart}`;
}

type BasketDetails = {
  overview?: BasketOverviewProps;
  creditBatches: CreditBatch[];
};

type BasketClassInfo = {
  id: string;
  name: string;
};

type BatchWithProject = {
  batchDenom: string;
  projectHandle: string;
  projectName: string;
  classId: string;
  projectJurisdiction: string;
};

const useBasketDetails = (basketDenom?: string): BasketDetails => {
  // Data to prepare for the UI
  const [overview, setOverview] = useState<BasketOverviewProps>();
  const [creditBatches, setCreditBatches] = useState<CreditBatch[]>([]);

  // Data to fetch and process

  const { data: basket } = useBasketQuery<QueryBasketResponse>({
    query: 'basket',
    params: { basketDenom },
  });

  const { data: basketBalances } = useBasketQuery<QueryBasketBalancesResponse>({
    query: 'basketBalances',
    params: { basketDenom },
  });

  const { data: basketMetadata } = useBankQuery<QueryDenomMetadataResponse>({
    query: 'denomMetadata',
    params: { denom: basketDenom },
  });

  // TODO: useEcocreditQuery + batch queries
  const basketClassesInfo = useQueryListClassInfo(basket?.classes);
  const [basketClasses, setBasketClasses] = useState<BasketClassInfo[]>();

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

  // finally, data preparation for <BasketOverview />
  // TODO ? split state update into different useEffect based on data source ?
  useEffect(() => {
    if (!basket || !basketMetadata || !basketBalances || !basketClasses) return;

    const totalAmount = basketBalances?.balancesInfo.reduce(
      (acc, obj) => acc + parseFloat(obj.balance),
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

  return { overview, creditBatches };
};

export default useBasketDetails;
