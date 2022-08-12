import {
  BatchInfo,
  ProjectInfo,
  QueryBalanceResponse,
  QuerySupplyResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

/** Map keys from another type to values of number type */
type MapToNumber<T> = { [K in keyof T]: number };

/** `QuerySupplyResponse`  */
export interface BatchTotalsForProject
  extends MapToNumber<Omit<QuerySupplyResponse, '$type'>> {}

export interface IBatchInfo extends Omit<BatchInfo, '$type'> {}

// /** combines the ledger `BatchInfo` with ledger `QueryBalanceResponse` */
export interface BatchInfoWithBalance
  extends IBatchInfo,
    Omit<QueryBalanceResponse, '$type'> {
  classId?: string;
  projectLocation?: string;
}

// /** combines the ledger `BatchInfo` with ledger `QuerySupplyResponse` */
export interface BatchInfoWithSupply
  extends IBatchInfo,
    Omit<QuerySupplyResponse, '$type'> {
  txhash?: string;
  classId?: string;
  projectLocation?: string;
}

export type ClassID = 'C01' | 'C02' | 'C03';

type GenericObject = { [key: string]: any };

export interface ProjectWithMetadataObj extends Omit<ProjectInfo, 'metadata'> {
  metadata: GenericObject;
}
