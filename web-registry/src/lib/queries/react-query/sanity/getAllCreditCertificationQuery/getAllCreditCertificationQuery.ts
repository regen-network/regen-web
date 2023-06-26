import {
  AllCreditCertificationDocument,
  AllCreditCertificationQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryAllCreditCertificationQueryParams,
  ReactQueryAllCreditCertificationQueryResponse,
} from './getAllCreditCertificationQuery.types';

export const getAllCreditCertificationQuery = ({
  sanityClient,
  ...params
}: ReactQueryAllCreditCertificationQueryParams): ReactQueryAllCreditCertificationQueryResponse => ({
  queryKey: ['allCreditCertificationQuery'],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllCreditCertificationQuery>({
      query: AllCreditCertificationDocument,
    });

    return data;
  },
  ...params,
});
