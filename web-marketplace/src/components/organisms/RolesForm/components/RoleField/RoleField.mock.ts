/* eslint-disable lingui/no-unlocalized-strings */
import { AccountType } from 'generated/graphql';

export const activeAccountId = '200053c0-0905-11ee-be56-0242ac120002';
export const authenticatedAccounts = [
  {
    id: activeAccountId,
    type: AccountType.User,
    name: 'John Doe',
    addr: 'regen1rrhtznv5fzfy6gecwhkq6ggh4t95zxykz9vuwu',
    nonce: '6ce95c9d37012f7b7c008c5b82ce9c3f',
  },
];
export const authenticatedAccountIds = [activeAccountId];

export const allAccounts = [
  ...authenticatedAccounts,
  {
    id: '93b29e38-08fe-11ee-be56-0242ac120002',
    type: AccountType.User,
    name: 'Min Solon',
    addr: 'regen1dy4ezxgm4wrnpx2g33zkmheqtdjlsfsqcmc6dj',
    nonce: '410593e5fc774e5eb15f6329f586b61f',
  },
  {
    id: '96a3d698-08fe-11ee-be56-0242ac120002',
    type: AccountType.User,
    name: 'Torvald Axel',
    addr: 'regen12vrdt3hh2wn8w25m2k9yrg4smwjyktdplettxr',
    nonce: '0e0e1f5ca420ffc48b3915f5e6732935',
  },
];
