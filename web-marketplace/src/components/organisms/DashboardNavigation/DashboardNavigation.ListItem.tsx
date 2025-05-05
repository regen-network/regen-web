import clsx from 'clsx';

import { DashboardNavigationItem } from './DashboardNavigation.types';

type Props = {
  item: DashboardNavigationItem;
  currentPath: string;
  onClick: (path: string) => void;
};

export const DashboardNavigationListItem = ({
  item,
  currentPath,
  onClick,
}: Props) => {
  const isActive = currentPath === item.path;

  return (
    <button
      type="button"
      onClick={() => onClick(item.path)}
      className={clsx(
        /* layout */
        'group flex w-full items-center h-48 gap-3 px-3 py-2 text-sm font-medium bg-transparent border-none transition-colors',

        /* colours */
        isActive
          ? 'bg-bc-primary-100 text-bc-primary-900'
          : 'text-bc-neutral-700 hover:bg-bc-neutral-200 hover:cursor-pointer',
      )}
    >
      {item.icon && (
        <span className="flex h-50 w-50 shrink-0 items-center justify-center">
          {item.icon}
        </span>
      )}

      <span>{item.label}</span>
    </button>
  );
};
