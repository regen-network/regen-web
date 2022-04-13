import axios, { AxiosResponse } from 'axios';
import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import qs from 'querystring';

import {
  QueryClientImpl as BankQueryClient,
  QueryDenomMetadataResponse,
  QueryBalanceResponse,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import {
  QueryClientImpl as BasketQueryClient,
  QueryBasketResponse,
  QueryBasketsResponse,
  QueryBasketBalancesResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { expLedger, ledgerRESTUri } from '../lib/ledger';
import type { PageResponse } from '../types/ledger/base';
import type {
  BatchInfo,
  QueryBatchInfoResponse,
  BatchInfoWithSupply,
  QuerySupplyResponse,
  BatchTotalsForProject,
  QueryBalanceResponse as QueryBalanceResponseV0,
  QueryClassesResponse,
  QueryBasketBalancesResponse as QueryBasketBalancesResponseV0,
  QueryBasketResponse as QueryBasketResponseV0,
  BatchInfoWithBalance,
  QueryBatchesResponse,
  QueryClassInfoResponse,
  BasketBalance,
  BatchInfoWithProject,
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

export const getBasketBalancesWithBatchInfo = async (
  balances: BasketBalance[],
): Promise<BatchInfoWithProject[]> => {
  try {
    const batches = await Promise.all(
      balances.map(batchBalance => queryEcoBatchInfo(batchBalance.batchDenom)),
    );
    // TODO: fetch the project name / display name, corresponding to the batch
    const projectName = 'cavan-station';
    const projectDisplayName = 'Cavan Station';
    const batchesWithProject = batches.map(batch => ({
      project_name: projectName,
      project_display: projectDisplayName,
      ...batch.info,
    }));
    return batchesWithProject;
  } catch (err) {
    throw new Error(`Could not get basket balances with batch info ${err}`);
  }
};

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
): Promise<AxiosResponse<QueryClassesResponse>> => {
  return axios.get(`${ledgerRESTUri}/regen/ecocredit/v1alpha1/classes`, {
    params,
  });
};

export const queryEcoBatches = async (
  creditClassId?: string,
  params?: URLSearchParams,
): Promise<QueryBatchesResponse> => {
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
): Promise<QueryBatchInfoResponse> => {
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

export async function getBasket(
  basketDenom: string,
): Promise<QueryBasketResponseV0> {
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
): Promise<QueryBasketBalancesResponseV0> {
  return Promise.resolve({
    balances: [
      {
        basketId: 'basket-1',
        batchDenom: 'C01-20180101-20200101-001',
        balance: '17000',
      },
      {
        basketId: 'basket-1',
        batchDenom: 'C01-20190101-20210101-002',
        balance: '23000',
      },
      {
        basketId: 'basket-1',
        batchDenom: 'C01-20210909-20220101-003',
        balance: '30000',
      },
    ],
  });
}

export const queryEcoClassInfo = async (
  class_id: string,
): Promise<QueryClassInfoResponse> => {
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
 * REGEN LEDGER API QUERIES
 *
 */

/**
 *
 * BANK MODULE QUERIES
 * -------------------
 *  - AllBalances (TODO)
 *  - Balance
 *  - DenomMetadata
 *  - DenomsMetadata (TODO)
 *
 */

// Denom Metadata

export type QueryDenomMetadataProps = {
  client: BankQueryClient;
  denom: string;
};

export const queryDenomMetadata = async ({
  client,
  denom,
}: QueryDenomMetadataProps): Promise<
  QueryDenomMetadataResponse | undefined
> => {
  try {
    const metadata = await client.DenomMetadata({ denom });
    return metadata;
  } catch (err) {
    // return err as Error;
    // throw new Error('queryDenomMetadata');
    return;
  }
};

// Balance

export type QueryBalanceProps = {
  client: BankQueryClient;
  address: string;
  denom: string;
};

export const queryBalance = async ({
  client,
  address,
  denom,
}: QueryBalanceProps): Promise<QueryBalanceResponse | undefined> => {
  try {
    const balance = await client.Balance({ address, denom });
    return balance;
  } catch (err) {
    // return err as Error;
    // throw new Error('queryBalance');
    return;
  }
};

/**
 *
 * BASKET MODULE QUERIES
 * ---------------------
 *  - Basket
 *  - Baskets
 *  - BasketBalances
 *  - BasketBalance (TODO)
 *
 */

// Basket

export type QueryBasketProps = {
  client: BasketQueryClient;
  basketDenom: string;
  // params: {
  //   basketDenom: string;
  // };
};

export const queryBasket = async ({
  client,
  basketDenom,
}: // params: { basketDenom },
QueryBasketProps): Promise<QueryBasketResponse | Error> => {
  try {
    return await client.Basket({ basketDenom });
  } catch (err) {
    return err as Error;
  }
};

// Baskets

export type QueryBasketsProps = {
  client: BasketQueryClient;
};

export const queryBaskets = async ({
  client,
}: QueryBasketsProps): Promise<QueryBasketsResponse | Error> => {
  try {
    return await client.Baskets({});
  } catch (err) {
    return err as Error;
  }
};

// Basket Balances

export type QueryBasketBalancesProps = {
  client: BasketQueryClient;
  basketDenom: string;
};

export const queryBasketBalances = async ({
  client,
  basketDenom,
}: QueryBasketBalancesProps): Promise<QueryBasketBalancesResponse | Error> => {
  try {
    return await client.BasketBalances({ basketDenom });
  } catch (err) {
    return err as Error;
  }
};
