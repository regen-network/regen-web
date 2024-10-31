import { getLocalizedData } from 'utils/sanity/getLocalizedData';

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
  languageCode,
  ...params
}: ReactQueryAllCreditCertificationQueryParams): ReactQueryAllCreditCertificationQueryResponse => ({
  queryKey: ['allCreditCertificationQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<AllCreditCertificationQuery>({
      query: AllCreditCertificationDocument,
    });

    return {
      allCreditCertification: getLocalizedData({
        data: data.allCreditCertification,
        languageCode,
      }),
    };
  },
  ...params,
});
