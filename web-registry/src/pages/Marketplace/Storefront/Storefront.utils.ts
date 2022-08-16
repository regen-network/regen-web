import { Item } from 'web-components/lib/components/modal/ConfirmModal';

import { NormalizedSellOrder } from './Storefront.types';

export const sortByExpirationDate = (
  sellOrderA: NormalizedSellOrder,
  sellOrderB: NormalizedSellOrder,
): number => {
  if (sellOrderA.expiration && sellOrderB.expiration) {
    return sellOrderA.expiration > sellOrderB.expiration ? -1 : 1;
  }

  return 0;
};

export const getCancelCardItems = ({
  id,
  amountAvailable,
  batchDenom,
}: NormalizedSellOrder): Item[] => [
  { label: 'sell order id:', value: { name: String(id) } },
  { label: 'quantity:', value: { name: String(amountAvailable) } },
  {
    label: 'batch denom:',
    value: {
      name: 'C01-20190101-20201010-003',
      url: `/credit-batches/${batchDenom}`,
    },
  },
];
