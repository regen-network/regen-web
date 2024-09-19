import { useLocation, useNavigate } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

import { dashboardNavSections } from './ProfileEdit.constants';
import { DashboardNavSection } from './ProfileEdit.types';

type DashboardNavProps = {
  className?: string;
  sections: DashboardNavSection[];
};

const DashboardNav = ({ className, sections }: DashboardNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: implement savedPaymentInfo
  const savedPaymentInfo = true;

  if (!savedPaymentInfo) {
    // If there is no saved payment info remove the item from navSections
    sections = sections.map(navSection => {
      if (navSection.heading === 'Orders') {
        navSection.items = navSection.items.filter(
          item => item.href !== '/profile/edit/saved-payment-info',
        );
      }
      return navSection;
    });
  }

  return (
    <nav className={className}>
      {sections.map(navSection => (
        <List
          key={navSection.heading}
          aria-labelledby={`${navSection.heading.toLowerCase()}-list-subheader`}
          subheader={
            <ListSubheader
              component="div"
              className="bg-transparent text-gray-700 uppercase font-extrabold tracking-wider font-muli"
              id={`${navSection.heading.toLowerCase()}-list-subheader`}
            >
              {navSection.heading}
            </ListSubheader>
          }
          className="mb-4"
        >
          {navSection.items.map(item => (
            <ListItem key={item.name} disablePadding className="pb-1">
              <ListItemButton
                disableRipple
                className="flex p-2 cursor-pointer"
                onClick={() => navigate(item.href)}
                selected={item.href === location.pathname}
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor: 'rgb(239, 239, 239)',
                    borderRadius: '5px',
                  },
                  '&:hover': {
                    backgroundColor: 'rgb(239, 239, 239)',
                    borderRadius: '5px',
                  },
                }}
              >
                <ListItemIcon className="min-w-[40px]">
                  {item.icon}
                </ListItemIcon>
                <ListItemText className="w-full">{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ))}
    </nav>
  );
};

export const ProfileEditNav = () => {
  return <DashboardNav sections={dashboardNavSections} />;
};
