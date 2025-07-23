'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';

import Banner from 'web-components/src/components/banner';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';

export const LayoutBanner = (): JSX.Element => {
  const [text, setBannerText] = useAtom(bannerTextAtom);

  useEffect(() => {
    if (text !== '') {
      setTimeout(() => {
        setBannerText('');
      }, 5000);
    }
  }, [text, setBannerText]);

  return <>{text && <Banner text={text} />}</>;
};
