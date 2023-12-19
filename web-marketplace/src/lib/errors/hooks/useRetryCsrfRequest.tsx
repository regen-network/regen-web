import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { FailedFnType, failedFunctionsWriteAtom } from 'lib/atoms/error.atoms';
import { GET_CSRF_QUERY_KEY } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery.constants';

export const useRetryCsrfRequest = () => {
  const reactQueryClient = useQueryClient();
  const addFailedFunction = useSetAtom(failedFunctionsWriteAtom);

  const retryCsrfRequest = async (failedFunction: FailedFnType) => {
    await reactQueryClient.invalidateQueries({
      queryKey: [GET_CSRF_QUERY_KEY],
    });
    addFailedFunction(failedFunction);
  };

  return retryCsrfRequest;
};
