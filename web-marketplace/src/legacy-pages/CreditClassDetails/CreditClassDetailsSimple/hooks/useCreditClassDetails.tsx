import { ClassInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { useLedger } from 'ledger';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/apolloSanity';
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
  const { queryClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  // Credit Type
  const { data: creditTypeData } = useQuery(
    getCreditTypeQuery({
      client: queryClient,
      request: {
        abbreviation: onChainClass.creditTypeAbbrev,
      },
      enabled: !!queryClient && !!onChainClass.creditTypeAbbrev,
    }),
  );

  // Credit Type Icon
  const { data: sanityCreditTypeData } = useQuery(
    getAllCreditTypeQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const creditTypeSanity = sanityCreditTypeData?.allCreditType?.find(
    creditType =>
      creditType.name?.toLowerCase() ===
      creditTypeData?.creditType?.name.toLowerCase(),
  );
  // Credit Offset Methods
  const { data: sanityOffsetMethodData } = useQuery(
    getAllOffsetMethodQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
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
