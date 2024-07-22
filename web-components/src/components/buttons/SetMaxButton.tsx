import { MouseEvent } from 'react';

export function SetMaxButton({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Set max credits"
      className="ml-3 sm:ml-10 border-none w-[46px] h-[30px] py-[5px] bg-grey-500 hover:bg-grey-400 rounded text-white text-sm font-bold font-['Lato'] hover:cursor-pointer"
    >
      Max
    </button>
  );
}
