import { Maybe, TxesOrderBy } from 'generated/indexer-graphql';

type Props = {
  first?: Maybe<number>;
  offset?: Maybe<number>;
  orderBy: Maybe<TxesOrderBy | TxesOrderBy[]>;
};

export const getAllTxesKey = ({ first, offset, orderBy }: Props): string[] => [
  'graphql',
  'getAllTxes',
  String(first),
  String(offset),
  String(orderBy),
];
