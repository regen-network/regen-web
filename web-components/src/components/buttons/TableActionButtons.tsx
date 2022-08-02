import React, { useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import OutlinedButton from './OutlinedButton';
import { HorizontalDotsIcon } from '../icons/HorizontalDotsIcon';

/** Displays a dropdown icon with action buttons */
const TableActionButtons: React.FC<{
  buttons: { label: string; onClick: () => void; icon?: JSX.Element }[];
}> = ({ buttons }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleMobileMenuOpen({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(currentTarget);
  }

  function handleMobileMenuClose(): void {
    setAnchorEl(null);
  }

  return (
    <Box>
      <OutlinedButton
        onClick={handleMobileMenuOpen}
        size="small"
        aria-controls="table-menu-buttons"
      >
        <HorizontalDotsIcon />
      </OutlinedButton>
      <Menu
        id="table-menu-buttons"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMobileMenuClose}
      >
        {buttons.map(({ label, onClick, icon }, i) => (
          <MenuItem
            key={i}
            sx={{
              px: 4,
              pb: 3,
              fontSize: 16,
              lineHeight: theme => theme.spacing(3),
            }}
            onClick={() => {
              handleMobileMenuClose();
              onClick();
            }}
          >
            {icon && <Box sx={{ display: 'inline', pr: 4 }}>{icon}</Box>}{' '}
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export { TableActionButtons };
