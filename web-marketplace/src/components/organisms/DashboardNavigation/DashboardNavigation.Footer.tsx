import RegistryIcon from 'web-components/src/components/icons/RegistryIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { DashboardNavFooterProps } from './DashboardNavigation.types';


export const DashboardNavFooter = ({ onExitClick }: DashboardNavFooterProps) => (
  <div className="flex flex-col gap-10 items-center justify-between px-3 py-4">
    {/* Logo area */}
    <div className="flex items-center gap-2">
      <RegistryIcon
        className="h-[53px] w-[80px] text-bc-neutral-400"
        data-testid="registry-logo"
      />
    </div>

    {/* Exit to homepage link */}
    <button
      className="text-[14px] text-black! font-normal flex items-center gap-1 no-underline bg-transparent border-none p-0 cursor-pointer"
      style={{ color: 'black' }}
      onClick={() => onExitClick?.('homepage')}
    >
      Exit to homepage
      <SmallArrowIcon className="h-12 w-12" />
    </button>
  </div>
);
