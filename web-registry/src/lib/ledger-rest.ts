import axios, { AxiosResponse } from 'axios';
import { ledgerRestUri } from '../ledger';

export const getBatches = async (
  params?: URLSearchParams,
): Promise<AxiosResponse> => {
  return axios.get(`${ledgerRestUri}/regen/ecocredit/v1alpha1/batches`, {
    params,
  });
};

export const getBatchSupply = (batchDenom: string): Promise<AxiosResponse> => {
  return axios.get(
    `${ledgerRestUri}/regen/ecocredit/v1alpha1/batches/${batchDenom}/supply`,
  );
};
