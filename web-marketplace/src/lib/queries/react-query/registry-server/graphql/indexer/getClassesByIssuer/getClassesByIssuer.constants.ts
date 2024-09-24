/* eslint-disable lingui/no-unlocalized-strings */
import { Maybe } from 'generated/graphql';

type Props = {
  issuer?: Maybe<string>;
};

export const getClassesByIssuerKey = ({ issuer }: Props): string[] => [
  'graphql',
  'ClassesByIssuer',
  issuer ?? '',
];
