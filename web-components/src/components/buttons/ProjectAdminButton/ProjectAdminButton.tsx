import React, { useState } from 'react';
import { Menu } from '@mui/material';

import {
  ConvertToDraftMenuItem,
  DeleteMenuItem,
  RegisterWithProtocolMenuItem,
} from '../../cards/ProjectCard/ProjectCard.MenuItems';
import { HorizontalDotsIcon } from '../../icons/HorizontalDotsIcon';

const ProjectAdminButton = () => {
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
        slotProps={{
          paper: { sx: { width: '215px' } },
        }}
      >
        <RegisterWithProtocolMenuItem />
        <ConvertToDraftMenuItem />
        <DeleteMenuItem />
      </Menu>
    </>
  );
};

export default ProjectAdminButton;
