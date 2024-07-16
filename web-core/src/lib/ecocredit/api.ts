import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import {
  GetTxsEventRequest,
  GetTxsEventResponse,
  ServiceClientImpl,
} from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { QueryClientImpl as DataQueryClientImpl } from '@regen-network/api/lib/generated/regen/data/v1/query';
import {
  BatchBalanceInfo,
  BatchInfo,
  ClassInfo,
  DeepPartial,
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
  QueryClientImpl as EcocreditQueryClientImpl,
  QueryClientImpl,
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
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryClient } from '@tanstack/react-query';
import { uniq } from 'lodash';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import type {
  BatchInfoWithBalance,
  BatchInfoWithSupply,
  BatchTotalsForProject,
  ClassProjectInfo,
} from 'types/ledger/ecocredit';
import { connect as connectToApi } from 'lib/clients/ledger';
import { getMetadata } from 'lib/db/api/metadata-graph';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { findSanityCreditClass } from 'lib/utils/ProjectDetails/ProjectDetails.utils';

import { ECOCREDIT_MESSAGE_TYPES } from './constants';

const getCosmosServiceClient = async (): Promise<ServiceClientImpl> => {
  const api = await connectToApi();
  if (!api || !api?.queryClient) return Promise.reject();
  return new ServiceClientImpl(api.queryClient);
};

const getQueryClient = async (): Promise<QueryClientImpl> => {
  const api = await connectToApi();
  if (!api || !api?.queryClient) return Promise.reject();
  return new QueryClientImpl(api.queryClient);
};

export const getBatchesTotal = (
  batches: BatchInfoWithSupply[],
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
        tradableAmount: 0,
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
  dataClient?: DataQueryClientImpl;
  ecocreditClient?: EcocreditQueryClientImpl;
};

const getCreditsWithData = async ({
  balances,
  batches,
  sanityCreditClassData,
  dataClient,
  ecocreditClient,
}: GetCreditsWithDataParams): Promise<BatchInfoWithBalance[]> => {
  const credits: (BatchInfoWithBalance | undefined)[] = await Promise.all(
    balances.map(async balance => {
      const batch = batches.find(batch => batch.denom === balance.batchDenom);

      if (!batch) return undefined;
      const classProjectInfo = await getClassProjectForBatch(
        batch,
        sanityCreditClassData,
        dataClient,
        ecocreditClient,
      );

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
  dataClient?: DataQueryClientImpl;
  ecocreditClient?: EcocreditQueryClientImpl;
};

export const getEcocreditsForAccount = async ({
  address,
  balances = [],
  batches = [],
  loadedCredits,
  paginationParams,
  sanityCreditClassData,
  dataClient,
  ecocreditClient,
}: GetEcocreditsForAccountParams): Promise<BatchInfoWithBalance[]> => {
  try {
    if (paginationParams) {
      const { offset, rowsPerPage } = paginationParams;
      const displayedBalances = balances.slice(offset, offset + rowsPerPage);
      const displayedCredits = await getCreditsWithData({
        balances: displayedBalances,
        batches,
        sanityCreditClassData,
        dataClient,
        ecocreditClient,
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
        dataClient,
        ecocreditClient,
      });
    }
  } catch (err) {
    throw new Error(`Could not get ecocredits for account ${address}, ${err}`);
  }
};

const getClassProjectForBatch = async (
  batch: BatchInfo,
  sanityCreditClassData?: AllCreditClassQuery,
  dataClient?: DataQueryClientImpl,
  ecocreditClient?: EcocreditQueryClientImpl,
  reactQueryClient?: QueryClient,
): Promise<ClassProjectInfo> => {
  let projectMetadata, projectData, classData, classMetadata;
  const { projectId } = batch;
  if (reactQueryClient) {
    projectData = await getFromCacheOrFetch({
      query: getProjectQuery({
        request: { projectId },
        client: ecocreditClient,
        enabled: !!ecocreditClient,
      }),
      reactQueryClient,
    });
  } else {
    // TODO Keeping the old path for retro-compatibility of the function.
    // Once all paths use the react-query one we will be able to remove it.
    projectData = await getProject(projectId, ecocreditClient);
  }
  const project = projectData?.project;
  if (project?.metadata.length) {
    try {
      if (reactQueryClient) {
        projectMetadata = await getFromCacheOrFetch({
          query: getMetadataQuery({
            iri: project.metadata,
            dataClient,
            enabled: !!dataClient,
          }),
          reactQueryClient,
        });
      } else {
        // TODO Keeping the old path for retro-compatibility of the function.
        // Once all paths use the react-query one we will be able to remove it.
        projectMetadata = await getMetadata(project.metadata, dataClient);
      }
    } catch (error) {}
  }

  const creditClassSanity = findSanityCreditClass({
    sanityCreditClassData,
    creditClassIdOrUrl: project?.classId ?? '',
  });

  const classId = project?.classId;
  if (reactQueryClient) {
    classData = await getFromCacheOrFetch({
      query: getClassQuery({
        request: { classId },
        client: ecocreditClient,
      }),
      reactQueryClient,
    });
  } else {
    // TODO Keeping the old path for retro-compatibility of the function.
    // Once all paths use the react-query one we will be able to remove it.
    classData = await ecocreditClient?.Class({ classId });
  }
  const creditClass = classData?.class;
  if (creditClass?.metadata.length) {
    try {
      if (reactQueryClient) {
        classMetadata = await getFromCacheOrFetch({
          query: getMetadataQuery({
            iri: creditClass.metadata,
            dataClient,
            enabled: !!dataClient,
          }),
          reactQueryClient,
        });
      } else {
        // TODO Keeping the old path for retro-compatibility of the function.
        // Once all paths use the react-query one we will be able to remove it.
        classMetadata = await getMetadata(creditClass.metadata, dataClient);
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

export type AddDataToBatchesParams = {
  batches: BatchInfo[];
  sanityCreditClassData?: AllCreditClassQuery;
  withAllData?: boolean;
  dataClient?: DataQueryClientImpl;
  ecocreditClient?: EcocreditQueryClientImpl;
  txClient?: ServiceClientImpl;
  reactQueryClient?: QueryClient;
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
): Promise<BatchInfoWithSupply> => {
  try {
    const { batch } = await queryEcoBatchInfo(denom);
    const supply = await queryEcoBatchSupply(denom);
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

export const queryEcoClasses = async (): Promise<QueryClassesResponse> => {
  const client = await getQueryClient();
  return client.Classes({});
};

export const queryEcoBatchInfo = async (
  denom: string,
): Promise<QueryBatchResponse> => {
  const client = await getQueryClient();
  try {
    return client.Batch({ batchDenom: denom });
  } catch (err) {
    throw new Error(`Error fetching batch by denom: ${denom}, err: ${err}`);
  }
};

export interface QuerySupplyProps extends EcocreditQueryClientProps {
  request: DeepPartial<QuerySupplyRequest>;
}

export const queryEcoBatchSupply = async (
  batchDenom: string,
): Promise<QuerySupplyResponse> => {
  const client = await getQueryClient();
  try {
    return client.Supply({ batchDenom });
  } catch (err) {
    throw new Error(`Error fetching batch supply: ${err}`);
  }
};

export const getTxsByEvent = async (
  request: DeepPartial<GetTxsEventRequest>,
): Promise<GetTxsEventResponse> => {
  const serviceClient = await getCosmosServiceClient();
  if (!serviceClient) return Promise.reject();

  try {
    return serviceClient.GetTxsEvent(request);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    return Promise.reject();
  }
};

export const queryClassIssuers = async (
  classId: string,
): Promise<QueryClassIssuersResponse> => {
  const client = await getQueryClient();
  try {
    return client.ClassIssuers({ classId });
  } catch (err) {
    throw new Error(`Error fetching issuer info: ${err}`);
  }
};

export interface QueryProjectsByClassProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryProjectsByClassRequest>;
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
        request.pagination = { key: response.pagination.nextKey };
      }
      response = await client.ProjectsByClass(request);
      projects.push(...response.projects);
    }
    return {
      $type: response.$type,
      projects,
    };
  } catch (err) {
    throw new Error(`Error fetching projects by class: ${err}`);
  }
};

export const getProject = async (
  projectId: string,
  ecocreditClient?: EcocreditQueryClientImpl,
): Promise<QueryProjectResponse> => {
  const client = ecocreditClient ?? (await getQueryClient());
  try {
    return client.Project({ projectId });
  } catch (err) {
    throw new Error(`Error fetching project: ${err}`);
  }
};

// helpers for combining ledger queries
// into UI data structures

/**
 *
 * ECOCREDIT MODULE QUERIES
 * ---------------------
 *  - Balance
 *  - BatchInfo
 *  - Batches
 *  - ClassInfo
 *  - Classes
 *  - CreditTypes
 *  - Params
 *  - Supply        (TODO)
 *
 */

/**
 *
 * QUERY TYPES
 *
 */

// typing the query client

export type EcocreditQueryClient = QueryClientImpl;

interface EcocreditQueryClientProps {
  client: EcocreditQueryClient;
}

// typing and linking query names and corresponding input params

type BalanceParams = {
  query: 'balance';
  params: DeepPartial<QueryBalanceRequest>;
};

type BalancesParams = {
  query: 'balances';
  params?: DeepPartial<QueryBalancesRequest>;
};

type BatchInfoParams = {
  query: 'batchInfo';
  params: DeepPartial<QueryBatchRequest>;
};

type BatchesParams = {
  query: 'batches';
  params: DeepPartial<QueryBatchesRequest>;
};

type BatchesByClassParams = {
  query: 'batchesByClass';
  params: DeepPartial<QueryBatchesByClassRequest>;
};

type BatchesByProjectParams = {
  query: 'batchesByProject';
  params?: DeepPartial<QueryBatchesByProjectRequest>;
};

type BatchesByIssuerParams = {
  query: 'batchesByIssuer';
  params: DeepPartial<QueryBatchesByIssuerRequest>;
};

type ClassInfoParams = {
  query: 'classInfo';
  params: DeepPartial<QueryBatchRequest>;
};

type ClassesParams = {
  query: 'classes';
  params: DeepPartial<QueryClassesRequest>;
};

type CreditTypesParams = {
  query: 'creditTypes';
  params: DeepPartial<QueryCreditTypesRequest>;
};

type ParamsParams = {
  query: 'params';
  params: DeepPartial<QueryParamsRequest>;
};

type ProjectsParams = {
  query: 'projects';
  params: DeepPartial<QueryProjectsRequest>;
};

type ProjectsByAdminParams = {
  query: 'projectsByAdmin';
  params: DeepPartial<QueryProjectsByAdminRequest>;
};

type ProjectsByClassParams = {
  query: 'projectsByClass';
  params: DeepPartial<QueryProjectsByClassRequest>;
};

type ProjectParams = {
  query: 'project';
  params: DeepPartial<QueryProjectRequest>;
};

export type EcocreditQueryProps =
  | BalanceParams
  | BalancesParams
  | BatchInfoParams
  | BatchesParams
  | BatchesByClassParams
  | BatchesByProjectParams
  | BatchesByIssuerParams
  | ClassInfoParams
  | ClassesParams
  | ParamsParams
  | CreditTypesParams
  | ProjectsParams
  | ProjectsByAdminParams
  | ProjectsByClassParams
  | ProjectParams;

// typing the response

export type EcocreditQueryResponse =
  | QueryBalanceResponse
  | QueryBalancesResponse
  | QueryBatchResponse
  | QueryBatchesResponse
  | QueryBatchesByClassResponse
  | QueryBatchesByProjectResponse
  | QueryBatchesByIssuerResponse
  | QueryClassResponse
  | QueryClassesResponse
  | QueryCreditTypesResponse
  | QueryParamsResponse
  | QueryProjectsResponse
  | QueryProjectsByClassResponse
  | QueryProjectsByAdminResponse
  | QueryProjectsByClassResponse
  | QueryProjectResponse;

/**
 *
 * QUERY FUNCTIONS
 *
 */

// Balance

export interface QueryBalanceProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBalanceRequest>;
}

export const queryBalance = async ({
  client,
  request,
}: QueryBalanceProps): Promise<QueryBalanceResponse> => {
  try {
    return await client.Balance({
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

export interface QueryBalancesProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBalancesRequest>;
}

export const queryBalances = async ({
  client,
  request,
}: QueryBalancesProps): Promise<QueryBalancesResponse> => {
  try {
    return await client.Balances({
      ...request,
    });
  } catch (err) {
    throw new Error(
      `Error in the Balances query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Batch info

export interface QueryBatchInfoProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBatchRequest>;
}

export const queryBatchInfo = async ({
  client,
  request,
}: QueryBatchInfoProps): Promise<QueryBatchResponse> => {
  try {
    return await client.Batch({
      batchDenom: request.batchDenom,
    });
  } catch (err) {
    throw new Error(
      `Error in the BatchInfo query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Batches

export interface QueryBatchesProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBatchesRequest>;
}

export const queryBatches = async ({
  client,
  request,
}: QueryBatchesProps): Promise<QueryBatchesResponse> => {
  try {
    return await client.Batches({ pagination: request?.pagination });
  } catch (err) {
    throw new Error(
      `Error in the Batches query of the ledger ecocredit module: ${err}`,
    );
  }
};

// BatchesByClass

export interface QueryBatchesByClassProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBatchesByClassRequest>;
}

export const queryBatchesByClass = async ({
  client,
  request,
}: QueryBatchesByClassProps): Promise<QueryBatchesByClassResponse> => {
  try {
    return await client.BatchesByClass({
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

export interface QueryBatchesByIssuerProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBatchesByIssuerRequest>;
}

export const queryBatchesByIssuer = async ({
  client,
  request,
}: QueryBatchesByIssuerProps): Promise<QueryBatchesByIssuerResponse> => {
  try {
    return await client.BatchesByIssuer({
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

export interface QueryBatchesByProjectProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBatchesByProjectRequest>;
}

export const queryBatchesByProject = async ({
  client,
  request,
}: QueryBatchesByProjectProps): Promise<QueryBatchesByProjectResponse> => {
  try {
    return await client.BatchesByProject({
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

interface QueryClassInfoProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryClassRequest>;
}

export const queryClassInfo = async ({
  client,
  request,
}: QueryClassInfoProps): Promise<QueryClassResponse> => {
  try {
    return await client.Class({
      classId: request.classId,
    });
  } catch (err) {
    throw new Error(
      `Error in the ClassInfo query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Classes

interface QueryClassesProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryClassesRequest>;
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
        request.pagination = { key: response.pagination.nextKey };
      }
      response = await client.Classes(request);
      classes.push(...response.classes);
    }
    return {
      $type: response.$type,
      classes,
    };
  } catch (err) {
    throw new Error(
      `Error in the Classes query of the ledger ecocredit module: ${err}`,
    );
  }
};

// CreditTypes

interface QueryCreditTypesProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryCreditTypesRequest>;
}

export const queryCreditTypes = async ({
  client,
  request,
}: QueryCreditTypesProps): Promise<QueryCreditTypesResponse> => {
  try {
    return await client.CreditTypes(request);
  } catch (err) {
    throw new Error(
      `Error in the CreditTypes query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Projects

export interface QueryProjectsProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryProjectsRequest>;
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
        request.pagination = { key: response.pagination.nextKey };
      }
      response = await client.Projects(request);
      projects.push(...response.projects);
    }
    return {
      $type: response.$type,
      projects,
    };
  } catch (err) {
    throw new Error(
      `Error in the Projects query of the ledger ecocredit module: ${err}`,
    );
  }
};

// ProjectsByAdmin

interface QueryProjectsByAdminProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryProjectsByAdminRequest>;
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
        request.pagination = { key: response.pagination.nextKey };
      }
      response = await client.ProjectsByAdmin(request);
      projects.push(...response.projects);
    }
    return {
      $type: response.$type,
      projects,
    };
  } catch (err) {
    throw new Error(
      `Error in the ProjectsByAdmin query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Project (by id)

export interface QueryProjectProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryProjectRequest>;
}

export const queryProject = async ({
  client,
  request,
}: QueryProjectProps): Promise<QueryProjectResponse> => {
  try {
    return await client.Project(request);
  } catch (err) {
    throw new Error(
      `Error in the Project query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Params

interface QueryParamsProps {
  request?: DeepPartial<QueryParamsRequest>;
}

export const queryParams = async ({
  request = {},
}: QueryParamsProps): Promise<QueryParamsResponse> => {
  const client = await getQueryClient();
  try {
    return await client.Params(request);
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
