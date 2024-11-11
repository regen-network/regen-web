import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { ProjectTagType } from 'web-components/src/components/molecules/ProjectTag/ProjectTag.types';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getAllEcosystemQuery } from 'lib/queries/react-query/sanity/getAllEcosystemQuery/getAllEcosystemQuery';

import { getIconsMapping } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';

export const useEcosystemTags = (ecosystemTypes: string[]) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { data: allProjectEcosystemData } = useQuery(
    getAllEcosystemQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const projectEcosystemIconsMapping = getIconsMapping({
    data: allProjectEcosystemData?.allProjectEcosystem,
  });

  const ecosystemTags = Object.fromEntries(
    ecosystemTypes?.map(ecosystem => [
      ecosystem,
      projectEcosystemIconsMapping?.[ecosystem.toLowerCase()] ?? '',
    ]) ?? [],
  );

  return ecosystemTags;
};
