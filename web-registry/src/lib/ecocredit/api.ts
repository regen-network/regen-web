import axios from 'axios';
import { uniq } from 'lodash';
import {
  QueryClientImpl,
  DeepPartial,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryBatchesByClassRequest,
  QueryBatchesByClassResponse,
  QueryBatchRequest,
  QueryBatchResponse,
  QueryClassesRequest,
  QueryClassesResponse,
  QueryClassRequest,
  QueryClassResponse,
  QueryCreditTypesRequest,
  QueryCreditTypesResponse,
  QuerySupplyResponse,
  BatchInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import { PageResponse } from '@regen-network/api/lib/generated/cosmos/base/query/v1beta1/pagination';
import {
  ServiceClientImpl,
  GetTxsEventRequest,
  GetTxsEventResponse,
} from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';

import { ECOCREDIT_MESSAGE_TYPES, messageActionEquals } from './constants';
import { connect as connectToApi } from '../../ledger';
import { expLedger, ledgerRESTUri } from '../ledger';
import type {
  IBatchInfoWithBalance,
  IBatchInfoWithSupply,
  BatchTotalsForProject,
} from '../../types/ledger/ecocredit';

// helpers for combining ledger queries (currently rest, regen-js in future)
// into UI data structures

const getQueryClient = async (): Promise<QueryClientImpl> => {
  const api = await connectToApi();
  if (!api || !api?.queryClient) return Promise.reject();
  return new QueryClientImpl(api.queryClient);
};

export const getBatchesTotal = async (
  batches: IBatchInfoWithSupply[],
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
): Promise<IBatchInfoWithBalance[]> => {
  try {
    const batches = await queryEcoBatches();
    const credits = await Promise.all(
      batches.map(async batch => {
        const credits = await queryEcoBalance(batch.denom, account);
        return {
          ...batch,
          ...credits,
        };
      }),
    );
    // filter out batches that don't have any credits
    const filteredCredits = credits.filter(c => Number(c.balance) > 0);
    return filteredCredits;
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
  data: IBatchInfoWithSupply[];
  pagination?: PageResponse;
}> => {
  return queryEcoBatches(creditClassId, params).then(async batches => {
    const batchesWithData = await addDataToBatch(batches);
    return {
      data: batchesWithData,
      // pagination: pagination, TODO
    };
  });
};

/* Adds Tx Hash and supply info to batch for use in tables */
export const addDataToBatch = async (
  batches: BatchInfo[],
): Promise<IBatchInfoWithSupply[]> => {
  try {
    const txs = await getTxsByEvent({
      events: [
        `${messageActionEquals}'${ECOCREDIT_MESSAGE_TYPES.CREATE_BATCH.message}'`,
      ],
    });
    return Promise.all(
      batches.map(async batch => {
        const supplyData = await queryEcoBatchSupply(batch.denom);
        const txhash = getTxHashForBatch(txs.txResponses, batch.denom);
        return { ...batch, ...supplyData, txhash };
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

export const getBatchWithSupplyForDenom = async (
  denom: string,
): Promise<IBatchInfoWithSupply> => {
  try {
    const { batch } = await queryEcoBatchInfo(denom);
    const supply = await queryEcoBatchSupply(denom);
    const batchWithSupply = {
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

// the following consume Regen REST endpoints - will be replaced with regen-js

export const queryEcoClasses = async (
  params?: URLSearchParams,
): Promise<QueryClassesResponse> => {
  const client = await getQueryClient();
  return client.Classes({});
};

export const queryEcoBatches = async (
  creditClassId?: string | null,
  params?: URLSearchParams,
): Promise<BatchInfo[]> => {
  const client = await getQueryClient();
  try {
    // Currently, the experimental testnet Hambach is running an old version of regen-ledger (v2.0.0-beta1)
    // which provides a different API than latest v3.0 for querying credit batches.
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
      // With regen-ledger v3.0, we first have to query all classes and then batches per class.
      // The url pagination params are just ignored here since they can't really be used.
      // Indeed we cannot know in advance how many credit classes should be queried initially
      // to get the desired number of credit batches.
      let batches: BatchInfo[] = [];
      if (!creditClassId) {
        const { classes } = await queryEcoClasses();
        const arr = await Promise.all(
          classes.map(async c => {
            const data = await client.BatchesByClass({ classId: c.id });
            return data.batches;
          }),
        );

        batches = arr.flat();
      } else {
        const data = await client.BatchesByClass({ classId: creditClassId });
        batches = data.batches;
      }

      return batches;
    }
  } catch (err) {
    throw new Error(`Error fetching batches: ${err}`);
  }
};

export const queryEcoBatchInfo = async (
  denom: string,
): Promise<QueryBatchResponse> => {
  const client = await getQueryClient();

  try {
    const data = client.Batch({ batchDenom: denom });
    return data;
  } catch (err) {
    throw new Error(`Error fetching batch by denom: ${denom}, err: ${err}`);
  }
};

export const queryEcoBatchSupply = async (
  batchDenom: string,
): Promise<QuerySupplyResponse> => {
  const client = await getQueryClient();
  try {
    const data = await client.Supply({ batchDenom });
    return data;
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
    const data = await client.Balance({ address, batchDenom });
    return data;
  } catch (err) {
    throw new Error(
      `Error fetching account ecocredits for batch ${batchDenom}, address ${address}, err: ${err}`,
    );
  }
};

export const getTxsByEvent = async (
  request: DeepPartial<GetTxsEventRequest>,
): Promise<GetTxsEventResponse> => {
  const api = await connectToApi();
  if (!api || !api?.queryClient) return Promise.reject();
  const queryClient = new ServiceClientImpl(api.queryClient);
  if (!queryClient) return Promise.reject();

  try {
    return queryClient.GetTxsEvent(request);
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
    const data = await client.Class({ classId });
    return data;
  } catch (err) {
    throw new Error(`Error fetching class info: ${err}`);
  }
};

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
 *  - Params        (TODO)
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

export type EcocreditQueryProps =
  | BalanceParams
  | BatchInfoParams
  | BatchesParams
  | ClassInfoParams
  | ClassesParams
  | CreditTypesParams;

// typing the response

export type EcocreditQueryResponse =
  | QueryBalanceResponse
  | QueryBatchResponse
  | QueryBatchesByClassResponse
  | QueryClassResponse
  | QueryClassesResponse
  | QueryCreditTypesResponse;

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

export const queryBatches = async ({
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

// export declare class QueryClientImpl implements Query {
//   private readonly rpc;
//   constructor(rpc: Rpc);
//   Classes(request: DeepPartial<QueryClassesRequest>): Promise<QueryClassesResponse>;
//   ClassesByAdmin(request: DeepPartial<QueryClassesByAdminRequest>): Promise<QueryClassesByAdminResponse>;
//   Class(request: DeepPartial<QueryClassRequest>): Promise<QueryClassResponse>;
//   ClassIssuers(request: DeepPartial<QueryClassIssuersRequest>): Promise<QueryClassIssuersResponse>;
//   Projects(request: DeepPartial<QueryProjectsRequest>): Promise<QueryProjectsResponse>;
//   ProjectsByClass(request: DeepPartial<QueryProjectsByClassRequest>): Promise<QueryProjectsByClassResponse>;
//   ProjectsByReferenceId(request: DeepPartial<QueryProjectsByReferenceIdRequest>): Promise<QueryProjectsByReferenceIdResponse>;
//   ProjectsByAdmin(request: DeepPartial<QueryProjectsByAdminRequest>): Promise<QueryProjectsByAdminResponse>;
//   Project(request: DeepPartial<QueryProjectRequest>): Promise<QueryProjectResponse>;
//   Batches(request: DeepPartial<QueryBatchesRequest>): Promise<QueryBatchesResponse>;
//   BatchesByIssuer(request: DeepPartial<QueryBatchesByIssuerRequest>): Promise<QueryBatchesByIssuerResponse>;
//   BatchesByClass(request: DeepPartial<QueryBatchesByClassRequest>): Promise<QueryBatchesByClassResponse>;
//   BatchesByProject(request: DeepPartial<QueryBatchesByProjectRequest>): Promise<QueryBatchesByProjectResponse>;
//   Batch(request: DeepPartial<QueryBatchRequest>): Promise<QueryBatchResponse>;
//   Balance(request: DeepPartial<QueryBalanceRequest>): Promise<QueryBalanceResponse>;
//   Balances(request: DeepPartial<QueryBalancesRequest>): Promise<QueryBalancesResponse>;
//   Supply(request: DeepPartial<QuerySupplyRequest>): Promise<QuerySupplyResponse>;
//   CreditTypes(request: DeepPartial<QueryCreditTypesRequest>): Promise<QueryCreditTypesResponse>;
//   Params(request: DeepPartial<QueryParamsRequest>): Promise<QueryParamsResponse>;
// }
