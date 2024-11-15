import { useQuery } from '@tanstack/react-query';

import { client as sanityClient } from 'lib/clients/sanity';
import { getAllEcosystemQuery } from 'lib/queries/react-query/sanity/getAllEcosystemQuery/getAllEcosystemQuery';

import { getIconsMapping } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';

export const useEcosystemTags = (ecosystemTypes: string[]) => {
  const { data: allProjectEcosystemData } = useQuery(
    getAllEcosystemQuery({
      sanityClient,
      // we default to 'en' no matter the selected language
      // in order to get the icon based on the english name
      languageCode: 'en',
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
