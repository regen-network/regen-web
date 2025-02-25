import { useLingui } from '@lingui/react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { cn } from 'web-components/src/utils/styles/cn';

import { AdminNavigationItem } from './AdminNavigation.types';
import { isSelected } from './AdminNavigation.utils';

type AdminNavigationListItemProps = {
  onNavItemClick: (sectionName: string) => void;
  currentPath: string;
  item: AdminNavigationItem;
};
export const AdminNavigationListItem = ({
  onNavItemClick,
  currentPath,
  item,
}: AdminNavigationListItemProps) => {
  const { _ } = useLingui();

  return (
    <ListItem disablePadding className="pb-1">
      <ListItemButton
        disableRipple
        className={cn(
          'flex p-2',
          item.disabled
            ? 'text-bc-neutral-400 cursor-default'
            : 'cursor-pointer',
        )}
        onClick={() => {
          if (!item.disabled) onNavItemClick(item.path);
        }}
        selected={isSelected(item.path, currentPath)}
        sx={theme => ({
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: theme.palette.info.light,
            borderRadius: '5px',
          },
          '&:hover': {
            backgroundColor: theme.palette.info.light,
            borderRadius: '5px',
          },
        })}
      >
        <ListItemIcon className="min-w-[40px]">{item.icon}</ListItemIcon>
        <ListItemText className="w-full">{_(item.name)}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
