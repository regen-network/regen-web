import { AccountType } from 'generated/graphql';

export const activeAccountId = '200053c0-0905-11ee-be56-0242ac120002';
export const authenticatedAccounts = [
  {
    id: activeAccountId,
    type: AccountType.User,
    name: 'John Doe',
    addr: 'regen1rrhtznv5fzfy6gecwhkq6ggh4t95zxykz9vuwu',
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
  },
  {
    id: '96a3d698-08fe-11ee-be56-0242ac120002',
    type: AccountType.User,
    name: 'Torvald Axel',
    addr: 'regen12vrdt3hh2wn8w25m2k9yrg4smwjyktdplettxr',
  },
];
