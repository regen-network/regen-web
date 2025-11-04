import { gql, useApolloClient } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

type OrganizationProfile = {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  bgImage?: string | null;
  websiteLink?: string | null;
  twitterLink?: string | null;
};

type OrganizationProfileQuery = {
  organizationByDaoAddress?: OrganizationProfile | null;
};

const ORGANIZATION_PROFILE_BY_DAO_ADDRESS = gql`
  query OrganizationProfileByDaoAddress($daoAddress: String!) {
    organizationByDaoAddress(daoAddress: $daoAddress) {
      id
      name
      description
      image
      bgImage
      websiteLink
      twitterLink
    }
  }
`;

type UseOrganizationProfileParams = {
  daoAddress?: string | null;
};

export type UseOrganizationProfileResult = {
  organizationProfile: OrganizationProfile | null;
  isLoadingOrganizationProfile: boolean;
};

export default function useOrganizationProfile({
  daoAddress,
}: UseOrganizationProfileParams): UseOrganizationProfileResult {
  const apolloClient = useApolloClient();

  const { data, isLoading, isFetching } = useQuery<OrganizationProfile | null>({
    queryKey: ['organization-profile', daoAddress],
    enabled: !!daoAddress,
    queryFn: async () => {
      if (!daoAddress) return null;

      const { data: queryData } =
        await apolloClient.query<OrganizationProfileQuery>({
          query: ORGANIZATION_PROFILE_BY_DAO_ADDRESS,
          variables: { daoAddress },
          fetchPolicy: 'network-only',
        });

      return queryData.organizationByDaoAddress ?? null;
    },
  });

  return {
    organizationProfile: data ?? null,
    isLoadingOrganizationProfile: isLoading || isFetching,
  };
}
