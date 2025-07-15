import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { ProjectImpactCardProps } from 'web-components/src/components/cards/ProjectImpactCard/ProjectImpactCard';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
  LegacyProjectMetadataLD,
} from 'lib/db/types/json-ld';
import { getSdgByIriQuery } from 'lib/queries/react-query/sanity/getSdgByIriQuery/getSdgByIriQuery';

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
  projectMetadata?: AnchoredProjectMetadataLD | LegacyProjectMetadataLD;
}

export default function useImpact({
  offChainCoBenefitsIRIs,
  offChainPrimaryImpactIRI,
  creditClassMetadata,
  projectMetadata,
}: InputProps) {
  const { _ } = useLingui();
  const primaryImpact = creditClassMetadata?.['regen:primaryImpact'];
  const projectImpact = projectMetadata?.['regen:primaryImpact'];
  const projectCoBenefits = projectMetadata?.['regen:coBenefits'];
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const coBenefits =
    projectCoBenefits || creditClassMetadata?.['regen:coBenefits'];

  const primaryImpactSdgIris =
    primaryImpact?.['regen:SDGs']?.map(sdg => sdg['@id']) || [];
  const sdgIris: string[] = [...primaryImpactSdgIris];
  let coBenefitsSdgIris: string[][] = [];
  for (const coBenefit of coBenefits || []) {
    // The case where coBenefit is a string can be removed as part of C04 metadata fixes (#1983).
    if (typeof coBenefit === 'string') {
      continue;
    } else {
      const sdgs = coBenefit['regen:SDGs']?.map(sdg => sdg['@id']) || [];
      coBenefitsSdgIris.push(sdgs);
      sdgIris.push(...sdgs);
    }
  }
  const { data } = useQuery(
    getSdgByIriQuery({
      iris: sdgIris,
      sanityClient,
      enabled: !!sanityClient && sdgIris.length > 0,
      languageCode: selectedLanguage,
    }),
  );
  const sdgs = data?.allSdg;

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
      normalizePrimaryImpact(
        {
          impact: primaryImpact,
          projectImpact,
          sanityImpact: sanityPrimaryImpact,
          sdgs: sdgs?.filter(
            sdg =>
              sdg?.iri?.current &&
              primaryImpactSdgIris.includes(sdg.iri.current),
          ),
        },
        _,
      ) as ProjectImpactCardProps,
    );
  }
  let normalizedCoBenefits: ProjectImpactCardProps[] = [];
  if (coBenefits?.length) {
    normalizedCoBenefits = coBenefits.map((coBenefit, i) =>
      normalizeCoBenefit(
        {
          // The case where coBenefit is a string can be removed as part of C04 metadata fixes (#1983).
          impact:
            typeof coBenefit === 'string'
              ? { '@id': coBenefit, 'schema:name': coBenefit }
              : coBenefit,
          projectImpact: projectCoBenefits?.find(
            projectCoBenefit =>
              projectCoBenefit['@id'] ===
              (typeof coBenefit === 'string' ? coBenefit : coBenefit['@id']),
          ),
          sanityImpact: sanityCoBenefits.find(sanityCoBenefit =>
            typeof coBenefit === 'string'
              ? sanityCoBenefit.iri?.current === coBenefit
              : sanityCoBenefit.iri?.current === coBenefit['@id'],
          ),
          sdgs: sdgs?.filter(
            sdg =>
              sdg?.iri?.current &&
              coBenefitsSdgIris[i].includes(sdg.iri.current),
          ),
        },
        _,
      ),
    ) as ProjectImpactCardProps[];
  } else if (sanityCoBenefits.length > 0) {
    // This is to handle the case where the impact are only stored off-chain,
    // assuming they have a mapping to sanity impact.
    normalizedCoBenefits = sanityCoBenefits.map(coBenefit =>
      normalizeCoBenefit({ sanityImpact: coBenefit }, _),
    ) as ProjectImpactCardProps[];
  }
  return [...impact, ...normalizedCoBenefits];
}
