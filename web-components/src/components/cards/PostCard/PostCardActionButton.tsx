import React from 'react';
import { IconButton } from '@mui/material';

import {
  PostAdminButton,
  PostAdminButtonProps,
} from '../../buttons/PostAdminButton/PostAdminButton';
import ShareIcon from '../../icons/ShareIcon';

const ActionButton = ({
  publicPost,
  draft,
  isAdmin,
  sharePublicLink,
  sharePrivateLink,
  onDelete,
  onEditDraft,
}: {
  isAdmin?: boolean;
} & PostAdminButtonProps): JSX.Element => {
  return (
    <div className="z-[1] absolute top-5 right-5 lg:top-[15px] lg:right-[12px] cursor-pointer">
      {isAdmin ? (
        <PostAdminButton
          publicPost={publicPost}
          draft={draft}
          sharePublicLink={event => {
            event.stopPropagation();
            sharePublicLink(event);
          }}
          sharePrivateLink={event => {
            event.stopPropagation();
            sharePrivateLink(event);
          }}
          onDelete={event => {
            event.stopPropagation();
            onDelete(event);
          }}
          onEditDraft={
            onEditDraft
              ? event => {
                  event.stopPropagation();
                  onEditDraft(event);
                }
              : undefined
          }
        />
      ) : (
        <IconButton
          className="bg-grey-0 w-[44px] h-[44px] rounded-[50%]"
          onClick={event => {
            event.stopPropagation();
            sharePublicLink(event);
          }}
        >
          <ShareIcon className="w-[24px] h-[24px] text-brand-300" />
        </IconButton>
      )}
    </div>
  );
};

export default ActionButton;
