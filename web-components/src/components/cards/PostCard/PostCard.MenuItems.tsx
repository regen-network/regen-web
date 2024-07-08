import React from 'react';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from '@mui/material';

import EditIcon from '../../icons/EditIcon';
import ShareIcon from '../../icons/ShareIcon';
import ShareUnlockIcon from '../../icons/ShareUnlockIcon';
import TrashIcon from '../../icons/TrashIcon';
import { Body } from '../../typography';

export const EditMenuItem = (props: MenuItemProps): JSX.Element => {
  return (
    <MenuItem {...props}>
      <ListItemIcon>
        <EditIcon sx={{ height: '24px', width: '24px', p: '2px' }} />
      </ListItemIcon>
      <ListItemText sx={{ py: '9px' }}>Edit</ListItemText>
    </MenuItem>
  );
};

type SharePublicMenuItemProps = { publicPost?: boolean } & MenuItemProps;
export const SharePublicMenuItem = ({
  publicPost,
  ...props
}: SharePublicMenuItemProps): JSX.Element => (
  <MenuItem key="2" {...props}>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <ShareIcon color="primary" />
    </ListItemIcon>
    <ListItemText>
      Share the public link
      {!publicPost && <Body size="xs">(preserves privacy)</Body>}
    </ListItemText>
  </MenuItem>
);
export const SharePrivateMenuItem = (props: MenuItemProps): JSX.Element => (
  <MenuItem {...props}>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <ShareUnlockIcon />
    </ListItemIcon>
    <ListItemText>
      Share the secret link
      <Body size="xs">(all private files and locations will be visible)</Body>
    </ListItemText>
  </MenuItem>
);

export const DeleteMenuItem = (props: MenuItemProps): JSX.Element => (
  <MenuItem {...props}>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <TrashIcon className="text-grey-700" />
    </ListItemIcon>
    <ListItemText sx={{ py: '9px' }}>Delete</ListItemText>
  </MenuItem>
);

export const menuItems: ((props: MenuItemProps) => JSX.Element)[] = [
  EditMenuItem,
  SharePublicMenuItem,
  SharePrivateMenuItem,
  DeleteMenuItem,
];
