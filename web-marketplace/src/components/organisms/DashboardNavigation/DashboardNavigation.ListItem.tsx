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

  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick(item.path);
  };

  const button = (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        LIST_BASE_CLASSES,
        LIST_LAYOUT_CLASSES,
        !item.disabled && LIST_STATE_CLASSES,
        item.disabled && [
          'cursor-default opacity-50',
          'transition-none',
          'bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent',
        ],
      )}
      aria-current={isActive ? 'page' : undefined}
      data-testid={`nav-item-${item.path.replace(/\//g, '-')}`}
      disabled={item.disabled}
    >
      {item.icon && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          {item.icon}
        </span>
      )}

      {!collapsed && (
        <div className="flex items-center justify-between w-full">
          <Subtitle
            className={cn(
              'text-[16px] md:text-[14px]',
              isLogout ? 'text-sc-text-sub-header' : '',
              !item.disabled && 'group-hover:font-bold transition-all',
              item.disabled && 'group-hover:underline',
            )}
            sx={{ fontWeight: isActive && !item.disabled ? 700 : 400 }}
          >
            {item.label}
          </Subtitle>

          {!isActive && !item.disabled && (
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

  if (item.disabled && item.disabledTooltipText) {
    return (
      <InfoTooltip
        title={item.disabledTooltipText}
        arrow
        placement={collapsed ? 'right' : 'top'}
        classes={{
          tooltip: 'ml-10',
        }}
      >
        {button}
      </InfoTooltip>
    );
  }

  if (collapsed && !item.disabled) {
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
  }

  return button;
};
