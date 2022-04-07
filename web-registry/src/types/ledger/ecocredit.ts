import type { PageResponse, PageRequest } from './base';

/** Map keys from another type to values of number type */
type MapToNumber<T> = { [K in keyof T]: number };

/** combines the ledger `BatchInfo` with ledger `QuerySupplyResponse` */
export interface BatchInfoWithSupply extends BatchInfo, QuerySupplyResponse {}

/** combines the ledger `BatchInfo` with ledger `QueryBalanceResponse` */
export interface BatchInfoWithBalance extends BatchInfo, QueryBalanceResponse {}

/** combines the ledger `BatchInfo` with the corresponding project name */
export interface BatchInfoWithProject extends BatchInfo {
  project_name: string;
  project_display: string;
}

export interface TableBaskets extends Basket, BankQueryBalanceResponse {
  displayDenom: string;
}

/** `QueryBatchSupplyResponse` + `amount_cancelled` to display summed totals on project page */
export interface BatchTotalsForProject
  extends MapToNumber<QuerySupplyResponse> {
  amount_cancelled: number;
}

// The following interfaces should be removed once we migrate
// the current queries to use regen-js instead of REST

interface Coin {
  denom: string;
  amount: string;
}

interface BankQueryBalanceResponse {
  balance?: Coin;
}

export interface BatchInfo {
  class_id: string;
  metadata: Uint8Array;
  batch_denom: string;
  issuer: string;
  total_amount: number;
  amount_cancelled: number;
  start_date: string | Date;
  end_date: string | Date;
  project_location: string;
}

export interface QueryBatchesResponse {
  batches: BatchInfo[];
  pagination?: PageResponse;
}

export interface QueryBatchInfoRequest {
  batchDenom: string;
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

// regen-js based interfaces (camelCase props)
// remove after api/queries upgrade

export interface Basket {
  id: string;
  basketDenom: string;
  name: string;
  disableAutoRetire: boolean;
  creditTypeAbbrev: string;
  dateCriteria: {
    minStartDate?: string;
    startDateWindow?: string;
  };
  exponent: string;
}

export interface QueryBasketRequest {
  basketDenom: string;
}

export interface QueryBasketResponse {
  basket?: Basket;
  classes: string[];
}

export interface QueryBasketsResponse {
  baskets: Basket[];
  pagination?: PageResponse;
}

export interface BasketBalance {
  basketId: string | Long;
  batchDenom: string;
  balance: string;
  batchStartDate?: string | Date;
}

export interface QueryBasketBalancesRequest {
  basketDenom: string;
  pagination?: PageRequest;
}

export interface QueryBasketBalancesResponse {
  balances: BasketBalance[];
  pagination?: PageResponse;
}

// REST based interfaces (snake_case props)

export interface ClassInfo {
  /**
   *  class_id is the unique ID of credit class.
   */
  class_id: string;
  /**
   *  admin is the designer of the credit class. In Hambach, this is identified as "designer".
   */
  admin?: string;
  designer?: string;
  /**
   *  issuers are the approved issuers of the credit class.
   */
  issuers: string[];
  /**
   *  metadata is a hashed IRI that can be used to fetch JSON-LD from the metadata-graph DB table
   */
  metadata: Uint8Array;
  credit_type: CreditType;
}

export interface QueryClassInfoResponse {
  info?: ClassInfo;
}

interface CreditType {
  abbreviation: string;
  name: string;
  precision: number;
  unit: string;
}

export interface QueryClassesResponse {
  classes: ClassInfo[];
  pagination?: PageResponse;
}

// TODO: pull these types from credit-class shacl schema
export interface ApprovedMethodologyList {
  '@type': 'schema:BreadcrumbList';
  'schema:itemListElement': ApprovedMethodology[];
  'schema:url': {
    '@type': string;
    '@value': string;
  };
}

interface ApprovedMethodology {
  '@type': 'regen:Methodology';
  'schema:name': string;
  'schema:url': {
    '@type': string;
    '@value': string;
  };
}
