import { useMemo } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useNextSanityImage } from 'next-sanity-image';

import { LinkType } from 'web-components/src/types/shared/linkType';
import { cn } from 'web-components/src/utils/styles/cn';

import { isTebuBannerVisibleAtom } from 'lib/atoms/banner.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { client as sanityClient } from 'lib/clients/apolloSanity';
import { configuredSanityClient } from 'lib/clients/sanity';
import { getTebuBannerQuery } from 'lib/queries/react-query/sanity/getTebuBannerQuery/getTebuBannerQuery';

import { SanityNextImage } from 'components/atoms/SanityNextImage';
import { TebuBanner } from 'components/molecules/TebuBanner';

import {
  getDefaultTebuBannerLink,
  getDefaultTebuBannerLogo,
} from './TebuBannerWrapper.contants';

type Props = {
  className?: string;
};

const TebuBannerWrapper = ({ className }: Props) => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const [isVisible, setIsVisible] = useAtom(isTebuBannerVisibleAtom);
  const { data: tebuBannerResponse, isLoading } = useQuery(
    getTebuBannerQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const response = tebuBannerResponse?.allTebuBanner[0];
  const defaultTebuBannerLink = useMemo(() => getDefaultTebuBannerLink(_), [_]);
  const defaultTebuBannerLogo = useMemo(() => getDefaultTebuBannerLogo(_), [_]);

  const learnMoreLink = response?.learnMoreLink as LinkType;
  const logoAlt = response?.logo?.imageAlt;

  return (
    <div className={cn(!isVisible && 'hidden', className)}>
      <TebuBanner
        content={response?.contentRaw}
        learnMoreLink={
          isLoading ? learnMoreLink : learnMoreLink ?? defaultTebuBannerLink
        }
        logo={
          <SanityNextImage
            image={response?.logo?.image}
            fallback={{
              src: (isLoading
                ? response?.logo?.imageHref
                : response?.logo?.imageHref ??
                  defaultTebuBannerLogo.imageHref) as string,
              width: 62,
              height: 76,
            }}
            alt={
              isLoading ? logoAlt : logoAlt ?? defaultTebuBannerLogo.imageAlt
            }
            className="mr-20 sm:mr-30 object-contain"
          />
        }
        onClose={() => setIsVisible(false)}
      />
    </div>
  );
};

export { TebuBannerWrapper };
