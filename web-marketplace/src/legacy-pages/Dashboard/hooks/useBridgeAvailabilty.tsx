// hooks/useBridgeAvailability.ts
import { useMemo } from 'react';
import { useFetchEcocredits } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';

import { useWallet } from 'lib/wallet/wallet';

import { useFetchBridgedEcocredits } from 'components/organisms/BridgedEcocreditsTable/hooks/useFetchBridgedEcocredits';

export const useBridgeAvailability = () => {
  const { wallet } = useWallet();
  const accountAddress = wallet?.address;

  // Fetch bridgable credits (same as BridgableEcocreditsTable)
  const { credits: bridgableCredits, isLoadingCredits: isLoadingBridgable } =
    useFetchEcocredits({
      address: accountAddress,
      creditClassId: process.env.NEXT_PUBLIC_BRIDGE_CREDIT_CLASS_ID,
      isPaginatedQuery: false,
    });

  // Fetch bridged credits (same as BridgedEcocreditsTable)
  const { bridgedCredits, isLoadingBridgedCredits } = useFetchBridgedEcocredits(
    {
      address: accountAddress,
    },
  );

  const hasBridgableCredits = useMemo(
    () => bridgableCredits && bridgableCredits.length > 0,
    [bridgableCredits],
  );

  const hasBridgedCredits = useMemo(
    () => bridgedCredits && bridgedCredits.length > 0,
    [bridgedCredits],
  );

  const hasAnyBridgeCredits = useMemo(
    () => hasBridgableCredits || hasBridgedCredits,
    [hasBridgableCredits, hasBridgedCredits],
  );

  const isLoading = isLoadingBridgable || isLoadingBridgedCredits;

  return {
    hasAnyBridgeCredits: !!accountAddress && hasAnyBridgeCredits,
    hasBridgableCredits: !!accountAddress && hasBridgableCredits,
    hasBridgedCredits: !!accountAddress && hasBridgedCredits,
    isLoading: !!accountAddress && isLoading,
  };
};
