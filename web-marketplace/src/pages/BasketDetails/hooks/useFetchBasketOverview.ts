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
  const { basketClient, bankClient, ecocreditClient, dataClient } = useLedger();

  // Basket
  const { data: basketData } = useQuery(
    getBasketQuery({
      enabled: !!basketClient,
      client: basketClient,
      request: { basketDenom },
    }),
  );
  const basketClasses = basketData?.classes ?? [];

  // Basket Denom Metadata
  const { data: basketDenomMetadata } = useQuery(
    getDenomMetadataQuery({
      enabled: !!bankClient,
      client: bankClient,
      request: { denom: basketDenom },
    }),
  );

  // Basket Balances
  const { data: basketBalancesData } = useQuery(
    getBasketBalancesQuery({
      enabled: !!basketClient,
      client: basketClient,
      request: { basketDenom },
    }),
  );

  // Basket Classes
  const basketClassResults = useQueries({
    queries: basketClasses.map(basketClass =>
      getClassQuery({
        client: ecocreditClient,
        request: { classId: basketClass },
      }),
    ),
  });

  // Metadatas
  const basketsMetadata = useQueries({
    queries: basketClassResults.map(basketClass =>
      getMetadataQuery({
        iri: basketClass.data?.class?.metadata,
        dataClient,
        languageCode: selectedLanguage,
        enabled: !!dataClient,
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
