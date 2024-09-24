import { DeliverTxResponse } from '@cosmjs/stargate';

import { CreditItemEventTake, EventTx } from 'types/ledger/base';

interface TakeEventToBatches {
  name: string;
  url: string;
}

export const takeEventToBatches = (
  deliverTxResponse: DeliverTxResponse,
): TakeEventToBatches[] | undefined => {
  if (!deliverTxResponse || !deliverTxResponse.rawLog) return;
  const rawLog = JSON.parse(deliverTxResponse.rawLog);
  const rawEventTake: EventTx = rawLog[0].events.find((event: EventTx) =>
    // eslint-disable-next-line lingui/no-unlocalized-strings
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
  return batchesFromTake;
};
