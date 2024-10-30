import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getEcologicalImpactByIriQuery } from 'lib/queries/react-query/sanity/getEcologicalImpactByIriQuery/getEcologicalImpactByIriQuery';

import { client } from '../../../lib/clients/sanity';

interface InputProps {
  primaryImpactIRI?: string;
}

export default function usePrimaryImpact({ primaryImpactIRI }: InputProps) {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { data: primaryImpactData } = useQuery(
    getEcologicalImpactByIriQuery({
      iris: primaryImpactIRI,
      sanityClient: client,
      languageCode: selectedLanguage,
      enabled: !!primaryImpactIRI,
    }),
  );

  return primaryImpactData?.allEcologicalImpact?.[0];
}
