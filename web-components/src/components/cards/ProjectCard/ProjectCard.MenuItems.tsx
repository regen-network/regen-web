import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from '@mui/material';

import ClipboardIcon from '../../icons/ClipboardIcon';
import DraftDocumentAltIcon from '../../icons/DraftDocumentAltIcon';
import TrashIcon from '../../icons/TrashIcon';
import {
  CONVERT_TO_DRAFT,
  DELETE_PROJECT,
  REGISTER_WITH_PROTOCOL,
} from './ProjectCard.constants';

export const ConvertToDraftMenuItem = (props: MenuItemProps): JSX.Element => (
  <MenuItem {...props} classes={{ root: 'px-[25px]' }}>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <DraftDocumentAltIcon />
    </ListItemIcon>
    <ListItemText className="py-10">{CONVERT_TO_DRAFT}</ListItemText>
  </MenuItem>
);

export const RegisterWithProtocolMenuItem = (
  props: MenuItemProps,
): JSX.Element => (
  <MenuItem
    {...props}
    classes={{ root: 'px-[25px]' }}
    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
  >
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <ClipboardIcon />
    </ListItemIcon>
    <ListItemText className="py-10">{REGISTER_WITH_PROTOCOL}</ListItemText>
  </MenuItem>
);

export const DeleteMenuItem = (props: MenuItemProps): JSX.Element => (
  <MenuItem {...props} classes={{ root: 'px-[25px]' }}>
    <ListItemIcon sx={{ height: '24px', width: '24px' }}>
      <TrashIcon className="text-error-300" />
    </ListItemIcon>
    <ListItemText className="py-10">{DELETE_PROJECT}</ListItemText>
  </MenuItem>
);

export const menutItems: ((props: MenuItemProps) => JSX.Element)[] = [
  RegisterWithProtocolMenuItem,
  ConvertToDraftMenuItem,
  DeleteMenuItem,
];
