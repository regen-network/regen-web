import React, { useState } from 'react';
import OutlinedButton from './OutlinedButton';
import { HorizontalDotsIcon } from '../icons/HorizontalDotsIcon';
import { makeStyles } from '@mui/styles';
import { Box, Menu, MenuItem } from '@mui/material';

const useStyles = makeStyles(theme => ({
  menu: {
    padding: theme.spacing(4, 8),
  },
  menuLabel: {
    fontSize: theme.typography.pxToRem(16),
    textTransform: 'capitalize',
  },
}));

/** Displays a row of buttons on `md` and up, and a dropdown icon those buttons on mobile */
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

  const styles = useStyles();
  const Desktop: React.FC = () => (
    <>
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
    </>
  );

  const Mobile: React.FC = () => (
    <>
      <OutlinedButton
        onClick={handleMobileMenuOpen}
        size="small"
        aria-controls="table-menu-buttons"
      >
        <HorizontalDotsIcon />
      </OutlinedButton>
      <Menu
        id="table-menu-buttons"
        className={styles.menu}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMobileMenuClose}
      >
        {buttons.map(({ label, onClick }, i) => (
          <MenuItem
            key={i}
            className={styles.menuLabel}
            onClick={() => {
              handleMobileMenuClose();
              onClick();
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  return (
    <>
      <Box
        display={{ xs: 'none', [breakOn]: 'flex' }}
        sx={{
          flexWrap: 'nowrap',
          gap: 2,
        }}
      >
        <Desktop />
      </Box>
      <Box display={{ xs: 'flex', [breakOn]: 'none' }}>
        <Mobile />
      </Box>
    </>
  );
};

export { TableActionButtons };
