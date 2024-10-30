import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { ProjectTagType } from 'web-components/src/components/molecules/ProjectTag/ProjectTag.types';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getAllActivityQuery } from 'lib/queries/react-query/sanity/getAllActivityQuery/getAllActivityQuery';
import { getAllEcosystemQuery } from 'lib/queries/react-query/sanity/getAllEcosystemQuery/getAllEcosystemQuery';

import { getIconsMapping } from 'components/organisms/ProjectTopSection/ProjectTopSection.utils';

type Params = {
  activities: string[] | undefined;
  ecosystemTypes: string[] | undefined;
};

export const useTags = ({ activities, ecosystemTypes }: Params) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { data: allProjectActivityData } = useQuery(
    getAllActivityQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const { data: allProjectEcosystemData } = useQuery(
    getAllEcosystemQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const projectActivityIconsMapping = getIconsMapping({
    data: allProjectActivityData?.allProjectActivity,
  });
  const projectEcosystemIconsMapping = getIconsMapping({
    data: allProjectEcosystemData?.allProjectEcosystem,
  });
  const activityTags: ProjectTagType[] | undefined = activities?.map(
    activity => ({
      name: activity,
      icon: {
        src: projectActivityIconsMapping?.[activity.toLowerCase()] ?? '',
      },
    }),
  );

  const ecosystemTags: ProjectTagType[] | undefined = ecosystemTypes?.map(
    ecosystem => ({
      name: ecosystem,
      icon: {
        src: projectEcosystemIconsMapping?.[ecosystem.toLowerCase()] ?? '',
      },
    }),
  );

  return {
    ecosystemTags,
    activityTags,
  };
};
