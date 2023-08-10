import { useEffect } from 'react';
import { useAtom } from 'jotai';

import Banner from 'web-components/lib/components/banner';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';

export const RegistryLayoutBannerModal = (): JSX.Element => {
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
