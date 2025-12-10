import { useEffect } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { EventSell } from '@regen-network/api/regen/ecocredit/marketplace/v1/events';

import { UseStateSetter } from 'types/react/use-state';

type Props = {
  deliverTxResponse?: DeliverTxResponse;
  setTxModalTitle: UseStateSetter<string | undefined>;
};

const SELL_ORDER_ATTRIBUTE_KEY = 'sell_order_id';

// eslint-disable-next-line
export const useUpdateTxModalTitle = ({
  deliverTxResponse,
  setTxModalTitle,
}: Props) => {
  const { _ } = useLingui();

  useEffect(() => {
    const events = deliverTxResponse?.events;
    const event = events?.find(event => EventSell.typeUrl.includes(event.type));
    console.log('event', event);
    const sellOrderId = event?.attributes.find(
      attribute => attribute.key === SELL_ORDER_ATTRIBUTE_KEY,
    )?.value;
    if (sellOrderId) {
      setTxModalTitle(_(msg`Sell Order #${sellOrderId.replaceAll('"', '')}`));
    }
  }, [_, deliverTxResponse, setTxModalTitle]);
};
