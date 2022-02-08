import React, { useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import OutlinedButton from './OutlinedButton';
import { HorizontalDotsIcon } from '../icons/HorizontalDotsIcon';

/** Displays a row of buttons on a set breakpoint (defaults to `md`) and up, and
 * a dropdown icon those buttons on mobile */
const TableActionButtons: React.FC<{
  buttons: { label: string; onClick: () => void }[];
  breakOn?: 'sm' | 'md';
}> = ({ buttons, breakOn = 'md' }) => {
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
    <>
      {/* Desktop */}
      <Box
        display={{ xs: 'none', [breakOn]: 'flex' }}
        sx={{
          flexWrap: 'nowrap',
          gap: 2,
        }}
      >
        {buttons.map(({ label, onClick }, i) => (
          <OutlinedButton
            key={'table-action-' + i}
            size="small"
            onClick={() => {
              handleMobileMenuClose();
              onClick();
            }}
          >
            {label}
          </OutlinedButton>
        ))}
      </Box>
      {/* Mobile */}
      <Box display={{ xs: 'flex', [breakOn]: 'none' }}>
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
          {buttons.map(({ label, onClick }, i) => (
            <MenuItem
              key={i}
              sx={{ px: 4, fontSize: 16, textTransform: 'capitalize' }}
              onClick={() => {
                handleMobileMenuClose();
                onClick();
              }}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export { TableActionButtons };
