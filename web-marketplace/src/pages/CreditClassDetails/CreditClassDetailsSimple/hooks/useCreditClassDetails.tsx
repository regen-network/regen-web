import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { getAllCreditTypeQuery } from 'lib/queries/react-query/sanity/getAllCreditTypeQuery/getAllCreditTypeQuery';
import { getAllOffsetMethodQuery } from 'lib/queries/react-query/sanity/getAllOffsetMethodQuery/getAllOffsetMethodQuery';

import { getIconsMapping } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';

type Params = {
  onChainClass: ClassInfo;
  metadata?: CreditClassMetadataLD;
};

export const useCreditClassDetails = ({ onChainClass, metadata }: Params) => {
  const { ecocreditClient } = useLedger();

  // Credit Type
  const { data: creditTypeData } = useQuery(
    getCreditTypeQuery({
      client: ecocreditClient,
      request: {
        abbreviation: onChainClass.creditTypeAbbrev,
      },
      enabled: !!ecocreditClient && !!onChainClass.creditTypeAbbrev,
    }),
  );

  // Credit Type Icon
  const { data: sanityCreditTypeData } = useQuery(
    getAllCreditTypeQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const creditTypeSanity = sanityCreditTypeData?.allCreditType?.find(
    creditType =>
      creditType.name?.toLowerCase() ===
      creditTypeData?.creditType?.name.toLocaleLowerCase(),
  );
  // Credit Offset Methods
  const { data: sanityOffsetMethodData } = useQuery(
    getAllOffsetMethodQuery({ sanityClient, enabled: !!sanityClient }),
  );
  const offsetMethodIconsMapping = getIconsMapping({
    data: sanityOffsetMethodData?.allOffsetMethod,
  });
  const generationMethods = metadata?.['regen:offsetGenerationMethod']?.map(
    method => {
      const parsedMethod =
        typeof method === 'string' ? method : method['@value'];

      return {
        name: parsedMethod,
        icon: { src: offsetMethodIconsMapping?.[parsedMethod] ?? '' },
      };
    },
  );

  return { creditTypeData, creditTypeSanity, generationMethods };
};
