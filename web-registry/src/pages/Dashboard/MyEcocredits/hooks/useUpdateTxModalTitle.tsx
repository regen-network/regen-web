import { useEffect } from 'react';
<<<<<<< HEAD:web-registry/src/pages/Dashboard/MyEcocredits/hooks/useUpdateTxModalTitle.tsx
import { DeliverTxResponse } from '@cosmjs/stargate';

=======
>>>>>>> v4:web-registry/src/pages/MyEcocredits/hooks/useUpdateTxModalTitle.tsx
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

        setTxModalTitle(`Sell Order #${sellOrderId.replaceAll('"', '')}`);
      }
    }
  }, [rawLog, setTxModalTitle]);
};
