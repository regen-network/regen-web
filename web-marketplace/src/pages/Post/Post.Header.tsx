import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import Banner from 'web-components/src/components/banner';
import { PostAdminButton } from 'web-components/src/components/buttons/PostAdminButton/PostAdminButton';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import ShareIcon from 'web-components/src/components/icons/ShareIcon';
import { Tag } from 'web-components/src/components/organisms/PostFiles/components/Tag';
import { COPY_SUCCESS } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.constants';
import Section from 'web-components/src/components/section';
import { Title } from 'web-components/src/components/typography';
import UserInfo from 'web-components/src/components/user/UserInfo';
import { defaultFontFamily } from 'web-components/src/theme/muiTheme';
import copyTextToClipboard from 'web-components/src/utils/copy';

import { AccountByIdQuery } from 'generated/graphql';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { Link } from 'components/atoms';
import { DeletePostWarningModal } from 'components/organisms/DeletePostWarningModal/DeletePostWarningModal';

import { useDelete } from './hooks/useDelete';
import { useSharePrivateLink } from './hooks/useSharePrivateLink';
import {
  ACTIONS,
  ADMIN,
  ALL_POSTS,
  POST_IS_PRIVATE,
  SHARE,
} from './Post.constants';

type Props = {
  projectHref: string;
  isAdmin: boolean;
  title: string;
  creatorAccount: AccountByIdQuery['accountById'];
  adminAccountId: string;
  createdAt: string;
  creatorIsAdmin: boolean;
  privatePost?: boolean;
  publicPost?: boolean;
  privateFiles?: boolean;
  offChainProjectId?: string;
};

export const PostHeader = ({
  projectHref,
  isAdmin,
  title,
  creatorAccount,
  creatorIsAdmin,
  createdAt,
  publicPost,
  privatePost,
  privateFiles,
  offChainProjectId,
}: Props) => {
  const { _ } = useLingui();
  const { iri } = useParams();
  const [shareSuccessBanner, setShareSuccessBanner] = useState(false);
  const sharePrivateLink = useSharePrivateLink({ iri });
  const { deletePost, open, onClose, onOpen } = useDelete({
    iri,
    projectHref,
  });

  return (
    <Section
      className={`max-w-[750px] m-auto pt-60 pb-30 ${
        !isAdmin && privateFiles ? 'sm:pb-35' : 'sm:pb-60'
      } sm:pt-[100px]  sm:px-0`}
    >
      <div className="flex justify-between">
        <TextButton
          className="flex"
          textSize="sm"
          LinkComponent={Link}
          href={`${projectHref}#data-stream`}
          sx={{
            '&:hover': {
              '& svg': {
                color: theme => theme.palette.secondary.contrastText,
              },
            },
          }}
        >
          <ArrowDownIcon
            className="h-[24px] w-[24px] text-brand-400"
            direction="prev"
          />
          {_(ALL_POSTS)}
        </TextButton>

        {isAdmin ? (
          <div className="flex items-center">
            {privatePost && (
              <Tag
                className="h-[26px] bg-error-300 mr-10 sm:mr-[18px]"
                label={_(POST_IS_PRIVATE)}
                icon={<LockIcon className="w-[18px] h-[18px]" />}
              />
            )}
            <TextButton
              className="text-grey-500 hover:text-grey-500 mr-10"
              textSize="xs"
            >
              {_(ACTIONS)}
            </TextButton>
            <PostAdminButton
              publicPost={publicPost}
              sharePublicLink={() => {
                copyTextToClipboard(window.location.href);
                setShareSuccessBanner(true);
              }}
              sharePrivateLink={sharePrivateLink}
              onDelete={onOpen}
            />
          </div>
        ) : (
          <div className="flex">
            <TextButton
              className="text-grey-500 hover:text-grey-500 mr-10"
              textSize="xs"
              onClick={() => {}}
            >
              {_(SHARE)}
            </TextButton>
            <ShareIcon
              className="cursor-pointer"
              onClick={() => {
                copyTextToClipboard(window.location.href);
                setShareSuccessBanner(true);
              }}
            />
          </div>
        )}
        {shareSuccessBanner && (
          <Banner
            text={COPY_SUCCESS}
            onClose={() => {
              setShareSuccessBanner(false);
            }}
          />
        )}
      </div>
      <Title className="pt-30 pb-20 sm:pt-50 sm:pb-30" variant="h2">
        {title}
      </Title>
      {creatorAccount && (
        <UserInfo
          fontFamily={defaultFontFamily}
          user={{
            name: creatorAccount.name || DEFAULT_NAME,
            link: `/profiles/${creatorAccount.id}`,
            type: creatorAccount.type,
            image: creatorAccount.image || getDefaultAvatar(creatorAccount),
            timestamp: createdAt,
            tag: creatorIsAdmin ? _(ADMIN) : undefined,
          }}
        />
      )}
      {isAdmin && (
        <DeletePostWarningModal
          onDelete={deletePost}
          open={open}
          onClose={onClose}
        />
      )}
    </Section>
  );
};
