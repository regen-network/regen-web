import React, { useState } from 'react';
import { Menu } from '@mui/material';

import {
  DeleteMenuItem,
  SharePrivateMenuItem,
  SharePublicMenuItem,
} from '../../cards/PostCard/PostCard.MenuItems';
import { HorizontalDotsIcon } from '../../icons/HorizontalDotsIcon';

type Props = {
  publicPost?: boolean;
  sharePublicLink: (ev: React.MouseEvent) => void;
  sharePrivateLink: (ev: React.MouseEvent) => void;
  onDelete: (ev: React.MouseEvent) => void;
};

export const PostAdminButton = ({
  publicPost,
  sharePublicLink,
  sharePrivateLink,
  onDelete,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  return (
    <>
      <div
        id="actions-button"
        aria-controls={open ? 'actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="flex items-center justify-center w-[44px] h-[44px] rounded-[50%] bg-grey-700 cursor-pointer opacity-80 hover:opacity-60"
      >
        <HorizontalDotsIcon className="text-grey-0 h-[24px] w-[24px]" />
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
          onClick={sharePublicLink}
          publicPost={publicPost}
        />
        {!publicPost && <SharePrivateMenuItem onClick={sharePrivateLink} />}
        <DeleteMenuItem onClick={onDelete} />
      </Menu>
    </>
  );
};
