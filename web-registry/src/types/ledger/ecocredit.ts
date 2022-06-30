import type { PageResponse } from './base';
import {
  QueryClientImpl,
  DeepPartial,
  QueryBalanceRequest,
  QueryBalanceResponse,
  QueryBatchesByClassRequest,
  QueryBatchesByClassResponse,
  QueryBatchRequest,
  QueryBatchResponse,
  QueryClassesRequest,
  QueryClassesResponse,
  QueryClassRequest,
  QueryClassResponse,
  QueryCreditTypesRequest,
  QueryCreditTypesResponse,
  QuerySupplyResponse,
  BatchInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

/** Map keys from another type to values of number type */
type MapToNumber<T> = { [K in keyof T]: number };

/** `QuerySupplyResponse`  */
export interface BatchTotalsForProject
  extends MapToNumber<Omit<QuerySupplyResponse, '$type'>> {}

export interface IBatchInfo extends Omit<BatchInfo, '$type'> {}

// /** combines the ledger `BatchInfo` with ledger `QueryBalanceResponse` */
export interface IBatchInfoWithBalance
  extends IBatchInfo,
    Omit<QueryBalanceResponse, '$type'> {}

// /** combines the ledger `BatchInfo` with ledger `QuerySupplyResponse` */
export interface IBatchInfoWithSupply
  extends IBatchInfo,
    Omit<QuerySupplyResponse, '$type'> {
  txhash?: string;
  classId?: string;
}

// The following interfaces should be removed once we migrate
// the current queries to use regen-js instead of REST

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

// export interface QuerySupplyResponse {
//   tradable_supply: string;
//   retired_supply: string;
// }

// export interface QueryBalanceResponse {
//   tradable_amount: string;
//   retired_amount: string;
// }

// REST based interfaces (snake_case props)
// remove after api/queries upgrade

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
  metadata: string;
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

// export interface QueryClassesResponse {
//   classes: ClassInfo[];
//   pagination?: PageResponse;
// }
