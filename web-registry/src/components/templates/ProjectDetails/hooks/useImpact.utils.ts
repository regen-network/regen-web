import {
  EcologicalImpact,
  EcologicalImpactByIriQuery,
} from 'generated/sanity-graphql';

type UseSortImpactParams = {
  coBenefitsIris?: string | string[] | null;
  coBenefitData?: EcologicalImpactByIriQuery;
};

// sanity does not preserve order of iris in the response
// so we need to sort the impacts based on the initial order of the iris
export const useSortImpact = ({
  coBenefitsIris,
  coBenefitData,
}: UseSortImpactParams): EcologicalImpact[] => {
  const allEcologicalImpact = [...(coBenefitData?.allEcologicalImpact ?? [])];
  const initialIrisList = coBenefitsIris ?? [];

  if (typeof coBenefitsIris === 'string') {
    coBenefitsIris = [coBenefitsIris];
  }
  if (Array.isArray(coBenefitsIris)) {
    return allEcologicalImpact?.sort(
      (impactA, impactB) =>
        initialIrisList.indexOf(impactA.iri?.current ?? '') -
        initialIrisList.indexOf(impactB.iri?.current ?? ''),
    );
  }

  return allEcologicalImpact;
};
