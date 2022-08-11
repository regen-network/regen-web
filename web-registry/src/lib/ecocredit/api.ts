import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import {
  GetTxsEventRequest,
  GetTxsEventResponse,
  ServiceClientImpl,
} from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import {
  BatchInfo,
  DeepPartial,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryBatchesByClassRequest,
  QueryBatchesByClassResponse,
  QueryBatchesByProjectRequest,
  QueryBatchesByProjectResponse,
  QueryBatchRequest,
  QueryBatchResponse,
  QueryClassesRequest,
  QueryClassesResponse,
  QueryClassIssuersResponse,
  QueryClassRequest,
  QueryClassResponse,
  QueryClientImpl,
  QueryCreditTypesRequest,
  QueryCreditTypesResponse,
  QueryParamsResponse,
  QueryProjectRequest,
  QueryProjectResponse,
  QueryProjectsByAdminRequest,
  QueryProjectsByAdminResponse,
  QueryProjectsByClassResponse,
  QueryProjectsRequest,
  QueryProjectsResponse,
  QuerySupplyResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import axios from 'axios';
import { uniq } from 'lodash';

import { connect as connectToApi } from '../../ledger';
import type {
  BatchInfoWithBalance,
  BatchInfoWithSupply,
  BatchTotalsForProject,
} from '../../types/ledger/ecocredit';
import { expLedger, ledgerRESTUri } from '../ledger';
import { ECOCREDIT_MESSAGE_TYPES, messageActionEquals } from './constants';

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

export const getBatchesTotal = async (
  batches: BatchInfoWithSupply[],
): Promise<{
  totals: BatchTotalsForProject;
}> => {
  try {
    const totals = batches.reduce(
      (acc, batch) => {
        acc.cancelledAmount += Number(batch?.cancelledAmount ?? 0);
        acc.retiredSupply += Number(batch?.retiredSupply ?? 0);
        acc.tradableSupply += Number(batch?.tradableSupply ?? 0);
        return acc;
      },
      {
        cancelledAmount: 0,
        retiredSupply: 0,
        tradableSupply: 0,
      },
    );
    return { totals };
  } catch (err) {
    throw new Error(`Could not get batches total ${err}`);
  }
};

export const getEcocreditsForAccount = async (
  account: string,
): Promise<BatchInfoWithBalance[]> => {
  try {
    const batches = await queryEcoBatches();
    const credits = await Promise.all(
      batches.map(async batch => {
        const credits = await queryEcoBalance(batch.denom, account);
        const classId = getClassIdForBatch(batch);
        const project = await getProject(batch.projectId);
        return {
          ...batch,
          ...credits,
          classId,
          projectLocation: project.project?.jurisdiction,
        };
      }),
    );

    // filter out batches that don't have any credits
    return credits.filter(credit => {
      const { balance } = credit;
      return (
        Number(balance?.tradableAmount) > 0 ||
        Number(balance?.escrowedAmount) > 0 ||
        Number(balance?.retiredAmount) > 0
      );
    });
  } catch (err) {
    throw new Error(`Could not get ecocredits for account ${account}, ${err}`);
  }
};

export const getEcocreditTxs = async (): Promise<TxResponse[]> => {
  let allTxs: TxResponse[] = [];
  // TODO: until ledger API supports "message.module='ecocredit'",
  // we must send separate requests for each message action type:
  return Promise.all(
    Object.values(ECOCREDIT_MESSAGE_TYPES).map(async msgType => {
      const response = await getTxsByEvent({
        events: [`${messageActionEquals}'${msgType.message}'`],
      });
      allTxs = [...allTxs, ...response.txResponses];
    }),
  ).then(() => {
    return allTxs;
  });
};

export const getBatchesWithSupply = async (
  creditClassId?: string | null,
  params?: URLSearchParams,
): Promise<{
  data: BatchInfoWithSupply[];
}> => {
  const batches = await queryEcoBatches(creditClassId, params);
  const batchesWithData = await addDataToBatch(batches);
  return { data: batchesWithData };
};

export const getBatchesByProjectWithSupply = async (
  projectId?: string | null,
  params?: URLSearchParams,
): Promise<{
  data: BatchInfoWithSupply[];
}> => {
  if (!projectId) return Promise.resolve({ data: [] });
  const client = await getQueryClient();
  const batches = await queryBatchesByProject({
    client,
    request: { projectId },
  });
  const batchesWithData = await addDataToBatch(batches?.batches);
  return { data: batchesWithData };
};

/** Adds Tx Hash and supply info to batch for use in tables */
export const addDataToBatch = async (
  batches: BatchInfo[],
): Promise<BatchInfoWithSupply[]> => {
  try {
    /* TODO: this is limited to 100 results. We need to find a better way */
    const txs = await getTxsByEvent({
      events: [
        `${messageActionEquals}'${ECOCREDIT_MESSAGE_TYPES.CREATE_BATCH.message}'`,
      ],
    });

    return Promise.all(
      batches.map(async batch => {
        const supplyData = await queryEcoBatchSupply(batch.denom);
        const txhash = getTxHashForBatch(txs.txResponses, batch.denom);
        const classId = getClassIdForBatch(batch);
        const project = await getProject(batch.projectId);
        return {
          ...batch,
          ...supplyData,
          txhash,
          classId,
          projectLocation: project.project?.jurisdiction,
        };
      }),
    );
  } catch (err) {
    throw new Error(`Could not add data to batches batches: ${err}`);
  }
};

const getTxHashForBatch = (
  txResponses: TxResponse[],
  batchDenom: string,
): string | undefined => {
  const match = txResponses?.find(tx => tx.rawLog.includes(batchDenom));
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

const queryEcoBalance = async (
  batchDenom: string,
  address: string,
): Promise<QueryBalanceResponse> => {
  const client = await getQueryClient();
  try {
    return client.Balance({ address, batchDenom });
  } catch (err) {
    throw new Error(
      `Error fetching account ecocredits for batch ${batchDenom}, address ${address}, err: ${err}`,
    );
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

export const queryEcoClassInfo = async (
  classId: string,
): Promise<QueryClassResponse> => {
  const client = await getQueryClient();
  try {
    return client.Class({ classId });
  } catch (err) {
    throw new Error(`Error fetching class info: ${err}`);
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

export const queryProjectsByClass = async (
  classId: string,
): Promise<QueryProjectsByClassResponse> => {
  const client = await getQueryClient();
  try {
    return client.ProjectsByClass({ classId });
  } catch (err) {
    throw new Error(`Error fetching projects by class: ${err}`);
  }
};

export const getProject = async (
  projectId: string,
): Promise<QueryProjectResponse> => {
  const client = await getQueryClient();
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

type BatchInfoParams = {
  query: 'batchInfo';
  params: DeepPartial<QueryBatchRequest>;
};

type BatchesParams = {
  query: 'batches';
  params: DeepPartial<QueryBatchesByClassRequest>;
};

type BatchesByProjectParams = {
  query: 'batchesByProject';
  params: DeepPartial<QueryBatchesByProjectRequest>;
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

type ProjectsParams = {
  query: 'projects';
  params: DeepPartial<QueryProjectsRequest>;
};

type ProjectsByAdminParams = {
  query: 'projectsByAdmin';
  params: DeepPartial<QueryProjectsByAdminRequest>;
};

type ProjectParams = {
  query: 'project';
  params: DeepPartial<QueryProjectRequest>;
};

export type EcocreditQueryProps =
  | BalanceParams
  | BatchInfoParams
  | BatchesParams
  | BatchesByProjectParams
  | ClassInfoParams
  | ClassesParams
  | CreditTypesParams
  | ProjectsParams
  | ProjectsByAdminParams
  | ProjectParams;

// typing the response

export type EcocreditQueryResponse =
  | QueryBalanceResponse
  | QueryBatchResponse
  | QueryBatchesByClassResponse
  | QueryBatchesByProjectResponse
  | QueryClassResponse
  | QueryClassesResponse
  | QueryCreditTypesResponse
  | QueryProjectsResponse
  | QueryProjectsByAdminResponse
  | QueryProjectResponse;

/**
 *
 * QUERY FUNCTIONS
 *
 */

// Balance

interface QueryBalanceProps extends EcocreditQueryClientProps {
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

// Batch info

interface QueryBatchInfoProps extends EcocreditQueryClientProps {
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

interface QueryBatchesProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBatchesByClassRequest>;
}

export const queryBatchesByClass = async ({
  client,
  request,
}: QueryBatchesProps): Promise<QueryBatchesByClassResponse> => {
  try {
    return await client.BatchesByClass({
      classId: request.classId,
    });
  } catch (err) {
    throw new Error(
      `Error in the Batches query of the ledger ecocredit module: ${err}`,
    );
  }
};

interface QueryBatchesByProjectProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryBatchesByProjectRequest>;
}

export const queryBatchesByProject = async ({
  client,
  request,
}: QueryBatchesByProjectProps): Promise<QueryBatchesByProjectResponse> => {
  try {
    return await client.BatchesByProject({
      projectId: request.projectId,
    });
  } catch (err) {
    throw new Error(
      `Error in the Batches query of the ledger ecocredit module: ${err}`,
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
    return await client.Classes(request);
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

interface QueryProjectsProps extends EcocreditQueryClientProps {
  request: DeepPartial<QueryProjectsRequest>;
}

export const queryProjects = async ({
  client,
  request,
}: QueryProjectsProps): Promise<QueryProjectsResponse> => {
  try {
    return await client.Projects(request);
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
    return await client.ProjectsByAdmin(request);
  } catch (err) {
    throw new Error(
      `Error in the ProjectsByAdmin query of the ledger ecocredit module: ${err}`,
    );
  }
};

// Project (by id)

interface QueryProjectProps extends EcocreditQueryClientProps {
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

export const queryParams = async (): Promise<QueryParamsResponse> => {
  const client = await getQueryClient();
  try {
    return await client.Params({});
  } catch (err) {
    throw new Error(
      `Error in the Params query of the ledger ecocredit module: ${err}`,
    );
  }
};

/**
 *
 * Backwards compatibility, will be removed
 *
 */

// queryEcoBatches consumes Regen REST endpoints - will be replaced with regen-js
export const queryEcoBatches = async (
  creditClassId?: string | null,
  params?: URLSearchParams,
): Promise<BatchInfo[]> => {
  const client = await getQueryClient();
  try {
    // Currently, the experimental testnet Hambach is running an old version of regen-ledger (v2.0.0-beta1)
    // which provides a different API than latest v4.0 for querying credit batches.
    if (expLedger) {
      if (creditClassId) {
        if (!params) {
          params = new URLSearchParams();
        }
        params.set('class_id', creditClassId);
      }
      const { data } = await axios.get(
        `${ledgerRESTUri}/regen/ecocredit/v1alpha1/batches`,
        {
          params,
        },
      );
      return data;
    } else {
      // With regen-ledger v4.0, we first have to query all classes and then batches per class.
      // The url pagination params are just ignored here since they can't really be used.
      // Indeed we cannot know in advance how many credit classes should be queried initially
      // to get the desired number of credit batches.
      let batchInfos: BatchInfo[] = [];
      if (!creditClassId) {
        const { classes } = await queryEcoClasses();
        const arr = await Promise.all(
          classes.map(async creditClass => {
            const { batches } = await queryBatchesByClass({
              client,
              request: { classId: creditClass.id },
            });
            return batches;
          }),
        );

        batchInfos = arr.flat();
      } else {
        const { batches } = await queryBatchesByClass({
          client,
          request: { classId: creditClassId },
        });
        return batches;
      }

      return batchInfos;
    }
  } catch (err) {
    throw new Error(`Error fetching batches: ${err}`);
  }
};

export const isVCSCreditClass = (creditClassId?: string): boolean => {
  return creditClassId === 'C01';
};
