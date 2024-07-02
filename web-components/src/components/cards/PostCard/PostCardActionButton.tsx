import React, { useRef, useState } from 'react';
import { IconButton, Menu } from '@mui/material';

import { HorizontalDotsIcon } from '../../icons/HorizontalDotsIcon';
import ShareIcon from '../../icons/ShareIcon';
import { SharePublicMenuItem } from './PostCard.MenuItems';

const ActionButton = ({
  publicPost,
  isAdmin,
  onClickShare,
}: {
  publicPost?: boolean;
  isAdmin?: boolean;
  onClickShare?: (ev: React.MouseEvent) => void;
}): JSX.Element => {
  const menuAnchor = useRef<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        sx={theme => ({
          position: 'absolute',
          top: { xs: theme.spacing(1.25), md: theme.spacing(3.75) },
          right: { xs: theme.spacing(1.25), md: theme.spacing(3) },
          zIndex: 1,
          borderRadius: theme.spacing(7),
          backgroundColor: isAdmin ? 'rgba(0, 0, 0, 0.8)' : 'white',
          boxShadow: theme.shadows[1],
          height: '44px',
          width: '44px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        })}
        ref={menuAnchor}
        onClick={event => {
          event.stopPropagation();
          if (isAdmin) handleOpen(event);
          else if (onClickShare) onClickShare(event);
        }}
      >
        {isAdmin ? (
          <HorizontalDotsIcon
            sx={{
              height: '32px',
              width: '32px',
              m: theme => theme.spacing(-1),
            }}
            color="white"
          />
        ) : (
          <ShareIcon sx={{ height: '24px', width: '24px' }} color="primary" />
        )}
      </IconButton>
      {isAdmin && (
        <Menu
          open={isOpen}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          disableScrollLock={true}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {/* <EditMenuItem /> */}
          <SharePublicMenuItem
            classes={{ root: 'px-[25px]' }}
            onClick={event => {
              event.stopPropagation();
              if (onClickShare) onClickShare(event);
            }}
            publicPost={publicPost}
          />
          {/* <SharePrivateMenuItem />
              <DeleteMenuItem /> */}
        </Menu>
      )}
    </React.Fragment>
  );
};

export default ActionButton;
