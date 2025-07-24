import { msg } from '@lingui/macro';

import { Item } from 'web-components/src/components/modal/ConfirmModal';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { NormalizedSellOrder } from 'components/organisms/UserSellOrders/hooks/useNormalizedSellOrders';

type GetCancelCardItemsParams = {
  sellOrder: NormalizedSellOrder;
  _: TranslatorType;
};

export const getCancelCardItems = ({
  sellOrder,
  _,
}: GetCancelCardItemsParams): Item[] => {
  const { amountAvailable, batchDenom, id } = sellOrder;
  return [
    { label: _(msg`sell order id:`), value: { name: String(id) } },
    { label: _(msg`quantity:`), value: { name: String(amountAvailable) } },
    {
      label: _(msg`batch denom:`),
      value: {
        name: batchDenom,
        url: `/credit-batches/${batchDenom}`,
      },
    },
  ];
};
