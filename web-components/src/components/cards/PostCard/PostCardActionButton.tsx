import React, { useRef, useState } from 'react';
import { IconButton, Menu } from '@mui/material';

import { HorizontalDotsIcon } from '../../icons/HorizontalDotsIcon';
import ShareIcon from '../../icons/ShareIcon';

const ActionButton = ({
  isAdmin,
  adminMenuItems,
  onClick,
}: {
  isAdmin?: boolean;
  adminMenuItems?: JSX.Element[];
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}): JSX.Element => {
  const menuAnchor = useRef<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        sx={theme => ({
          position: 'absolute',
          top: theme => [0, theme.spacing(3)],
          right: theme => [0, theme.spacing(3)],
          transform: 'translate(-50%, 50%)',
          zIndex: 1,
          borderRadius: theme => theme.spacing(7),
          backgroundColor: isAdmin ? 'rgba(0, 0, 0, 0.8)' : 'white',
          boxShadow: theme => theme.shadows[1],
          height: '44px',
          width: '44px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        })}
        ref={menuAnchor}
        onClick={isAdmin ? handleOpen : onClick}
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
      {isAdmin && adminMenuItems && (
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
          {adminMenuItems}
        </Menu>
      )}
    </React.Fragment>
  );
};

export default ActionButton;
