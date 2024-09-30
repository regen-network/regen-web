import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { cn } from 'web-components/src/utils/styles/cn';

import { isTebuBannerVisibleAtom } from 'lib/atoms/banner.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getTebuBannerQuery } from 'lib/queries/react-query/sanity/getTebuBannerQuery/getTebuBannerQuery';

import { TebuBanner } from 'components/molecules/TebuBanner';

import { TEBU_BANNER_LOGO } from './TebuBannerWrapper.contants';

type Props = {
  className?: string;
};

const TebuBannerWrapper = ({ className }: Props) => {
  const [isVisible, setIsVisible] = useAtom(isTebuBannerVisibleAtom);
  const tebuBannerResponse = useQuery(getTebuBannerQuery({ sanityClient }));
  const response = tebuBannerResponse.data?.allTebuBanner[0];

  return (
    <div
      className={cn('tebu-header-wrapper', !isVisible && 'hidden', className)}
    >
      <TebuBanner
        content={response?.contentRaw}
        learnMoreLink={response?.learnMoreLink ?? ''}
        logo={TEBU_BANNER_LOGO}
        onClose={() => setIsVisible(false)}
      />
    </div>
  );
};

export { TebuBannerWrapper };
