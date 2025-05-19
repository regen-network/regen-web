// src/components/organisms/DashboardNavigation/DashboardNavigation.ListItem.tsx
import React from 'react';

import BreadcrumbIcon from 'web-components/src/components/icons/BreadcrumbIcon';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import { cn } from 'web-components/src/utils/styles/cn';

import { NavigationListItemProps } from './DashboardNavigation.types';

const baseClasses =
  'group flex items-center border-none transition-colors rounded-md p-[10px]';
const activeClasses = 'bg-bc-neutral-200 text-bc-neutral-900 font-bold';
const inactiveClasses =
  'bg-transparent text-bc-neutral-700 hover:bg-bc-neutral-200 hover:cursor-pointer';

export const DashboardNavigationListItem: React.FC<NavigationListItemProps> = ({
  item,
  currentPath,
  onClick,
  collapsed = false,
}) => {
  const isActive = currentPath === item.path;
  const isLogout = item.path === 'logout';

  const layoutClasses = collapsed
    ? 'w-[40%] mx-auto justify-center h-40 px-1 py-2'
    : 'w-full h-35 md:h-45 gap-10';

  const stateClasses = isActive ? activeClasses : inactiveClasses;

  const button = (
    <button
      type="button"
      onClick={() => onClick(item.path)}
      className={cn(baseClasses, layoutClasses, stateClasses)}
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

          {/* Arrow icon that only appears on hover, but not on active items */}
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
