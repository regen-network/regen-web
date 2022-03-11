import axios, { AxiosResponse } from 'axios';
import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import qs from 'querystring';

import { ledgerRestUri } from '../ledger';
import type { PageResponse } from '../types/ledger/base';
import type {
  BatchInfo,
  QueryBatchInfoResponse,
  BatchInfoWithSupply,
  QuerySupplyResponse,
  BatchTotalsForProject,
  QueryBalanceResponse,
  QueryBasketBalancesResponse,
  QueryBasketResponse,
  BatchInfoWithBalance,
  QueryBatchesResponse,
  QueryClassInfoResponse,
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
  params?: URLSearchParams,
): Promise<{
  data: BatchInfoWithSupply[];
  pagination?: PageResponse;
}> => {
  return queryEcoBatches(params).then(async ({ batches, pagination }) => {
    const batchesWithSupply = await addSupplyDataToBatch(batches);
    return {
      data: batchesWithSupply,
      pagination: pagination,
    };
  });
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

export const queryEcoBatches = async (
  params?: URLSearchParams,
): Promise<QueryBatchesResponse> => {
  try {
    const { data } = await axios.get(
      `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches`,
      {
        params,
      },
    );
    return data;
  } catch (err) {
    throw new Error(`Error fetching batches: ${err}`);
  }
};

export const queryEcoBatchInfo = async (
  denom: string,
): Promise<QueryBatchInfoResponse> => {
  try {
    const { data } = await axios.get(
      `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${denom}`,
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
      `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/supply`,
    );
    return data;
  } catch (err) {
    throw new Error(`Error fetching batch supply: ${err}`);
  }
};

const queryEcoBalance = async (
  batchDenom: string,
  account: string,
): Promise<QueryBalanceResponse> => {
  try {
    const { data } = await axios.get<QueryBalanceResponse>(
      `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/balance/${account}`,
    );
    return data;
  } catch (err) {
    throw new Error(
      `Error fetching account ecocredits for batch ${batchDenom}, account ${account}, err: ${err}`,
    );
  }
};

export const getTxsByEvent = (msgType: string): Promise<AxiosResponse> => {
  return axios.get(`${ledgerRestUri}/cosmos/tx/v1beta1/txs`, {
    params: {
      events: [msgType],
    },
    paramsSerializer: params => {
      return qs.stringify(params);
    },
  });
};

export async function getBasket(
  basketDenom: string,
): Promise<QueryBasketResponse> {
  return Promise.resolve({
    basket: {
      id: 'basket-1',
      basketDenom: 'eco.uC.rNCT',
      name: 'rNCT',
      disableAutoRetire: false,
      creditTypeAbbrev: 'C',
      dateCriteria: {
        minStartDate: '2022-06-01T00:00:00Z',
      },
      exponent: '6',
    },
    classes: ['C01', 'C02'],
  });
}

export async function getBasketBalances(
  basketDenom: string,
): Promise<QueryBasketBalancesResponse> {
  return Promise.resolve({
    balances: [
      {
        basketId: 'basket-1',
        batchDenom: 'C01-20170101-20191231-001',
        balance: '17000',
      },
      {
        basketId: 'basket-1',
        batchDenom: 'C01-20170101-20191231-002',
        balance: '23000',
      },
      {
        basketId: 'basket-1',
        batchDenom: 'C01-20170101-20201231-003',
        balance: '30000',
      },
    ],
  });
}

export async function getBatchInfo(
  batchDenom: string,
): Promise<QueryBatchInfoResponse> {
  return Promise.resolve({
    info: {
      class_id: 'C01',
      batch_denom: 'C01-20170101-20191231-001',
      issuer: 'regen1qdqafsy2jfuyq7rxzkdwyytmrxlfn8csq0uetx',
      total_amount: 13000.0,
      amount_cancelled: 38243.0,
      start_date: '2017-01-01T00:00:00Z',
      end_date: '2019-12-31T00:00:00Z',
      project_location: 'AU-NSW 2453',
    },
  });
}

export const getClassInfo = async (
  class_id: string,
): Promise<QueryClassInfoResponse> => {
  try {
    const { data } = await axios.get(
      `${ledgerRestUri}/regen/ecocredit/v1alpha1/classes/${class_id}`,
    );
    return data;
  } catch (err) {
    throw new Error(`Error fetching class info: ${err}`);
  }
};
