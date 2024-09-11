import { cn } from 'web-components/src/utils/styles/cn';

import EditIcon from '../icons/EditIcon';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export function EditButtonIcon({
  onClick,
  className = '',
  ariaLabel = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-transparent border-none hover:cursor-pointer hover:opacity-80',
        className,
      )}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <EditIcon className="h-[24px] w-[24px] p-[2px] text-grey-400" />
    </button>
  );
}
