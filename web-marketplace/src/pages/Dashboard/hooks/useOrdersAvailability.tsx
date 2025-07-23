// hooks/useOrdersAvailability.ts

import { useOrders } from 'pages/Orders/hooks/useOrders';

export const useOrdersAvailability = () => {
  const { orders, isLoading } = useOrders();

  const hasOrders = orders && orders.length > 0;

  return {
    hasOrders: hasOrders,
    isLoading,
  };
};
