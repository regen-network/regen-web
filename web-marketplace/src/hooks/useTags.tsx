import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import SvgColorOverride from 'web-components/src/components/icons/utils/SvgColorOverride';
import { ProjectTagType } from 'web-components/src/components/molecules/ProjectTag/ProjectTag.types';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import { IS_REGEN } from 'lib/env';
import { getAllActivityQuery } from 'lib/queries/react-query/sanity/getAllActivityQuery/getAllActivityQuery';
import { getAllEcosystemQuery } from 'lib/queries/react-query/sanity/getAllEcosystemQuery/getAllEcosystemQuery';

import { SanityNextImage } from 'components/atoms/SanityNextImage';
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
      icon: (
        <SanityNextImage
          className="h-30 w-30 sm:h-40 sm:w-40 mr-10"
          image={projectActivityIconsMapping?.[activity.toLowerCase()]}
          alt={activity}
        />
      ),
    }),
  );

  const ecosystemTags: ProjectTagType[] | undefined = ecosystemTypes?.map(
    ecosystem => {
      const icon = projectEcosystemIconsMapping?.[ecosystem.toLowerCase()];
      return {
        name: ecosystem,
        icon: IS_REGEN ? (
          <SanityNextImage
            image={icon}
            alt={ecosystem}
            className="h-30 w-30 sm:h-40 sm:w-40 mr-10"
          />
        ) : icon?.asset?.url ? (
          <SvgColorOverride
            src={icon?.asset?.url}
            color="rgba(var(--sc-icon-ecosystem-600))"
            className="h-30 w-30 sm:h-40 sm:w-40 mr-10"
          />
        ) : null,
      };
    },
  );

  return {
    ecosystemTags,
    activityTags,
  };
};
