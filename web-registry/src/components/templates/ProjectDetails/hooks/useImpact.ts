import { Maybe } from '../../../../generated/graphql';
import {
  EcologicalImpact,
  useEcologicalImpactByIriQuery,
} from '../../../../generated/sanity-graphql';
import { client } from '../../../../sanity';

interface InputProps {
  coBenefitsIris: Maybe<string | string[]> | undefined;
  primaryImpactIRI: string[];
}

export default function useImpact({
  coBenefitsIris,
  primaryImpactIRI,
}: InputProps): EcologicalImpact[] {
  const { data: primaryImpactData } = useEcologicalImpactByIriQuery({
    client,
    variables: {
      iris: primaryImpactIRI,
    },
    skip: !primaryImpactIRI,
  });

  const { data: coBenefitData } = useEcologicalImpactByIriQuery({
    client,
    variables: {
      iris: coBenefitsIris,
    },
    skip: !coBenefitsIris,
  });

  let impactData: EcologicalImpact[] = [];

  if (primaryImpactData && primaryImpactData.allEcologicalImpact?.length) {
    impactData = [...primaryImpactData?.allEcologicalImpact];
  }

  if (coBenefitData && coBenefitData.allEcologicalImpact?.length) {
    impactData = [...impactData, ...coBenefitData?.allEcologicalImpact];
  }

  return impactData;
}
