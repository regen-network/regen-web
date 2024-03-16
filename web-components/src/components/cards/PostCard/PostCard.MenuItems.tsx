import React from 'react';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import EditIcon from '../../icons/EditIcon';
import ShareIcon from '../../icons/ShareIcon';
import ShareUnlockIcon from '../../icons/ShareUnlockIcon';
import TrashIcon from '../../icons/TrashIcon';
import { Body } from '../../typography';

export const EditMenuItem = (): JSX.Element => {
  return (
    <MenuItem>
      <ListItemIcon>
        <EditIcon sx={{ height: '24px', width: '24px', p: '2px' }} />
      </ListItemIcon>
      <ListItemText sx={{ py: '9px' }}>Edit</ListItemText>
    </MenuItem>
  );
};

export const SharePublicMenuItem = (): JSX.Element => (
  <MenuItem key="2">
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <ShareIcon color="primary" />
    </ListItemIcon>
    <ListItemText>
      Share the public link
      <Body size="xs">(preserves privacy)</Body>
    </ListItemText>
  </MenuItem>
);
export const SharePrivateMenuItem = (): JSX.Element => (
  <MenuItem>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <ShareUnlockIcon />
    </ListItemIcon>
    <ListItemText>
      Share the secret link
      <Body size="xs">(all private files and locations will be visible)</Body>
    </ListItemText>
  </MenuItem>
);

export const DeleteMenuItem = (): JSX.Element => (
  <MenuItem>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <TrashIcon color="black" />
    </ListItemIcon>
    <ListItemText sx={{ py: '9px' }}>Delete</ListItemText>
  </MenuItem>
);

export const menuItems: (() => JSX.Element)[] = [
  EditMenuItem,
  SharePublicMenuItem,
  SharePrivateMenuItem,
  DeleteMenuItem,
];
