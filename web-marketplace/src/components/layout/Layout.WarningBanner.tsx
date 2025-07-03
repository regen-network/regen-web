'use client';

import { useAtom } from 'jotai';

import Banner from 'web-components/src/components/banner';

import { warningBannerTextAtom } from 'lib/atoms/banner.atoms';

export const LayoutWarningBannerModal = (): JSX.Element => {
  const [warningBannerText, setWarningBannerTextAtom] = useAtom(
    warningBannerTextAtom,
  );

  const onClose = (): void => setWarningBannerTextAtom('');

  return (
    <>
      {warningBannerText && (
        <Banner
          className="bg-bc-yellow-500 text-sc-text-header"
          text={warningBannerText}
          onClose={onClose}
        />
      )}
    </>
  );
};
