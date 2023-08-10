import { useQuery } from '@tanstack/react-query';
import { useSortResultWithIris } from 'utils/sanity/useSortResultWithIris';

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
  const { data: coBenefitData } = useQuery(
    getEcologicalImpactByIriQuery({
      iris: coBenefitsIRIs,
      sanityClient: client,
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
