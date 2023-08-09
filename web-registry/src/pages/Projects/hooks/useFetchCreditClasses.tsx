import { useQueries, useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { getClassesQuery } from 'lib/queries/react-query/ecocredit/getClassesQuery/getClassesQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

export const useFetchCreditClasses = () => {
  const { ecocreditClient, dataClient } = useLedger();
  const { data: creditClassesdata } = useQuery(
    getClassesQuery({
      client: ecocreditClient,
      enabled: !!ecocreditClient,
    }),
  );
  const creditClasses = creditClassesdata?.classes;

  const { data: creditClassesData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const creditClassesMetadataResults = useQueries({
    queries:
      creditClasses?.map(creditClass =>
        getMetadataQuery({
          iri: creditClass.metadata,
          enabled: !!dataClient,
          dataClient,
        }),
      ) ?? [],
  });
};
