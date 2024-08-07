import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from '@mui/material';

import EditIcon from '../../icons/EditIcon';
import ShareIcon from '../../icons/ShareIcon';
import { ShareUnlockIcon } from '../../icons/ShareUnlockIcon';
import TrashIcon from '../../icons/TrashIcon';
import { Body } from '../../typography';
import {
  DELETE,
  EDIT,
  PRESERVES_PRIVACY,
  PRIVATE_VISIBLE,
  SHARE_PUBLIC_LINK,
  SHARE_SECRET_LINK,
} from './PostCard.constants';

export const EditMenuItem = (props: MenuItemProps): JSX.Element => {
  return (
    <MenuItem {...props} classes={{ root: 'px-[25px]' }}>
      <ListItemIcon>
        <EditIcon sx={{ height: '24px', width: '24px', p: '2px' }} />
      </ListItemIcon>
      <ListItemText sx={{ py: '9px' }}>{EDIT}</ListItemText>
    </MenuItem>
  );
};

type SharePublicMenuItemProps = { publicPost?: boolean } & MenuItemProps;
export const SharePublicMenuItem = ({
  publicPost,
  ...props
}: SharePublicMenuItemProps): JSX.Element => (
  <MenuItem {...props} classes={{ root: 'px-[25px]' }}>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <ShareIcon className="text-brand-300" />
    </ListItemIcon>
    <ListItemText className={'publicPost' ? 'py-10' : undefined}>
      {SHARE_PUBLIC_LINK}
      {!publicPost && <Body size="xs">{PRESERVES_PRIVACY}</Body>}
    </ListItemText>
  </MenuItem>
);
export const SharePrivateMenuItem = (props: MenuItemProps): JSX.Element => (
  <MenuItem {...props} classes={{ root: 'px-[25px]' }}>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <ShareUnlockIcon />
    </ListItemIcon>
    <ListItemText>
      {SHARE_SECRET_LINK}
      <Body size="xs">{PRIVATE_VISIBLE}</Body>
    </ListItemText>
  </MenuItem>
);

export const DeleteMenuItem = (props: MenuItemProps): JSX.Element => (
  <MenuItem {...props} classes={{ root: 'px-[25px]' }}>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <TrashIcon className="text-error-300" />
    </ListItemIcon>
    <ListItemText className="py-10">{DELETE}</ListItemText>
  </MenuItem>
);

export const menuItems: ((props: MenuItemProps) => JSX.Element)[] = [
  EditMenuItem,
  SharePublicMenuItem,
  SharePrivateMenuItem,
  DeleteMenuItem,
];
