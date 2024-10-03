import { useLingui } from '@lingui/react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getPaymentMethodsQuery } from 'lib/queries/react-query/registry-server/getPaymentMethodsQuery/getPaymentMethodsQuery';

import { AdminNavigationSection } from './AdminNavigation.types';
import { isSelected } from './AdminNavigation.utils';

export type AdminNavigationProps = {
  className?: string;
  sections: AdminNavigationSection[];
  onNavItemClick: (sectionName: string) => void;
  currentPath: string;
};

export const AdminNavigation = ({
  className = '',
  sections,
  onNavItemClick,
  currentPath,
}: AdminNavigationProps) => {
  const { _ } = useLingui();

  const { data: paymentMethodData } = useQuery(
    getPaymentMethodsQuery({
      enabled: true,
    }),
  );

  const savedPaymentInfo = (paymentMethodData?.paymentMethods?.length ?? 0) > 0;

  if (!savedPaymentInfo) {
    // If there is no saved payment info remove the item from the nav
    sections = sections.map(section => ({
      ...section,
      items: section.items.filter(item => item.path !== 'payment-info'),
    }));
  }

  return (
    <nav className={className}>
      {sections.map(section => (
        <List
          key={_(section.heading)}
          aria-labelledby={`${_(section.heading).toLowerCase()}-list-subheader`}
          subheader={
            <ListSubheader
              id={`${_(section.heading).toLowerCase()}-list-subheader`}
              className="bg-transparent text-gray-700 uppercase font-extrabold tracking-wider font-muli"
              component="div"
              disableSticky
            >
              {_(section.heading)}
            </ListSubheader>
          }
          className="mb-15"
        >
          {section.items.map(item => (
            <ListItem key={_(item.name)} disablePadding className="pb-1">
              <ListItemButton
                disableRipple
                className="flex p-2 cursor-pointer"
                onClick={() => onNavItemClick(item.path)}
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
                <ListItemIcon className="min-w-[40px]">
                  {item.icon}
                </ListItemIcon>
                <ListItemText className="w-full">{_(item.name)}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ))}
    </nav>
  );
};
