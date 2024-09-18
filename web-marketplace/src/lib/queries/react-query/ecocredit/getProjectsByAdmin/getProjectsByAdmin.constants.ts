/* eslint-disable lingui/no-unlocalized-strings */
import { Maybe } from 'generated/graphql';

type Props = {
  admin?: Maybe<string>;
};

export const getProjectsByAdminKey = ({ admin }: Props): string[] => [
  'graphql',
  'ProjectsByAdmin',
  admin ?? '',
];
