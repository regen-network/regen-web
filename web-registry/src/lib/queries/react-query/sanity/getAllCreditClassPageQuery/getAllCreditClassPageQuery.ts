import {
  AllCreditClassPageDocument,
  AllCreditClassPageQuery,
} from 'generated/sanity-graphql';

import { SANITY_ALL_CREDIT_CLASS_PAGE_KEY } from './getAllCreditClassPageQuery.constants';
import {
  ReactQueryGetAllCreditClassPageQueryParams,
  ReactQueryGetAllCreditClassPageResponse,
} from './getAllCreditClassPageQuery.types';

export const getAllCreditClassPageQuery = ({
  sanityClient,
  ...params
}: ReactQueryGetAllCreditClassPageQueryParams): ReactQueryGetAllCreditClassPageResponse => ({
  queryKey: [SANITY_ALL_CREDIT_CLASS_PAGE_KEY],
  queryFn: async () => {
    const { data: sanityCreditClassPageData } =
      await sanityClient.query<AllCreditClassPageQuery>({
        query: AllCreditClassPageDocument,
      });

    return sanityCreditClassPageData;
  },
  ...params,
});
