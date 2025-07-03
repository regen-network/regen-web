'use client';

import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { failedFunctionsAtom } from 'lib/atoms/error.atoms';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

export const RetryFailedFunctions = () => {
  const [failedFunctions, setFailedFunctions] = useAtom(failedFunctionsAtom);

  const { data: csrfToken } = useQuery(getCsrfTokenQuery({}));

  const retryFailedFunctions = useCallback(async () => {
    if (csrfToken) {
      const failedFunctionPromises = failedFunctions.map(failedFunction =>
        failedFunction(csrfToken),
      );
      await Promise.all(failedFunctionPromises);
      setFailedFunctions([]);
    }
  }, [csrfToken, failedFunctions, setFailedFunctions]);

  useEffect(() => {
    if (csrfToken && failedFunctions.length > 0) {
      retryFailedFunctions();
    }
  }, [csrfToken, failedFunctions.length, retryFailedFunctions]);

  return null;
};
