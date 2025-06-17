import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getDenomMetadataQuery } from 'lib/queries/react-query/cosmos/bank/getDenomMetadataQuery/getDenomMetadataQuery';
import { getBasketBalancesQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketBalances/getBasketBalancesQuery';
import { getBasketQuery } from 'lib/queries/react-query/ecocredit/basket/getBasketQuery/getBasketQuery';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';

import { BasketOverviewProps } from 'components/organisms';

import { normalizeBasketOverview } from '../utils/normalizeBasketOverview';

type Params = {
  basketDenom?: string;
};

export const useFetchBasketOverview = ({
  basketDenom,
}: Params): BasketOverviewProps => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { queryClient } = useLedger();

  // Basket
  const { data: basketData } = useQuery(
    getBasketQuery({
      enabled: !!queryClient && !!basketDenom,
      client: queryClient,
      request: { basketDenom: basketDenom as string },
    }),
  );
  const basketClasses = basketData?.classes ?? [];

  // Basket Denom Metadata
  const { data: basketDenomMetadata } = useQuery(
    getDenomMetadataQuery({
      enabled: !!queryClient && !!basketDenom,
      client: queryClient,
      request: { denom: basketDenom as string },
    }),
  );

  // Basket Balances
  const { data: basketBalancesData } = useQuery(
    getBasketBalancesQuery({
      enabled: !!queryClient && !!basketDenom,
      client: queryClient,
      request: { basketDenom: basketDenom as string },
    }),
  );

  // Basket Classes
  const basketClassResults = useQueries({
    queries: basketClasses.map(basketClass =>
      getClassQuery({
        client: queryClient,
        request: { classId: basketClass },
      }),
    ),
  });

  // Metadatas
  const basketsMetadata = useQueries({
    queries: basketClassResults.map(basketClass =>
      getMetadataQuery({
        iri: basketClass.data?.class?.metadata,
        client: queryClient,
        languageCode: selectedLanguage,
        enabled: !!queryClient,
      }),
    ),
  });

  // Normalize data
  const basketOverviewData = normalizeBasketOverview({
    basketBalancesData,
    basketClassResults,
    basketData,
    basketDenomMetadata,
    basketsMetadata,
  });

  return basketOverviewData;
};
