import { Maybe } from 'generated/indexer-graphql';

type Props = {
  first?: Maybe<number>;
  offset?: Maybe<number>;
};

export const getAllEcocreditTxesKey = ({ first, offset }: Props): string[] => [
  'graphql',
  'getAllEcocreditTxes',
  String(first),
  String(offset),
];
