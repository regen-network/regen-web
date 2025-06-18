import React from 'react';

import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  LIST_ACTIVE_CLASSES,
  LIST_BASE_CLASSES,
  LIST_COLLAPSED_CLASSES,
  LIST_EXPANDED_CLASSES,
  LIST_INACTIVE_CLASSES,
} from './DashboardNavigation.constants';
import { NavigationListItemProps } from './DashboardNavigation.types';

export const DashboardNavigationListItem: React.FC<NavigationListItemProps> = ({
  item,
  currentPath,
  onClick,
  collapsed = false,
}) => {
  const isActive = currentPath === item.path;
  const isLogout = item.path === 'logout';

  const LIST_LAYOUT_CLASSES = collapsed
    ? LIST_COLLAPSED_CLASSES
    : LIST_EXPANDED_CLASSES;

  const LIST_STATE_CLASSES = isActive
    ? LIST_ACTIVE_CLASSES
    : LIST_INACTIVE_CLASSES;

  const button = (
    <button
      type="button"
      onClick={() => onClick(item.path)}
      className={cn(LIST_BASE_CLASSES, LIST_LAYOUT_CLASSES, LIST_STATE_CLASSES)}
      aria-current={isActive ? 'page' : undefined}
      data-testid={`nav-item-${item.path.replace(/\//g, '-')}`}
    >
      {item.icon && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          {item.icon}
        </span>
      )}

      {!collapsed && (
        <div className="flex items-center justify-between w-full">
          <Subtitle
            size="sm"
            className={cn(
              isLogout ? 'text-sc-text-sub-header' : '',
              'group-hover:font-bold transition-all',
            )}
            sx={{ fontWeight: isActive ? 700 : 400 }}
          >
            {item.label}
          </Subtitle>

          {!isActive && (
            <BreadcrumbIcon
              className={cn(
                'h-[15px] w-[15px] transform rotate-[-90deg] text-bc-neutral-400 ml-2 transition-opacity',
                isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100',
              )}
            />
          )}
        </div>
      )}
    </button>
  );

  if (!collapsed) return button;

  return (
    <InfoTooltip
      title={item.label}
      arrow
      placement="right"
      classes={{
        tooltip: 'bg-bc-neutral-700 text-bc-neutral-100',
        arrow: 'text-bc-neutral-700',
      }}
    >
      {button}
    </InfoTooltip>
  );
};
