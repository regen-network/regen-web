import { Maybe } from 'generated/graphql';

type Props = {
  admin?: Maybe<string>;
};

export const getClassesByAdminKey = ({ admin }: Props): string[] => [
  'graphql',
  'ClassesByAdmin',
  admin ?? '',
];
