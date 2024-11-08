import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { Flex } from 'web-components/src/components/box';

import { useAuth } from 'lib/auth/auth';
import { getGeocodingQuery } from 'lib/queries/react-query/mapbox/getGeocodingQuery/getGeocodingQuery';
import { getOrdersByBuyerAddressQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getOrdersByBuyerAddress/getOrdersByBuyerAddress';
import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';
import { Order } from 'components/organisms/Order/Order';
import { ORDER_STATUS } from 'components/organisms/Order/Order.constants';
import {
  blockchainDetails,
  credits,
  paymentInfo,
  retirementInfo,
} from 'components/organisms/Order/Order.mock';
import { OrderDataProps } from 'components/organisms/Order/Order.types';
import { JURISDICTION_REGEX } from 'components/templates/ProjectDetails/ProjectDetails.constant';

export const Orders = () => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { activeAccount } = useAuth();
  const { activeWalletAddr } = useWallet();

  const fiatOrders = useMemo(
    () =>
      activeAccount?.fiatOrdersByAccountId?.nodes.map(order => ({
        ...order,
        timestamp: order?.createdAt,
      })),
    [activeAccount?.fiatOrdersByAccountId?.nodes],
  );

  const { data } = useQuery(
    getOrdersByBuyerAddressQuery({
      client: apolloClient,
      enabled: !!activeWalletAddr && !!apolloClient,
      buyerAddress: activeWalletAddr as string,
    }),
  );
  const cryptoOrders = data?.data?.allOrders?.nodes;

  const combinedOrders = useMemo(
    () =>
      [...(fiatOrders || []), ...(cryptoOrders || [])].sort(
        (a, b) => a?.timestamp - b?.timestamp,
      ),
    [cryptoOrders, fiatOrders],
  );

  const jurisdiction = 'ES-PM';
  const countryCodeMatch = jurisdiction?.match(JURISDICTION_REGEX);
  const countryCode = countryCodeMatch?.[3] || countryCodeMatch?.[1];

  const { data: geocodingJurisdictionData } = useQuery(
    getGeocodingQuery({
      request: { query: countryCode },
      enabled: !!countryCode,
    }),
  );

  const location =
    geocodingJurisdictionData?.body?.features?.[0]?.place_name || '';

  // TODO: replace mock data below
  const orders: OrderDataProps[] = [
    {
      project: {
        name: 'Project Name',
        date: 'Dec 15, 2024',
        placeName: location,
        area: 50.4,
        areaUnit: 'hectares',
        imageSrc: '/jpg/default-project.jpg',
        prefinance: false,
      },
      order: {
        status: ORDER_STATUS.delivered,
        retirementInfo: {
          ...retirementInfo,
          location,
        },
        blockchainDetails,
        credits,
        paymentInfo,
      },
    },
    {
      project: {
        name: 'Project 2 Name',
        date: 'Jan 15, 2025',
        placeName: location,
        area: 100.1,
        areaUnit: 'hectares',
        imageSrc: '/jpg/default-project.jpg',
        prefinance: false,
      },
      order: {
        status: ORDER_STATUS.pending,
        retirementInfo: {
          ...retirementInfo,
          location,
        },
        blockchainDetails,
        credits,
        paymentInfo,
      },
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center lg:items-start lg:flex-row lg:justify-evenly mx-auto">
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="w-full xl:w-[850px]"
      >
        <WithLoader isLoading={false} sx={{ mx: 'auto' }}>
          <div className="w-full rounded-md border border-grey-200 bg-grey-100">
            {orders.map((order, index) => (
              <Order
                key={`${order.project.name}-${index}`}
                className={
                  orders.length > 1 && index < orders.length - 1 ? 'mb-20' : ''
                }
                {...order}
              />
            ))}
          </div>
        </WithLoader>
      </Flex>
    </div>
  );
};
