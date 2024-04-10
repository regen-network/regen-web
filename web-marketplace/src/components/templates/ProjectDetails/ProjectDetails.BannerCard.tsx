import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useAtom } from 'jotai';

import Banner from 'web-components/src/components/banner';
import ShareIcon from 'web-components/src/components/icons/ShareIcon';
import BannerCard from 'web-components/src/components/molecules/BannerCard';
import { COPY_SUCCESS } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.constants';
import Section from 'web-components/src/components/section';
import copyTextToClipboard from 'web-components/src/utils/copy';

import { Maybe, Project } from 'generated/graphql';
import { BannerCardFieldsFragment } from 'generated/sanity-graphql';
import { useAuth } from 'lib/auth/auth';
import { getSanityImgSrc } from 'lib/imgSrc';
import { useWallet } from 'lib/wallet/wallet';

import { COPY_TOOLTIP } from './ProjectDetails.constant';
import { projectsBannerCardAtom } from './ProjectDetails.store';

type Props = {
  offChainProject?: Maybe<Pick<Project, 'id' | 'adminAccountId'>>;
  onChainProject?: ProjectInfo;
  content?: Maybe<BannerCardFieldsFragment>;
  slug?: Maybe<string>;
};

export const ProjectDetailsBannerCard = ({
  offChainProject,
  onChainProject,
  content,
  slug,
}: Props) => {
  const { activeAccountId, activeAccount } = useAuth();
  const { wallet, loginDisabled } = useWallet();
  const [projectsBannerCard, setProjectsBannerCard] = useAtom(
    projectsBannerCardAtom,
  );
  const [copySuccessBanner, setCopySuccessBanner] = useState(false);

  const isCurrentAdmin = loginDisabled
    ? wallet?.address === onChainProject?.admin
    : activeAccountId &&
      (offChainProject?.adminAccountId === activeAccountId ||
        onChainProject?.admin === activeAccount?.addr);
  const offChainOrOnChainprojectId = offChainProject?.id ?? onChainProject?.id;

  return (
    <>
      {content &&
      (offChainProject || onChainProject) &&
      isCurrentAdmin &&
      !projectsBannerCard[offChainOrOnChainprojectId] ? (
        <Section className="pt-10 sm:pt-30 pb-20 sm:pb-0">
          <BannerCard
            title={content.title as string}
            description={content.descriptionRaw}
            image={{
              src: getSanityImgSrc(content.image),
              alt: content.image?.imageAlt || 'project banner',
            }}
            buttonLabel={content.buttonLabel as string}
            icon={<ShareIcon />}
            buttonLabelClassName="text-grey-500"
            onClick={() => {
              copyTextToClipboard(window.location.href);
              setCopySuccessBanner(true);
            }}
            onClose={() =>
              setProjectsBannerCard({
                ...projectsBannerCard,
                [offChainOrOnChainprojectId]: true,
              })
            }
            tooltip={COPY_TOOLTIP}
          />
        </Section>
      ) : null}
      {copySuccessBanner && (
        <Banner
          text={COPY_SUCCESS}
          onClose={() => {
            setCopySuccessBanner(false);
          }}
        />
      )}
    </>
  );
};
