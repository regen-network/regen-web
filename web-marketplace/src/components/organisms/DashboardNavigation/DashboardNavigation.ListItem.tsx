import clsx from 'clsx';

import { DashboardNavigationItem } from './DashboardNavigation.types';

type Props = {
  item: DashboardNavigationItem;
  currentPath: string;
  onClick: (path: string) => void;
  collapsed?: boolean;
};

export const DashboardNavigationListItem = ({
  item,
  currentPath,
  onClick,
  collapsed = false,
}: Props) => {
  const isActive = currentPath === item.path;

  return (
    <button
      type="button"
      onClick={() => onClick(item.path)}
      className={clsx(
        'group flex items-center border-none transition-colors rounded-md',
        
        // Adjust layout based on collapsed state
        collapsed 
          ? 'w-[40%] mx-auto justify-center h-40 px-1 py-2' 
          : 'w-full h-50 gap-10 pl-10 px-3 py-2 text-[14px]',

        isActive
          ? 'bg-bc-neutral-200 text-bc-neutral-900 font-bold' // selected
          : 'bg-transparent text-bc-neutral-700 font-medium hover:bg-bc-neutral-200 hover:cursor-pointer', // default
      )}
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
