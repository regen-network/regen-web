import { useNavigate } from 'react-router-dom';
import { from } from '@apollo/client';
import { Trans } from '@lingui/macro';
import { useQuery } from '@tanstack/react-query';

import { Flex } from 'web-components/src/components/box';
import { Title } from 'web-components/src/components/typography/Title';
import { cn } from 'web-components/src/utils/styles/cn';

import { getGeocodingQuery } from 'lib/queries/react-query/mapbox/getGeocodingQuery/getGeocodingQuery';

import { usePathSection } from 'pages/ProfileEdit/hooks/usePathSection';
import { ProfileEditNav } from 'pages/ProfileEdit/ProfileEdit.Nav';
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
  const section = usePathSection();
  const navigate = useNavigate();

  const onNavClick = (sectionName: string): void => {
    const path = `/profile/edit/${sectionName.replace(' ', '-')}`;
    navigate(path);
  };

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

  // Mock data
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
          data: {
            ...retirementInfo.data,
            location,
          },
        },
        blockchainDetails,
        credits,
        paymentInfo,
      },
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center lg:items-start lg:flex-row lg:justify-evenly max-w-[1140px] mx-auto p-10 lg:py-50 lg:px-15 min-h-screen">
      <ProfileEditNav
        section={section}
        onNavClick={onNavClick}
        className={cn(
          'flex-col lg:flex w-full lg:w-fit md:mr-50',
          section ? 'hidden' : 'flex',
        )}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="w-full lg:w-[950px]"
      >
        <Flex justifyContent="space-between" className="mb-25 w-full">
          <Title variant="h3">
            <Trans>My Orders</Trans>
          </Title>
        </Flex>
        <WithLoader isLoading={false} sx={{ mx: 'auto' }}>
          <div className="w-full rounded-md border border-grey-200 bg-grey-0">
            {orders.map((order, index) => (
              <Order key={`${order.project.name}-${index}`} {...order} />
            ))}
          </div>
        </WithLoader>
      </Flex>
    </div>
  );
};
