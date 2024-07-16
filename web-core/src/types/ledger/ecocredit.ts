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

export interface ClassProjectInfo {
  classId?: string;
  className?: string;
  projectName?: string;
  projectLocation?: string;
  icon?: string;
}

export interface IBatchInfoWithClassProject
  extends IBatchInfo,
    ClassProjectInfo {}

// /** combines the ledger `BatchInfo` with ledger `QueryBalanceResponse` */
export interface BatchInfoWithBalance
  extends IBatchInfoWithClassProject,
    Omit<QueryBalanceResponse, '$type'> {}

// /** combines the ledger `BatchInfo` with ledger `QuerySupplyResponse` */
export interface BatchInfoWithSupply
  extends IBatchInfoWithClassProject,
    Omit<QuerySupplyResponse, '$type'> {
  txhash?: string;
}

export type ClassID = 'C01' | 'C02' | 'C03';

type GenericObject = { [key: string]: any };

export interface ProjectWithMetadataObj extends Omit<ProjectInfo, 'metadata'> {
  metadata?: GenericObject;
}

export type BridgedTxStatus =
  | 'regen_hash_not_found'
  | 'regen_ready'
  | 'evm_broadcast'
  | 'evm_confirmed'
  | 'error';

export interface BridgedEcocredits extends IBatchInfoWithClassProject {
  amount: string;
  status?: BridgedTxStatus;
  destinationTxHash?: string;
  txHash?: string;
  txTimestamp?: string;
}
