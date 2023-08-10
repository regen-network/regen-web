import { ProjectImpactCardProps } from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';

import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import { Maybe } from '../../../generated/graphql';
import {
  normalizeCoBenefit,
  normalizePrimaryImpact,
} from '../CreditClassDetails.utils';
import useCoBenefits from './useCoBenefits';
import usePrimaryImpact from './usePrimaryImpact';

interface InputProps {
  offChainCoBenefitsIRIs: Maybe<string | string[]> | undefined;
  offChainPrimaryImpactIRI?: string;
  creditClassMetadata?: CreditClassMetadataLD;
}

export default function useImpact({
  offChainCoBenefitsIRIs,
  offChainPrimaryImpactIRI,
  creditClassMetadata,
}: InputProps) {
  const primaryImpact = creditClassMetadata?.['regen:primaryImpact'];
  const coBenefits = creditClassMetadata?.['regen:coBenefits'];
  const sanityPrimaryImpact = usePrimaryImpact({
    primaryImpactIRI: primaryImpact?.['@id'] || offChainPrimaryImpactIRI,
  });
  const sanityCoBenefits = useCoBenefits({
    coBenefitsIRIs:
      coBenefits?.map(coBenefit =>
        // The case where coBenefit is a string can be removed as part of C04 metadata fixes (#1983).
        typeof coBenefit === 'string' ? coBenefit : coBenefit['@id'],
      ) || offChainCoBenefitsIRIs,
  });

  let impact: ProjectImpactCardProps[] = [];
  if (primaryImpact || sanityPrimaryImpact) {
    impact.push(
      normalizePrimaryImpact({
        impact: primaryImpact,
        sanityImpact: sanityPrimaryImpact,
      }) as ProjectImpactCardProps,
    );
  }
  let normalizedCoBenefits: ProjectImpactCardProps[] = [];
  if (coBenefits?.length) {
    normalizedCoBenefits = coBenefits.map((coBenefit, i) =>
      normalizeCoBenefit({
        // The case where coBenefit is a string can be removed as part of C04 metadata fixes (#1983).
        impact:
          typeof coBenefit === 'string'
            ? { '@id': coBenefit, 'schema:name': coBenefit }
            : coBenefit,
        sanityImpact: sanityCoBenefits[i],
      }),
    ) as ProjectImpactCardProps[];
  } else if (sanityCoBenefits.length > 0) {
    // This is to handle the case where the impact are only stored off-chain,
    // assuming they have a mapping to sanity impact.
    normalizedCoBenefits = sanityCoBenefits.map(coBenefit =>
      normalizeCoBenefit({ sanityImpact: coBenefit }),
    ) as ProjectImpactCardProps[];
  }
  console.log(normalizedCoBenefits);
  return [...impact, ...normalizedCoBenefits];
}
