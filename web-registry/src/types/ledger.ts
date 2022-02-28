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
  pagination?: BatchPagination;
}

export interface BatchPagination {
  next_key: string;
  total: string;
}

export interface EcocreditAccountBalance {
  tradable_amount: string;
  retired_amount: string;
}

export interface EcocreditTableData
  extends BatchRowData,
    EcocreditAccountBalance {}
