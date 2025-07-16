// hooks/useOrdersAvailability.ts
import { useOrders } from 'legacy-pages/Orders/hooks/useOrders';

import { useWallet } from 'lib/wallet/wallet';

export const useOrdersAvailability = () => {
  const { wallet } = useWallet();
  const { orders, isLoading } = useOrders();

  const hasOrders = orders && orders.length > 0;
  const hasWalletAddress = !!wallet?.address;

  return {
    hasOrders: hasWalletAddress && hasOrders,
    isLoading: hasWalletAddress && isLoading,
  };
};
