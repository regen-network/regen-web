import React, { useState } from 'react';
import { Menu } from '@mui/material';

import Banner from 'web-components/src/components/banner';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import { SharePublicMenuItem } from 'web-components/src/components/cards/PostCard/PostCard.MenuItems';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import ShareIcon from 'web-components/src/components/icons/ShareIcon';
import { SmallDotsIcon } from 'web-components/src/components/icons/SmallDotsIcon';
import { Tag } from 'web-components/src/components/organisms/PostFiles/components/Tag';
import { COPY_SUCCESS } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.constants';
import Section from 'web-components/src/components/section';
import { Title } from 'web-components/src/components/typography';
import UserInfo from 'web-components/src/components/user/UserInfo';
import { defaultFontFamily } from 'web-components/src/theme/muiTheme';
import copyTextToClipboard from 'web-components/src/utils/copy';

import { AccountByIdQuery } from 'generated/graphql';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';

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
};

export const PostHeader = ({
  projectHref,
  isAdmin,
  title,
  creatorAccount,
  creatorIsAdmin,
  createdAt,
  privatePost,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [shareSuccessBanner, setShareSuccessBanner] = useState(false);

  return (
    <Section className="max-w-[750px] m-auto pt-60 pb-30 sm:pt-[100px] sm:pb-60 sm:px-0">
      <div className="flex justify-between">
        <TextButton
          className="flex"
          textSize="sm"
          href={projectHref} // TODO add anchor to "Data Posts" section
        >
          <ArrowDownIcon
            className="h-[24px] w-[24px] text-brand-400"
            direction="prev"
          />
          {ALL_POSTS}
        </TextButton>

        {isAdmin ? (
          <div className="flex items-center">
            {privatePost && (
              <Tag
                className="h-[26px] bg-error-300 mr-10 sm:mr-[18px]"
                label={POST_IS_PRIVATE}
                icon={<LockIcon className="w-[18px] h-[18px]" />}
              />
            )}
            <TextButton
              className="text-grey-500 hover:text-grey-500 mr-10 cursor-default"
              textSize="xs"
            >
              {ACTIONS}
            </TextButton>
            <div
              id="actions-button"
              aria-controls={open ? 'actions-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className="flex w-[44px] h-[44px] rounded-[50%] bg-grey-200"
            >
              <SmallDotsIcon />
            </div>
            <Menu
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id="actions-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'actions-button',
              }}
              classes={{
                paper:
                  'rounded-sm py-10 border border-solid border-grey-300 shadow-[0_0_4px_0_rgba(0,0,0,0.05)]',
              }}
            >
              {/* <EditMenuItem /> */}
              <SharePublicMenuItem
                classes={{ root: 'px-[25px]' }}
                onClick={() => {
                  copyTextToClipboard(window.location.href);
                  setShareSuccessBanner(true);
                }}
              />
              {/* <SharePrivateMenuItem />
              <DeleteMenuItem /> */}
            </Menu>
          </div>
        ) : (
          <div className="flex">
            <TextButton
              className="text-grey-500 hover:text-grey-500 mr-10"
              textSize="xs"
              onClick={() => {}}
            >
              {SHARE}
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
            image: creatorAccount.image,
            timestamp: createdAt,
            tag: creatorIsAdmin ? ADMIN : undefined,
          }}
        />
      )}
    </Section>
  );
};
