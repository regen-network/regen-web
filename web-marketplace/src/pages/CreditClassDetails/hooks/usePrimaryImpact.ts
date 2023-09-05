import { useQuery } from '@tanstack/react-query';

import { getEcologicalImpactByIriQuery } from 'lib/queries/react-query/sanity/getEcologicalImpactByIriQuery/getEcologicalImpactByIriQuery';

import { client } from '../../../lib/clients/sanity';

interface InputProps {
  primaryImpactIRI?: string;
}

export default function usePrimaryImpact({ primaryImpactIRI }: InputProps) {
  const { data: primaryImpactData } = useQuery(
    getEcologicalImpactByIriQuery({
      iris: primaryImpactIRI,
      sanityClient: client,
      enabled: !!primaryImpactIRI,
    }),
  );

  return primaryImpactData?.allEcologicalImpact?.[0];
}
