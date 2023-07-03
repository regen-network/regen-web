import { Maybe } from 'generated/graphql';
import { Retirement } from 'generated/indexer-graphql';

export type RetirementType = Maybe<
  Pick<
    Retirement,
    'owner' | 'amount' | 'reason' | 'batchDenom' | 'jurisdiction' | 'timestamp'
  >
>;
