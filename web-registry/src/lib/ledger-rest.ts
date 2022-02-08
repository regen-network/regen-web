import axios, { AxiosResponse } from 'axios';
import { ledgerRestUri } from '../ledger';
import {
  BatchPagination,
  BatchRowData,
  EcocreditAccountBalance,
} from '../types/ledger';

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

export const getAccontEcocreditsForBatch = (
  batchDenom: string,
  account: string,
): Promise<AxiosResponse<EcocreditAccountBalance>> => {
  return axios.get(
    `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/balance/${account}`,
  );
};
