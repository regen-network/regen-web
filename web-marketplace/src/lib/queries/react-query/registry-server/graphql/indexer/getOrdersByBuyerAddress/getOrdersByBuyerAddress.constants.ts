/* eslint-disable lingui/no-unlocalized-strings */

export const getOrdersByBuyerAddressKey = (buyerAddress: string) => [
  'graphql',
  'OrdersByBuyerAddress',
  buyerAddress,
];
