import { msg } from '@lingui/macro';

export const NAV_BASE_CLASSES =
  'relative flex flex-col h-screen overflow-visible transition-all duration-300 border-0 border-r border-solid border-r-[#D2D5D9] bg-bc-neutral-0';

export const COLLAPSE_BUTTON_CLASSES =
  'group hidden md:flex items-center justify-center w-[25px] h-[25px] absolute z-10 right-[-12.5px] top-[35px] p-0 rounded-[5px] border border-solid border-[#D2D5D9] bg-[#FFFFFF] shadow-[0_0_8px_rgba(0,0,0,0.15)] cursor-pointer hover:bg-bc-green-600 hover:text-bc-neutral-100';

export const SECTION_HEADING_BASE =
  'uppercase text-sc-text-sub-header cursor-default pointer-events-none';

export const LIST_BASE_CLASSES =
  'group flex items-center border-none transition-colors rounded-md p-[10px]';

export const LIST_ACTIVE_CLASSES =
  'bg-bc-neutral-200 text-bc-neutral-900 font-bold';

export const LIST_INACTIVE_CLASSES =
  'bg-transparent text-bc-neutral-700 hover:bg-bc-neutral-200 hover:cursor-pointer';

export const LIST_COLLAPSED_CLASSES =
  'w-[40%] mx-auto justify-center h-40 px-1 py-2';
export const LIST_EXPANDED_CLASSES = 'w-full h-35 md:h-45 gap-10';

export const UNNAMED = msg`Unnamed`;

export const COPIED = msg`Copied!`;

export const DASHBOARD_NAVIGATION_ARIA_LABEL = msg`Dashboard side navigation`;
export const CLOSE_MENU = msg`Close menu`;
export const EXPAND_SIDEBAR = msg`Expand sidebar`;
export const COLLAPSE_SIDEBAR = msg`Collapse sidebar`;
