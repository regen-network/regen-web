import { MouseEvent } from 'react';

export function SetMaxButton({
  onClick,
  ariaLabel,
  buttonText,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
  ariaLabel: string;
  buttonText: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="ml-3 sm:ml-10 border-none w-[46px] h-[30px] py-[5px] bg-grey-500 hover:bg-grey-400 rounded text-grey-0 text-sm font-bold font-sans hover:cursor-pointer"
    >
      {buttonText}
    </button>
  );
}
