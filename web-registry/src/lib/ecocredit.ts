import axios, { AxiosResponse } from 'axios';
import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import qs from 'querystring';

import { expLedger, ledgerRESTUri } from '../lib/ledger';
import type {
  BatchDataResponse,
  BatchRowData,
  QueryBalanceResponse,
  TableCredits,
  QueryClassesResponse,
} from '../types/ledger/ecocredit';
import type { PageResponse } from '../types/ledger/base';

const ECOCREDIT_MESSAGE_TYPES = {
  SEND: "message.action='/regen.ecocredit.v1alpha1.MsgSend'",
  CREATE_BATCH: "message.action='/regen.ecocredit.v1alpha1.MsgCreateBatch'",
  CREATE_CLASS: "message.action='/regen.ecocredit.v1alpha1.MsgCreateClass'",
  CANCEL: "message.action='/regen.ecocredit.v1alpha1.MsgCancel'",
  RETIRE: "message.action='/regen.ecocredit.v1alpha1.MsgRetire'",
};

export const getClasses = async (
  params?: URLSearchParams,
): Promise<AxiosResponse<QueryClassesResponse>> => {
  return axios.get(`${ledgerRESTUri}/regen/ecocredit/v1alpha1/classes`, {
    params,
  });
};

export const getBatches = async (
  params?: URLSearchParams,
): Promise<{
  pagination?: PageResponse;
  batches: BatchRowData[];
}> => {
  // Currently, the experimental testnet Hambach is running an old version of regen-ledger (v2.0.0-beta1)
  // which provides a different API than latest v3.0 for querying credit batches.
  if (expLedger) {
    const { data } = await axios.get(
      `${ledgerRESTUri}/regen/ecocredit/v1alpha1/batches`,
      {
        params,
      },
    );
    return data;
  } else {
    // With 3.0 regen-ledger version, we first have to query all classes and then batches per class.
    // The url pagination params are just ignored here since they can't really be used.
    // Indeed we cannot know in advance how many credit classes should be queried initially
    // to get the desired number of credit batches.
    // We're still return some custom built pagination response so that the TablePagination
    // still displays correct total values of credit batches.
    const {
      data: { classes },
    } = await getClasses();
    const arr: BatchRowData[] = await Promise.all(
      classes.map(async c => {
        const { data } = await axios.get(
          `${ledgerRESTUri}/regen/ecocredit/v1alpha1/classes/${c.class_id}/batches`,
        );
        return data.batches;
      }),
    );

    const batches = arr.flat();
    return {
      batches,
      pagination: { total: batches.length.toString(), next_key: null },
    };
  }
};

export const getBatchSupply = (batchDenom: string): Promise<AxiosResponse> => {
  return axios.get(
    `${ledgerRESTUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/supply`,
  );
};

export const getEcocreditsForAccount = async (
  account: string,
): Promise<TableCredits[]> => {
  const { batches } = await getBatches();
  const credits = await Promise.all(
    batches.map(async batch => {
      const {
        data: { retired_amount, tradable_amount },
      } = await getAccountEcocreditsForBatch(batch.batch_denom, account);
      return {
        ...batch,
        tradable_amount,
        retired_amount,
      };
    }),
  );
  // filter out batches that don't have any credits
  const filteredCredits = credits.filter(
    c => +c.tradable_amount > 0 || +c.retired_amount > 0,
  );
  return filteredCredits;
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
  return getBatches(params).then(async res => {
    const creditBatches = res?.batches;
    const batchesWithSupply = await addSupplyDataToBatch(creditBatches);
    return {
      data: batchesWithSupply,
      pagination: res?.pagination,
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

const getAccountEcocreditsForBatch = (
  batchDenom: string,
  account: string,
): Promise<AxiosResponse<QueryBalanceResponse>> => {
  return axios.get(
    `${ledgerRESTUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/balance/${account}`,
  );
};
