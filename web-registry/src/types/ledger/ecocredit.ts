import type { PageResponse } from './base';
import type { QueryBalanceResponse as BankQueryBalanceResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

// Response structure based on https://buf.build/regen/regen-ledger
export interface BatchRowData {
  start_date: string | Date;
  end_date: string | Date;
  issuer: string;
  batch_denom: string;
  class_id: string;
  total_amount: number;
  tradable_supply?: number;
  retired_supply?: number;
  amount_cancelled: number;
  project_location: string;
}

export interface BatchDataResponse {
  data: BatchRowData[];
  pagination?: PageResponse;
}

export interface TableCredits extends BatchRowData, QueryBalanceResponse {}

export interface TableBaskets extends Basket, BankQueryBalanceResponse {
  display_denom: string;
}

// The following interfaces should be removed once we migrate
// the current queries to use regen-js instead of REST
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
  pagination: PageResponse;
}

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

interface CreditType {
  abbreviation: string;
  name: string;
  precision: number;
  unit: string;
}

export interface QueryClassesResponse {
  classes: ClassInfo[];
  pagination: PageResponse;
}
