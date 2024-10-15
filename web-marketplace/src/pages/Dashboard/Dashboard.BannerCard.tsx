import { useNavigate } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import BannerCard from 'web-components/src/components/molecules/BannerCard';

import { AllProfilePageQuery } from 'generated/sanity-graphql';
import { useAuth } from 'lib/auth/auth';
import { getSanityImgSrc } from 'lib/imgSrc';

import { profileBannerCardAtom } from './Dashboard.store';

type Props = {
  sanityProfilePageData?: AllProfilePageQuery;
};
export const DashboardBannerCard = ({ sanityProfilePageData }: Props) => {
  const { _ } = useLingui();
  const [profileBannerCard, setProfileBannerCard] = useAtom(
    profileBannerCardAtom,
  );
  const { activeAccount } = useAuth();
  const navigate = useNavigate();
  const content = sanityProfilePageData?.allProfilePage?.[0]?.bannerCard;

  return (
    <>
      {content && !profileBannerCard[activeAccount?.id] ? (
        <div className="pb-[36px] sm:pb-20">
          <BannerCard
            title={content.title as string}
            description={content.descriptionRaw}
            image={{
              src: getSanityImgSrc(content.image),
              alt: content.image?.imageAlt || _(msg`profile banner`),
            }}
            buttonLabel={content.buttonLabel as string}
            onClick={() => {
              navigate('/dashboard/admin/profile');
            }}
            onClose={() => {
              setProfileBannerCard({
                ...profileBannerCard,
                [activeAccount?.id]: true,
              });
            }}
          />
        </div>
      ) : null}
    </>
  );
};
