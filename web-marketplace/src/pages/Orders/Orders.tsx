import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Flex } from 'web-components/src/components/box';

import { useLedger } from 'ledger';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';
import { Order } from 'components/organisms/Order/Order';

import { useOrders } from './hooks/useOrders';
import { CreditCardHidden } from './Orders.CreditCardHidden';

export const Orders = () => {
  const location = useLocation();

  const { queryClient } = useLedger();
  const { orders, isLoading } = useOrders();
  const { loginDisabled } = useWallet();

  const { data: allowedDenomsData } = useQuery(
    getAllowedDenomQuery({
      client: queryClient,
      enabled: !!queryClient,
    }),
  );
  const allowedDenoms = allowedDenomsData?.allowedDenoms;

  useEffect(() => {
    if (!isLoading) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading, location.hash]);

  return (
    <div className="min-h-[500px] bg-grey-100">
      <div className="max-w-[1400px] mx-auto px-8">
        <WithLoader isLoading={isLoading}>
          <div className="w-full rounded-md border border-grey-200 bg-grey-100">
            {loginDisabled && <CreditCardHidden />}
            {orders.map((order, index) => (
              <Order
                key={`${order.project.name}-${index}`}
                className={
                  orders.length > 1 && index < orders.length - 1 ? 'mb-20' : ''
                }
                orderData={order}
                allowedDenoms={allowedDenoms}
              />
            ))}
          </div>
        </WithLoader>
      </div>
    </div>
  );
};
