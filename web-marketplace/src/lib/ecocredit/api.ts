/* eslint-disable lingui/no-unlocalized-strings */
import { TxResponse } from '@regen-network/api/cosmos/base/abci/v1beta1/abci';
import {
  BatchBalanceInfo,
  BatchInfo,
  ClassInfo,
  ProjectInfo,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryBalancesRequest,
  QueryBalancesResponse,
  QueryBatchesByClassRequest,
  QueryBatchesByClassResponse,
  QueryBatchesByIssuerRequest,
  QueryBatchesByIssuerResponse,
  QueryBatchesByProjectRequest,
  QueryBatchesByProjectResponse,
  QueryBatchesRequest,
  QueryBatchesResponse,
  QueryBatchRequest,
  QueryBatchResponse,
  QueryClassesRequest,
  QueryClassesResponse,
  QueryClassIssuersResponse,
  QueryClassRequest,
  QueryClassResponse,
  QueryCreditTypesRequest,
  QueryCreditTypesResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryProjectRequest,
  QueryProjectResponse,
  QueryProjectsByAdminRequest,
  QueryProjectsByAdminResponse,
  QueryProjectsByClassRequest,
  QueryProjectsByClassResponse,
  QueryProjectsRequest,
  QueryProjectsResponse,
  QuerySupplyRequest,
  QuerySupplyResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryClient } from '@tanstack/react-query';
import { uniq } from 'lodash';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import { QueryClient as RPCQueryClient } from 'ledger';
import { getMetadata } from 'lib/db/api/metadata-graph';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';

import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import type {
  BatchInfoWithBalance,
  BatchInfoWithSupply,
  BatchTotalsForProject,
  ClassProjectInfo,
} from '../../types/ledger/ecocredit';
import { ECOCREDIT_MESSAGE_TYPES } from './constants';

export const getBatchesTotal = (
  batches: BatchInfoWithSupply[],
  creditsForSale?: number,
): {
  totals: BatchTotalsForProject;
} => {
  try {
    const totals = batches.reduce(
      (acc, batch) => {
        acc.cancelledAmount += Number(batch?.cancelledAmount ?? 0);
        acc.retiredAmount += Number(batch?.retiredAmount ?? 0);
        acc.tradableAmount += Number(batch?.tradableAmount ?? 0);
        return acc;
      },
      {
        cancelledAmount: 0,
        retiredAmount: 0,
        tradableAmount: creditsForSale ? -creditsForSale : 0, // Excludes escrowed credits.
        forSaleAmount: creditsForSale ?? 0,
      },
    );
    return { totals };
  } catch (err) {
    throw new Error(`Could not get batches total ${err}`);
  }
};

type GetCreditsWithDataParams = {
  balances: BatchBalanceInfo[];
  batches: BatchInfo[];
  sanityCreditClassData?: AllCreditClassQuery;
  client: RPCQueryClient;
  selectedLanguage: string;
};

const getCreditsWithData = async ({
  balances,
  batches,
  sanityCreditClassData,
  client,
  selectedLanguage,
}: GetCreditsWithDataParams): Promise<BatchInfoWithBalance[]> => {
  const credits: (BatchInfoWithBalance | undefined)[] = await Promise.all(
    balances.map(async balance => {
      const batch = batches.find(batch => batch.denom === balance.batchDenom);

      if (!batch) return undefined;
      const classProjectInfo = await getClassProjectForBatch({
        batch,
        sanityCreditClassData,
        client,
        selectedLanguage,
      });

      return {
        ...batch,
        ...classProjectInfo,
        balance,
      };
    }),
  );

  return credits.filter(
    (credit): credit is BatchInfoWithBalance => credit !== undefined,
  );
};

type GetEcocreditsForAccountParams = {
  address: string;
  loadedCredits: BatchInfoWithBalance[];
  paginationParams?: TablePaginationParams;
  balances?: BatchBalanceInfo[];
  batches?: BatchInfo[];
  sanityCreditClassData?: AllCreditClassQuery;
  client: RPCQueryClient;
  selectedLanguage: string;
};

export const getEcocreditsForAccount = async ({
  address,
  balances = [],
  batches = [],
  loadedCredits,
  paginationParams,
  sanityCreditClassData,
  client,
  selectedLanguage,
}: GetEcocreditsForAccountParams): Promise<BatchInfoWithBalance[]> => {
  try {
    if (paginationParams) {
      const { offset, rowsPerPage } = paginationParams;
      const displayedBalances = balances.slice(offset, offset + rowsPerPage);
      const displayedCredits = await getCreditsWithData({
        balances: displayedBalances,
        batches,
        sanityCreditClassData,
        client,
        selectedLanguage,
      });
      return [
        ...loadedCredits.slice(0, offset),
        ...displayedCredits,
        ...loadedCredits.slice(offset + rowsPerPage, loadedCredits.length),
      ];
    } else {
      return await getCreditsWithData({
        balances,
        batches,
        sanityCreditClassData,
        client,
        selectedLanguage,
      });
    }
  } catch (err) {
    throw new Error(`Could not get ecocredits for account ${address}, ${err}`);
  }
};

type GetClassProjectForBatchParams = {
  batch: BatchInfo;
  sanityCreditClassData?: AllCreditClassQuery;
  client: RPCQueryClient;
  reactQueryClient?: QueryClient;
  selectedLanguage: string;
};

const getClassProjectForBatch = async ({
  batch,
  sanityCreditClassData,
  client,
  reactQueryClient,
  selectedLanguage,
}: GetClassProjectForBatchParams): Promise<ClassProjectInfo> => {
  let projectMetadata, projectData, classData, classMetadata;
  const { projectId } = batch;
  if (reactQueryClient) {
    projectData = await getFromCacheOrFetch({
      query: getProjectQuery({
        request: { projectId },
        client,
        enabled: !!client && !!projectId,
      }),
      reactQueryClient,
    });
  } else {
    // TODO Keeping the old path for retro-compatibility of the function.
    // Once all paths use the react-query one we will be able to remove it.
    projectData = await queryProject({ client, request: { projectId } });
  }
  const project = projectData?.project;
  if (project?.metadata.length) {
    try {
      if (reactQueryClient) {
        projectMetadata = await getFromCacheOrFetch({
          query: getMetadataQuery({
            iri: project.metadata,
            client,
            enabled: !!client,
            languageCode: selectedLanguage,
          }),
          reactQueryClient,
        });
      } else {
        // TODO Keeping the old path for retro-compatibility of the function.
        // Once all paths use the react-query one we will be able to remove it.
        projectMetadata = await getMetadata({
          iri: project.metadata,
          client,
          languageCode: selectedLanguage,
        });
      }
    } catch (error) {}
  }

  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl: project?.classId ?? '',
  });

  const classId = project?.classId;
  if (classId) {
    if (reactQueryClient) {
      classData = await getFromCacheOrFetch({
        query: getClassQuery({
          request: { classId },
          client,
        }),
        reactQueryClient,
      });
    } else {
      // TODO Keeping the old path for retro-compatibility of the function.
      // Once all paths use the react-query one we will be able to remove it.
      classData = await client.regen.ecocredit.v1.class({ classId });
    }
  }
  const creditClass = classData?.class;
  if (creditClass?.metadata.length) {
    try {
      if (reactQueryClient) {
        classMetadata = await getFromCacheOrFetch({
          query: getMetadataQuery({
            iri: creditClass.metadata,
            client,
            enabled: !!client,
            languageCode: selectedLanguage,
          }),
          reactQueryClient,
        });
      } else {
        // TODO Keeping the old path for retro-compatibility of the function.
        // Once all paths use the react-query one we will be able to remove it.
        classMetadata = await getMetadata({
          iri: creditClass.metadata,
          client,
          languageCode: selectedLanguage,
        });
      }
    } catch (error) {}
  }

  return {
    classId: project?.classId,
    className: classMetadata?.['schema:name'] ?? creditClassSanity?.nameRaw,
    projectName: projectMetadata?.['schema:name'] ?? batch.projectId,
    projectLocation: project?.jurisdiction,
  };
};

export const getTxHashForBatch = (
  txResponses: TxResponse[],
  log: string,
): string | undefined => {
  const match = txResponses?.find(tx => tx.rawLog.includes(log));
  return match?.txhash;
};

const getClassIdForBatch = (batch?: BatchInfo): string | undefined => {
  return batch?.denom?.split('-')?.[0] || '-';
};

export const getBatchWithSupplyForDenom = async (
  denom: string,
  client: RPCQueryClient,
): Promise<BatchInfoWithSupply> => {
  try {
    const { batch } = await queryEcoBatchInfo(denom, client);
    const supply = await queryEcoBatchSupply(denom, client);
    const batchWithSupply: BatchInfoWithSupply = {
      ...batch,
      ...supply,
      issuer: batch?.issuer || '',
      projectId: batch?.projectId || '',
      denom: batch?.denom || '',
      metadata: batch?.metadata || '',
      startDate: batch?.startDate || new Date(),
      endDate: batch?.endDate || new Date(),
      issuanceDate: batch?.issuanceDate || new Date(),
      open: !!batch?.open,
      classId: getClassIdForBatch(batch),
    };
    return batchWithSupply;
  } catch (err) {
    throw new Error(
      `Could not get batches with supply for denom ${denom}, ${err}`,
    );
  }
};

export const getReadableMessages = (txResponse: TxResponse): string => {
  return uniq(
    txResponse?.logs?.[0]?.events
      .filter(event => event.type === 'message')
      .map(event => {
        const action = event.attributes.find(
          attr => attr.key === 'action',
        )?.value;

        return getReadableName(action);
      }),
  ).join(', ');
};

const getReadableName = (eventType?: string): string | undefined => {
  if (!eventType) return undefined;
  return Object.values(ECOCREDIT_MESSAGE_TYPES).find(
    msgType => msgType.message === eventType,
  )?.readable;
};

export const queryEcoBatchInfo = async (
  denom: string,
  client: RPCQueryClient,
): Promise<QueryBatchResponse> => {
  try {
    return client.regen.ecocredit.v1.batch({ batchDenom: denom });
  } catch (err) {
    throw new Error(`Error fetching batch by denom: ${denom}, err: ${err}`);
  }
};

export interface QuerySupplyProps extends RPCQueryClientProps {
  request: QuerySupplyRequest;
}

export const queryEcoBatchSupply = async (
  batchDenom: string,
  client: RPCQueryClient,
): Promise<QuerySupplyResponse> => {
  try {
    return client.regen.ecocredit.v1.supply({ batchDenom });
  } catch (err) {
    throw new Error(`Error fetching batch supply: ${err}`);
  }
};

export const queryClassIssuers = async (
  classId: string,
  client: RPCQueryClient,
): Promise<QueryClassIssuersResponse> => {
  try {
    return client.regen.ecocredit.v1.classIssuers({ classId });
  } catch (err) {
    throw new Error(`Error fetching issuer info: ${err}`);
  }
};

export interface QueryProjectsByClassProps extends RPCQueryClientProps {
  request: QueryProjectsByClassRequest;
}

export const queryProjectsByClass = async ({
  client,
  request,
}: QueryProjectsByClassProps): Promise<QueryProjectsByClassResponse> => {
  try {
    let projects: ProjectInfo[] = [];
    let response: QueryProjectsByClassResponse | undefined;
    while (!response || response.pagination?.nextKey?.length) {
      if (response?.pagination?.nextKey?.length) {
        request.pagination = {
          key: response.pagination.nextKey,
          countTotal: false,
          offset: 0n,
          limit: 100n,
          reverse: false,
        };
      }
      response = await client.regen.ecocredit.v1.projectsByClass(request);
      projects.push(...response.projects);
    }
    return {
      projects,
    };
  } catch (err) {
    throw new Error(`Error fetching projects by class: ${err}`);
  }
};

export interface RPCQueryClientProps {
  client: RPCQueryClient;
}

/**
 *
 * QUERY FUNCTIONS
 *
 */

// Balance

export interface QueryBalanceProps extends RPCQueryClientProps {
  request: QueryBalanceRequest;
}

export const queryBalance = async ({
  client,
  request,
}: QueryBalanceProps): Promise<QueryBalanceResponse> => {
  try {
    return await client.regen.ecocredit.v1.balance({
      address: request.address,
      batchDenom: request.batchDenom,
    });
  } catch (err) {
    throw new Error(
      `Error in the Balance query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Balances

export interface QueryBalancesProps extends RPCQueryClientProps {
  request: QueryBalancesRequest;
}

export const queryBalances = async ({
  client,
  request,
}: QueryBalancesProps): Promise<QueryBalancesResponse> => {
  try {
    return await client.regen.ecocredit.v1.balances({
      ...request,
    });
  } catch (err) {
    throw new Error(
      `Error in the Balances query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Batch info

export interface QueryBatchInfoProps extends RPCQueryClientProps {
  request: QueryBatchRequest;
}

export const queryBatchInfo = async ({
  client,
  request,
}: QueryBatchInfoProps): Promise<QueryBatchResponse> => {
  try {
    return await client.regen.ecocredit.v1.batch({
      batchDenom: request.batchDenom,
    });
  } catch (err) {
    throw new Error(
      `Error in the BatchInfo query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Batches

export interface QueryBatchesProps extends RPCQueryClientProps {
  request: QueryBatchesRequest;
}

export const queryBatches = async ({
  client,
  request,
}: QueryBatchesProps): Promise<QueryBatchesResponse> => {
  try {
    return await client.regen.ecocredit.v1.batches({
      pagination: request?.pagination,
    });
  } catch (err) {
    throw new Error(
      `Error in the Batches query of the ledger ecocredit module: ${err}`,
    );
  }
};

// BatchesByClass

export interface QueryBatchesByClassProps extends RPCQueryClientProps {
  request: QueryBatchesByClassRequest;
}

export const queryBatchesByClass = async ({
  client,
  request,
}: QueryBatchesByClassProps): Promise<QueryBatchesByClassResponse> => {
  try {
    return await client.regen.ecocredit.v1.batchesByClass({
      classId: request.classId,
      pagination: request.pagination,
    });
  } catch (err) {
    throw new Error(
      `Error in the BatchesByClass query of the ledger ecocredit module: ${err}`,
    );
  }
};

// BatchesByIssuer

export interface QueryBatchesByIssuerProps extends RPCQueryClientProps {
  request: QueryBatchesByIssuerRequest;
}

export const queryBatchesByIssuer = async ({
  client,
  request,
}: QueryBatchesByIssuerProps): Promise<QueryBatchesByIssuerResponse> => {
  try {
    return await client.regen.ecocredit.v1.batchesByIssuer({
      issuer: request.issuer,
      pagination: request.pagination,
    });
  } catch (err) {
    throw new Error(
      `Error in the Batches by issuer query of the ledger ecocredit module: ${err}`,
    );
  }
};

// BatchesByProject

export interface QueryBatchesByProjectProps extends RPCQueryClientProps {
  request: QueryBatchesByProjectRequest;
}

export const queryBatchesByProject = async ({
  client,
  request,
}: QueryBatchesByProjectProps): Promise<QueryBatchesByProjectResponse> => {
  try {
    return await client.regen.ecocredit.v1.batchesByProject({
      projectId: request.projectId,
      pagination: request.pagination,
    });
  } catch (err) {
    throw new Error(
      `Error in the Batches by project query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Class info

interface QueryClassInfoProps extends RPCQueryClientProps {
  request: QueryClassRequest;
}

export const queryClassInfo = async ({
  client,
  request,
}: QueryClassInfoProps): Promise<QueryClassResponse> => {
  try {
    return await client.regen.ecocredit.v1.class({
      classId: request.classId,
    });
  } catch (err) {
    throw new Error(
      `Error in the ClassInfo query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Classes

interface QueryClassesProps extends RPCQueryClientProps {
  request: QueryClassesRequest;
}

export const queryClasses = async ({
  client,
  request,
}: QueryClassesProps): Promise<QueryClassesResponse> => {
  try {
    let classes: ClassInfo[] = [];
    let response: QueryClassesResponse | undefined;
    while (!response || response.pagination?.nextKey?.length) {
      if (response?.pagination?.nextKey?.length) {
        request.pagination = {
          key: response.pagination.nextKey,
          countTotal: false,
          offset: 0n,
          limit: 100n,
          reverse: false,
        };
      }
      response = await client.regen.ecocredit.v1.classes(request);
      classes.push(...response.classes);
    }
    return {
      classes,
    };
  } catch (err) {
    throw new Error(
      `Error in the Classes query of the ledger ecocredit module: ${err}`,
    );
  }
};

// CreditTypes

interface QueryCreditTypesProps extends RPCQueryClientProps {
  request: QueryCreditTypesRequest;
}

export const queryCreditTypes = async ({
  client,
  request,
}: QueryCreditTypesProps): Promise<QueryCreditTypesResponse> => {
  try {
    return await client.regen.ecocredit.v1.creditTypes(request);
  } catch (err) {
    throw new Error(
      `Error in the CreditTypes query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Projects

export interface QueryProjectsProps extends RPCQueryClientProps {
  request: QueryProjectsRequest;
}

export const queryProjects = async ({
  client,
  request,
}: QueryProjectsProps): Promise<QueryProjectsResponse> => {
  try {
    let projects: ProjectInfo[] = [];
    let response: QueryProjectsResponse | undefined;
    while (!response || response.pagination?.nextKey?.length) {
      if (response?.pagination?.nextKey?.length) {
        request.pagination = {
          key: response.pagination.nextKey,
          countTotal: false,
          offset: 0n,
          limit: 100n,
          reverse: false,
        };
      }
      response = await client.regen.ecocredit.v1.projects(request);
      projects.push(...response.projects);
    }
    return {
      projects,
    };
  } catch (err) {
    throw new Error(
      `Error in the Projects query of the ledger ecocredit module: ${err}`,
    );
  }
};

// ProjectsByAdmin

interface QueryProjectsByAdminProps extends RPCQueryClientProps {
  request: QueryProjectsByAdminRequest;
}

export const queryProjectsByAdmin = async ({
  client,
  request,
}: QueryProjectsByAdminProps): Promise<QueryProjectsByAdminResponse> => {
  try {
    let projects: ProjectInfo[] = [];
    let response: QueryProjectsByAdminResponse | undefined;
    while (!response || response.pagination?.nextKey?.length) {
      if (response?.pagination?.nextKey?.length) {
        request.pagination = {
          key: response.pagination.nextKey,
          countTotal: false,
          offset: 0n,
          limit: 100n,
          reverse: false,
        };
      }
      response = await client.regen.ecocredit.v1.projectsByAdmin(request);
      projects.push(...response.projects);
    }
    return {
      projects,
    };
  } catch (err) {
    throw new Error(
      `Error in the ProjectsByAdmin query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Project (by id)

export interface QueryProjectProps extends RPCQueryClientProps {
  request: QueryProjectRequest;
}

export const queryProject = async ({
  client,
  request,
}: QueryProjectProps): Promise<QueryProjectResponse> => {
  try {
    return await client.regen.ecocredit.v1.project(request);
  } catch (err) {
    throw new Error(
      `Error in the Project query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Params

interface QueryParamsProps extends RPCQueryClientProps {
  request?: QueryParamsRequest;
}

export const queryParams = async ({
  request = {},
  client,
}: QueryParamsProps): Promise<QueryParamsResponse> => {
  try {
    return await client.regen.ecocredit.v1.params(request);
  } catch (err) {
    throw new Error(
      `Error in the Params query of the ledger ecocredit module: ${err}`,
    );
  }
};

export const isVCSCreditClass = (creditClassId?: string | null): boolean => {
  return !!creditClassId && creditClassId === 'C01';
};

export const isCFCCreditClass = (creditClassId?: string | null): boolean => {
  return !!creditClassId && creditClassId === 'C02';
};
