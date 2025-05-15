import { cn } from 'web-components/src/utils/styles/cn';

import { NavigationListItemProps } from './DashboardNavigation.types';

// Common class constants for better maintenance
const baseClasses =
  'group flex items-center border-none transition-colors rounded-md';
const activeClasses = 'bg-bc-neutral-200 text-bc-neutral-900 font-bold';
const inactiveClasses =
  'bg-transparent text-bc-neutral-700 font-medium hover:bg-bc-neutral-200 hover:cursor-pointer';

export const DashboardNavigationListItem = ({
  item,
  currentPath,
  onClick,
  collapsed = false,
}: NavigationListItemProps) => {
  const isActive = currentPath === item.path;

  // Separate layout classes based on collapse state
  const layoutClasses = collapsed
    ? 'w-[40%] mx-auto justify-center h-40 px-1 py-2'
    : 'w-full h-50 gap-10 pl-10 px-3 py-2 text-[14px]';

  // Separate state classes
  const stateClasses = isActive ? activeClasses : inactiveClasses;

  return (
    <button
      type="button"
      onClick={() => onClick(item.path)}
      className={cn(baseClasses, layoutClasses, stateClasses)}
      aria-current={isActive ? 'page' : undefined}
      // Add tooltip when collapsed
      title={collapsed ? item.label : undefined}
      // For test selection
      data-testid={`nav-item-${item.path.replace(/\//g, '-')}`}
    >
      {item.icon && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          {item.icon}
        </span>
      )}

      {/* Only show text when not collapsed */}
      {!collapsed && <span>{item.label}</span>}
    </button>
  );
};
