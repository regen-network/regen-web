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
        'group flex w-full items-center h-50 gap-10 pl-10 px-3 py-2 text-[14px] border-none transition-colors rounded-md',

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

      <span>{item.label}</span>
    </button>
  );
};
