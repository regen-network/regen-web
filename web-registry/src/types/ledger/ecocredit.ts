import type { PageResponse } from './base';
import type { QueryBalanceResponse as BankQueryBalanceResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

/** Map keys from another type to values of number type */
type MapToNumber<T> = { [K in keyof T]: number };

// Response structure based on https://buf.build/regen/regen-ledger

/** combines the ledger `BatchInfo` with ledger `QuerySupplyResponse` */
export interface BatchInfoWithSupply extends BatchInfo, QuerySupplyResponse {}

/** combines the ledger `BatchInfo` with ledger `QueryBalanceResponse` */
export interface BatchInfoWithBalance extends BatchInfo, QueryBalanceResponse {}

export interface TableBaskets extends Basket, BankQueryBalanceResponse {
  display_denom: string;
}

/** `QueryBatchSupplyResponse` + `amount_cancelled` to display summed totals on project page */
export interface BatchTotalsForProject
  extends MapToNumber<QuerySupplyResponse> {
  amount_cancelled: number;
}

// The following interfaces should be removed once we migrate
// the current queries to use regen-js instead of REST

export interface BatchInfo {
  start_date: string | Date;
  end_date: string | Date;
  issuer: string;
  batch_denom: string;
  class_id: string;
  total_amount: number;
  amount_cancelled: number;
  project_location: string;
}

export interface QueryBatchesResponse {
  batches: BatchInfo[];
  pagination: PageResponse;
}

export interface QueryBatchInfoResponse {
  info: BatchInfo;
}

export interface QuerySupplyResponse {
  tradable_supply: string;
  retired_supply: string;
}

export interface QueryBalanceResponse {
  tradable_amount: string;
  retired_amount: string;
}

export interface Basket {
  id: string;
  basket_denom: string;
  name: string;
  disable_auto_retire: boolean;
  credit_type_abbrev: string;
  date_criteria: {
    min_start_date?: string;
    start_date_window?: string;
  };
  exponent: string;
}

export interface QueryBasketsResponse {
  baskets: Basket[];
  pagination?: PageResponse;
}
