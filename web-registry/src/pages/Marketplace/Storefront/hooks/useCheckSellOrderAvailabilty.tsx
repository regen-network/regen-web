import { MutableRefObject, useEffect } from 'react';

type Props = {
  setError: (error: string | undefined) => void;
  selectedSellOrderIdRef: MutableRefObject<number | undefined>;
  selectedSellOrderId?: number;
};

export const useCheckSellOrderAvailabilty = ({
  setError,
  selectedSellOrderIdRef,
  selectedSellOrderId,
}: Props): void => {
  useEffect(() => {
    if (
      selectedSellOrderId &&
      selectedSellOrderId !== selectedSellOrderIdRef.current
    ) {
      setError('This sell order is no longer available');
    }
  }, [selectedSellOrderIdRef, selectedSellOrderId, setError]);
};
