import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { Flex } from 'web-components/src/components/box';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getGeocodingQuery } from 'lib/queries/react-query/mapbox/getGeocodingQuery/getGeocodingQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getProjectByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByOnChainIdQuery/getProjectByOnChainIdQuery';
import { getOrdersByBuyerAddressQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getOrdersByBuyerAddress/getOrdersByBuyerAddress';
import { getRetirementByTxHash } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByTxHash/getRetirementByTxHash';
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
  const { ecocreditClient, dataClient } = useLedger();
  const { activeAccount } = useAuth();
  const { activeWalletAddr } = useWallet();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const fiatOrders = useMemo(
    () =>
      activeAccount?.fiatOrdersByAccountId?.nodes.map(order => ({
        ...order,
        timestamp: order?.createdAt,
        projectId: order?.projectOnChainId,
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

  const sortedOrders = useMemo(
    () =>
      [...(fiatOrders || []), ...(cryptoOrders || [])].sort(
        (a, b) =>
          new Date(b?.timestamp).getTime() -
          new Date(a?.timestamp as string).getTime(),
      ),
    [cryptoOrders, fiatOrders],
  );

  const retirementResults = useQueries({
    queries: sortedOrders.map(order =>
      getRetirementByTxHash({
        client: apolloClient,
        enabled: !!order?.txHash && !!apolloClient,
        txHash: order?.txHash as string,
      }),
    ),
  });

  const offChainProjectResults = useQueries({
    queries: sortedOrders.map(order =>
      getProjectByOnChainIdQuery({
        client: apolloClient,
        onChainId: order?.projectId as string,
        enabled: !!order?.projectId,
        languageCode: selectedLanguage,
      }),
    ),
  });
  const offChainProjects = offChainProjectResults.map(
    res => res.data?.data?.projectByOnChainId,
  );

  const onChainProjectResults = useQueries({
    queries: sortedOrders.map(order =>
      getProjectQuery({
        request: { projectId: order?.projectId },
        client: ecocreditClient,
        enabled: !!ecocreditClient && !!order?.projectId,
      }),
    ),
  });
  const onChainProjects = onChainProjectResults?.map(res => res.data?.project);

  const metadataResults = useQueries({
    queries: onChainProjects.map(project =>
      getMetadataQuery({
        iri: project?.metadata,
        dataClient,
        enabled: !!dataClient && !!project?.metadata,
        languageCode: selectedLanguage,
      }),
    ),
  });
  const projectsMetadata = metadataResults.map(res => res.data);

  const orders = useMemo(
    () =>
      sortedOrders.map(order => {
        return {
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
              tradableCredits: order?.retiredCredits
                ? null
                : order?.creditsAmount,
              // reason: order?
            },
            blockchainDetails: {
              purchaseDate: order?.timestamp,
              blockchainRecord: order?.txHash,
            },
            credits,
            paymentInfo,
          },
        };
      }),
    [],
  );

  // TODO: replace mock data below
  const ordedrs: OrderDataProps[] = [
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
