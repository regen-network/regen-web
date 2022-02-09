import axios, { AxiosResponse } from 'axios';
import qs from 'querystring';
import { ledgerRestUri } from '../ledger';
import {
  BatchDataResponse,
  BatchPagination,
  BatchRowData,
  EcocreditAccountBalance,
} from '../types/ledger';

const ECOCREDIT_MESSAGE_TYPES = {
  SEND: "message.action='/regen.ecocredit.v1alpha1.MsgSend'",
  CREATE_BATCH: "message.action='/regen.ecocredit.v1alpha1.MsgCreateBatch'",
  CREATE_CLASS: "message.action='/regen.ecocredit.v1alpha1.MsgCreateClass'",
  CANCEL: "message.action='/regen.ecocredit.v1alpha1.MsgCancel'",
  RETIRE: "message.action='/regen.ecocredit.v1alpha1.MsgRetire'",
};

export const getBatches = async (
  params?: URLSearchParams,
): Promise<
  AxiosResponse<{
    pagination: BatchPagination;
    batches: BatchRowData[];
  }>
> => {
  return axios.get(`${ledgerRestUri}/regen/ecocredit/v1alpha1/batches`, {
    params,
  });
};

export const getBatchSupply = (batchDenom: string): Promise<AxiosResponse> => {
  return axios.get(
    `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/supply`,
  );
};

export const getAccountEcocreditsForBatch = (
  batchDenom: string,
  account: string,
): Promise<AxiosResponse<EcocreditAccountBalance>> => {
  return axios.get(
    `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/balance/${account}`,
  );
};

export const getTxs = async (
  paginationParams?: URLSearchParams,
): Promise<any[]> => {
  let allTxs: any[] = [];

  // TODO: until ledger API supports "message.module='ecocredit'", we must send separate requests for each message action type:
  return Promise.all(
    Object.values(ECOCREDIT_MESSAGE_TYPES).map(async msgType => {
      return axios
        .get(`${ledgerRestUri}/cosmos/tx/v1beta1/txs`, {
          params: {
            events: [msgType],
          },
          paramsSerializer: params => {
            return qs.stringify(params);
          },
        })
        .then(({ data }) => {
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
  return getBatches(params).then(async res => {
    const creditBatches = res?.data?.batches;
    const batchesWithSupply = await addSupplyDataToBatch(creditBatches);
    return {
      data: batchesWithSupply,
      pagination: res?.data?.pagination,
    };
  });
};

export const addSupplyDataToBatch = (
  batches: BatchRowData[],
): Promise<BatchRowData[]> => {
  return Promise.all(
    batches.map(async batch => {
      try {
        const { data } = await getBatchSupply(batch.batch_denom);
        if (data) {
          batch.tradable_supply = data.tradable_supply;
          batch.retired_supply = data.retired_supply;
        }
        return batch;
      } catch (err) {
        return batch;
      }
    }),
  );
};
