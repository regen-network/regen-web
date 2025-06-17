// hooks/useOrdersAvailability.ts
import { useWallet } from 'lib/wallet/wallet';

import { useOrders } from 'pages/Orders/hooks/useOrders';

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
