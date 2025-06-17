import { SetStateAction, useCallback, useMemo } from 'react';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';

import {
  BUYINGS_OPTIONS_FILTERS_PARAM,
  CREDIT_CARD_BUYING_OPTION_ID,
  CRYPTO_BUYING_OPTION_ID,
} from '../Projects.constants';

export const useBuyingOptionsFilters = (): [
  Record<string, boolean>,
  (setter: SetStateAction<Record<string, boolean>>) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const buyingOptionsFilters = useMemo(
    () =>
      searchParams
        .getAll(BUYINGS_OPTIONS_FILTERS_PARAM)
        .reduce((acc: Record<string, boolean>, key) => {
          acc[key] = true;
          return acc;
        }, {}),
    [searchParams],
  );

  const setBuyingOptionsFilters = useCallback(
    (setter: SetStateAction<Record<string, boolean>>) => {
      const params: ParamKeyValuePair[] = [];
      const newBuyingOptionsFilters =
        typeof setter === 'function' ? setter(buyingOptionsFilters) : setter;

      if (newBuyingOptionsFilters[CREDIT_CARD_BUYING_OPTION_ID]) {
        params.push([
          BUYINGS_OPTIONS_FILTERS_PARAM,
          CREDIT_CARD_BUYING_OPTION_ID,
        ]);
      }
      if (newBuyingOptionsFilters[CRYPTO_BUYING_OPTION_ID]) {
        params.push([BUYINGS_OPTIONS_FILTERS_PARAM, CRYPTO_BUYING_OPTION_ID]);
      }
      setSearchParams(params);
    },
    [buyingOptionsFilters, setSearchParams],
  );

  return [buyingOptionsFilters, setBuyingOptionsFilters];
};
