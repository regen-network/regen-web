import { getLocalizedData } from 'utils/sanity/getLocalizedData';

import {
  ComplianceInfoDocument,
  ComplianceInfoQuery,
} from 'generated/sanity-graphql';

import {
  ReactQueryComplianceInfoQueryParams,
  ReactQueryComplianceInfoQueryResponse,
} from './getComplianceInfoQuery.types';

export const getComplianceInfoQuery = ({
  sanityClient,
  languageCode,
  ...params
}: ReactQueryComplianceInfoQueryParams): ReactQueryComplianceInfoQueryResponse => ({
  queryKey: ['complianceInfoQuery', languageCode],
  queryFn: async () => {
    const { data } = await sanityClient.query<ComplianceInfoQuery>({
      query: ComplianceInfoDocument,
    });

    return {
      allComplianceInfo: getLocalizedData({
        data: data.allComplianceInfo,
        languageCode,
      }),
    };
  },
  ...params,
});
