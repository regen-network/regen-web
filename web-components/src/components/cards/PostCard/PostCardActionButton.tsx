import React from 'react';
import { IconButton } from '@mui/material';

import { PostAdminButton } from '../../buttons/PostAdminButton/PostAdminButton';
import ShareIcon from '../../icons/ShareIcon';

const ActionButton = ({
  publicPost,
  isAdmin,
  onClickShare,
  sharePrivateLink,
}: {
  publicPost?: boolean;
  isAdmin?: boolean;
  onClickShare: (ev: React.MouseEvent) => void;
  sharePrivateLink: (ev: React.MouseEvent) => void;
}): JSX.Element => {
  return (
    <div className="z-[1] absolute top-5 right-5 lg:top-[15px] lg:right-[12px] cursor-pointer">
      {isAdmin ? (
        <PostAdminButton
          publicPost={publicPost}
          sharePublicLink={event => {
            event.stopPropagation();
            onClickShare(event);
          }}
          sharePrivateLink={event => {
            event.stopPropagation();
            sharePrivateLink(event);
          }}
        />
      ) : (
        <IconButton
          className="bg-grey-0 w-[44px] h-[44px] rounded-[50%]"
          onClick={event => {
            event.stopPropagation();
            onClickShare(event);
          }}
        >
          <ShareIcon className="w-[24px] h-[24px] text-brand-300" />
        </IconButton>
      )}
    </div>
  );
};

export default ActionButton;
