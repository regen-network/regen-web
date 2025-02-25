import { Fragment } from 'react';
import { useLingui } from '@lingui/react';
import { List, ListSubheader } from '@mui/material';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { AdminNavigationListItem } from './AdminNavigation.ListItem';
import { AdminNavigationSection } from './AdminNavigation.types';

export type AdminNavigationProps = {
  className?: string;
  sections: AdminNavigationSection[];
  onNavItemClick: (sectionName: string) => void;
  currentPath: string;
  savedPaymentInfo?: boolean;
};

export const AdminNavigation = ({
  className = '',
  sections,
  onNavItemClick,
  currentPath,
  savedPaymentInfo,
}: AdminNavigationProps) => {
  const { _ } = useLingui();

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
              className="bg-transparent text-bc-neutral-400 uppercase font-extrabold tracking-wider font-muli"
              component="div"
              disableSticky
            >
              {_(section.heading)}
            </ListSubheader>
          }
          className="mb-15"
        >
          {section.items.map(item => (
            <Fragment key={item.name}>
              {item.disabled ? (
                <InfoTooltip title={item.disabledTooltipText} arrow>
                  <div>
                    <AdminNavigationListItem
                      onNavItemClick={onNavItemClick}
                      currentPath={currentPath}
                      item={item}
                    />
                  </div>
                </InfoTooltip>
              ) : (
                <AdminNavigationListItem
                  onNavItemClick={onNavItemClick}
                  currentPath={currentPath}
                  item={item}
                />
              )}
            </Fragment>
          ))}
        </List>
      ))}
    </nav>
  );
};
