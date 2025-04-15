import {
  QueryBalanceResponse as BankQueryBalanceResponse,
  QueryDenomMetadataResponse,
} from '@regen-network/api/cosmos/bank/v1beta1/query';
import { BasketInfo } from '@regen-network/api/regen/ecocredit/basket/v1/query';
import {
  BatchInfo,
  ProjectInfo,
  QueryBalanceResponse,
  QuerySupplyResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';

/** Map keys from another type to values of number type */
type MapToNumber<T> = { [K in keyof T]: number };

/** `QuerySupplyResponse`  */
export interface BatchTotalsForProject
  extends MapToNumber<QuerySupplyResponse> {}

export interface IBatchInfo extends BatchInfo {}

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
    QueryBalanceResponse {}

// /** combines the ledger `BatchInfo` with ledger `QuerySupplyResponse` */
export interface BatchInfoWithSupply
  extends IBatchInfoWithClassProject,
    QuerySupplyResponse {
  txhash?: string;
}

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

export interface BasketTokens {
  basket?: BasketInfo;
  balance?: BankQueryBalanceResponse;
  metadata?: QueryDenomMetadataResponse;
}
