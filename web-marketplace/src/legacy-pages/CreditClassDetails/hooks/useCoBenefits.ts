import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useSortResultWithIris } from 'utils/sanity/useSortResultWithIris';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getEcologicalImpactByIriQuery } from 'lib/queries/react-query/sanity/getEcologicalImpactByIriQuery/getEcologicalImpactByIriQuery';

import { Maybe } from '../../../generated/graphql';
import { EcologicalImpact } from '../../../generated/sanity-graphql';
import { client } from '../../../lib/clients/sanity';

interface InputProps {
  coBenefitsIRIs: Maybe<string | string[]> | undefined;
}

export default function useCoBenefits({
  coBenefitsIRIs,
}: InputProps): EcologicalImpact[] {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { data: coBenefitData } = useQuery(
    getEcologicalImpactByIriQuery({
      iris: coBenefitsIRIs,
      sanityClient: client,
      languageCode: selectedLanguage,
      enabled: !!coBenefitsIRIs,
    }),
  );

  let coBenefits: EcologicalImpact[] = [];

  const sortedImpact = useSortResultWithIris<EcologicalImpact>({
    dataWithIris: coBenefitData?.allEcologicalImpact ?? [],
    iris: coBenefitsIRIs,
  });

  if (coBenefitData && coBenefitData.allEcologicalImpact?.length) {
    coBenefits = sortedImpact;
  }

  return coBenefits;
}
