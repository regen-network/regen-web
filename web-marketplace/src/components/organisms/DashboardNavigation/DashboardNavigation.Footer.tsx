import { Trans } from '@lingui/macro';

import RegistryIcon from 'web-components/src/components/icons/RegistryIcon';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';

import { DashboardNavFooterProps } from './DashboardNavigation.types';

export const DashboardNavFooter = ({
  onExitClick,
}: DashboardNavFooterProps) => (
  <div className="flex flex-col gap-10 items-center justify-between px-3 py-4">
    {/* Logo area */}
    <RegistryIcon
      className="h-[53px] w-[80px] text-bc-neutral-400"
      data-testid="registry-logo"
    />

    {/* Exit to homepage link */}
    <button
      className="text-[14px] text-bc-neutral-700 font-normal flex items-center gap-1 no-underline bg-transparent border-none p-0 cursor-pointer hover:underline group font-sans"
      onClick={() => onExitClick?.('homepage')}
    >
      <Trans> Exit to homepage </Trans>
      <SmallArrowIcon className="h-12 w-12 ml-3 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
);
