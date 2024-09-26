import { useLocation, useNavigate } from 'react-router-dom';
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
  const { _ } = useLingui();

  // TODO: implement savedPaymentInfo
  const savedPaymentInfo = false;

  if (!savedPaymentInfo) {
    // If there is no saved payment info remove the item from sections
    sections = sections.map(section => ({
      ...section,
      items: section.items.filter(
        item => item.href !== '/profile/edit/payment-info',
      ),
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
                <ListItemText className="w-full">{_(item.name)}</ListItemText>
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
