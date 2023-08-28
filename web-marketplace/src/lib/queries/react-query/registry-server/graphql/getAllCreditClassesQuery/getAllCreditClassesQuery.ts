import {
  AllCreditClassesDocument,
  AllCreditClassesQuery,
} from 'generated/graphql';

import { ALL_CREDIT_CLASSES_KEY } from './getAllCreditClassesQuery.constants';
import {
  ReactQueryGetAllCreditClassesParams,
  ReactQueryGetAllCreditClassesResponse,
} from './getAllCreditClassesQuery.types';

export const getAllCreditClassesQuery = ({
  client,
  ...params
}: ReactQueryGetAllCreditClassesParams): ReactQueryGetAllCreditClassesResponse => ({
  queryKey: [ALL_CREDIT_CLASSES_KEY],
  queryFn: async () => {
    const { data } = await client.query<AllCreditClassesQuery>({
      query: AllCreditClassesDocument,
    });

    return data;
  },
  ...params,
});
