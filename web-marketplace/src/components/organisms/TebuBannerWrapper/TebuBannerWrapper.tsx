import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { getCustomImage } from 'utils/sanity/getCustomImage';

import { LinkType } from 'web-components/src/types/shared/linkType';
import { cn } from 'web-components/src/utils/styles/cn';

import { isTebuBannerVisibleAtom } from 'lib/atoms/banner.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getTebuBannerQuery } from 'lib/queries/react-query/sanity/getTebuBannerQuery/getTebuBannerQuery';

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
  const [isVisible, setIsVisible] = useAtom(isTebuBannerVisibleAtom);
  const tebuBannerResponse = useQuery(getTebuBannerQuery({ sanityClient }));
  const response = tebuBannerResponse.data?.allTebuBanner[0];
  const defaultTebuBannerLink = useMemo(() => getDefaultTebuBannerLink(_), [_]);
  const defaultTebuBannerLogo = useMemo(() => getDefaultTebuBannerLogo(_), [_]);
  const learnMoreLink = (response?.learnMoreLink ??
    defaultTebuBannerLink) as LinkType;
  const logo = String(
    getCustomImage(response?.logo) ?? defaultTebuBannerLogo.imageHref,
  );
  const logoAlt = String(
    response?.logo?.imageAlt ?? defaultTebuBannerLogo.imageAlt,
  );

  return (
    <div className={cn(!isVisible && 'hidden', className)}>
      <TebuBanner
        content={response?.contentRaw}
        learnMoreLink={learnMoreLink}
        logo={logo}
        logoAlt={logoAlt}
        onClose={() => setIsVisible(false)}
      />
    </div>
  );
};

export { TebuBannerWrapper };
