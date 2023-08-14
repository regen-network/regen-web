import { PartyType } from 'generated/graphql';

export const accountId = '200053c0-0905-11ee-be56-0242ac120002';
export const partiesByAccountId = {
  accountById: {
    partiesByAccountId: {
      nodes: [
        {
          accountId,
          id: '8f6972de-08fe-11ee-be56-0242ac120002',
          type: PartyType.User,
          name: 'John Doe',
          walletByWalletId: {
            addr: 'regen1rrhtznv5fzfy6gecwhkq6ggh4t95zxykz9vuwu',
          },
        },
      ],
    },
  },
};

export const allParties = [
  {
    accountId,
    id: '8f6972de-08fe-11ee-be56-0242ac120002',
    type: PartyType.User,
    name: 'John Doe',
    walletByWalletId: {
      addr: 'regen1rrhtznv5fzfy6gecwhkq6ggh4t95zxykz9vuwu',
    },
  },
  {
    accountId: '3863ebc0-0905-11ee-be56-0242ac120002',
    id: '93b29e38-08fe-11ee-be56-0242ac120002',
    type: PartyType.User,
    name: 'Min Solon',
    walletByWalletId: {
      addr: 'regen1dy4ezxgm4wrnpx2g33zkmheqtdjlsfsqcmc6dj',
    },
  },
  {
    accountId: '3acd91c2-0905-11ee-be56-0242ac120002',
    id: '96a3d698-08fe-11ee-be56-0242ac120002',
    type: PartyType.User,
    name: 'Torvald Axel',
    walletByWalletId: {
      addr: 'regen12vrdt3hh2wn8w25m2k9yrg4smwjyktdplettxr',
    },
  },
];
