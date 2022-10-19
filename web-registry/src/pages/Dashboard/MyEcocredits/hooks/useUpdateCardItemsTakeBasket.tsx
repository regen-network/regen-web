import { useEffect, useState } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';

import { Item } from 'web-components/lib/components/modal/TxModal';

import { CreditItemEventTake, EventTx } from 'types/ledger/base';
import { UseStateSetter } from 'types/react/use-state';

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

    const rawLog = JSON.parse(deliverTxResponse.rawLog);
    const rawEventTake: EventTx = rawLog[0].events.find((event: EventTx) =>
      event.type.includes('EventTake'),
    );
    if (!rawEventTake) return;

    const creditsAttribute = rawEventTake.attributes.find(
      attribute => attribute.key === 'credits',
    );
    if (!creditsAttribute) return;

    const creditsFromTake = JSON.parse(creditsAttribute.value);
    const batchesFromTake = creditsFromTake.map(
      (credit: CreditItemEventTake) => ({
        name: credit.batch_denom,
        url: `/credit-batches/${credit.batch_denom}`,
      }),
    );

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
