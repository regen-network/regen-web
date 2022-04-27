import axios, { AxiosResponse } from 'axios';
import qs from 'querystring';

import {
  QueryClientImpl,
  DeepPartial,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryBatchesRequest,
  QueryBatchesResponse,
  QueryBatchInfoRequest,
  QueryBatchInfoResponse,
  QueryClassesRequest,
  QueryClassesResponse,
  QueryClassInfoRequest,
  QueryClassInfoResponse,
  QueryCreditTypesRequest,
  QueryCreditTypesResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';

import { expLedger, ledgerRESTUri } from '../lib/ledger';
import type { PageResponse } from '../types/ledger/base';
import type {
  BatchInfo,
  QueryBatchInfoResponse as QueryBatchInfoResponseV0,
  BatchInfoWithSupply,
  QuerySupplyResponse,
  BatchTotalsForProject,
  QueryBalanceResponse as QueryBalanceResponseV0,
  QueryClassesResponse as QueryClassesResponseV0,
  BatchInfoWithBalance,
  QueryBatchesResponse as QueryBatchesResponseV0,
  QueryClassInfoResponse as QueryClassInfoResponseV0,
} from '../types/ledger/ecocredit';

const ECOCREDIT_MESSAGE_TYPES = {
  SEND: "message.action='/regen.ecocredit.v1alpha1.MsgSend'",
  CREATE_BATCH: "message.action='/regen.ecocredit.v1alpha1.MsgCreateBatch'",
  CREATE_CLASS: "message.action='/regen.ecocredit.v1alpha1.MsgCreateClass'",
  CANCEL: "message.action='/regen.ecocredit.v1alpha1.MsgCancel'",
  RETIRE: "message.action='/regen.ecocredit.v1alpha1.MsgRetire'",
};

// helpers for combining ledger queries (currently rest, regen-js in future)
// into UI data structures

export const getBatchesWithSupplyForDenoms = async (
  denoms: string[],
): Promise<{
  batches: BatchInfoWithSupply[];
  totals: BatchTotalsForProject;
}> => {
  try {
    const batches = await Promise.all(
      denoms.map(denom => getBatchWithSupplyForDenom(denom)),
    );
    const totals = batches.reduce(
      (acc, batch) => {
        acc.amount_cancelled += Number(batch?.amount_cancelled ?? 0);
        acc.retired_supply += Number(batch?.retired_supply ?? 0);
        acc.tradable_supply += Number(batch?.tradable_supply ?? 0);
        return acc;
      },
      {
        amount_cancelled: 0,
        retired_supply: 0,
        tradable_supply: 0,
      },
    );
    return { batches, totals };
  } catch (err) {
    throw new Error(
      `Could not get batches with supply for denoms ${denoms}, ${err}`,
    );
  }
};

export const getEcocreditsForAccount = async (
  account: string,
): Promise<BatchInfoWithBalance[]> => {
  try {
    const { batches } = await queryEcoBatches();
    const credits = await Promise.all(
      batches.map(async batch => {
        const credits = await queryEcoBalance(batch.batch_denom, account);
        return {
          ...batch,
          ...credits,
        };
      }),
    );
    // filter out batches that don't have any credits
    const filteredCredits = credits.filter(
      c => Number(c.tradable_amount) > 0 || Number(c.retired_amount) > 0,
    );
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
      return getTxsByEvent(msgType).then(({ data }) => {
        allTxs = [...allTxs, ...data.tx_responses];
      });
    }),
  ).then(() => {
    return allTxs;
  });
};

export const getBatchesWithSupply = async (
  creditClassId?: string,
  params?: URLSearchParams,
): Promise<{
  data: BatchInfoWithSupply[];
  pagination?: PageResponse;
}> => {
  return queryEcoBatches(creditClassId, params).then(
    async ({ batches, pagination }) => {
      const batchesWithSupply = await addSupplyDataToBatch(batches);
      return {
        data: batchesWithSupply,
        pagination: pagination,
      };
    },
  );
};

export const addSupplyDataToBatch = (
  batches: BatchInfo[],
): Promise<BatchInfoWithSupply[]> => {
  try {
    return Promise.all(
      batches.map(async batch => {
        const data = await queryEcoBatchSupply(batch.batch_denom);
        return { ...batch, ...data };
      }),
    );
  } catch (err) {
    throw new Error(`Could not add supply to batches batches: ${err}`);
  }
};

export const getBatchWithSupplyForDenom = async (
  denom: string,
): Promise<BatchInfoWithSupply> => {
  try {
    const { info } = await queryEcoBatchInfo(denom);
    const supply = await queryEcoBatchSupply(denom);
    return { ...info, ...supply };
  } catch (err) {
    throw new Error(
      `Could not get batches with supply for denom ${denom}, ${err}`,
    );
  }
};

// the following consume Regen REST endpoints - will be replaced with regen-js

export const queryEcoClasses = async (
  params?: URLSearchParams,
): Promise<AxiosResponse<QueryClassesResponseV0>> => {
  return axios.get(`${ledgerRESTUri}/regen/ecocredit/v1alpha1/classes`, {
    params,
  });
};

export const queryEcoBatches = async (
  creditClassId?: string,
  params?: URLSearchParams,
): Promise<QueryBatchesResponseV0> => {
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
        const {
          data: { classes },
        } = await queryEcoClasses();
        const arr: BatchInfo[] = await Promise.all(
          classes.map(async c => {
            const { data } = await axios.get(
              `${ledgerRESTUri}/regen/ecocredit/v1alpha1/classes/${c.class_id}/batches`,
            );
            return data.batches;
          }),
        );

        batches = arr.flat();
      } else {
        const { data } = await axios.get(
          `${ledgerRESTUri}/regen/ecocredit/v1alpha1/classes/${creditClassId}/batches`,
        );
        batches = data.batches;
      }

      return {
        batches,
      };
    }
  } catch (err) {
    throw new Error(`Error fetching batches: ${err}`);
  }
};

export const queryEcoBatchInfo = async (
  denom: string,
): Promise<QueryBatchInfoResponseV0> => {
  try {
    const { data } = await axios.get(
      `${ledgerRESTUri}/regen/ecocredit/v1alpha1/batches/${denom}`,
    );
    return data;
  } catch (err) {
    throw new Error(`Error fetching batch by denom: ${denom}, err: ${err}`);
  }
};

export const queryEcoBatchSupply = async (
  batchDenom: string,
): Promise<QuerySupplyResponse> => {
  try {
    const { data } = await axios.get(
      `${ledgerRESTUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/supply`,
    );
    return data;
  } catch (err) {
    throw new Error(`Error fetching batch supply: ${err}`);
  }
};

const queryEcoBalance = async (
  batchDenom: string,
  account: string,
): Promise<QueryBalanceResponseV0> => {
  try {
    const { data } = await axios.get<QueryBalanceResponseV0>(
      `${ledgerRESTUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/balance/${account}`,
    );
    return data;
  } catch (err) {
    throw new Error(
      `Error fetching account ecocredits for batch ${batchDenom}, account ${account}, err: ${err}`,
    );
  }
};

export const getTxsByEvent = (msgType: string): Promise<AxiosResponse> => {
  return axios.get(`${ledgerRESTUri}/cosmos/tx/v1beta1/txs`, {
    params: {
      events: [msgType],
    },
    paramsSerializer: params => {
      return qs.stringify(params);
    },
  });
};

export const queryEcoClassInfo = async (
  class_id: string,
): Promise<QueryClassInfoResponseV0> => {
  try {
    const { data } = await axios.get(
      `${ledgerRESTUri}/regen/ecocredit/v1alpha1/classes/${class_id}`,
    );
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
  params: DeepPartial<QueryBatchInfoRequest>;
};

type BatchesParams = {
  query: 'batches';
  params: DeepPartial<QueryBatchesRequest>;
};

type ClassInfoParams = {
  query: 'classInfo';
  params: DeepPartial<QueryClassInfoRequest>;
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
      account: request.account,
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
  request: DeepPartial<QueryBatchInfoRequest>;
}

export const queryBatchInfo = async ({
  client,
  request,
}: QueryBatchInfoProps): Promise<QueryBatchInfoResponse> => {
  try {
    return await client.BatchInfo({
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
  request: DeepPartial<QueryBatchesRequest>;
}

export const queryBatches = async ({
  client,
  request,
}: QueryBatchesProps): Promise<QueryBatchesResponse> => {
  try {
    return await client.Batches({
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
  request: DeepPartial<QueryClassInfoRequest>;
}

export const queryClassInfo = async ({
  client,
  request,
}: QueryClassInfoProps): Promise<QueryClassInfoResponse> => {
  try {
    return await client.ClassInfo({
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
    return await client.Classes({});
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
    return await client.CreditTypes({});
  } catch (err) {
    throw new Error(
      `Error in the CreditTypes query of the ledger ecocredit module: ${err}`,
    );
  }
};
