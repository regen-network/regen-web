import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { getDenomAllowedOptions } from 'legacy-pages/Dashboard/MyEcocredits/MyEcocredits.utils';
import uniq from 'lodash/uniq';
import { IBC_DENOM_PREFIX } from 'utils/ibc/getBaseDenom';

import { QueryClient, useLedger } from 'ledger';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getDenomByHashesQuery } from 'lib/queries/react-query/ibc/transfer/getDenomByHashesQuery/getDenomByHashesQuery';

export const useAllowedDenomOptions = (canCreateFiatOrder?: boolean) => {
  const { queryClient } = useLedger();
  const { _ } = useLingui();

  const { data: allowedDenomsData } = useQuery(
    getAllowedDenomQuery({
      client: queryClient,
      enabled: !!queryClient,
    }),
  );

  const ibcDenomHashes = uniq(
    allowedDenomsData?.allowedDenoms
      .filter(denom => denom?.bankDenom?.includes(IBC_DENOM_PREFIX))
      .map(denom => denom?.bankDenom?.replace(IBC_DENOM_PREFIX, '')),
  );

  const { data: denomsData } = useQuery(
    getDenomByHashesQuery({
      enabled: !!queryClient,
      hashes: ibcDenomHashes.filter(Boolean) as string[],
      queryClient: queryClient as QueryClient,
    }),
  );

  const allowedDenomOptions = useMemo(
    () =>
      getDenomAllowedOptions({
        allowedDenoms: allowedDenomsData?.allowedDenoms,
        denomsWithHashData: denomsData,
        canCreateFiatOrder,
        _,
      }),
    [_, allowedDenomsData?.allowedDenoms, denomsData, canCreateFiatOrder],
  );

  return allowedDenomOptions;
};
