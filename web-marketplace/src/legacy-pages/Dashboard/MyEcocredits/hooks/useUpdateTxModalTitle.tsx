import { useEffect } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { UseStateSetter } from 'types/react/use-state';

type Props = {
  deliverTxResponse?: DeliverTxResponse;
  setTxModalTitle: UseStateSetter<string | undefined>;
};

const SELL_ORDER_EVENT_TYPE = 'regen.ecocredit.marketplace.v1.EventSell';
const SELL_ORDER_ATTRIBUTE_KEY = 'sell_order_id';

// eslint-disable-next-line
export const useUpdateTxModalTitle = ({
  deliverTxResponse,
  setTxModalTitle,
}: Props) => {
  const { _ } = useLingui();
  const rawLog = deliverTxResponse?.rawLog;

  useEffect(() => {
    if (rawLog) {
      const log = JSON.parse(rawLog);

      const sellOrderEventIndex = log[0].events.findIndex(
        (event: any) => event?.type === SELL_ORDER_EVENT_TYPE,
      );

      // Sell Order Event
      if (sellOrderEventIndex !== -1) {
        const sellOrderEvent = log[0].events[sellOrderEventIndex];
        const sellOrderId = sellOrderEvent.attributes.find(
          (attribute: any) => attribute.key === SELL_ORDER_ATTRIBUTE_KEY,
        )?.value;

        setTxModalTitle(_(msg`Sell Order #${sellOrderId.replaceAll('"', '')}`));
      }
    }
  }, [_, rawLog, setTxModalTitle]);
};
