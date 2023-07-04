import { Maybe } from 'generated/graphql';
import { Retirement } from 'generated/indexer-graphql';

export type RetirementType = Maybe<
  Pick<
    Retirement,
    | 'nodeId'
    | 'owner'
    | 'amount'
    | 'reason'
    | 'batchDenom'
    | 'jurisdiction'
    | 'timestamp'
  >
>;
