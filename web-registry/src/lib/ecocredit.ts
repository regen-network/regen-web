import axios, { AxiosResponse } from 'axios';
import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import qs from 'querystring';

import { ledgerRestUri } from '../ledger';
import type {
  BatchData,
  BatchDataResponse,
  BatchByDenomResponse,
  BatchRowData,
  BatchSupplyResponse,
  BatchTotalsForProject,
  QueryBalanceResponse,
  TableCredits,
} from '../types/ledger/ecocredit';
import type { PageResponse } from '../types/ledger/base';

const ECOCREDIT_MESSAGE_TYPES = {
  SEND: "message.action='/regen.ecocredit.v1alpha1.MsgSend'",
  CREATE_BATCH: "message.action='/regen.ecocredit.v1alpha1.MsgCreateBatch'",
  CREATE_CLASS: "message.action='/regen.ecocredit.v1alpha1.MsgCreateClass'",
  CANCEL: "message.action='/regen.ecocredit.v1alpha1.MsgCancel'",
  RETIRE: "message.action='/regen.ecocredit.v1alpha1.MsgRetire'",
};

export const getBatches = async (
  params?: URLSearchParams,
): Promise<{
  pagination: PageResponse;
  batches: BatchData[];
}> => {
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

export const getBatchByDenom = async (
  denom: string,
): Promise<BatchByDenomResponse> => {
  try {
    const { data } = await axios.get(
      `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${denom}`,
    );
    return data;
  } catch (err) {
    throw new Error(`Error fetching batch by denom: ${denom}, err: ${err}`);
  }
};

export const getBatchSupply = async (
  batchDenom: string,
): Promise<BatchSupplyResponse> => {
  try {
    const { data } = await axios.get(
      `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/supply`,
    );
    return data;
  } catch (err) {
    throw new Error(`Error fetching batch supply: ${err}`);
  }
};

export const getBatchWithSupplyForDenom = async (
  denom: string,
): Promise<BatchRowData> => {
  try {
    const { info } = await getBatchByDenom(denom);
    const supply = await getBatchSupply(denom);
    return { ...info, ...supply };
  } catch (err) {
    throw new Error(
      `Could not get batches with supply for denom ${denom}, ${err}`,
    );
  }
};

export const getBatchesWithSupplyForDenoms = async (
  denoms: string[],
): Promise<{
  batches: BatchRowData[];
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
): Promise<TableCredits[]> => {
  try {
    const { batches } = await getBatches();
    const credits = await Promise.all(
      batches.map(async batch => {
        const credits = await getAccountEcocreditsForBatch(
          batch.batch_denom,
          account,
        );
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
): Promise<BatchDataResponse> => {
  return getBatches(params).then(async ({ batches, pagination }) => {
    // const creditBatches = data?.batches;
    const batchesWithSupply = await addSupplyDataToBatch(batches);
    return {
      data: batchesWithSupply,
      pagination: pagination,
    };
  });
};

export const addSupplyDataToBatch = (
  batches: BatchData[],
): Promise<BatchRowData[]> => {
  try {
    return Promise.all(
      batches.map(async batch => {
        const data = await getBatchSupply(batch.batch_denom);
        return { ...batch, ...data };
      }),
    );
  } catch (err) {
    throw new Error('Could not add supply to batches batches');
  }
};

const getAccountEcocreditsForBatch = async (
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
      `Error fetching account ecocredits for batch ${batchDenom}`,
    );
  }
};
