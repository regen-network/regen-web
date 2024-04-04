import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import BannerCard from 'web-components/src/components/molecules/BannerCard';

import { getSanityImgSrc } from 'lib/imgSrc';
import { getAllProfilePageQuery } from 'lib/queries/react-query/sanity/getAllProfilePageQuery/getAllProfilePageQuery';

import { client as sanityClient } from '../../lib/clients/sanity';
import { profileBannerCardAtom } from './Dashboard.store';

export const DashboardBannerCard = () => {
  const { data: sanityProfilePageData } = useQuery(
    getAllProfilePageQuery({ sanityClient, enabled: !!sanityClient }),
  );
  const [profileBannerCard, setProfileBannerCard] = useAtom(
    profileBannerCardAtom,
  );
  const navigate = useNavigate();
  const content = sanityProfilePageData?.allProfilePage?.[0]?.bannerCard;

  useEffect(() => {
    // Set profile banner viewed on component unmount
    return () => {
      if (!profileBannerCard) setProfileBannerCard(true);
    };
  }, [profileBannerCard, setProfileBannerCard]);

  return (
    <>
      {content && !profileBannerCard ? (
        <div className="pb-[36px] sm:pb-20">
          <BannerCard
            title={content.title as string}
            description={content.descriptionRaw}
            image={{
              src: getSanityImgSrc(content.image),
              alt: content.image?.imageAlt || 'profile banner',
            }}
            buttonLabel={content.buttonLabel as string}
            onClick={() => {
              navigate('/profile/edit/profile');
            }}
          />
        </div>
      ) : null}
    </>
  );
};
