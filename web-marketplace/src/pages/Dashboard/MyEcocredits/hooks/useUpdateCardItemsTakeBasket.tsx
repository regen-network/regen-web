import { useEffect, useState } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';

import { Item } from 'web-components/src/components/modal/TxModal';

import { UseStateSetter } from 'types/react/use-state';
import { takeEventToBatches } from 'lib/events/takeEventToBatches';

type Props = {
  deliverTxResponse?: DeliverTxResponse;
  cardItems: Item[] | undefined;
  setCardItems: UseStateSetter<Item[] | undefined>;
};

type Output = {
  setCardItemsTakeDone: UseStateSetter<boolean>;
};

export const useUpdateCardItemsTakeBasket = ({
  deliverTxResponse,
  cardItems,
  setCardItems,
}: Props): Output => {
  const [cardItemsTakeDone, setCardItemsTakeDone] = useState<boolean>(false);

  useEffect(() => {
    if (!cardItems || !deliverTxResponse || !deliverTxResponse.rawLog) return;
    if (cardItemsTakeDone) return;

    const batchesFromTake = takeEventToBatches(deliverTxResponse);
    if (!batchesFromTake) return;

    const moreThanOne = batchesFromTake.length > 1;

    setCardItems([
      ...cardItems.slice(0, 1),
      {
        label: `credit batch id${moreThanOne ? '(s)' : ''}`,
        value: moreThanOne ? [...batchesFromTake] : { ...batchesFromTake[0] },
      },
      ...cardItems.slice(1),
    ]);

    setCardItemsTakeDone(true);
  }, [
    deliverTxResponse,
    cardItems,
    setCardItems,
    cardItemsTakeDone,
    setCardItemsTakeDone,
  ]);

  return { setCardItemsTakeDone };
};
