import { DeliverTxResponse } from '@cosmjs/stargate';

import { CreditItemEventTake } from 'types/ledger/base';

interface TakeEventToBatches {
  name: string;
  url: string;
}

export const takeEventToBatches = (
  deliverTxResponse: DeliverTxResponse,
): TakeEventToBatches[] | undefined => {
  if (!deliverTxResponse) return;
  const eventTake = deliverTxResponse.events.find(event =>
    // eslint-disable-next-line lingui/no-unlocalized-strings
    event.type.includes('EventTake'),
  );
  if (!eventTake) return;

  const creditsAttribute = eventTake.attributes.find(
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
