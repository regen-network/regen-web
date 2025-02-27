import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Flex } from 'web-components/src/components/box';

import { useLedger } from 'ledger';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';

import WithLoader from 'components/atoms/WithLoader';
import { Order } from 'components/organisms/Order/Order';

import { useOrders } from './hooks/useOrders';

export const Orders = () => {
  const location = useLocation();

  const { marketplaceClient } = useLedger();
  const { orders, isLoading } = useOrders();

  const { data: allowedDenomsData } = useQuery(
    getAllowedDenomQuery({
      client: marketplaceClient,
      enabled: !!marketplaceClient,
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
    <div className="min-h-[500px] bg-grey-100 flex flex-col justify-start items-center lg:items-start lg:flex-row lg:justify-evenly mx-auto">
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="w-full xl:w-[850px]"
      >
        <WithLoader isLoading={isLoading} sx={{ mx: 'auto' }}>
          <div className="w-full rounded-md border border-grey-200 bg-grey-100">
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
      </Flex>
    </div>
  );
};
